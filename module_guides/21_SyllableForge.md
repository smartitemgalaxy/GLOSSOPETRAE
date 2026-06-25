# 21_SyllableForge Module

## Overview
The SyllableForge module generates syllable structure constraints and phonotactic rules that respect sonority sequencing and cross-linguistic patterns. It creates legally pronounceable syllables for constructed languages by modeling the Sonority Sequencing Principle (SSP) and implementing language-specific phonotactic constraints.

## Core Concept
SyllableForge designs phonotactic systems that determine which sound sequences are permissible in a language. It implements the universal Sonority Sequencing Principle, which states that in a syllable, sonority (loudness/perceptual prominence) must rise from the onset toward the nucleus (vowel) and fall from the nucleus to the coda. This principle underlies syllable structure across human languages.

The module generates:
- **Syllable Templates**: Patterns like (C)(C)V(C)(C) defining allowed consonant/vowel sequences
- **Onset Rules**: Permitted consonant combinations before vowels
- **Coda Rules**: Permitted consonant combinations after vowels
- **Cluster Rules**: Specific allowable and forbidden consonant clusters
- **Phonological Processes**: Rule-based alternations like assimilation, deletion, epenthesis
- **Constraints**: Position-specific restrictions (word-initial, word-final)

## Key Features

### 1. Sonority-Based Design
- **Sonority Hierarchy**: Vowels > Glides > Liquids > Nasals > Fricatives > Affricates > Stops
- **Onset Clusters**: Must show rising sonority toward the vowel (e.g., pl, tr, kw)
- **Coda Clusters**: Must show falling sonority away from the vowel (e.g., lp, rt, sk)
- **Sonority Plateaus**: Prohibited (equal sonority segments like pt, ks)
- **Sonority Reversals**: Prohibited in incorrect direction (e.g., lp in onset, kl in coda)

### 2. Flexible Syllable Templates
Configurable syllable complexity:
- **Minimal**: CV only (strict open syllables)
- **Simple**: (C)V(C) (optional onset/coda, no clusters)
- **Moderate**: (C)(C)V(C)(C) (allows clusters)
- **Complex**: (C)(C)(C)V(C)(C)(C) (triple clusters allowed)
- **Force Simple**: CV-only mode for high-divergence languages

### 3. Phonological Process Generation
Automatically creates realistic alternations:
- **Assimilation**: Nasal place assimilation (n→m/p, n→ŋ/k)
- **Diachronic Processes**: Final devoicing, vowel harmony
- **Allophony**: Context-dependent sound changes
- **Epenthesis**: Insertion to break illegal clusters
- **Metathesis**: Sound reordering (less common)

### 4. Positional Constraints
- **Word-Initial**: Restrictions on permissible onsets (e.g., no /ŋ-/ in English)
- **Word-Final**: Restrictions on permissible codas (e.g., no voiced obstruents finally in German)
- **Morpheme-Boundary**: Special rules at affix boundaries
- **Loanword Adaptation**: Patterns for adapting foreign words

### 5. Integration with Phonology
- Uses phoneme inventory from PhonemeSelector
- Respects feature specifications (place, manner, voicing)
- Generates phonotactically legal syllable structures
- Creates phonologically coherent systems

## Technical Implementation

### Syllable Template Generation
Creates formulas like:
- `(C)(C)V(C)(C)` - up to two consonants in onset and coda
- `CV` - strictly open syllables (no codas)
- `(C)V` - optional onset, no coda
- `V(C)(C)` - no onset, optional coda

### Onset Rule Generation
1. **Single Consonants**: All consonants typically allowed
2. **Two-consonant Clusters**:
   - Stop + Liquid (pr, tr, kl, ɡr)
   - Stop + Glide (tw, kw, pj, tj)
   - Fricative + Liquid (fr, fl, ʃr, ɬl)
   - Fricative + Glide (sw, ʃw, ɸj, ɥ)
   - Nasal + Liquid (ml, ŋɡ) - less common
3. **Three-consonant Clusters** (when maxOnset ≥ 3):
   - s + Stop + Liquid (spr, str, skr)
   - s + Stop + Glide (spw, skw, spj)
   - s + Nasal + Liquid (smr, snl) - rare
4. **Forbidden Patterns**:
   - Sonority plateaus (pp, tt, ss)
   - Sonority reversals in wrong direction (rp, lt)
   - Improper place combinations (*pt, *kg)

### Coda Rule Generation
1. **Single Consonants**: Often more restricted than onsets
   - Common: nasals (m, n, ŋ), liquids (l, r), voiceless fricatives (s, f, ʃ)
   - Less common: voiced obstruents (b, d, ɡ, v, z, ʒ) - often devoiced finally
   - Rare: stops (p, t, k) - often unreleased finally
2. **Two-consonant Clusters**:
   - Liquid + Stop (lt, lk, rt, ɡd)
   - Liquid + Nasal (lm, ln, ℜɲ)
   - Nasal + Stop (homorganic: mp, nt, ŋɡ)
   - Fricative + Stop (fs, θs, ʃt)
3. **Forbidden Patterns**:
   - Rising sonority (kl, ɡm) - violates SSP
   - Sonority plateaus (mm, ŋŋ)
   - Certain place combinations (*kt, *pt)

### Phonological Process Generation
1. **Assimilation**:
   - Nasal Place Assimilation: /n/ → [m] before labials, [ŋ] before velars
   - Regressive Voicing Assimilation: Obstruents agree in voicing
   - Progressive Place Assimilation: Consonants adopt features of following segment
2. **Dissimilation**:
   - Dissimilation of Similar Sounds: Avoids identical sequences (e.g., fricative+fricative)
   - Voicing Dissimilation: In some languages (e.g., Sanskrit stops)
3. **Elision/Deletion**:
   - Final Consonant Deletion: Common in casual speech
   - Schwa Deletion: In unstressed syllables (e.g., English "memory" → "memry")
   - Cluster Simplification: Reduces complex clusters
4. **Epenthesis**:
   - Vowel Epenthesis: Breaks up illegal consonants clusters
   - Consonant Epenthesis: Less common (e.g., adding /p/ in English "hamster")
5. **Metathesis**:
   - Adjacent Consonant Switch: Ask → aks (in some dialects)
   - Vowel-Consonant Metathesis: Less common
6. **Feature Changes**:
   - Final Devoicing: Obstruents lose voicing at word end
   - Vowel Reduction: Unstressed vowels become schwa
   - Palatalization: Velars → palatals before front vowels
   - Labialization: Velars → labiovelars before round vowels

### Constraints System
1. **Word-Initial Restrictions**:
   - No velar nasal initially (/ŋ/ in English)
   - No certain clusters initially (*pt-, *kt- in English)
   - Language-specific onset requirements
2. **Word-Final Restrictions**:
   - No voiced obstruents finally (German, Dutch)
   - Must end in vowel (Japanese, Finnish)
   - Limited coda inventory (Hawaiian: only p, k, ʔ, m, n, l)
3. **Morpheme-Boundary Rules**:
   - Sandhi effects at boundaries
   - Liaison and enchainment (French)
   - Reduplication patterns
4. **Loanword Phonology**:
   - Adaptation strategies for foreign sounds
   - Substitution patterns
   - Epenthesis to fix prohibited structures

## Usage Examples

### Basic Syllable Generation
```javascript
import { SyllableForge } from './src/modules/SyllableForge.js';
import { PhonemeSelector } from './src/modules/PhonemeSelector.js';

// Generate phonology first
const phonemeSelector = new PhonemeSelector(42);
const phonemes = phonemeSelector.select();

// Create syllable forge
const syllableForge = new SyllableForge(Math.random, phonemes);

// Generate syllable template
const syllable = syllableForge.generate();
console.log(syllable.template.formula); // e.g., "(C)(C)V(C)(C)"
console.log(syllable.template.description); // e.g., "(C)(C)V(C)(C) (complex, English-like)"

// Generate individual syllables
console.log(syllableForge.generateSyllable()); // e.g., "plas", "tru", "ekst"
// Generate words
console.log(syllableForge.generateWord(3)); // e.g., "plastrenkolo"
```

### Language-specific Configuration
```javascript
// For a Polynesian-like language (simple CV syllables)
const simpleForge = new SyllableForge(Math.random, phonemes, {
  forceSimple: true, // Forces CV structure only
});

// For a Germanic-like language (complex syllables)
const germanicForge = new SyllableForge(Math.random, phonemes, {
  maxOnset: [2, 3], // 2-3 consonants in onset
  maxCoda: [1, 2],  // 1-2 consonants in coda
  allowClusters: true,
  vowelHarmony: false,
});

// For a language with vowel harmony
const harmonicForge = new SyllableForge(Math.random, phonemes, {
  maxOnset: 1,
  maxCoda: 1,
  vowelHarmony: true,
  harmonyType: 'backness', // or 'rounding' or 'height'
});

// For a language with strict syllable constraints
const restrictiveForge = new SyllableForge(Math.random, phonemes, {
  maxOnset: 1,
  maxCoda: 0, // No codas allowed
  allowClusters: false,
  vowelHarmony: false,
});
```

### Advanced Usage with Other Modules
```javascript
// Full language generation pipeline
import { PhonemeSelector } from './src/modules/PhonemeSelector.js';
import { SyllableForge } from './src/modules/SyllableForge.js';
import { MorphologyWeaver } from './src/modules/MorphologyWeaver.js';
import { LexiconGenerator } from './src/modules/LexiconGenerator.js';

// 1. Generate phonology
const phonemeSelector = new PhonemeSelector(12345);
const phonemes = phonemeSelector.select();

// 2. Create syllable structure
const syllableForge = new SyllableForge(Math.random, phonemes, {
  maxOnset: 2,
  maxCoda: 2,
  allowClusters: true,
  vowelHarmony: true,
  harmonyType: 'backness',
});

const syllableStructure = syllableForge.generate();

// 3. Build morphology system
const morphologyWeaver = new MorphologyWeaver(12345, {
  phonemes: phonemes,
  type: 'agglutinative',
  // Syllable constraints inform morphological shape
});

// 4. Generate lexicon respecting phonotactics
const lexiconGenerator = new LexiconGenerator(12345, {
  semanticFields: ['Nature', 'Human', 'Food', 'Technology'],
  phonemes: phonemes,
  // Pass syllable constraints to ensure pronounceable words
  syllableConstraints: syllableStructure,
});

// 5. Generate words that obey phonotactics
const validWord = syllableForge.generateWord(2); // e.g., "panorami"
// This will be phonotactically valid in the generated language
```

### Phonological Process Application
```javascript
// The generated processes can be applied to derive surface forms
const processes = syllableForge.generate().processes;

// Example: Applying nasal assimilation
if (processes.some(p => p.name === 'Nasal Assimilation')) {
  // Input: /in+possible/ 
  // Output: /im+possible/ → "impossible"
  // Rule: n → m / _[+labial]
  
  // Input: /in+credible/
  // Output: /iŋ+credible/ → "incredible" 
  // Rule: n → ŋ / _[+velar]
}

// Example: Applying final devoicing
if (processes.some(p => p.name === 'Final Devoicing')) {
  // Input: /dog/ → /dok/
  // Input: /have/ → /haff/
  // Rule: [+voiced, -sonorant] → [-voiced] / _#
}

// Example: Applying vowel harmony (backness)
if (processes.some(p => p.name === 'Vowel Harmony' && p.type === 'backness')) {
  // Front vowels trigger front harmony: /e/ → [e, i, y]
  // Back vowels trigger back harmony: /o/ → [o, u, ʊ]
  // Suffixes must match vowel harmony of stem
}

// Example: Applying epenthesis
if (processes.some(p => p.name === 'Epenthesis')) {
  // Input: /ptak/ (illegal cluster) 
  // Output: /pitak/ (with inserted i)
  // Rule: ∅ → i / C_C (when cluster violates phonotactics)
}
```

## Integration with Other GLOSSOPETRAE Modules

### With PhonemeSelector
- **Input**: Receives consonant and vowel inventories
- **Validation**: Ensures generated syllables use only available phonemes
- **Feature Inheritance**: Inherits phonetic features (place, manner, voicing)
- **Inventory Constraints**: Respects gaps in the phoneme inventory (e.g., if no voiced fricatives, none appear in coda)

### With MorphologyWeaver
- **Morpheme Shape**: Informs possible morpheme phonological shapes
- **Affix Constraints**: Determines what affix shapes are phonotactically legal
- **Boundary Conditions**: Helps model sandhi and morphophonological alternations
- **Reduplication**: Guides what reduplicant shapes are permissible

### With LexiconGenerator
- **Word Generation**: Ensures all generated lexicon entries are pronounceable
- **Gap Avoidance**: Prevents creation of phonotactically illegal words
- **Frequency Weighting**: Can weight generation toward more common syllable shapes
- **Semantic Coherence**: Helps ensure that semantically related words share phonological patterns

### With Orthographic Modules (GlyphForge/ScriptGenerator)
- **Grapheme-Phoneme Mapping**: Informs how syllables map to writing systems
- **Phonetic Spelling**: Helps design spelling systems that reflect pronunciation
- **Allograph Selection**: Chooses between variant representations of sounds
- **Diacritic Use**: Determines when diacritics are needed for phonetic detail

### With Prosody Modules (ProsodyEngine)
- **Syllable Weight**: Determines which syllables count as heavy/light for meter
- **Foot Formation**: Guides metrical foot construction (iambic, trochaic)
- **Stress Assignment**: Influences where stress can fall based on syllable structure
- **Mora Counting**: Determines moraic structure for weight-sensitive languages

### With Audio Synthesis (AudioForge)
- **Phonetic Implementation**: Provides articulatory targets for speech synthesis
- **Coarticulation Models**: Informs how sounds influence neighboring sounds
- **Allophonic Variation**: Supplies context-sensitive pronunciation rules
- **Prosodic Implementation**: Helps implement pitch accents and boundary tones

### With Writing Systems
- **Syllabaries**: Directly informs symbol inventory (one symbol per syllable)
- **Abugidas**: Determines inherent vowel and modification systems
- **Alphabets**: Guides letter combinations and digraph/trigraph usage
- **Logographic Systems**: Helps determine which morphemes get logographic representation

## Linguistic Typology Applications

### Language Families
- **Austronesian**: Predominantly CV syllables, simple codas (if any)
- **Sino-Tibetan**: Complex onsets possible, restricted codas (often just nasals/stops)
- **Niger-Congo**: Often CV or CVN, tone-bearing units matter
- **Indo-European**: Wide variety, from simple CV to complex CCCVCCC
- **Caucasian**: Extremely complex clusters allowed in some languages
- **Salishan**: Famous for lexical suffixes and complex consonant clusters
- **Mayan**: VC and CVC common, glottalized consonants important

### Areal Features
- **Balkan Sprachbund**: Shared vowel consonant restrictions
- **Mesoamerican Linguistic Area**: Glottalization patterns, ejectives
- **Australian Languages**: Often avoid fricatives, have coronal emphatics
- **Papuan Languages**: Extreme consonant cluster complexity in some families
- **Amazonias**: Often simple syllable structure, rich vowel systems

### Historical Language Change
- **Lenition**: Weakening of consonants (e.g., t → r → Ø)
- **Fortis/Lenis Contrasts**: Development of voicing or gemination contrasts
- **Vowel Reduction**: Loss of vowel distinctions in unstressed syllables
- **Consonant Loss**: Especially final consonant loss (French, Portuguese)
- **Epenthesis**: Breaking up clusters over time (Latin tremulare → Italian tremolare)

## Language Design Applications

### Naturalistic Conlangs
- **Realistic Phonotactics**: Ensures invented languages follow universal tendencies
- **Typological Plausibility**: Creates systems that could exist in nature
- **Historical Depth**: Allows for plausible diachronic scenarios
- **Learnability**: Produces systems that humans can actually acquire and use

### Artistic & Experimental Languages
- **Exotic Phonotactics**: Creating deliberately unusual but speakable systems
- **Aesthetic Phonology**: Crafting euphonious or harsh-sounding languages
- **Signal Languages**: Designing systems for specific communication channels
- **Secret Languages**: Creating systems with deliberate obscurity or clarity

### Technical Applications
- **Speech Recognition**: Generating pronounceable test vocabulary
- **Text-to-Speech**: Creating letter-to-sound rules
- **Voice Synthesis**: Building phonetic inventories for TTS systems
- **Language Learning**: Creating graded vocabulary for acquisition studies
- **Voice Acting**: Providing phonetically consistent alien/species languages

### Educational Uses
- **Phonetics Courses**: Teaching syllable structure and phonotactics
- **Linguistics Courses**: Demonstrating typological variation
- **Language Technology**: Showing interface between phonology and orthography
- **Cognitive Science**: Modeling human language processing constraints

## Best Practices

### For Naturalistic Design
1. **Respect Universals**: Don't violate absolute universals (e.g., every language has vowels)
2. **Follow Implicational Universals**: If X then usually Y (e.g., if tone then usually fewer vowels)
3. **Consider Frequency**: More common patterns should be more frequent in lexicon
4. **Allow Some Markedness**: A few rare or marked constructions increase realism
5. **Think Diachronically**: Consider how the system could have evolved from earlier states

### For Artistic/Experimental Design
1. **Know the Rules Before Breaking Them**: Understand why constraints exist before violating them
2. **Have a Purpose**: Make unusual choices serve artistic or conceptual goals
3. **Maintain Internal Consistency**: If you break a rule in one place, have a reason
4. **Consider Learnability**: Even alien languages should be learnable by your intended audience
5. **Balance Familiarity and Novelty**: Mix known patterns with innovative twists

### For Technical Applications
1. **Test Thoroughly**: Generate large samples to verify no illegal forms slip through
2. **Consider Processing Load**: Complex phonotactics increase computational demands
3. **Think About Robustness**: How will the system handle noise or errors?
4. **Plan for Extension**: Leave room for future expansion of the phonological system
5. **Document Assumptions**: Make your design decisions clear for future modification

## Limitations & Considerations

### Model Boundaries
- **Abstract vs. Concrete**: Models phonotactics but not detailed articulation
- **Static vs. Dynamic**: Represents a snapshot, not ongoing change
- **Idealized vs. Real**: Doesn't model performance errors or dialect variation
- **Segmental Focus**: Less strong on suprasegmental features (tone, stress, intonation)

### Design Trade-offs
- **Complexity vs. Learnability**: More complex systems harder to acquire
- **Regularity vs. Naturalness**: Perfectly regular systems can feel artificial
- **Universality vs. Specificity**: Over-reliance on universals can miss language-specific quirks
- **Generality vs. Detail**: High-level rules may miss important low-level details

### Evaluation Criteria
1. **Pronounceability**: Can actual humans produce these sequences?
2. **Learnability**: Could a child acquire this system from input?
3. **Typological Plausibility**: Does it resemble known human languages?
4. **Process Consistency**: Do the phonological rules fit together coherently?
5. **Lexical Coherence**: Do words share phonological patterns sensibly?
6. **Orthographic Fit**: Does the system work well with intended writing system?

## Future Developments
Potential enhancements could include:
- **Stochastic Phonotactics**: Probabilistic rather than categorical grammars
- **Gradient Well-formedness**: Modeling acceptability judgments rather than binary legal/illegal
- **Interaction with Prosody**: Better integration of tone, stress, and intonation
- **Morphophonological Interface**: Deeper integration with morphological structure
- **Historical Layers**: Modeling multiple stages of sound change
- **Dialectal Variation**: Generating related but distinct varieties
- **Second Language Acquisition**: Modeling phonotactic transfer from L1
- **Speech Error Prediction**: Anticipating likely mispronunciations based on phonotactics

The SyllableForge module provides a sophisticated, linguistically grounded approach to generating phonotactic systems that balance universality with language-particular specificity, enabling the creation of pronounceable, typologically plausible constructed languages for artistic, technical, or educational purposes.