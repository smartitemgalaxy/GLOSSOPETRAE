# 17_ReverseTranslator Module

## Overview
The ReverseTranslator module decodes text in the generated language back into English. It serves as the inverse of the TranslationEngine.translateToConlang() function, inverting the engine's actual output (including inflection order, word order transformations, particle placement, and transliteration of unknown words) rather than working from a theoretical grammar.

## Core Concept
While the TranslationEngine handles English-to-conlang translation, the ReverseTranslator handles conlang-to-English translation. It uses sophisticated linguistic analysis to:
1. Map every precomputed paradigm form of every lexicon entry back to its linguistic components
2. Segment unknown morphemes through iterative suffix stripping
3. Decode syntactic structure to recover English word order
4. Produce Leipzig-style interlinear gloss output
5. Support round-trip translation quality scoring

The ReverseTranslator is zero-dependency, pure ESM, and deterministic - given the same input, it will always produce the same output.

## Key Features

### 1. Comprehensive Analysis Pipeline
- **Index Construction**: Maps every inflected form to its lemma, gloss, and parse information
- **Morpheme Segmentation**: Uses iterative suffix stripping against affix inventory for unknown forms
- **Syntactic Decoding**: Recovers grammatical roles (subject, object, etc.) from case markers and word order
- **Gloss Generation**: Produces standard interlinear gloss format with surface form, morphological analysis, and gloss

### 2. Intelligent Disambiguation
- **Contextual Reranking**: Resolves ambiguities between similar forms (e.g., inflected verb vs. noun lemma)
- **Verb Clause Detection**: Ensures proper verb assignment in multi-clause sentences
- **Adjective Agreement**: Uses language-specific adjective placement rules for modification detection
- **Coordination Handling**: Properly identifies coordinated noun phrases and verb phrases

### 3. Robust Unknown Word Handling
- **Dynamic Cache Integration**: Tracks transliterations generated during runtime
- **Function Word Seeding**: Pre-loads common English function words for better unknown word recognition
- **Transliteration Mapping**: Recognizes engine-generated loanwords and proper nouns

### 4. Quality Assessment Features
- **Round-trip Translation**: Enables English → conlang → English cycles with lexical recovery scoring
- **Confidence Scoring**: Provides confidence metrics for each word analysis
- **Alternative Analyses**: Returns top alternative parses for ambiguous forms
- **Unknown Word Tracking**: Lists words that couldn't be confidently translated

### 5. Leipzig Gloss Standards
- **Morpheme-by-morpheme Alignment**: Clear separation of stems and affixes
- **Standard Abbreviations**: Uses established linguistic glossing conventions
- **Unicode Support**: Proper handling of special linguistic characters
- **Readable Formatting**: Proper alignment and spacing for linguistic analysis

## Technical Implementation

### Data Structures
- **Form Index**: Maps surface forms to linguistic analyses (lemma, parse, affixes)
- **Lemma Index**: Maps lemmas to their lexicon entries for validation
- **Affix Inventory**: Sorted list of affixes for stripping (longest-first)
- **Transliteration Maps**: Bidirectional mapping between English function words and their transliterations
- **Abbreviation Tables**: Maps morphological abbreviations to their full forms

### Algorithms
1. **Index Construction** (_buildFormIndex):
   - Iterates through all lexicon entries
   - Adds bare lemmas and all precomputed paradigm forms
   - Includes morphology-level adpositions
   - Stores source information and confidence scoring

2. **Morpheme Segmentation** (_segmentCandidates):
   - Iterative suffix stripping from longest to shortest affix
   - Validates remaining stems against lemma index
   - Handles transliteration map lookups
   - Returns multiple candidate analyses ranked by confidence

3. **Sentence Processing** (_decodeSentence):
   - Tokenizes input into words
   - Classifies each word by part-of-speech function
   - Applies contextual disambiguation rules
   - Splits into clauses based on conjunctions and verb presence
   - Builds noun phrases and verb phrases according to language syntax
   - Assigns grammatical roles (subject, object, etc.)
   - Renders English output with proper morphology

4. **Contextual Disambiguation** (_rerankInContext):
   - Demotes surplus verb readings that have viable non-verb alternatives
   - Promotes adjective readings when adjacent to nouns per language-specific positioning
   - Uses configurable margin (default 12 points) for score differences

### Linguistic Knowledge Integration
The ReverseTranslator deeply integrates with the language's grammatical structure:
- **Case Systems**: Uses case markers to identify grammatical roles (ERG→subject, ABS→object, etc.)
- **Number Systems**: Handles singular, dual, paucal, plural distinctions
- **Tense/Aspect/Mood**: Recognizes temporal and modal markings
- **Agreement**: Tracks subject-verb and noun-adjective agreement
- **Word Order**: Recovers underlying syntactic structure from surface order
- **Alignment Systems**: Supports nominative-accusative, ergative-absolutive, and active-stative alignments
- **Adposition Types**: Handles prepositions, postpositions, and inpositions
- **Modifier Order**: Respects language-specific adjective, genitive, and relative clause placement

## Usage Examples

### Basic Translation
```javascript
import { ReverseTranslator } from './src/modules/ReverseTranslator.js';

// Assuming 'language' object has been generated with all components
const reverseTranslator = new ReverseTranslator(language);

// Translate conlang text to English
const result = reverseTranslator.translateToEnglish("sola-luna-ta");
console.log(result.english);      // "The sun and moon were."
console.log(result.gloss);
// Output format:
// sola-luna-ta
// sola-luna-ta
// SUN-MOON-PAST

// Access detailed word analysis
result.words.forEach(word => {
  console.log(`Surface: ${word.surface}`);
  console.log(`Lemma: ${word.parse.lemma}`);
  console.log(`Gloss: ${word.parse.gloss}`);
  console.log(`Affixes: ${JSON.stringify(word.parse.affixes)}`);
  console.log(`Confidence: ${word.confidence}`);
});

// Handle unknown words
if (result.unknownWords.length > 0) {
  console.log(`Unknown words: ${result.unknownWords.join(', ')}`);
}
```

### Word Segmentation Analysis
```javascript
// Analyze a single word's morphological structure
const analysis = reverseTranslator.segment("solatamu");
console.log(analysis);
/*
{
  surface: "solatamu",
  stem: "sol",
  lemma: "sol",
  gloss: "SUN",
  class: "noun",
  affixes: [
    { form: "a", meaning: "DU" },   // dual number
    { form: "ta", meaning: "PAST" } // past tense
  ],
  parse: { stem: "sol", lemma: "sol", gloss: "SUN", affixes: [...] },
  confidence: 0.85,
  alternatives: [ /* alternative parses */ ]
}
*/
```

### Round-trip Translation Quality Assessment
```javascript
// Requires translation engine to be present in language object
if (language.translationEngine) {
  const rtResult = reverseTranslator.roundTrip("The quick brown fox jumps over the lazy dog");
  
  console.log(`Original: ${rtResult.english}`);
  console.log(`Generated: ${rtResult.conlang}`);
  console.log(`Back-translated: ${rtResult.back}`);
  console.log(`Lexical Match Rate: ${(rtResult.lexicalMatchRate * 100).toFixed(1)}%`);
  
  // A score of 1.0 indicates perfect lexical recovery
  // Lower scores indicate lexical gaps or translation discrepancies
}
```

### Integration with Other Modules
```javascript
// Typical workflow with other GLOSSOPETRAE modules
import { PhonemeSelector } from './src/modules/PhonemeSelector.js';
import { SyllableForge } from './src/modules/SyllableForge.js';
import { MorphologyWeaver } from './src/modules/MorphologyWeaver.js';
import { LexiconGenerator } from './src/modules/LexiconGenerator.js';
import { TranslationEngine } from './src/modules/TranslationEngine.js';
import { ReverseTranslator } from './src/modules/ReverseTranslator.js';
import { QualityEngine } from './src/modules/QualityEngine.js';

// 1. Generate phonology
const phonemeSelector = new PhonemeSelector(42);
const phonemes = phonemeSelector.select();

// 2. Establish phonotactics
const syllableForge = new SyllableForge(phonemes);
const syllableTemplate = syllableForge.forge();

// 3. Build morphology
const morphologyWeaver = new MorphologyWeaver(42, {
  phonemes: phonemes,
  type: 'agglutinative'
});

// 4. Generate lexicon
const lexiconGenerator = new LexiconGenerator(42, {
  semanticFields: ['Nature', 'HumanQualities', 'Food', 'Technology'],
  phonemes: phonemes,
  morphology: morphologyWeaver.getMorphemes()
});

// 5. Create translation capability
const translationEngine = new TranslationEngine({
  seed: 12345,
  name: 'TestLang',
  phonology: phonemeSelector.getPhonology(),
  lexicon: lexiconGenerator.generate(),
  morphology: morphologyWeaver.getMorphemes()
});

// 6. Create reverse translator
const reverseTranslator = new ReverseTranslator({
  seed: 12345,
  name: 'TestLang',
  phonology: phonemeSelector.getPhonology(),
  lexicon: lexiconGenerator.generate(),
  morphology: morphologyWeaver.getMorphemes(),
  translationEngine: translationEngine
});

// 7. Quality assurance
const qualityEngine = new QualityEngine({
  seed: 12345,
  name: 'TestLang',
  phonology: phonemeSelector.getPhonology(),
  lexicon: lexiconGenerator.generate(),
  morphology: morphologyWeaver.getMorphemes(),
  translationEngine: translationEngine
});

// 8. Test bidirectional translation
const testSentence = "The sun warms the earth";
const forward = translationEngine.translateToConlang(testSentence);
const backward = reverseTranslator.translateToEnglish(forward.target);

console.log(`Forward:  ${testSentence} → ${forward.target}`);
console.log(`Backward: ${forward.target} → ${backward.english}`);
console.log(`Gloss:\n${backward.gloss}`);
```

## Configuration Requirements

The ReverseTranslator requires a language object with these properties:

- `language.lexicon`: Object with `lookup()` and `getEntries()` methods
- `language.morphology`: Object containing:
  - `nominal`: caseSystem, numberSystem, genderSystem
  - `verbal`: tenses, aspects, moods, agreement system
  - `wordOrder`: basic word order and adjective position
  - `alignment`: syntactic alignment system (nominative-accusative, ergative-absolutive, etc.)
- `language.translationEngine` (optional but recommended): TranslationEngine instance for unknown word handling and round-trip testing

## Detailed Component Breakdown

### Index Construction Subsystem
The foundation of the ReverseTranslator is its comprehensive form index:

1. **Lemma Indexing**: Every lexicon entry's base form is mapped to its entry
2. **Paradigm Indexing**: All precomputed inflected forms are mapped to their analyses
3. **Adposition Indexing**: Morphology-level adpositions are included as valid vocabulary
4. **Source Tracking**: Each entry records whether it came from lemma, paradigm, or other sources
5. **Confidence Scoring**: Initial scores based on source reliability and affix count

### Morpheme Segmentation Engine
For words not found in the precomputed index:

1. **Suffix Stripping**: Iteratively removes affixes from longest to shortest
2. **Stem Validation**: Checks remaining stem against lemma index
3. **Transliteration Fallback**: Checks against known English word transliterations
4. **Candidate Ranking**: Scores candidates by source reliability, stem length, and alphabetical order
5. **Alternative Generation**: Returns top 4 analyses for disambiguation

### Syntactic Analysis Pipeline
Transforms morphological analysis into syntactic structure:

1. **Token Classification**: Assigns each word to a functional role (verb, noun, adjective, etc.)
2. **Contextual Reranking**: Applies linguistic heuristics to resolve ambiguities
3. **Clause Segmentation**: Identifies clause boundaries using conjunctions and verb presence
4. **Phrase Structure Building**: Constructs noun phrases and verb phrases
5. **Role Assignment**: Maps grammatical cases to syntactic functions (subject, object, etc.)
6. **Realization**: Generates fluent English output with proper morphology

### Unknown Word Handling
Sophisticated handling of out-of-vocabulary items:

1. **Dynamic Cache Integration**: Tracks words translated during runtime sessions
2. **Function Word Seeding**: Pre-loads 60+ common English function words (modifiers, modals, etc.)
3. **Pattern Recognition**: Identifies common affixation patterns in unknowns
4. **Transliteration Mapping**: Recognizes engine-generated approximations of English words
5. **Fallback Representation**: Uses angle brackets ‹word› for unrecognized forms

### Gloss Generation System
Produces standard linguistic interlinear glosses:

1. **Surface Line**: Original word forms
2. **Morphological Analysis**: Stem-affix boundaries with affix forms
3. **Gloss Line**: morpheme-by-morpheme translations with grammatical notation
4. **Proper Alignment**: Monospace-friendly spacing for clear correspondence
5. **Special Marking**: Angle brackets for transliterations, question marks for unknowns

## Best Practices

### 1. Language Object Preparation
- Ensure all language components are generated with the same seed
- Include translation engine for full functionality
- Verify lexicon has sufficient coverage for expected texts
- Validate morphology system is internally consistent

### 2. Performance Optimization
- Reuse ReverseTranslator instances for multiple translations
- Consider caching results for frequently translated texts
- Monitor unknown word rates to identify lexicon gaps
- Use round-trip testing to evaluate translation quality

### 3. Quality Assurance
- Run validation suite to check linguistic consistency
- Test with known phrases to verify round-trip integrity
- Check gloss output for proper morphological segmentation
- Verify unknown word handling doesn't overwhelm actual vocabulary

### 4. Advanced Usage
- Leverage alternative analyses for ambiguity resolution
- Use confidence scores to weight translation reliability
- Examine unknown words for systematic gaps in lexicon
- Apply part-of-speech tags for downstream NLP applications

## Integration Points

The ReverseTranslator integrates with nearly all other GLOSSOPETRAE modules:

- **PhonemeSelector**: Validates that segmented forms respect phonotactics
- **SyllableForge**: Ensures morpheme boundaries align with syllable structure
- **MorphologyWeaver**: Provides the morphological systems being decoded
- **LexiconGenerator**: Supplies the lexical entries being looked up
- **TranslationEngine**: Enables round-trip testing and unknown word handling
- **NameForge**: Helps recognize translated proper nouns
- **AudioForge**: Uses phonological data for pronunciation hints (indirect)
- **ProsodyEngine**: Informs about potential phonological processes
- **ScriptGenerator**: Relates to transliteration choices (when applicable)
- **CodeForge**: Shares similar principles of deterministic generation
- **DeadLanguageReviver**: Can decode resurrected languages
- **DivergenceEngine**: Helps understand typological basis of features being decoded
- **EvolutionEngine**: Assists in detecting historical layers in language
- **QualityEngine**: Validates the linguistic soundness of decoded material
- **Exporter**: Shares export format implementations
- **StoneGenerator**: Provides LLM-ready documents that include translation capabilities

## Limitations & Considerations

### Known Constraints
- **Ambiguity Inheritance**: Some ambiguities in the source language cannot be resolved
- **Poetry/License**: Creative language use may defeat standard parsing rules
- **Code-switching**: Mixed-language passages may confuse the analyzer
- **Neologisms**: Completely novel constructions may require manual interpretation
- **Orthographic Variants**: Different spelling conventions may affect recognition
- **Dialectal Variation**: May not handle all variants of a language dialect

### Performance Factors
- **Lexicon Size**: Larger lexicons increase index size but improve coverage
- **Morphological Complexity**: More affixes increase segmentation complexity
- **Syntactic Flexibility**: Freer word orders increase parsing ambiguity
- **Affix Homophony**: Identical affix forms with different meanings create ambiguity
- **Zero Morphemes**: Lack of overt marking can hinder analysis

### Quality Thresholds
- **Excellent**: >90% lexical recovery, clear gloss, confident parses
- **Good**: 75-90% recovery, minor ambiguities resolvable from context
- **Fair**: 50-75% recovery, requires contextual interpretation
- **Poor**: <50% recovery, suggests fundamental mismatches in language model

## Error Handling & Edge Cases

### Graceful Degradation
- Unknown words are marked with ‹word› notation rather than failing
- Ambiguous parses return highest-confidence analysis with alternatives
- Missing grammatical information defaults to most common values
- Malformed input is handled through standard string processing

### Validation Boundaries
- Empty strings return empty results without error
- Non-string inputs are converted to strings
- Punctuation-only inputs produce appropriate punctuation handling
- Whitespace-only inputs treated as empty

### Diagnostic Capabilities
- **unknownWords array**: Identifies vocabulary gaps
- **confidence scores**: Flags low-reliability translations
- **alternative analyses**: Shows ambiguity in word parsing
- **round-trip scoring**: Measures overall translation fidelity
- **gloss output**: Reveals morphological analysis quality

## Applications

### Linguistic Research
- **Decipherment Studies**: Testing hypotheses about unknown languages
- **Typological Analysis**: Comparing structural features across languages
- **Historical Linguistics**: Modeling sound changes and grammaticalization
- **Fieldwork Assistance**: Providing instant back-translation for elicitation
- **Corpus Linguistics**: Enabling searchable parallel corpora

### Language Technology
- **Machine Translation**: Rule-based component in hybrid MT systems
- **Language Learning**: Bidirectional dictionaries and exercise generation
- **Natural Language Processing**: Morphological analysis and parsing
- **Speech Processing**: Pronunciation dictionaries and grapheme-to-phoneme conversion
- **Information Retrieval**: Stemming and lemmatization for search

### Educational Uses
- **Linguistics Courses**: Teaching morphological analysis and glossing
- **Language Classes**: Vocabulary building and grammar exercises
- **Computational Linguistics**: Demonstrating rule-based language processing
- **Cognitive Science**: Modeling human language processing mechanisms
- **Historical Studies**: Reconstructing ancient languages from fragments

### Creative & Recreational
- **Worldbuilding**: Creating authentic-feeling languages for fiction
- **Game Design**: Developing linguistic puzzles and communication systems
- **Art Projects**: Exploring constructed languages as artistic media
- **Escape Rooms**: Linguistic challenges requiring language acquisition
- **ARG Design**: Embedding linguistic clues in alternate reality games

## Example Output Analysis

### Simple Sentence
```
Input:  "solatamu"
Output:
solatamu
sol-a-ta
SUN-DU-PAST
Words: [{surface: "solatamu", stem: "sol", lemma: "sol", gloss: "SUN", affixes: [...], confidence: 0.85}]
English: "The two suns were."
```

### Complex Sentence with Unknown Word
```
Input:  "solatamu komputer-ta"
Output:
solatamu      komputer-ta
sol-a-ta      kompu-ter-ta
SUN-DU-PAST   COMPUTER-PAST
Words: [
  {surface: "solatamu", ... , confidence: 0.85},
  {surface: "komputer-ta", stem: "komputer", lemma: null, gloss: "COMPUTER", affixes: [...], confidence: 0.3}
]
Unknown Words: ["komputer-ta"]
English: "The two suns were computer." (with "computer" marked as transliteration)
```

### Clause Coordination
```
Input:  "solatamu ka luna-ta"
Output:
solatamu ka luna-ta
sol-a-ta    ka    luna-ta
SUN-DU-PAST and   MOON-PAST
Words: [...]
English: "The two suns and the two moons were."
Gloss shows coordination handling with "ka" analyzed as conjunction
```

### Ergative-Absolutive Alignment
```
Input:  "sola-luna-erg abs-ta"
Output:
sola-luna-erg abs-ta
sol-luna-erg   abs-ta
SUN-MOON-ERG   ABS-PAST
Words: [...]
English: "The sun saw the moon." (ergative case marks agent, absolutive marks patient)
```

The ReverseTranslator represents a sophisticated bidirectional bridge between English and constructed languages, enabling not just translation but deep linguistic analysis and quality assessment. By inverting the TranslationEngine's actual output rather than working from theoretical grammars, it provides accurate, actionable feedback for language designers and researchers alike.