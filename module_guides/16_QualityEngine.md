# 16_QualityEngine Module

## Overview
The QualityEngine module provides comprehensive quality assurance, validation, and enhancement features for constructed languages. It serves as a multifunctional toolkit that ensures linguistic robustness, interoperability, and usability through translation fallbacks, validation suites, portable export formats, quality metrics, and lexicon expansion capabilities.

## Core Concept
QualityEngine acts as a linguistic quality assurance system that validates language designs against typological norms, provides robust translation with fallback strategies, exports languages in multiple formats for interoperability, quantifies linguistic quality through multidimensional scoring, and enables incremental lexicon growth to address coverage gaps.

## Key Features

### 1. Translation Robustness & Fallbacks
- **Multi-strategy lookup**: Direct lexicon → cached generation → semantic similarity → on-the-fly generation → phonetic transcription
- **Confidence scoring**: Each translation attempt receives a confidence score (0.0-1.0)
- **Semantic fallback**: Uses semantic field mappings to find conceptually similar words
- **Phonetic transcription**: Last-resort adaptation of foreign words to language phonology
- **Result tracking**: Detailed metadata about source, confidence, and any substitutions made

### 2. Validation & Self-Testing Suite
- **Phoneme inventory validation**: Checks consonant/vowel counts and basic sound types
- **Syllable structure verification**: Validates phonotactic templates against linguistic universals
- **Morphological consistency**: Ensures case systems, verb paradigms, and word order are coherent
- **Lexicon coverage assessment**: Measures basic vocabulary and semantic domain representation
- **Translation round-trip testing**: Validates bidirectional translation integrity
- **Word generation testing**: Checks that lexicon entries conform to phonotactic rules
- **Agreement pattern validation**: Ensures morphosyntactic agreement is properly configured

### 3. Portable Export Formats
- **JSON-LD**: Semantic web format with RDFa/Schema.org integration
- **ConlangML**: XML-based language description standard
- **CSV**: Spreadsheet-compatible lexicon export
- **LaTeX**: Typeset grammar reference with IPA support
- **SIL Toolbox/FLEx**: Field linguist software compatibility
- **Compact format**: Ultra-condensed representation for LLM context embedding

### 4. Quality Metrics Dashboard
- **Phonological metrics**: Inventory size, sound diversity, typological naturalness
- **Morphological metrics**: Case/tense/aspect richness, word order consistency
- **Lexical metrics**: Vocabulary size, word class coverage, semantic diversity
- **Naturalness metrics**: Typological plausibility and frequency-based scoring
- **Usability metrics**: Translation availability, documentation, paradigm completeness
- **Overall scoring**: Weighted average with letter grade assignment (A+ to F)
- **Actionable recommendations**: Specific suggestions for improvement based on weak areas

### 5. Incremental Lexicon Expansion
- **Gap analysis**: Identifies missing core vocabulary across semantic domains
- **Smart generation**: Creates linguistically appropriate new words using fallback systems
- **POS inference**: Automatically predicts part-of-speech from word morphology
- **Field classification**: Assigns semantic domains based on lexical patterns
- **Batch processing**: Efficiently adds multiple related terms at once
- **Cache management**: Automatically invalidates quality metrics when lexicon changes

## Usage Example
```javascript
import { QualityEngine } from './src/modules/QualityEngine.js';
import { PhonemeSelector } from './src/modules/PhonemeSelector.js';
import { MorphologyWeaver } from './src/modules/MorphologyWeaver.js';
import { LexiconGenerator } from './src/modules/LexiconGenerator.js';
import { TranslationEngine } from './src/modules/TranslationEngine.js';

// Generate language components first
const phonemeSelector = new PhonemeSelector(42);
const phonemes = phonemeSelector.select();

const morphologyWeaver = new MorphologyWeaver(42, {
  phonemes: phonemes,
  type: 'agglutinative'
});

const lexiconGenerator = new LexiconGenerator(42, {
  semanticFields: ['Nature', 'HumanQualities', 'Kinship', 'Food'],
  phonemes: phonemes,
  morphology: morphologyWeaver.getMorphemes()
});

const language = {
  seed: 12345,
  name: 'TestLang',
  phonology: phonemeSelector.getPhonology(),
  lexicon: lexiconGenerator.generate(),
  morphology: morphologyWeaver.getMorphemes()
};

// Add translation engine for full quality assessment
language.translationEngine = new TranslationEngine(language);

// Create the quality engine
const qualityEngine = new QualityEngine(language);

// Run validation suite
console.log("Running language validation...");
const validationResults = qualityEngine.validate();
console.log(`Overall: ${validationResults.passed ? 'PASS' : 'FAIL'}`);
console.log(`Tests passed: ${validationResults.summary.passed}/${validationResults.summary.total}`);

if (validationResults.errors.length > 0) {
  console.log("Errors:");
  validationResults.errors.forEach(error => console.log(`  ✗ ${error}`));
}

if (validationResults.warnings.length > 0) {
  console.log("Warnings:");
  validationResults.warnings.forEach(warning => console.log(`  ⚠ ${warning}`));
}

// Get quality metrics dashboard
console.log("\nGenerating quality metrics...");
const metrics = qualityEngine.getMetrics();
console.log(`Overall Quality: ${metrics.overall}/100 (Grade: ${metrics.grade})`);
console.log("\nCategory Scores:");
for (const [category, data] of Object.entries(metrics.categories)) {
  console.log(`  ${category}: ${data.score}/100`);
}

if (metrics.recommendations.length > 0) {
  console.log("\nRecommendations:");
  metrics.recommendations.forEach((rec, i) => console.log(`  ${i+1}. ${rec}`));
}

// Export in multiple formats
console.log("\nExporting language...");
const jsonLd = qualityEngine.export('json-ld');
const csv = qualityEngine.export('csv');
const conlangml = qualityEngine.export('conlangml');

console.log(`JSON-LD export: ${jsonLd.length} characters`);
console.log(`CSV export: ${csv.length} characters`);
console.log(`ConlangML export: ${conlangml.length} characters`);

// Test translation robustness
console.log("\nTesting translation robustness...");
const testWords = ['computer', 'internet', 'democracy', 'quantum', 'robot'];
for (const word of testWords) {
  const result = qualityEngine.getWordWithFallback(word);
  console.log(`"${word}" → "${result.lemma}" (${result.source}, confidence: ${result.confidence.toFixed(2)})`);
  if (result.note) {
    console.log(`  Note: ${result.note}`);
  }
}

// Expand lexicon to fill gaps
console.log("\nExpanding lexicon...");
const missingWords = qualityEngine.suggestExpansions().slice(0, 5);
const newWords = qualityEngine.expandLexicon(missingWords.map(w => w.word));
console.log(`Added ${newWords.length} new words to lexicon:`);
newWords.forEach(word => {
  console.log(`  ${word.lemma} → "${word.gloss}" (${word.class}) [${word.source}]`);
});

// Re-check metrics after expansion
const updatedMetrics = qualityEngine.getMetrics();
console.log(`\nUpdated quality: ${updatedMetrics.overall}/100 (Grade: ${updatedMetrics.grade})`);
```

## Configuration Options
QualityEngine requires a language object with these properties:
- `language.seed`: Numeric seed for deterministic generation
- `language.name`: Language identifier
- `language.phonology`: Object containing consonants and vowels arrays
- `language.lexicon`: Object with lookup(), getEntries(), stats, and optionally addEntry() methods
- `language.morphology`: Object containing nominal.caseSystem and verbal.tenses/aspects
- `language.phonotactics`: Object with syllable template (optional but recommended)
- `language.translationEngine`: TranslationEngine instance (optional but recommended for full features)

## Detailed Feature Explanations

### Translation Robustness System
The fallback strategy employs five progressively less certain methods:
1. **Direct lookup**: Exact match in lexicon (confidence: 1.0)
2. **Cached generation**: Previously generated words (confidence: 0.5-0.8)
3. **Semantic fallback**: Conceptually similar words from semantic fields (confidence: 0.5-0.7)
4. **On-the-fly generation**: Phonotactically sound novel words (confidence: 0.3-0.5)
5. **Phonetic transcription**: Sound-by-sound adaptation (confidence: 0.1-0.3)

Each strategy includes detailed metadata about the transformation process, allowing users to trace how translations were derived.

### Validation Test Suite
The seven validation tests cover critical linguistic domains:

1. **Phoneme Inventory**: Checks for minimum consonant (≥8) and vowel (≥3) counts, plus basic sound types (stops, nasals)
2. **Syllable Structure**: Validates phonotactic template parameters against universal constraints
3. **Morphological Consistency**: Verifies case systems include unmarked cases, validates word order, checks tense/aspect systems
4. **Lexicon Coverage**: Ensures sufficient vocabulary size (>100 entries) and basic word coverage
5. **Translation Round-Trip**: Tests bidirectional translation integrity on simple sentences
6. **Word Generation**: Confirms lexicon entries conform to phonotactic rules
7. **Agreement Patterns**: Validates that morphological agreement is properly configured when present

Each test returns pass/warn/fail status with descriptive messages for troubleshooting.

### Export Format Capabilities
Each format serves different interoperability needs:

**JSON-LD**:
- Semantic web integration with proper ontology mapping
- Enables RDF querying and knowledge graph applications
- Includes rich linguistic feature structures
- Compatible with LOD (Linked Open Data) cloud

**ConlangML**:
- Standardized XML format for language description
- Facilitates exchange between language creation tools
- Human-readable and machine-processable
- Supports hierarchical linguistic feature organization

**CSV**:
- Universal spreadsheet compatibility
- Simple lemma-gloss-POS-field structure
- Easy import into linguistic databases and lexicon tools
- Supports paradigm information in extended format

**LaTeX**:
- Publication-ready grammar references
- Proper IPA encoding via tipa package
- Structured sections for phonology, morphology, lexicon
- Bibliographic metadata and professional formatting

**SIL Toolbox/FLEx**:
- Direct import into field linguist software
- Enables collaboration with linguistic fieldworkers
- Supports interlinear glossing and text parsing
- Standard format for language documentation projects

**Compact Format**:
- Minimal representation for LLM context windows
- Preserves essential structural information
- Enables efficient transmission between agents
- Balances completeness with token efficiency

### Quality Metrics Framework
The multidimensional scoring system evaluates:

**Phonology (15%)**:
- Consonant inventory size (ideal: 15-25)
- Vowel inventory size (ideal: 5-7)
- Manners and places of articulation diversity

**Morphology (20%)**:
- Case system size (ideal: 2-8)
- Tense and aspect inventory
- Word order typological correctness

**Lexicon (25%)**:
- Total vocabulary size
- Part-of-speech distribution
- Semantic field coverage
- Basic vocabulary completeness

**Naturalness (20%)**:
- Word order frequency preferences
- Case-order correlations
- Phonological simplicity and common sounds
- Syllable structure constraints

**Usability (20%)**:
- Translation engine availability
- Lexical accessibility features
- Documentation completeness (Stone documents)
- Paradigm coverage for inflection

Scores are combined into a 0-100 scale with letter grades:
- A+: 90-100 (Exceptional)
- A: 85-89 (Excellent)
- A-: 80-84 (Very Good)
- B+: 75-79 (Good)
- B: 70-74 (Satisfactory)
- B-: 65-69 (Acceptable)
- C+: 60-64 (Needs Improvement)
- C: 55-59 (Fair)
- C-: 50-54 (Poor)
- D: 45-49 (Minimal)
- F: <45 (Unsatisfactory)

### Lexicon Expansion System
Expansion follows a principled approach:

**Gap Identification**:
- Compares lexicon against core vocabulary lists
- Identifies missing semantic domains
- Prioritizes basic and high-frequency terms

**Smart Generation**:
- Uses the same fallback system as translation
- Infers part-of-speech from morphological cues
- Assigns semantic fields based on word meaning patterns
- Ensures phonotactic compatibility

**Integration**:
- Adds words to lexicon if API supports it
- Maintains generation metadata for provenance
- Invalidates cached metrics to ensure freshness
- Provides detailed source tracking for transparency

## Integration Points
QualityEngine integrates with nearly all other GLOSSOPETRAE modules:

- **PhonemeSelector**: Provides phonological inventory for validation
- **SyllableForge**: Supplies phonotactic templates for syllable structure checks
- **GlyphForge/ScriptGenerator**: Informs orthographic considerations in usability metrics
- **MorphologyWeaver**: Source of morphological systems for validation and metrics
- **LexiconGenerator**: Provides baseline lexicon for expansion and quality assessment
- **TranslationEngine**: Enables round-trip testing and usability scoring
- **NameForge**: Validates that generated names conform to language phonology
- **AudioForge**: Uses phonological data for pronunciation accuracy in export
- **ProsodyEngine**: Validates suprasegmental features in naturalness metrics
- **CodeForge**: Checks that generated programming languages meet quality thresholds
- **Exporter**: Shares export format implementations and standards
- **StoneGenerator**: Provides LLM-ready documents for usability assessment

## Best Practices
1. **Early Validation**: Run validation after each major language component generation
2. **Iterative Refinement**: Use metrics and recommendations to guide improvement cycles
3. **Format Selection**: Choose export format based on intended use case (research, publishing, fieldwork)
4. **Fallback Awareness**: Understand confidence scores when relying on translation fallbacks
5. **Expansion Strategy**: Prioritize high-impact vocabulary gaps identified by suggestion system
6. **Regular Reassessment**: Re-run metrics after significant language modifications
7. **Cross-Module Consistency**: Ensure all modules use the same language seed for coherence
8. **Documentation Generation**: Use LaTeX or ConlangML exports for formal language documentation
9. **Fieldworker Compatibility**: Consider SIL format when collaborating with linguists
10. **LLM Optimization**: Use compact format when integrating with language agents

## Example Outputs
### Validation Results
```
Running language validation...
Overall: PASS
Tests passed: 6/7

Warnings:
  Phoneme Inventory: Only 12 consonants (minimum 8 recommended) - Consider adding more consonants for richer phonology
  Lexicon Coverage: Only 180 entries (200+ recommended) - Missing basic words: quantum, internet, robot
  Translation Round-Trip: 2/3 translations successful
```

### Quality Metrics
```
Overall Quality: 78/100 (Grade: C+)

Category Scores:
  phonology: 65/100
  morphology: 82/100
  lexicon: 75/100
  naturalness: 85/100
  usability: 75/100

Recommendations:
  1. Consider adding more consonants for richer phonology
  2. Consider adding more consonant manner types (stops, fricatives, nasals, approximants)
  3. Expand lexicon to at least 200 entries
  4. Add vocabulary from more semantic domains
  5. Generate a Stone document for LLM context
```

### Export Samples
**JSON-LD Snippet**:
```json
{
  "@context": {
    "@vocab": "http://www.w3.org/ns/lemon/",
    "ontolex": "http://www.w3.org/ns/lemon/ontolex#",
    "lexinfo": "http://www.lexinfo.net/ontology/2.0/lexinfo#",
    "glossopetrae": "https://glossopetrae.dev/ontology#"
  },
  "@type": "ontolex:Lexicon",
  "@id": "glossopetrae:TestLang",
  "glossopetrae:seed": 12345,
  "language": "TestLang",
  "phonology": {
    "consonants": [
      {"ipa": "p", "romanization": "p", "features": {"manner": "plosive", "place": "bilabial", "voiced": false}},
      {"ipa": "t", "romanization": "t", "features": {"manner": "plosive", "place": "alveolar", "voiced": false}}
    ],
    "vowels": [
      {"ipa": "a", "romanization": "a", "features": {"height": "low", "backness": "front", "rounded": false}},
      {"ipa": "i", "romanization": "i", "features": {"height": "high", "backness": "front", "rounded": false}}
    ]
  },
  "morphology": {
    "type": "agglutinative",
    "wordOrder": "SOV",
    "alignment": "nominative-accusative",
    "cases": [
      {"name": "nominative", "abbr": "NOM", "suffix": "∅", "function": "subject of intransitive transitive"},
      {"name": "accusative", "abbr": "ACC", "suffix": "-m", "function": "direct object"}
    ]
  },
  "entries": [
    {
      "@type": "ontolex:LexicalEntry",
      "canonicalForm": {"writtenRep": "sola"},
      "sense": {"definition": "sun"},
      "lexinfo:partOfSpeech": "noun",
      "glossopetrae:field": "nature"
    }
  ]
}
```

**ConlangML Snippet**:
```xml
<conlang xmlns="http://conlangml.org/schema/1.0" name="TestLang" seed="12345">
  <phonology>
    <consonants>
      <phoneme ipa="p" romanization="p" manner="plosive" place="bilabial" voiced="false"/>
      <phoneme ipa="t" romanization="t" manner="plosive" place="alveolar" voiced="false"/>
    </consonants>
    <vowels>
      <phoneme ipa="a" romanization="a" height="low" backness="front"/>
      <phoneme ipa="i" romanization="i" height="high" backness="front"/>
    </vowels>
  </phonology>
  <morphology type="agglutinative" wordOrder="SOV">
    <cases>
      <case name="nominative" abbr="NOM" suffix="∅"/>
      <case name="accusative" abbr="ACC" suffix="-m"/>
    </cases>
    <tenses>
      <tense name="present" abbr="PRES" suffix="∅"/>
      <tense name="past" abbr="PAST" suffix="-ta"/>
    </tenses>
  </morphology>
  <lexicon count="185">
    <entry lemma="sola" gloss="sun" pos="noun" field="nature"/>
    <entry lemma="luna" gloss="moon" pos="noun" field="nature"/>
  </lexicon>
</conlang>
```

**CSV Snippet**:
```
lemma,gloss,pos,field,paradigm
sola,sun,noun,nature,
luna,moon,noun,nature,
akwa,water,noun,nature,
ignis,fire,noun,nature,
terra,earth,noun,nature,
```

### Translation Fallback Examples
```
"computer" → "komputar" (generated, confidence: 0.45)
  Note: Generated new word for "computer"

"internet" → "jáló" (semantic-fallback, confidence: 0.65)
  Note: Substituted "network" for "internet"

"quantum" → "kwantum" (phonetic-transcription, confidence: 0.25)
  Note: Phonetically adapted from English

"democracy" → "demokrasi" (lexicon, confidence: 1.0)
```

The QualityEngine module provides a comprehensive framework for ensuring constructed language games but fully functional communication systems that meet linguistic standards, interoperate with external tools, and can be continuously improved through data-driven refinement.