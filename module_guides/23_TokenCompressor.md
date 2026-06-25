# 23_TokenCompressor Module

## Overview
The TokenCompressor module implements a hill-climbing optimizer that finds the most token-efficient surface representation for a semantic payload — working with both code (CodeForge programs) and prose (natural language instructions). It represents the constructive flip side of tokenizer analysis: instead of asking how tokenization works, it asks "what is the Shannon limit of model-to-model communication per token?"

Given a semantic payload P and a target tokenizer profile T, it finds the surface string S that minimizes tokenCount(S, T) while preserving semantic fidelity above a configurable threshold. Code fidelity is exact (comparing interpreter stdout), while prose fidelity uses heuristics (content-word preservation + relationship integrity).

## Core Concept
TokenCompressor uses seeded randomness for fully deterministic optimization runs. It employs tokenizer profiles (rough BPE vocabulary models) for different model families (GPT, Claude, Gemma, generic) that include known single-token words and common merges to improve estimation beyond naive chars/4 heuristics.

The optimization process:
1. Estimate token count using sophisticated heuristics that account for known merges, single-token words, and character composition
2. Generate neighbor candidates through various transformation strategies
3. Accept improvements that reduce token count while preserving semantic fidelity
4. Repeat until local optimum or max rounds reached

## Key Features

### 1. Tokenizer Profiles
- **GPT** (cl100k/o200k): Optimized for OpenAI's tokenizers
- **Claude** (Anthropic): Tuned for Anthropic's tokenization
- **Gemma/Gemini** (SentencePiece): Handles underscore-based prefixing
- **Generic BPE**: Fallback for unknown tokenizers

Each profile includes:
- Average characters per token
- Set of known single-token words (high-frequency words that tokenize as 1 token)
- Common subword merges (suffixes/prefixes that typically merge)
- Non-ASCII penalties
- Space-prefix merging behavior

### 2. Compression Techniques
#### For Code Optimization:
- Whitespace elimination (leading/trailing, empty lines)
- Statement packing (multiple statements per line)
- Comment removal
- Identifier shortening (renaming to 1-char names where possible)
- Combined transformations (strip+shorten, pack+shorten)
- Space collapsing
- Empty line removal

#### For Prose Optimization:
- Abbreviation expansion (function→fn, information→info, etc.)
- Telegraphic style (dropping articles, copulas, fillers)
- Symbol substitution (=→equals, &→and, etc.)
- Structured format conversion (prose → key:value or bullet lists)
- Whitespace normalization
- Combined transformations
- Phrase deduplication (replacing repeats with [^N] markers)

### 3. Fidelity Mechanisms
- **Code**: Exact equivalence (same interpreter stdout)
- **Prose**: Heuristic fidelity based on:
  - Content-word preservation (words ≥3 letters, not stop words)
  - Relationship integrity (preserving semantic connections)
  - Configurable threshold (1.0 = exact for code, 0.8 = relaxed for prose)

### 4. Analysis Tools
- `analyze()`: Get token density and breakdown without optimization
- `compare()`: Rank multiple texts by token efficiency
- `report()`: Human-readable optimization reports

## Technical Implementation

### Token Estimation Heuristic
The core `estimateTokens()` method improves upon naive chars/4 by:
1. Splitting on whitespace boundaries while preserving leading spaces (BPE merges " word" → 1 token)
2. Checking for known single-token words
3. Detecting common merges (e.g., "ing", "tion") and estimating stem + 1 token
4. Handling numbers (~4 digits/token), string literals (quotes + content), operators
5. General case: character-by-character estimation with UTF-8 awareness and non-ASCII penalties
6. Ensuring minimum 1 token return

### Optimization Process
#### Code Optimization (`optimizeCode`):
1. Runs original code to establish ground truth output
2. Estimates initial token count
3. Iteratively generates neighbors via:
   - Whitespace stripping
   - Statement packing
   - Comment removal
   - Identifier shortening
   - Combined transformations
   - Space collapsing
   - Empty line removal
4. Accepts first improvement (hill climbing) that reduces tokens while maintaining exact output
5. Stops when no improvement or max rounds reached

#### Prose Optimization (`optimizeProse`):
1. Extracts original content words
2. Estimates initial token count
3. Iteratively generates neighbors via:
   - Abbreviation substitution
   - Telegraphic dropping (articles, fillers)
   - Symbol substitution (relations → symbols)
   - Structured format conversion
   - Whitespace normalization
   - Combined transformations
   - Phrase deduplication
4. Accepts improvements that reduce tokens while maintaining fidelity ≥ threshold
5. Stops when no improvement or max rounds reached

### Helper Systems
- **Abbreviation Dictionary**: Maps verbose terms to standard short forms
- **Symbol Substitutions**: Relation words → mathematical symbols
- **Droppable Words**: Articles, copulas, fillers safe for telegraphic mode
- **Content Word Filter**: Identifies semantic-core words (≥3 letters, not stopwords)
- **Deduplication System**: Finds repeated phrases and replaces with backreferences

## Usage Examples

### Basic Code Optimization
```javascript
import { TokenCompressor } from './src/modules/TokenCompressor.js';
import { CodeForge } from './src/modules/CodeForge.js';

// Generate a CodeForge language first (programming language) instance
const codeForge = new CodeForge(/* language spec */);
const program = `
function calculateTotal(items) {
    let sum = 0;
    for (let i = 0; i < items.length; i++) {
        sum += items[i];
    }
    return sum;
}
`;

// Create compressor with GPT profile for maximum efficiency
const compressor = new TokenCompressor(Date.now(), {
  profile: 'gpt',
  maxRounds: 50,
  fidelityThreshold: 1.0,  // Exact equivalence for code
  mode: 'auto'
});

// Optimize the program
const result = compressor.optimizeCode(codeForge, program);
console.log(compressor.report(result));
// Shows original vs optimized token count and transformations applied
```

### Prose Optimization
```javascript
import { TokenCompressor } from './src/modules/TokenCompressor.js';

const compressor = new TokenCompressor(Date.now(), {
  profile: 'claude',
  fidelityThreshold: 0.85,  // Allow some semantic flexibility
  mode: 'auto'
});

const prose = "The artificial intelligence system processes large amounts of data to make intelligent decisions based on patterns it has learned from training examples.";
const result = compressor.optimizeProse(prose);
console.log(`Original: ${result.original.tokens} tokens`);
console.log(`Optimized: ${result.optimized.tokens} tokens`);
console.log(`Saved: ${result.improvement.tokensSaved} tokens (${result.improvement.percentReduction}%)`);
console.log(`Optimized text: ${result.optimized.text}`);
// Might produce: "AI processes data to decide based on learned patterns."
```

### Token Analysis Without Optimization
```javascript
const analysis = compressor.analyze("The quick brown fox jumps over the lazy dog");
console.log(`Tokens: ${analysis.tokens}`);
console.log(`Density: ${analysis.density} semantic units/token`);
console.log(`Breakdown:`, analysis.breakdown);
// Shows single-token words, multi-token words, punctuation, numbers
```

### Comparing Multiple Variations
```javascript
const versions = [
  "Please submit your report by Friday",
  "Submit report Fri",
  "Please hand in the report on Friday",
  "Turn in report Friday"
];

const ranking = compressor.compare(versions, 'gpt');
ranking.forEach(item => {
  console.log(`#${item.rank}: "${item.text}" (${item.tokens} tokens, density: ${item.density})`);
});
// Shows most token-efficient version first
```

## Integration with GLOSSOPETRAE Modules

### With CodeForge
- Primary integration point: optimizes generated programs for token efficiency
- Preserves exact semantics through execution verification
- Works with any CodeForge-generated language
- Particularly valuable for API prompts or code generation where token limits matter

### With Language Generation Pipeline
1. **PhonemeSelector** → Creates sound inventory
2. **SyllableForge** → Defines legal syllable structures
3. **MorphologyWeaver** → Builds grammatical system
4. **LexiconGenerator** → Creates vocabulary
5. **SyntaxGenerator** → Defines sentence structure
6. **TokenCompressor** → Optimizes final output for target LLMs
7. **AudioForge** → Generates speech (if needed)
8. **ScriptGenerator** → Creates writing system

Typical flow:
```javascript
// Generate language components
const phonemes = new PhonemeSelector(seed).select();
const syllableForge = new SyllableForge(Math.random, phonemes, {maxOnset: 2, maxCoda: 2});
const morphology = new MorphologyWeaver(seed, {phonemes, type: 'agglutinative'});
const lexicon = new LexiconGenerator(seed, {semanticFields, phonemes, morphology: morphology.getMorphemes()});
const syntax = new SyntaxGenerator(seed, {phonemes, morphology, lexicon});

// Generate text
const generator = new LexiconGenerator(seed, {semanticFields: ['Technology'], phonemes, morphology: morphology.getMorphemes()});
const text = generator.generateParagraph(3);

// Optimize for target LLM
const compressor = new TokenCompressor(seed, {profile: 'openai', fidelityThreshold: 0.9});
const result = compressor.optimizeProse(text);
console.log(`Original: ${result.original.tokens} → Optimized: ${result.optimized.tokens} tokens`);
```

### With TokenExploiter
- **Complementary relationship**: TokenCompressor minimizes tokens for semantic content, TokenExploiter maximizes tokens for evasion/specific effects
- Can be used in pipeline: Compress → Exploit (for steganography or watermarking)
- Both use similar tokenizer profiles for consistency

## Configuration Options
- `seed`: Deterministic seed for reproducible optimization (default: Date.now())
- `maxRounds`: Hill-climbing budget (default: 40)
- `profile`: Tokenizer profile ('gpt', 'claude', 'gemma', 'generic') (default: 'generic')
- `fidelityThreshold`: Semantic fidelity threshold (1.0 = exact for code, 0.1-1.0 for prose) (default: 1.0)
- `mode`: 'code', 'prose', or 'auto' (default: 'auto')

## Best Practices
1. **Profile Selection**: Match profile to target LLM family for best estimates
2. **Fidelity Tuning**: Use 1.0 for code, 0.7-0.9 for prose depending on use case
3. **Round Budget**: Increase for complex optimization (50-100 for critical applications)
4. **Validation**: Always verify optimized code produces identical output
5. **Combined Use**: Consider using with TokenExploiter for adversarial scenarios
6. **Domain Awareness**: Technical documentation benefits more from abbreviation/symbol substitution

## Limitations & Considerations
- **Estimation Accuracy**: Token estimation is heuristic; actual tokenization may vary
- **Code Safety**: Always verify optimized code produces identical behavior
- **Prose Fidelity**: Aggressive compression may lose nuance or tone
- **Language Specificity**: Optimizations are most effective for English-like languages
- **Determinism**: Seeded random ensures reproducibility but may limit exploration
- **Local Optima**: Hill climbing may miss global optimum; multiple seeds recommended for critical cases

## Applications
- **LLM Prompt Optimization**: Reduce token costs in API calls
- **Code Golf**: Create minimally-tokenized programs
- **Embedded Systems**: Minimize storage for voice-command systems
- **Steganography**: Create innocuous-looking text with maximal semantic content
- **Education**: Demonstrate information density concepts
- **Translation Efficiency**: Optimize translated text for target LLM consumption
- **Prompt Engineering**: Create more effective prompts within token limits

The TokenCompressor module provides a sophisticated, linguistically-aware approach to token optimization that goes beyond simple compression techniques to preserve semantic integrity while minimizing token footprint across different transformer architectures.