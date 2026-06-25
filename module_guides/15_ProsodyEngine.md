# 15_ProsodyEngine Module

## Overview
The ProsodyEngine module generates complete prosodic systems for constructed languages, including tone systems, stress patterns, intonation contours, and rhythm types. It creates phonologically realistic suprasegmental features that work in tandem with segmental phonology to produce natural-sounding speech patterns.

## Core Concept
ProsodyEngine models the "music of language" – the suprasegmental features that operate above individual sounds. It generates coherent systems where tone, stress, intonation, and rhythm work together to create linguistically plausible prosodic patterns appropriate for the language's typological profile.

## Key Features

### Tone System Generation
- **Tone Inventories**: Creates systems with 2-8 tones (level, contour, or mixed)
- **Tone Sandhi**: Generates context-dependent tone changes (tonal assimilation, dissimilation)
- **Tone-Bearing Units**: Assigns tones to syllables, moras, or words
- **Diacritic Systems**: Provides appropriate tone marking conventions

### Stress System Generation
- **Stress Types**: Fixed, weight-sensitive, lexical, or morphological stress systems
- **Primary/Secondary Stress**: Generates main stress patterns with optional secondary stress
- **Stress Effects**: Models vowel reduction, lengthening, and pitch accent phenomena
- **Quantity Sensitivity**: Creates stress systems sensitive to syllable weight (moras)

### Intonation Modeling
- **Sentence Types**: Distinct contours for statements, questions (yes-no, wh-), and exclamations
- **Discourse Functions**: Continuation, contrastive focus, and boundary signaling
- **Boundary Tones**: Models edge tones at phrase and utterance boundaries
- **Final Lowering**: Implements declarative sentence-final pitch decline

### Rhythm Typology
- **Timing Classes**: Stress-timed, syllable-timed, or mora-timed rhythm
- **Isochrony Principles**: Models equal timing of prosodic units (stresses, syllables, morae)
- **Duration Effects**: Captures language-specific duration patterns and reductions

## Usage Example
```javascript
import { ProsodyEngine } from './src/modules/ProsodyEngine.js';
import { SeededRandom } from '../utils/random.js';

// Create a random number generator
const random = new SeededRandom(42);

// Configure prosody parameters
const config = {
  hasTone: true,
  hasStress: true,
  complexityLevel: 'moderate',
  toneCount: 4,           // Force 4-tone system
};

// Create the prosody engine
const prosodyEngine = new ProsodyEngine(random, config);

// Generate the prosodic system
const prosody = prosodyEngine.generate();

console.log('Tone System:', prosody.tone.description);
console.log('Tones:', prosody.tone.tones.map(t => `${t.name} (${t.pitch})`).join(', '));
console.log('Stress System:', prosody.stress.description);
console.log('Rhythm Type:', prosody.rhythm.type);
console.log('Summary:', prosody.summary);

// Access specific features
if (prosody.tone.sandhi) {
  console.log('Tone Sandhi Rules:');
  prosody.tone.sandhi.rules.forEach(rule => {
    console.log(`  ${rule.rule} → ${rule.result}`);
  });
}

console.log('Intonation Patterns:');
prosody.intonation.patterns.forEach(pattern => {
  console.log(`  ${pattern.type}: ${pattern.contour}`);
});

// Prosodic markers for transcription
console.log('Stress Markers:', prosody.markers.stress);
if (prosody.markers.tone) {
  console.log('Tone Markers:', prosody.markers.tone.markers);
}
console.log('Intonation Markers:', prosody.markers.intonation);
```

## Configuration Options
The ProsodyEngine constructor accepts a configuration object:
- `hasTone`: Boolean to enable/disable tone system (default: random 35% chance)
- `hasStress`: Boolean to enable/disable stress system (default: true)
- `complexityLevel`: 'simple', 'moderate', or 'complex' (default: 'moderate')
- `toneCount`: Specific number of tones to generate (optional)
- Prosody features can be overridden for specific language types

## Generated Prosody Structure
The `generate()` method returns an object with:

### Tone System (if enabled)
- `count`: Number of contrastive tones
- `type`: 'register', 'contour', or 'mixed'
- `tones`: Array of tone objects with properties:
  - `name`: Tone name (high, low, rising, etc.)
  - `pitch`: Numerical pitch contour (e.g., '55' for high level)
  - `diacritic`: IPA diacritic for tone marking
  - `number`: Tone number (1, 2, 3...)
  - `description`: Human-readable description
- `sandhi`: Tone sandhi rules (if any) with:
  - `rules`: Array of sandhi rule objects
  - `description`: Summary of sandhi phenomena
- `domain`: Tone-bearing unit ('syllable', 'mora', or 'word')

### Stress System (if enabled)
- `type`: 'fixed', 'weight-sensitive', 'lexical', 'morphological', or 'none'
- `primary`: Primary stress pattern specifications
- `secondary`: Secondary stress pattern (if present)
- `effects`: Array of phonetic effects of stress
- `description`: Human-readable description

### Intonation System
- `patterns`: Array of intonation contour objects for:
  - Statements
  - Yes-no questions
  - WH-questions
  - Continuation
  - Focus (optional)
- `finalLowering`: Boolean for sentence-final pitch decline
- `boundaryTones`: Boolean for edge tone marking

### Rhythm System
- `type`: 'stress-timed', 'syllable-timed', or 'mora-timed'
- `description`: Human-readable rhythm type description
- `characteristics`: Array of rhythmic properties
- `examples`: Natural language examples

### Prosodic Markers
- `stress`: Primary (ˈ) and secondary (ˌ) stress markers
- `tone`: Tone marking system (if tone present)
- `intonation`: Unicode symbols for intonation contours (↗, ↘, →, |)

### Summary
- `summary`: Comma-separated string describing the overall prosodic system

## Prosodic Features Explained

### Tone Systems
- **Register Tones**: Level pitches (high, mid, low) - common in African languages
- **Contour Tones**: Pitch movements (rising, falling, dipping) - common in Asian languages
- **Mixed Systems**: Combination of level and contour tones
- **Tone Sandhi**: Contextual tone changes (e.g., Mandarin tone 3 sandhi)
- **Tone Domains**: The unit to which tones are assigned

### Stress Systems
- **Fixed Stress**: Predictable position (initial, penultimate, final)
- **Weight-Sensitive Stress**: Attracted to heavy syllables (moras)
- **Lexical Stress**: Unpredictable, must be memorized per word
- **Morphological Stress**: Depends on affixation patterns
- **Stress Effects**: Vowel reduction, lengthening, pitch accompaniment

### Intonation Patterns
- **Statements**: Typically falling pitch (↘)
- **Yes-No Questions**: Typically rising pitch (↗)
- **WH-Questions**: Often falling or level pitch
- **Continuation**: Sustained or slightly rising pitch for non-final clauses
- **Focus/Empasis**: Pitch prominence on highlighted elements

### Rhythm Types
- **Stress-Timed**: Equal time between stresses (English, German, Russian)
  - Characteristics: Vowel reduction, consonant clustering
- **Syllable-Timed**: Equal time per syllable (Spanish, French, Yoruba)
  - Characteristics: Minimal reduction, clear syllable boundaries
- **Mora-Timed**: Equal time per mora (Japanese, Finnish)
  - Characteristics: Vowel length distinction, consonantal morae

## Integration Points
ProsodyEngine works closely with:
- **PhonemeSelector**: Provides phonological inventory for segmental context
- **SyllableForge**: Informs syllable structure for mora/timing calculations
- **MorphologyWeaver**: Supplies morphological structure for stress assignment
- **LexiconGenerator**: Provides word forms for prosodic application
- **NameForge**: Ensures generated names respect prosodic constraints
- **AudioForge**: Drives speech synthesis with proper prosody
- **TranslationEngine**: Maintains prosodic consistency in translation

## Best Practices
1. **Typological Consistency**: Match prosody to language type (tonal languages often have simpler stress)
2. **Feature Interaction**: Consider how tone, stress, and rhythm interact (e.g., tone languages may lack stress)
3. **Naturalistic Constraints**: Respect typological universals (very few languages have both complex tone and complex stress)
4. **Cultural Plausibility**: Match prosody to geographic/areal features when relevant
5. **Learnability**: Consider cognitive load of the prosodic system for language learners
6. **Transcription Feasibility**: Ensure chosen marking system is practical for written representation

## Example Outputs
### Mandarin-like Tone Language
```
Tone System: 4-tone contour system
Tones: high (55), rising (35), low-dipping (214), falling (51)
Stress System: No stress system (tone language)
Rhythm Type: syllable-timed
Summary: 4-tone contour system, syllable-timed rhythm
```

### English-like Stress Language
```
Tone System: No tone system
Stress System: Weight-sensitive stress system
Rhythm Type: stress-timed
Summary: Weight-sensitive stress system, stress-timed rhythm
```

### Japanese-like Mora Language
```
Tone System: No tone system (pitch accent Optional)
Stress System: No stress system (pitch accent language)
Rhythm Type: mora-timed
Summary: mora-timed rhythm
```

### Complex Tone+Stress Language (e.g., Swedish)
```
Tone System: 2-tone register system (accent 1/acute, accent 2/grave)
Stress System: Fixed initial stress with secondary stress
Rhythm Type: stress-timed
Summary: 2-tone register system, fixed initial stress, stress-timed rhythm
```

The ProsodyEngine module enables linguistically sophisticated prosodic modeling that brings constructed languages to life with natural-sounding speech rhythms, intonation patterns, and suprasegmental features essential for authentic pronunciation and prosodic transcription.