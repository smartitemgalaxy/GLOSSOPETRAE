# GlyphForge Module

## Purpose
GlyphForge creates beautiful, functional writing systems for your constructed language. It takes the abstract structure of a script (defined by ScriptGenerator) and turns it into actual, readable symbols - complete with stroke order, aesthetic consistency, and linguistic intelligence.

## What It Does
- Generates vector graphics (SVG) for each character in your writing system
- Ensures all glyphs belong to the same visual "family" through a "style genome"
- Applies linguistic intelligence: similar sounds get similar-looking symbols
- Supports multiple writing directions (left-to-right, right-to-left, top-to-bottom, boustrophedon)
- Creates writing systems appropriate to their linguistic type (alphabet, abjad, abugida, syllabary, etc.)

## Key Features
### Smart Design System
- **Style Genome**: Each language gets a unique visual DNA (stroke weight, slant, curvature preference) that makes all glyphs feel related
- **Featural Consistency**: Sounds made in the same part of the mouth (like /p/, /b/, /m/) share base shapes; voicing adds consistent marks
- **8 Aesthetic Styles**: From angular (chiseled stone) to organic (hand-written) to blocky (digital) to cursive (flowing)

### Script Type Support
- **Alphabet**: Separate symbols for consonants and vowels (like English, Russian)
- **Abjad**: Consonants only, vowels as optional diacritics (like Arabic, Hebrew)
- **Abugida**: Consonant base with vowel modifiers (like Devanagari, Thai)
- **Syllabary**: One symbol per syllable (like Japanese kana, Cherokee)
- **Featural**: Symbols built from articulatory features (like Korean Hangul)
- **Logographic**: Symbols represent words/concepts with semantic components (like Chinese)

### Technical Excellence
- **Pure SVG Output**: No dependencies, works anywhere SVG is supported
- **Deterministic**: Same seed = identical output every time
- **100x100 viewBox**: Consistent scaling for easy integration
- **Stroke Order Data**: Includes proper writing sequence for each glyph

## Usage Example
```javascript
import { GlyphForge } from './src/modules/GlyphForge.js';
import { ScriptGenerator } from './src/modules/ScriptGenerator.js';
import { PhonemeSelector } from './src/modules/PhonemeSelector.js';

// First, generate your language basics
const phonemeSelector = new PhonemeSelector(Math.random());
const phonemes = phonemeSelector.select();

const scriptGen = new ScriptGenerator(Math.random(), {
  phonemes: phonemes,
  preference: 'featurish',  // Want featural-like qualities
  direction: 'ltr'          // Left-to-right like English
});
const scriptSpec = scriptGen.generate();

// Now create the actual glyphs
const glyphForge = new GlyphForge(Math.random(), {
  scriptSpec: scriptSpec,
  aesthetic: 'organic',     // Hand-written, slightly uneven look
  strokeWidth: 2,           // Thicker strokes for clarity
  serifChance: 0.3          // 30% chance of serifs on stroke ends
});

const glyphs = glyphForge.forge();  // Returns SVG strings for each character

// Example: get the glyph for the letter "a"
const aGlyph = glyphs.get('a') || glyphs.get('ɑ');  // Might be different symbol
console.log(aGlyph.svg);  // The actual SVG code
console.log(aGlyph.strokeOrder);  // Array of points showing how to write it
```

## Best Practices
1. **Match Aesthetic to Culture**: 
   - Stone carvings → 'angular' or 'chiseled'
   - Ink on paper → 'organic' or 'cursive'
   - Digital displays → 'pixel' or 'geometric'
   - Religious texts → 'ornate' or 'calligraphic'

2. **Consider Writing Direction**:
   - Left-to-right: European languages
   - Right-to-left: Semitic-inspired scripts
   - Top-to-bottom: Traditional Mongolian, Chinese
   - Boustrophedon: "ox-plowing" (alternating directions) for ancient feel

3. **Test Readability**:
   - Generate common words and see if they're visually distinct
   - Check for confusingly similar glyphs (like 'I' and 'l' in some fonts)
   - Ensure diacritics are clearly visible but not overwhelming

4. **Leverage Featural Design**:
   - If using featural or semi-featural approach, related sounds will have visual similarities
   - This helps learners predict pronunciation from spelling

## Common Pitfalls
- ❌ Overly complex glyphs that are hard to write quickly
- ❌ Too little distinction between similar sounds (causing reading errors)
- ❌ Ignoring cultural context (a warrior culture shouldn't have overly delicate script)
- ❌ Forgetting that writing direction affects how the language "feels"

## Integration with Other Modules
GlyphForge receives input from:
- **ScriptGenerator**: Defines the type of script (alphabet, abjad, etc.) and directional preferences
- **PhonemeSelector**: Provides the actual sounds that need symbols
- **LanguageAttributes**: May influence aesthetic choices based on cultural traits

It outputs to:
- **Exporter**: Can save SVGs as files or create font files
- **TranslationEngine**: Uses the glyphs for rendering text in your language
- **SteganographyEngine**: Can hide messages in subtle glyph variations

## Pro Tip
Try creating a "handwritten" version of your script by:
1. Generating with 'organic' aesthetic
2. Adding slight random stroke variation
3. Creating multiple versions of common letters (like different ways to write 'a')
4. This mimics real-world writing variation and adds authenticity!

For maximum realism, consider that early writing systems often started as pictographs and gradually abstracted - you could simulate this evolution by starting with complex glyphs and simplifying them over "generations" of your language's history.
