# 11_EvolutionEngine Module

## Overview
The EvolutionEngine module simulates diachronic linguistic change, modeling how languages evolve over time through sound changes, grammatical shifts, and lexical evolution. Unlike the DivergenceEngine (which sets synchronic targets), EvolutionEngine implements actual historical processes where rule ordering, chain shifts, and phonemic mergers create realistic language families.

## Core Concept
EvolutionEngine treats language change as a series of ordered, conditional sound changes applied to a lexicon over simulated time periods. Each change can affect thousands of words simultaneously, creating the cascading effects seen in real language families like Romance, Germanic, or Slavic.

## Key Features

### Realistic Sound Change Simulation
- **20+ phonological rules** based on attested historical changes
- **Rule ordering matters** - applying A→B then B→C gives different results than B→C then A→B
- **Context-sensitive changes** - sounds change based on surrounding phonemes
- **Chain shifts** - where one change creates conditions for another (e.g., Germanic Sound Shift)
- **Phoneme birth and death** - sounds can merge, split, or disappear entirely
- **Tonogenesis** - loss of consonantal contrasts can generate tone (as in Southeast Asian languages)

### Lexical & Morphological Evolution
- **Whole-lexicon processing** - every word in the vocabulary evolves consistently
- **Paradigm tracking** - inflected forms (cases, tenses, etc.) evolve alongside lexical stems
- **Etymology tracking** - every word maintains a chain of proto-form → intermediate → modern
- **Cognate detection** - automatically identifies which words descend from same proto-form
- **Morpheme erosion** - affixes weaken and disappear through regular sound changes
- **Grammatical restructuring** - case systems can erode, leading to increased reliance on word order

### Language Family Modeling
- **Proto-daughter relationships** - one language can spawn multiple divergent descendants
- **Independent evolution** - each daughter lineage gets its own unique change history
- **Cognate tables** - systematic alignment of related words across daughter languages
- **Family tree visualization** - showing branching points and time depths
- **Multi-generational modeling** - grandchildren of the proto-language can be generated

## Usage Example
```javascript
import { EvolutionEngine } from './src/modules/EvolutionEngine.js';
import { PhonemeSelector, MorphologyWeaver, LexiconGenerator } from './index.js';

// 1. Create a proto-language
const protoSeed = 42;
const phonemes = new PhonemeSelector(protoSeed).select();
const morphology = new MorphologyWeaver(protoSeed, {
  phonemes: phonemes,
  type: 'fusional',
  caseSystem: { count: 6, types: ['NOM', 'ACC', 'GEN', 'DAT', 'ABL', 'LOC'] }
});
const lexicon = new LexiconGenerator(protoSeed, {
  semanticFields: ['basic', 'nature', 'body', 'kinship'],
  rootCount: 2000
});

// Combine into a proto-language object
const protoLanguage = {
  name: 'Proto-Eldarin',
  seed: protoSeed,
  phonology: {
    consonants: phonemes.consonants,
    vowels: phonemes.vowels
  },
  morphology: {
    type: morphology.getType(),
    nominal: {
      caseSystem: {
        cases: [
          { name: 'Nominative', abbr: 'NOM', suffix: '' },
          { name: 'Accusative', abbr: 'ACC', suffix: '-m' },
          { name: 'Genitive', abbr: 'GEN', suffix: '-s' },
          { name: 'Dative', abbr: 'DAT', suffix: '-i' },
          { name: 'Ablative', abbr: 'ABL', suffix: '-t' },
          { name: 'Locative', abbr: 'LOC', suffix: '-e' }
        ]
      }
    },
    verbal: {
      tenses: [
        { name: 'Present', suffix: '-o' },
        { name: 'Past', suffix: '-im' },
        { name: 'Future', suffix: '-es' }
      ]
    }
  },
  lexicon: lexicon
};

// 2. Create the evolution engine
const evolution = new EvolutionEngine(protoLanguage);

// 3. Evolve a daughter language after 800 years
const daughter = evolution.evolve({
  centuries: 8,
  intensity: 'moderate',
  preserveName: false  // Let the name evolve naturally
});

console.log(`Proto-Eldarin → ${daughter.name}`);
console.log(`Sound changes applied: ${daughter.changes.length}`);
console.log(`Example evolution: *wódr̥ → ${daughter.evolveWord('water')}`);

// 4. Create a language family
const family = evolution.deriveFamily({
  daughters: 4,
  centuries: 10,  // ~1000 years
  generations: 2, // Granddaughter languages included
  cognateCount: 50
});

console.log(family.summary);
// Output: "The Proto-Eldarin family: Proto-Eldarin split ~10 centuries ago into 4 branches..."
```

## Sound Change Library
EvolutionEngine includes 20+ scientifically grounded sound change rules:

### Lenition & Strengthening
- **Intervocalic lenition**: voiceless stops → voiced between vowels (p,t,k → b,d,g)
- **Spirantization**: voiced stops → fricatives between vowels (b,d,g → v,ð,ɣ)
- **Final devoicing**: voiced obstruents → voiceless word-finally (b,d,g → p,t,k)
- **Final stop loss**: complete loss of word-final stops with tonogenesis potential

### Assimilation & Dissimilation
- **Nasality assimilation**: consonants adopt nasal quality before nasals
- **Place assimilation**: consonants adjust articulation to match neighbors
- **Dissimilation**: similar sounds become less alike (e.g., fricatives in sequence)

### Place & Manner Changes
- **Palatalization**: velars → palatals before front vowels (k,g → tʃ,dʒ)
- **Velarization**: dentals → velars before back vowels
- **Labialization**: sounds acquire lip-rounding
- **Sibilant shifts**: s → ʃ, z → ʒ in various contexts

### Vowel Changes
- **Vowel raising/lowering**: systematic shifts in vowel height
- **Vowel fronting/backing**: changes in tongue position
- **Diphthongization**: monophthongs → diphthongs (e → ie, o → ue)
- **Vowel breaking**: insertion of glides (e → je, o → wo)
- **Vowel reduction**: unstressed vowels → schwa or deletion
- **Vowel harmony**: spread of [back] or [round] features through words

### Prosodic Changes
- **Tonogenesis**: loss of voicing contrast → pitch distinction
- **Stress shift**: changes in where word-level accent falls
- **Mora timing shifts**: changes in syllable weight perception

### Morphophonemic Changes
- **Umlaut/vowel harmony**: fronting triggered by following high front vowel
- **Ablaat/alternation**: vowel changes in stressed syllables
- **Consonant mutation**: context-dependent initial consonant changes (Celtic-style)

### Structural Changes
- **Apocope/Syncope**: loss of word-final or medial vowels
- **Epenthesis/Prothesis**: insertion of sounds (e.g., Latin *schola* → Spanish *escuela*)
- **Metathesis**: sound reordering (e.g., *thrid* → *third*)
- **Cluster simplification**: reduction of complex consonant sequences
- **Metathesis**: transposition of sounds

## Integration with Other Modules
EvolutionEngine is designed to work as part of a complete language engineering pipeline:

### Input Modules (Create the Proto-Language)
```javascript
// Phonology
const phonemes = new PhonemeSelector(seed).select();

// Morphology
const morphology = new MorphologyWeaver(seed, {
  phonemes: phonemes,
  type: 'agglutinative',
  // ... other options
});

// Lexicon
const lexicon = new LexiconGenerator(seed, {
  semanticFields: ['fundamentals', 'nature', 'society'],
  // ... other options
});

// Syntax (optional, for complete specification)
const syntax = new SyntaxGenerator(seed, {
  // ... syntax parameters
});

// Combine into language object
const protoLanguage = {
  name: 'Proto-Mythron',
  seed: seed,
  phonology: { consonants: phonemes.consonants, vowels: phonemes.vowels },
  morphology: {...},
  lexicon: lexicon,
  syntax: syntax  // if using
};
```

### Output Applications
```javascript
// 1. Create daughter languages for a family
const evolution = new EvolutionEngine(protoLanguage);
const indoEuropeanFamily = evolution.deriveFamily({
  daughters: 8,  // Germanic, Romance, Slavic, etc.
  centuries: 30, // ~3000 years
  generations: 2 // Include granddaughter languages
});

// 2. Study specific sound changes
const englishLike = evolution.evolve({
  centuries: 15,
  intensity: 'light',
  // Focus on Germanic-type changes
});

// 3. Create etymological dictionaries
const etymologyDict = {};
for (const entry of protoLanguage.lexicon.entries) {
  const evolvedForm = englishLike.evolveWord(entry.lemma);
  etymologyDict[entry.lemma] = {
    proto: `*${entry.lemma}`,
    englishLike: evolvedForm,
    meaning: entry.gloss,
    changeChain: englishLike.getEtymology(entry.lemma)  // if implemented
  };
}

// 4. Generate comparative vocabulary lists
const comparisonTable = [];
for (const concept of ['water', 'father', 'mother', 'fire', 'earth']) {
  const row = {
    english: englishLike.evolveWord(concept),
    germanic: germanicDaughter.evolveWord(concept),
    italic: italicDaughter.evolveWord(concept),
    celtic: celticDaughter.evolveWord(concept)
  };
  comparisonTable.push(row);
}
```

## Advanced Configuration
EvolutionEngine accepts various options to control the evolutionary process:

### Basic Evolution Options
```javascript
evolution.evolve({
  centuries: 5,           // Time depth (default: 5)
  intensity: 'mild'|'moderate'|'dramatic', // Change rate (default: 'moderate')
  seed: 12345,            // Random seed for reproducibility
  preserveName: false     // Allow language name to evolve naturally
});
```

### Family Derivation Options
```javascript
evolution.deriveFamily({
  daughters: 4,           // Number of daughter languages (default: 3)
  centuries: 8,           // Time depth for daughters (default: 8)
  generations: 2,         // Generations of descent (1=just daughters, 2=include granddaughters)
  intensity: 'moderate',  // Evolution rate for all lines
  cognateCount: 30        // Number of entries in cognate table (default: 30)
});
```

### Customizing the Change Process
Advanced users can:
- **Modify the rule set**: Add, remove, or adjust weights of sound change rules
- **Create language-specific rules**: Tailor changes to particular language types
- **Implement contact effects**: Add borrowing layers between sibling languages
- **Add sociolinguistic variation**: Model dialect chains and prestige shifts

## Best Practices
1. **Start Conservative**: Begin with small time depths (1-3 centuries) to see gradual change
2. **Document Intermediate Stages**: Save snapshots at various points for analysis
3. **Respect Phonetic Plausibility**: Avoid combinations that violate known phonetic constraints
4. **Consider Contact Effects**: Real language evolution includes borrowing - simulate this separately
5. **Validate with Known Families**: Compare outputs to real language families (Romance, Germanic, etc.)
6. **Use for Inspiration**: Treat outputs as creative starting points, not definitive conclusions

## Applications
### Historical Linguistics
- Test hypotheses about sound change chronology
- Model competing theories of language divergence
- Create teaching materials for historical linguistics courses
- Reconstruct unattested intermediate stages

### Constructed Language Design
- Generate realistic language families for fictional worlds
- Create believable evolutionary paths for alt-history languages
- Develop procedural language generation for games
- Design languages with specific historical depth

### Educational Tools
- Create interactive timelines of language change
- Generate problem sets for linguistics students
- Demonstrate principles like the Neogrammarian hypothesis
- Show how regular change produces apparent irregularity

### Computational Linguistics
- Generate training data for historical NLP models
- Create controlled datasets for sound change detection algorithms
- Benchmark phylogenetic inference methods
- Simulate language evolution for agent-based modeling

## Limitations & Considerations
While EvolutionEngine produces scientifically grounded results, users should note:

### Simplifications
- **Discrete time steps**: Real change is continuous, not generational jumps
- **Independent lexicon**: Doesn't model semantic shift or lexical replacement well
- **No contact effects**: Borrowing and interference must be added separately
- **Uniform application**: Assumes regular application across lexicon (though sporadic changes are modeled)

### Best Used For
- Modeling **phonological and morphological** evolution
- Generating **plausible intermediate forms**
- Creating **coherent language families**
- Testing **theoretical linguistic hypotheses**
- **Inspiration** for artistic language creation

### Requires Supplementation With
- Semantic change models (for meaning shift)
- Lexical replacement simulations
- Contact and borrowing models
- Sociolinguistic variation techniques
- Pragmatic and discourse evolution models

Despite these limitations, EvolutionEngine provides the most sophisticated historical language simulation available in GLOSSOPETRAE, enabling users to create linguistically plausible language families with authentic historical depth.
EOF