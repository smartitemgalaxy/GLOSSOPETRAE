# 09_DeadLanguageReviver Module

## Overview
The DeadLanguageReviver module resurrects and mutates historical languages to provide authentic linguistic foundations for conlang generation. It incorporates real typological data from attested ancient languages and provides algorithms for simulating linguistic evolution, allowing creators to build languages with historical plausibility or imaginative alternatives.

## What It Does
- Provides linguistic templates for 12+ ancient and historical languages
- Offers multiple revival modes (authentic, neo, mutated, hybrid, speculative)
- Simulates sound changes, grammatical drift, and semantic evolution
- Generates authentic-sounding vocabulary based on historical roots
- Models language family relationships and borrowing patterns
- Creates plausible intermediate stages in language development
- Provides corpus-style sample texts and phrases

## Supported Languages
The module includes authentic data for:
- **Latin** (Classical, Vulgar) - Italic branch of Indo-European
- **Ancient Greek** (Attic, Koine, Homeric) - Hellenic branch
- **Sanskrit** (Vedic, Classical) - Indo-Iranian branch
- **Gothic** - East Germanic
- **Old English** (Anglo-Saxon) - West Germanic
- **Old Norse** - North Germanic
- **Proto-Indo-European** (reconstructed)
- **Sumerian** - Language isolate
- **Akkadian** - Semitic
- **Ancient Egyptian** - Afro-Asiatic
- **Biblical Hebrew** - Semitic
- **Classical Chinese** (Literary) - Sino-Tibetan

## Revival Modes
1. **Authentic**: Faithful reconstruction based on attested evidence
2. **Neo**: Modern adaptation with contemporary vocabulary (like Modern Hebrew)
3. **Mutated**: Applies regular sound changes and grammatical drift
4. **Hybrid**: Combines elements from different language families
5. **Speculative**: Imagines how the language might have evolved if it survived

## Usage Example
```javascript
import { DeadLanguageReviver } from './src/modules/DeadLanguageReviver.js';
import { PhonemeSelector } from './src/modules/PhonemeSelector.js';

// Initialize the reviver
const reviver = new DeadLanguageReviver();

// Get a specific ancient language template
const latinTemplate = reviver.getLanguage('latin');
console.log(`Latin phonology:`, latinTemplate.phonology);
console.log(`Latin cases:`, latinTemplate.morphology.cases.map(c => `${c.name} (${c.abbr})`));

// Generate Latin-inspired vocabulary
const latinWords = reviver.generateVocabulary('latin', {
  count: 20,
  minLength: 3,
  maxLength: 8,
  theme: ['agriculture', 'family', 'nature']
});
console.log("Generated Latin-style words:", latinWords);

// Apply evolutionary changes
const evolvedLatin = reviver.evolveLanguage('latin', {
  timeDepth: 1000,           // Years of evolution
  soundChanges: [            // Custom sound changes
    { pattern: 't', replacement: 'θ', environment: '_V' },  // t -> theta between vowels
    { pattern: 's', replacement: 'h', environment: '_#' }   // s -> h word-finally
  ],
  lexicalInnovation: 0.3     // 30% new vocabulary
});

// Create a "Neo-Latin" for modern use
const neoLatin = reviver.revive('latin', {
  mode: 'neo',
  modernConcepts: ['computer', 'internet', 'democracy'],
  grammaticalSimplification: 0.4  // Reduce complexity by 40%
});

// Generate text in the revived language
const sampleText = reviver.generateText('neo-latin', {
  length: 5,           // Number of sentences
  style: 'narrative',
  formality: 'formal'
});
console.log("Sample Neo-Latin text:", sampleText);
```

## Core Methods

### Language Retrieval
```javascript
// Get template data for a specific language
const langData = reviver.getLanguage('languageCode');
// Returns: {name, code, family, era, description, phonology, morphology, sampleRoots, ...}

// List all available languages
const languages = reviver.listLanguages();
// Returns: ['latin', 'ancientGreek', 'sanskrit', 'gothic', ...]
```

### Vocabulary Generation
```javascript
// Generate words based on linguistic patterns
const words = reviver.generateVocaulary(options);
// Options:
//   language: string (required)
//   count: number (default: 10)
//   minLength/maxLength: number
//   theme: array of semantic domains
//   complexity: 'simple'|'moderate'|'complex'
//   includeParticles: boolean
```

### Language Evolution
```javascript
// Simulate historical language change
const evolved = reviver.evolveLanguage(sourceLang, options);
// Options:
//   timeDepth: number (years)
//   soundChanges: array of {pattern, replacement, environment}
//   lexicalInnovation: number (0-1)
//   grammaticalDproportion of new words)
//   borrowing: {from: 'language', weight: 0-1}
//   semanticShift: number (0-1)
//   regularization: number (0-1)
```

### Revival Modes
```javascript
// Apply different revival strategies
const revived = reviver.revive(sourceLang, options);
// Options:
//   mode: 'authentic'|'neo'|'mutated'|'hybrid'|'speculative'
//   modernConcepts: array of concepts to add lexical items for
//   grammaticalSimplification: 0-1
//   lexicalExpansion: 0-1
//   dialectalVariation: boolean
//   orthographicReform: boolean
```

### Text Generation
```javascript
// Generate sample texts in the target language variety
const text = reviver.generateText(languageVariant, options);
// Options:
//   length: number (sentences or paragraphs)
//   genre: 'narrative', 'dialogue', 'expository', 'poetic', 'technical'
//   formality: 'casual'|'formal'|'ceremonial'
//   dialect: 'standard'|regional variant
//   includeIdioms: boolean
```

## Practical Applications

### Historical Linguistics Research
- Test hypotheses about sound changes
- Model language divergence and convergence
- Create teaching materials for ancient languages
- Reconstruct unattested language stages

### Creative Writing & Worldbuilding
- Develop historically grounded languages for fiction
- Create realistic lingua francas for alternate histories
- Design believable alien languages based on human patterns
- Generate period-appropriate dialogue for historical fiction

### Language Education
- Create progressive learning materials
- Generate graded readers for ancient languages
- Produce comparative linguistics exercises
- Develop etymology resources

### Computational Linguistics
- Generate training data for historical NLP models
- Create controlled linguistic datasets for experiments
- Simulate language change for algorithmic testing
- Develop phonological restoration tools

## Integration with Other Modules
DeadLanguageReviver works seamlessly with other GLOSSOPETRAE components:

### With PhonemeSelector
```javascript
// Get authentic phoneme inventory
const latinData = reviver.getLanguage('latin');
const phonemeSelector = new PhonemeSelector(42);
// Use latinData.phonology to weight phoneme selection
```

### With MorphologyWeaver
```javascript
// Apply historical morphology
const gothicData = reviver.getLanguage('gothic');
const morphology = new MorphologyWeaver(seed, {
  type: gothicData.morphology.type,
  cases: gothicData.morphology.cases,
  // ... other morphological features
});
```

### With LexiconGenerator
```javascript
// Generate historically-grounded vocabulary
const roots = reviver.getLanguage('sanskrit').sampleRoots;
const lexicon = new LexiconGenerator(seed, {
  semanticFields: ['nature', 'spirituality', 'warfare'],
  rootInventory: roots,
  // ... other options
});
```

### With ScriptGenerator
```javascript
// Create period-appropriate writing systems
const egyptianData = reviver.getLanguage('egyptian');
const script = new ScriptGenerator(seed, {
  phonemes: egyptianData.phonology,
  aesthetic: 'hieroglyphic',  // or 'demotic', 'coptic'
  direction: egyptianData.writingDirection || 'ltr'
});
```

## Best Practices
1. **Start with Authenticity**: Begin with authentic data before applying mutations
2. **Respect Constraints**: Don't violate core phonotactic or grammatical rules unless modeling language breakdown
3. **Document Changes**: Keep track of what aspects are authentic vs. invented
4. **Consider Historical Plausibility**: Ensure changes follow attested patterns when possible
5. **Layer Your Approach**: Combine multiple modules for rich, historically-informed conlangs

## Customization Options
The module accepts configuration options for fine-tuning:
```javascript
const reviver = new DeadLanguageReviver(options);
// Options:
//   dataDepth: 'basic'|'standard'|'extensive' (default: 'standard')
//   includeDialects: boolean (default: true)
//   reconstructProtoForms: boolean (default: true)
//   allowNeologisms: boolean (default: true)
//   strictPhonotactics: boolean (default: false)
//   semanticFields: array of domains to emphasize
```

## Limitations & Considerations
- **Fragmentary Data**: Some ancient languages have incomplete attestation
- **Reconstruction Uncertainty**: Especially for proto-languages like PIE
- **Semantic Shifts**: Meanings change in ways that are hard to predict perfectly
- **Cultural Context**: Language is deeply tied to culture which may be lost
- **Modern Biases**: Our interpretations are filtered through contemporary linguistic theory

Despite these limitations, DeadLanguageReviver provides the most robust foundation available for creating linguistically plausible constructed languages with historical depth.
EOF