# 10_DivergenceEngine Module

## Overview
The DivergenceEngine module powers the "Linguistic Drift" feature in GLOSSOPETRAE, calculating how far a generated language should deviate from English to create linguistically diverse and typologically interesting constructed languages. It transforms a simple divergence percentage (0-100%) into specific, coherent linguistic parameters across phonology, morphology, syntax, and exotic features.

## Core Concept
Instead of randomly selecting linguistic features, DivergenceEngine uses data-driven models based on linguistic typology research to ensure that as you increase "drift" from English, the resulting language combinations remain plausible and internally consistent.

## Divergence Scale
- **0%** = Maximally English-like (similar to Germanic languages)
- **25%** = Close to English (like Dutch, Frisian, Scandinavian languages)
- **50%** = Moderate divergence (like Spanish, French, Russian)
- **75%** = Distant (like Japanese, Turkish, Finnish, Arabic)
- **100%** = Maximally alien (polysynthetic, tonal, click consonants, ergative systems)

## Features

### Comprehensive Linguistic Coverage
The engine generates targets for all major linguistic subsystems:

**Phonology**
- Consonant inventory size and types
- Vowel inventory and quality
- Tone systems
- Syllable structure preferences
- Phonotactic constraints
- Rare sound inclusion (clicks, implosives, etc.)

**Morphology**
- Morphological type (isolating, agglutinative, fusional, polysynthetic)
- Case system size and function
- Gender/noun class systems
- Number marking (singular/plural, dual, paucal)
- Verb morphology (tense, aspect, mood, voice, agreement)
- Derivational processes (prefixes, suffixes, infixes, reduplication)

**Syntax**
- Basic word order (SOV, SVO, VSO, etc.)
- Word order flexibility
- Head directionality
- Adposition types (prepositions/postpositions)
- Adjective placement
- Pro-drop capabilities
- Question formation strategies
- Negation patterns

**Exotic Features**
- Ergative-absolutive alignment
- Clusivity (inclusive/exclusive "we")
- Grammatical honorifics
- Numeral classifiers
- Serial verb constructions
- Switch-reference systems
- Direct-inverse marking
- Templatic morphology (Semitic-style roots)

## Usage Example
```javascript
import { DivergenceEngine } from './src/modules/DivergenceEngine.js';
import { SeededRandom } from '../utils/random.js';

// Create a divergence engine at 60% divergence (moderately foreign)
const divergence = new DivergenceEngine(0.6, new SeededRandom(12345));

// Generate target parameters for language creation
const targets = divergence.generateTargets();
console.log("Phonology targets:", targets.phonology);
console.log("Morphology targets:", targets.morphology);
console.log("Syntax targets:", targets.syntax);
console.log("Feature targets:", targets.features);

// Get human-readable description
console.log("Divergence level:", DivergenceEngine.describeDivergence(0.6));
// Output: "Noticeable drift — Different (like Russian or Greek)"

// Score an existing language to see how divergent it is
const divergenceScore = DivergenceEngine.scoreLanguage(generatedLanguage);
console.log(`Actual divergence: ${(divergenceScore * 100).toFixed(1)}%`);
```

## Integration with Other Modules
DivergenceEngine is designed to work seamlessly with other GLOSSOPETRAE modules:

### With PhonemeSelector
```javascript
// Use divergence targets to guide phoneme selection
const divEngine = new DivergenceEngine(0.7);
const phonologyTargets = divEngine.getPhonologyTargets();

const phonemeSelector = new PhonemeSelector(seed, {
  targetConsonantCount: phonologyTargets.consonantCount,
  targetVowelCount: phonologyTargets.vowelCount,
  includeTones: phonologyTargets.tones.enabled,
  preferRareSounds: phonologyTargets.exoticConsonants > 0,
  syllableStructure: phonologyTargets.syllablePreference
});
```

### With MorphologyWeaver
```javascript
// Apply morphological targets
const divEngine = new DivergenceEngine(0.5);
const morphologyTargets = divEngine.getMorphologyTargets();

const morphologyWeaver = new MorphologyWeaver(seed, {
  type: morphologyTargets.type,
  caseSystem: {
    count: morphologyTargets.cases.count,
    types: morphologyTargets.cases.types
  },
  nounClasses: morphologyTargets.gender.count > 0 ? {
    count: morphologyTargets.gender.count,
    type: 'nominal'
  } : null,
  verbComplexity: {
    tenseCount: morphologyTargets.verbal.tenseCount,
    aspectCount: morphologyTargets.verbal.aspectCount,
    moodCount: morphologyTargets.moodCount,
    agreement: morphologyTargets.verbal.agreement
  }
});
```

### With Syntax Generation
```javascript
// Generate syntax trees that match targets
const divEngine = new DivergenceEngine(0.8);
const syntaxTargets = divEngine.getSyntaxTargets();

const syntaxGenerator = new SyntaxGenerator(seed, {
  wordOrder: syntaxTargets.wordOrder,
  headDirectionality: syntaxTargets.headDirectionality,
  adpositionType: syntaxTargets.adpositions,
  adjectivePosition: syntaxTargets.adjectivePosition,
  proDropAllowed: syntaxTargets.proDrop,
  topicProminent: syntaxTargets.topicProminent
});
```

## Customization & Extension
Advanced users can customize the divergence model by:

### Modifying Feature Weights
Adjust how strongly each linguistic feature correlates with divergence level by editing the internal data structures.

### Adding New Features
Extend the model with additional linguistic phenomena:
- Tonal systems
- Register complexions
- Evidentiality gradients
- Politeness hierarchies
- Spatial reference systems

### Creating Language-Specific Profiles
Instead of drifting from English, create divergence engines from other baselines:
```javascript
// Create a Japanese-divergence engine (starting from Japanese baseline)
const japaneseDivergence = new DivergenceEngine(0.5, japaneseRng, 'japanese');
// Now 0% = Japanese-like, 100% = maximally divergent from Japanese
```

## Best Practices
1. **Start Low, Go Slow**: Begin with low divergence (0.1-0.3) for naturalistic languages, increase gradually for exotic effects
2. **Feature Coherence**: Trust the engine's internal consistency - don't override individual parameters unless you have linguistic expertise
3. **Iterative Refinement**: Generate targets, create language, measure actual divergence, adjust as needed
4. **Combine with Historical Data**: Use DivergenceEngine output as input to DeadLanguageReviver for historically-grounded exotic languages
5. **Document Your Choices**: Record divergence level and rationale for reproducibility

## Technical Details
The algorithm uses:
- **Piecewise linear interpolation** for numerical features (inventory sizes, counts)
- **Weighted random selection** for categorical choices (word order, morphological type)
- **Threshold-based activation** for binary features (tonal vs non-tonal)
- **Cross-feature constraints** to prevent impossible combinations
- **Empirical linguistic databases** for realistic feature co-occurrence patterns

## Applications
- **Artistic Creation**: Generate languages with specific aesthetic qualities
- **Linguistic Research**: Test hypotheses about language universals and typology
- **Game Design**: Create coherent language families for fictional worlds
- **Education**: Demonstrate typological diversity in linguistics courses
- **AI Training**: Generate diverse linguistic data for NLP model testing
- **Communication Theory**: Explore how language structure affects cognition

## Limitations
While DivergenceEngine produces linguistically plausible results, users should be aware:
- Extreme combinations (100% divergence) may produce statistically rare but theoretically possible languages
- The model simplifies complex linguistic interactions for usability
- Real languages often have historical accidents that models don't capture
- Cultural semantics are not modeled (only structural features)

For maximum authenticity, combine DivergenceEngine output with historical language data from DeadLanguageReviver and semantic constraints from LexiconGenerator.
EOF