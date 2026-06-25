# Script Generator Module

## Purpose
The Script Generator creates your language's writing system - deciding how those beautiful phonemes you selected will be visually represented. It determines everything from whether you use an alphabet (like English) or syllabary (like Japanese kana) to which direction your text flows and how aesthetically pleasing it looks.

## What It Does
- Chooses the most appropriate script type based on your language's phonological complexity
- Designs coherent character sets that follow consistent visual principles
- Sets text direction (left-to-right, right-to-left, top-to-bottom, etc.)
- Creates accompanying systems: numerals, punctuation, romanization
- Applies aesthetic themes to make your script visually distinctive

## Script Types Explained
The generator intelligently selects from five main types based on linguistic fit:

### 🔤 Alphabet (35% probability)
- **What**: One symbol per consonant and vowel (e.g., Latin, Cyrillic)
- **Best for**: Languages with moderate consonant-vowel complexity
- **Pros**: Easy to learn, precise phonetic representation
- **Cons**: Can have many symbols if language has complex phonology

### 📿 Abjad (15% probability)
- **What**: Consonants primary, vowels optional/diacritic (e.g., Arabic, Hebrew)
- **Best for**: Semitic languages or when you want ancient/mystical feel
- **Pros**: Faster writing, fewer symbols needed
- **Cons**: Requires context to read accurately, challenging for learners

### 🔤 Abugida (20% probability)
- **What**: Consonant base with inherent vowel + diacritics for other vowels (e.g., Devanagari, Ethiopic)
- **Best for**: Languages with many consonant-vowel combinations
- **Pros**: Efficient for CV-heavy languages, beautiful conjunct forms
- **Cons**: Complex to typeset, steep learning curve

### 📚 Syllabary (20% probability)
- **What**: One symbol per syllable (e.g., Japanese Kana, Cherokee)
- **Best for**: Languages with simple syllable structure (CV predominates)
- **Pros**: Very readable, minimal ambiguity
- **Cons**: Large symbol inventories for complex phonologies, inefficient for CCV syllables

### ⚙️ Featural (5% probability)
- **What**: Symbol components represent phonetic features (e.g., Korean Hangul)
- **Best for**: When you want a "scientific" or constructed feel
- **Pros**: Highly systematic, featural transparency aids learning
- **Cons**: Can feel artificial, requires explanation to understand

## Key Features
### Intelligent Type Selection
The module doesn't randomly pick - it considers:
- **Consonant-to-vowel ratio**: High ratios favor abugidas/abjads
- **Syllable structure complexity**: Simple CV → syllabary, complex clusters → alphabet
- **Phoneme inventory size**: Very large inventories may trigger featural approaches
- **Cultural aesthetic preferences** (if specified)

### Directionality Options
- Left-to-right (LTR): Most common globally
- Right-to-left (RTL): Semitic scripts influence
- Top-to-bottom (TTB): Traditional East Asian
- Bottom-to-top (BTT): Rare but used in some indigenous scripts
- Boustrophedon: Alternating directions (like ancient Greek)

### Aesthetic System
Choose from visual themes:
- **Geometric**: Straight lines, perfect circles, minimal curves
- **Organic**: Flowing, calligraphic, brush-stroke inspired
- **Angular**: Sharp corners, chisel-cut appearance
- **Rounded**: Soft curves, no sharp edges
- **Monoline**: Uniform stroke width throughout
- **Contrast**: Thick/thin variation like broad-nib pen
- **Geometric**: Based on squares, triangles, hexagons
- **Organic**: Flowing, calligraphic, brush-stroke inspired
- **Angular**: Sharp corners, chisel-cut appearance
- **Rounded**: Soft curves, no sharp edges
- **Monoline**: Uniform stroke width throughout
- **Contrast**: Thick/thin variation like broad-nib pen
- **Gothic**: Blackletter-style dense texture
- **Futuristic**: Minimalist, sci-fi inspired
- **Ancient**: Weathered, stone-carved appearance
- **Technical**: Blueprint/schematic style

## Usage Example
```javascript
import { ScriptGenerator } from './src/modules/ScriptGenerator.js';
import { PhonemeSelector } from './src/modules/PhonemeSelector.js';

// First, get your phonemes
const phonemeSelector = new PhonemeSelector(Math.random());
const phonemes = phonemeSelector.select();

// Now generate a matching script
const scriptGenerator = new ScriptGenerator(
  Math.random(),           // Random number generator
  phonemes,               // Pass in your phonology for informed decisions
  {
    preference: 'elegant', // Want something beautiful to write
    avoid: ['logographic'], // Prefer phonetic over logographic
    direction: 'LTR',      // Explicitly set left-to-right
    aesthetic: 'calligraphic' // Flowing, pen-based style
  }
);

const script = scriptGenerator.generate();
console.log(script.typeName); // e.g., "Abugida"
console.log(script.direction); // e.g., { code: 'LTR', name: 'Left-to-Right' }
console.log(script.characters.length); // Number of unique glyphs
console.log(script.orthography.sample); // Writing sample

// Access specific systems
console.log(`Numerals: 0=${script.numerals['0']}, 1=${script.numerals['1']}`);
console.log(`Punctuation: ${Object.values(script.punctuation).join(' ')}`);
```

## Pro Tips for Optimal Results

### Match Script Type-Script Type Selection Strategy:**
- For **engineered/conlangs**: Consider featural for maximum systematicity
- For **naturalistic languages**: Let the algorithm choose based on your phonology
- For **magic/ancient scripts**: Logographic or abjad with RTL direction feels authentic
- For **computer-friendly**: Alphabet with simple geometric shapes works best

### Directionality Considerations
- LTR: Familiar to ~70% of world population
- RTL: Instantly conveys "Middle Eastern" or "ancient" vibe
- TTB: Excellent for vertical inscriptions, banners, or East Asian aesthetics
- Boustrophedon: Fun for decorative purposes or ancient replica texts
- **Pro tip**: Match direction to your culture's writing tools (chisel → vertical, brush → vertical/horizontal, pen → horizontal)

### Aesthetic Integration
- **Consistency is key**: Apply the same aesthetic to numbers, punctuation, and special symbols
- **Context matters**: A razor-sharp angular script might feel wrong for a peaceful, agricultural society
- **Evolution hint**: Consider creating an "ancient" version (more pictographic) and "modern" version (more abstract) of the same script

### Avoiding Common Pitfalls
- Don't pair a complex logographic system with simple phonology (overkill)
- Avoid RTL scripts with left-handed dominant cultures (historically awkward)
- Remember that cursive/connected forms often differ significantly from printed forms
- Punctuation often develops later - consider if your early script needs it at all

## Applications Beyond Writing
Your script generates systems useful for:
- **Tattoo design**: Meaningful, aesthetically pleasing symbols
- **Game/UI design**: Futuristic or ancient-looking interfaces
- **Cryptography**: Symbol substitution bases
- **Art projects**: Calligraphy, typography, generative art
- **Linguistic experimentation**: Testing Sapir-Whorf hypotheses with writing systems
- **Accessibility**: Creating tactile or symbol-based communication systems
