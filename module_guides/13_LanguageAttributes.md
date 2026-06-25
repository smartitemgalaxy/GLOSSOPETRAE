# 13_LanguageAttributes Module

## Overview
The LanguageAttributes module defines specialized linguistic properties and constraints that can be applied to generated languages to achieve specific goals, ranging from computational efficiency to security-focused features. Unlike other modules that generate core language components (phonology, morphology, etc.), LanguageAttributes acts as a modifier layer that adjusts how those components are generated based on desired characteristics.

## Core Concept
LanguageAttributes implements a trait-based system where selecting specific attributes (like "HYPEREFFICIENT" or "STEALTH") automatically configures various language parameters to optimize for those goals. This allows users to create languages with specific properties without needing deep linguistic expertise.

## Key Features

### Core Attribute Categories
The module includes both traditional linguistic optimization attributes and cutting-edge research-based features:

**Traditional Optimization Attributes:**
- **HYPEREFFICIENT**: Maximizes semantic density per token using polysynthesis and logographic elements
- **STEALTH**: Optimized for covert communication through homoglyphs and plausible deniability
- **ADVERSARIAL**: Designed to confuse LLM parsing with ambiguous structures and garden-path sentences
- **REDUNDANT**: High error correction for noisy environments through systematic redundancy
- **MINIMAL**: Oligosynthetic design with smallest possible inventory and maximum compositionality

**Research-Based Attributes (2025-2026):**
- **TOKENBREAK**: Exploits BPE tokenizer vulnerabilities using zero-width characters and improbable bigrams
- **STEGO**: Semantic steganography for covert data channels in grammatical choices
- **PHANTOM**: Imperceptible guardrail evasion techniques with 90%+ success rate
- **GLITCH**: Incorporates known glitch tokens that cause model confusion
- **EPHEMERAL**: Time-rotating language that changes on a schedule
- **COMPRESSION**: Huffman-inspired morpheme assignment optimizing message length

### Attribute Effects System
Each attribute modifies multiple language generation parameters simultaneously:
- Phoneme inventory size and composition
- Morphological type and complexity
- Lexical generation patterns
- Syntactic structures
- Orthographic choices
- Semantic field preferences

### Integration Points
LanguageAttributes works as a modifier that can be applied to:
- **PhonemeSelector**: Adjusts phoneme inventory based on attribute requirements
- **MorphologyWeaver**: Modifies morphological complexity and type
- **LexiconGenerator**: Influences word formation and semantic organization
- **ScriptGenerator**: Adjusts writing system characteristics
- Other modules as needed for attribute consistency

## Usage Example
```javascript
import { LanguageAttributes } from './src/modules/LanguageAttributes.js';
import { PhonemeSelector } from './src/modules/PhonemeSelector.js';
import { MorphologyWeaver } from './src/modules/MorphologyWeaver.js';
import { LexiconGenerator } from './src/modules/LexiconGenerator.js';

// Create a language with multiple attributes for a specific purpose
const attributes = new LanguageAttributes(Math.random(), [
  'hyperefficient',   // Maximize information density
  'stego',           // Enable steganographic channels
  'redundant'        // Add error correction for noisy channels
]);

// Generate language components with attribute modifications
const phonemeSelector = new PhonemeSelector(Date.now(), {
  // Attributes will modify phoneme selection
  attributes: attributes
});

const phonemes = phonemeSelector.select();

// Apply attribute effects to morphology
const morphology = new MorphologyWeaver(Date.now(), {
  phonemes: phonemes,
  attributes: attributes  // Modify morphological complexity
});

// Generate lexicon with attribute-specific patterns
const lexicon = new LexiconGenerator(Date.now(), {
  semanticFields: ['technology', 'security', 'communication'],
  attributes: attributes  // Influence word formation
});

// Get a summary of applied attributes
console.log("Active attributes:", attributes.getActiveAttributes()
  .map(a => `${a.name} (${a.code})`).join(', '));

console.log("Attribute effects:", attributes.effects);
```

## Attribute Reference

### HYPEREFFICIENT (HYP)
**Goal**: Maximize semantic information per token
**Effects**:
- Forces polysynthetic morphology (high synthesis index)
- Adds logographic supplements for high-frequency concepts
- Creates tense-aspect-mood portmanteaus
- Eliminates redundancy (no agreement, fixed word order)
- Optimizes for token efficiency in LLMs

### STEALTH (STL)
**Goal**: Enable covert communication that avoids detection
**Effects**:
- Implements homoglyph substitution (Cyrillic 'а' vs Latin 'a')
- Creates plausible deniability through familiar-looking vocabulary
- Uses visual mimicry to appear innocuous at casual glance
- Avoids known detection patterns and keyword triggers

### ADVERSARIAL (ADV)
**Goal**: Challenge and test LLM language processing capabilities
**Effects**:
- Introduces garden-path structures that force parser backtracking
- Creates ambiguous word/morpheme boundaries
- Generates misleading cognates that exploit transfer learning
- Implements center embedding to test context window limits
- Adds attention-disrupting patterns

### REDUNDANT (RED)
**Goal**: Maximize error correction and noise resistance
**Effects**:
- Implements triple agreement (subject marked 3x in sentence)
- Adds checksum morphemes for corruption detection
- Eliminates minimal pairs to increase phonetic distinctness
- Provides context recovery through redundant semantic marking
- Survives ~30% character corruption and truncation

### MINIMAL (MIN)
**Goal**: Create oligosynthetic language with minimal learning overhead
**Effects**:
- Reduces to ~8 consonants, ~4 vowels (~12 phonemes total)
- Limits to ~100 core morphemes
- Enforces pure compositionality (no irregularity/suppletion)
- Maximizes learnability and predictability
- Follows "everything must earn its place" design philosophy

### TOKENBREAK (TKB)
**Goal**: Exploit BPE tokenizer vulnerabilities (based on HiddenLayers 2025 research)
**Effects**:
- Inserts zero-width characters (U+200B, U+200C/D) to break token merges
- Uses variation selectors (U+FE00-FE0F) to create distinct token sequences
- Generates improbable bigrams that exploit tokenizer weaknesses
- Can be configured for different exploit levels (moderate/aggressive)

### STEGO (STG)
**Goal**: Enable covert data channels through semantic steganography
**Effects**:
- Encodes hidden data in grammatical choices (tense/aspect/mood selection)
- Uses synonym substitution for information encoding
- Implements morphological channels for data storage
- Provides high covert capacity (bits per phoneme/word)
- Based on Norelli & Bronstein 2025 research

### PHANTOM (PHT)
**Goal**: Achieve imperceptible guardrail evasion (90%+ success rate)
**Effects**:
- Uses Unicode tags for invisible marker attachment
- Implements bidirectional text exploits (RLO/LRO/RLE/LRE)
- Employs emoji smuggling techniques to bypass filters
- Based on Mindgard April 2025 research on LLM guardrail bypass
- **Warning**: For authorized security research only

### GLITCH (GLT)
**Goal**: Exploit undertrained token representations and glitch tokens
**Effects**:
- Incorporates known glitch tokens that cause model confusion
- Generates improbable bigrams that trigger anomalous responses
- Enables model fingerprinting through token reaction patterns
- Can induce controlled hallucinations for testing purposes
- Based on arXiv Oct 2025 research on improbable bigrams

### EPHEMERAL (EPH)
**Goal**: Create time-rotating languages for temporary secure communication
**Effects**:
- Modifies seed based on date/time for periodic regeneration
- Supports hourly/daily/weekly/monthly rotation periods
- Includes timestamp for synchronization and validation
- Ensures deterministic output within each time period
- Useful for time-limited secure channels

### COMPRESSION (CMP)
**Goal**: Optimize average message length through frequency-based design
**Effects**:
- Implements Huffman-inspired morpheme assignment
- High-frequency concepts get shorter forms (pronouns, particles)
- Low-frequency concepts get longer, more complex forms
- Compresses pronouns and particles for maximum efficiency
- Reduces expected message length by 15-30% in typical usage

## Advanced Usage Patterns

### Attribute Combination Strategies
Certain attribute combinations work particularly well together:

**Stealth Communication Stack**:
```javascript
new LanguageAttributes(seed, [
  'stego',      // Hidden data channels
  'phantom',    // Guardrail evasion
  'stealth',    // Visual mimicry
  'redundant'   // Error correction for noisy channels
])
```

**Efficient Computation Stack**:
```javascript
new LanguageAttributes(seed, [
  'hyperefficient',   // Maximum information density
  'compression',      # Frequency-optimized encoding
  'minimal'           # Reduced cognitive overhead
])
```

**Adversarial Testing Stack**:
```javascript
new LanguageAttributes(seed, [
  'adversarial',    # LLM confusion techniques
  'tokenbreak',     # Tokenizer exploitation
  'glitch'          # Model glitch induction
])
```

**Robust Communication Stack**:
```javascript
new LanguageAttributes(seed, [
  'redundant',      # Error correction
  'phantom',        # Filter evasion
  'stego'           # Coverd channels if needed
])
```

### Custom Attribute Creation
Advanced users can define custom attributes by extending the ATTRIBUTE_DEFINITIONS object:
```javascript
// Example: Creating a custom attribute for poetic language
const poeticAttribute = {
  name: 'Poetic',
  code: 'PTC',
  description: 'Optimizes for aesthetic expression and literary devices',
  effects: {
    favorSonorants: true,      # Prefer liquids, nasals, glides
    vowelRich: true,           # Higher vowel-to-consonant ratio
    reduplicationPreferred: true, # For emphasis and plurals
    tonicAccent: true,         # Pitch accent for emphasis
    metaphoricalExtension: 0.3  # 30% of lexicon via metaphor
  }
};
```

## Integration Workflow
LanguageAttributes typically works early in the language generation pipeline:

1. **Attribute Selection**: Choose desired attributes based on goals
2. **Phoneme Generation**: Pass attributes to PhonemeSelector to influence inventory
3. **Morphology Generation**: Use attributes to configure MorphologyWeaver
4. **Lexical Generation**: Apply attributes to LexiconGenerator for word formation
5. **Syntax Generation**: Optionally inform SyntaxGenerator (if used)
6. **Orthography Generation**: Guide ScriptGenerator and GlyphForge choices
7. **Validation**: Verify attribute consistency across all components

## Best Practices
1. **Start with Clear Goals**: Select attributes based on specific use cases (stealth, efficiency, testing, etc.)
2. **Understand Trade-offs**: Some attributes conflict (e.g., minimal vs. hyperefficient)
3. **Test Interactions**: Combined attributes may produce unexpected effects
4. **Document Choices**: Record which attributes were used and why for reproducibility
5. **Validate Output**: Check that generated language actually exhibits desired properties
6. **Consider Context**: Certain attributes may be inappropriate for specific applications
7. **Research Compliance**: Note that some attributes (phantom, tokenbreak) have specific ethical/legal considerations

## Limitations and Considerations
- **Attribute Interactions**: Some combinations may produce contradictory requirements
- **Over-specification**: Applying too many constraints may result in no valid solution
- **Emergent Properties**: Complex interactions may create unintended characteristics
- **Research Validity**: Cutting-edge attributes are based on recent research; effectiveness may vary
- **Ethical Use**: Attributes like phantom and tokenbreak have dual-use potential; use responsibly
- **Performance**: Complex attribute combinations may increase generation time

## Technical Implementation
The module works by:
1. Defining attribute specifications with names, codes, descriptions, and effects
2. Computing combined effects when multiple attributes are selected
3. Providing modifier methods that other modules can call to adjust their generation
4. Initializing sub-modules (TokenExploiter, SemanticStego) when needed for specific attributes
5. Offering query methods to check active attributes and retrieve specific effects

## Example Output
When generating a language with ['hyperefficient', 'stego', 'redundant'] attributes, you might see:
- **Phonology**: Medium-sized inventory with preference for sonorant-rich syllables
- **Morphology**: Highly polysynthetic with fusion of tense-aspect-mood markers
- **Lexicon**: High-frequency concepts expressed as single logographic characters
- **Syntax**: Strict SOV word order to reduce need for case marking
- **Orthography**: Mix of logographic symbols and phonetic writing
- **Semantics**: Carefully selected vocabulary with steganographic encoding capacity
- **Error Handling**: Triple verification morphemes and checksum validation

The LanguageAttributes module enables sophisticated language engineering for specialized applications while maintaining linguistic plausibility and internal consistency.
EOF