# 14_NameForge Module

## Overview
The NameForge module generates procedurally correct personal names, place names, and language endonyms (native names) for constructed languages. It compounds semantically meaningful lexicon roots with phonotactic repair at morpheme boundaries, ensuring names are both meaningful and pronounceable within the language's phonological system.

## Core Concept
NameForge creates meaning-bearing names by combining lexicon roots (like "bright" + "wolf" or "stone" + "river") while applying phonological repairs at morpheme boundaries to prevent illegal consonant clusters or vowel collisions. Each generated name includes semantic components and meanings, making it suitable for worldbuilding, character creation, and toponymy.

## Key Features

### Semantic Name Generation
- **Person Names**: Generates given names with optional gender shaping (male/female/any)
- **Place Names**: Creates toponyms by combining descriptive modifiers with geographic features (river, mountain, forest, etc.)
- **Language Endonyms**: Forges authentic-sounding native names for the language itself

### Phonotactic Integrity
- **Consonant Repair**: Inserts epenthetic vowels at consonant-consonant boundaries
- **Vowel Degemination**: Drops duplicate vowels at vowel-vowel boundaries
- **Length Normalization**: Ensures names fall within 2-4 syllable range
- **Gender Shaping**: Adjusts final vowels to match male/female patterns using the language's own vowel inventory

### Deterministic Generation
- Seeded from language.seed with fixed module offset
- Same language input always produces identical name sequences
- Independent RNG stream prevents interference with other modules

### Rich Semantic Fields
Draws from semantically rich lexicon categories:
- Nature, Animals, Plants, Materials
- Properties, Qualities, Human Qualities, Colors
- Warfare, Religion, Supernatural, Natural Phenomena
- Heroic concepts boosted for name-worthiness (wolf, bear, sword, crown, etc.)

## Usage Example
```javascript
import { NameForge } from './src/modules/NameForge.js';
import { PhonemeSelector } from './src/modules/PhonemeSelector.js';
import { MorphologyWeaver } from './src/modules/MorphologyWeaver.js';
import { LexiconGenerator } from './src/modules/LexiconGenerator.js';

// Generate language components first
const phonemeSelector = new PhonemeSelector(42);
const phonemes = phonemeSelector.select();

const morphologyWeaver = new MorphologyWeaver(42, {
  phonemes: phonemes,
  type: 'agglutinative'
});

const lexiconGenerator = new LexiconGenerator(42, {
  semanticFields: ['Nature', 'HumanQualities', 'Warfare', 'Materials'],
  phonemes: phonemes,
  morphology: morphologyWeaver.getMorphemes()
});

const language = {
  seed: 12345,
  phonology: phonemeSelector.getPhonology(),
  lexicon: lexiconGenerator.generate(),
  morphology: morphologyWeaver.getMorphemes()
};

// Create the name forge
const nameForge = new NameForge(language);

// Generate person names
const personName = nameForge.personName({ gender: 'female', style: 'compound' });
console.log(`Female name: ${personName.name} (${personName.meaning})`);
// Output: Female name: Brightwolf (bright-wolf)

const personName2 = nameForge.personName({ gender: 'male', style: 'simple' });
console.log(`Male name: ${personName2.name} (${personName2.meaning})`);
// Output: Male name: Stone (stone)

// Generate place names
const placeName = nameForge.placeName({ feature: 'mountain' });
console.log(`Place name: ${placeName.name} (${placeName.meaning})`);
// Output: Place name: Stone Mountain (stone-mountain)

// Generate language endonym
const languageName = nameForge.nameLanguage();
console.log(`Language name: ${languageName.name} (${languageName.meaning})`);
// Output: Language name: Truespeech (true speak)

// Batch generation
const personNames = nameForge.generate('person', 5, { gender: 'any' });
const placeNames = nameForge.generate('place', 3, { feature: 'river' });
```

## Configuration Options
NameForge requires a language object with these properties:
- `language.seed`: Numeric seed for deterministic generation
- `language.phonology`: Object containing vowels and consonants arrays
- `language.lexicon`: Object with entries array containing lemma and gloss properties
- `language.morphology` (optional): Object containing wordOrder.adjectivePosition

## Generated Name Structure
Each generated name returns an object with:
- `name`: The capitalized, phonotactically repaired name string
- `meaning`: Hyphenated glosses of the component roots
- `components`: Array of objects with `form` (lemma) and `gloss` (meaning) for each root
- `gender`: For person names - 'female', 'male', or 'any'
- `style`: 'simple' (single root) or 'compound' (two roots)
- `feature`: For place names - geographic feature type (river, mountain, etc.)

## Phonotactic Repair Rules
NameForge applies these repairs when joining roots:
1. **Consonant + Consonant**: Insert epenthetic vowel (most frequent vowel in language)
   - Example: "stone" + "river" → "stone-eriver" (if epenthetic vowel is 'e')
2. **Vowel + Same Vowel**: Degeminate (drop one vowel)
   - Example: "sea" + "eagle" → "seaeagle" → "seagale" (if both end/start with 'e')
3. **Vowel + Different Vowel**: Keep both vowels
   - Example: "sea" + "ivory" → "seaivory"

## Gender Shaping
Person names can be shaped toward gender-appropriate endings:
- **Female names**: Tend to end in language's preferred female vowel (often 'a' or 'i')
- **Male names**: Tend to end in language's preferred male vowel (often 'o' or 'u') or may retain final consonant
- **Any gender**: No ending modification applied

## Length Normalization
Names are kept within a 2-4 syllable range:
- **Too long (>4 syllables)**: Truncated to the final root only
- **Too short (<2 syllables)**: Padded with consonant + epenthetic vowel or just epenthetic vowel

## Integration Points
NameForge works closely with:
- **PhonemeSelector**: Provides phonological inventory for epenthetic vowels and gender shaping
- **MorphologyWeaver**: Informs word order (adjective placement) for compound ordering
- **LexiconGenerator**: Supplies the semantic root pools from which name components are drawn
- **ScriptGenerator**: Influences orthographic choices for how names are written
- **AudioForge**: Can generate authentic pronunciation of forged names

## Best Practices
1. **Seed Consistency**: Use the same language.seed across all modules for coherent language generation
2. **Semantic Coherence**: Select lexicon fields that match your culture's environment and values
3. **Gender Consideration**: Decide early if your culture distinguishes gendered names
4. **Cultural Authenticity**: Choose geographic features that match your world's terrain
5. **Iterative Refinement**: Generate multiple names and select those that best fit your cultural vision

## Example Output
When generating names for a language with Nordic-inspired phonology and lexicon:

**Person Names:**
- Female: Astridbjörg (ás-trid-björg) - "divine beauty-protection"
- Male: Eiriksson (ei-rik-son) - "ever-rich son"
- Any: Wolfharth (wolf-harth) - "wolf hardy"

**Place Names:**
- River: Silverström (silver-ström) - "silver stream"
- Mountain: Stonefjell (stone-fjell) - "stone mountain"
- Forest: Greenwood (green-wood) - "green wood"

**Language Endonym:**
- Norrænt Tongue (nor-rænt-tung) - "Nordic tongue"

The NameForge module enables rich, semantically meaningful nomenclature that feels authentic to the constructed language's cultural and phonological context.