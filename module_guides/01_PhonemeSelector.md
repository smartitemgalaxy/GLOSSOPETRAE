# Phoneme Selector Module

## Purpose
The Phoneme Selector is the foundational building block of your constructed language (conlang). It generates a phoneme inventory - the basic set of sounds that make up your language - while respecting linguistic universals and natural language patterns.

## What It Does
- Selects consonants and vowels that commonly co-occur in real languages
- Ensures your phoneme inventory is typologically plausible (sounds like it could be a real human language)
- Respects implicational hierarchies (e.g., if a language has voiced stops, it almost always has voiceless stops)
- Allows you to bias toward certain sound qualities (harsh, flowing, exotic, etc.)

## Key Features
### Inventory Sizing
- Automatically selects appropriate numbers of consonants (typically 15-25) and vowels (typically 5-7)
- Based on statistical analysis of world languages

### Feature Controls
- Toggle specific sound types: voiced stops, affricates, fricatives, nasals
- Set rarity thresholds to exclude extremely uncommon sounds
- Choose aesthetic preferences: harsh (more consonants), flowing (more vowels), balanced, or exotic

### Linguistic Realism
- Avoids impossible or highly atypical sound combinations
- Maintains proper sonority hierarchies
- Respects feature geometry (e.g., you won't get a labial palatal stop)

## Usage Example
```javascript
import { PhonemeSelector } from './src/modules/PhonemeSelector.js';

// Create a selector with default settings (balanced English-like inventory)
const phonemeSelector = new PhonemeSeeder(Math.random());

// Or customize for specific goals:
const exoticSelector = new PhonemeSelector(Math.random(), {
  preference: 'exotic',           // Seek unusual but possible sounds
  allowVoicedStops: false,        // No voiced stops (like b, d, g)
  consonantCount: [20, 30],       // Larger consonant inventory
  vowelCount: [3, 5],             // Smaller vowel inventory
  rarityThreshold: 0.1            // Include even rare sounds
});

const phonemes = phonemeSelector.select();
console.log(phonemes);
/*
Returns object like:
{
  consonants: ['p', 't', 'k', 'q', 's', 'ʃ', 'x', 'χ', 'm', 'n', 'ŋ', 
               'l', 'ɬ', 'ʎ', 'j', 'w', 'ɾ', 'ʀ'],
  vowels: ['i', 'u', 'a', 'e', 'o']
}
*/
```

## Best Practices
1. **Start Simple**: Begin with default settings to get a feel for natural inventories
2. **Purpose-Driven Design**: 
   - For alien languages: try 'exotic' preference with unusual consonant clusters
   - for elf-like languages: 'flowing' preference with more liquids and glides
   - for harsh/guttural languages: increase back consonants (q, χ, ʀ)
3. **Iterate**: Generate several inventories and listen to how they "feel" when spoken
4. **Check Balance**: Ensure you have stops, fricatives, nasals, and liquids for articulatory variety

## Common Pitfalls
- ❌ Too many similar sounds (e.g., both dental and alveolar stops without reason)
- ❌ Ignoring vowel-consonant balance (too many consonants makes language harsh and hard to learn)
- ❌ Including impossible combinations (like labial palatal stops without intermediate steps)

## Integration with Other Modules
The phoneme output feeds directly into:
- **SyllableForge**: builds syllable structures from your phonemes
- **MorphologyWeaver**: uses phonemes to create morphemes
- **GlyphForge**: designs writing systems based on your phoneme inventory

## Pro Tip
Try generating 3-5 different inventories with varying preferences, then say simple words (like "water", "fire", "stone") using each set. The one that most closely matches your intended language "feel" is likely the right choice!
