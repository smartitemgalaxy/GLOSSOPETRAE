# 18_SemanticStego Module

## Overview
The SemanticStego module implements cutting-edge linguistic steganography techniques for covert communication within generated languages. Based on 2025 research in large language model steganography and guardrail evasion, it enables embedding hidden messages in seemingly without raising the Stegano hidden messages are embedded in the statistical, semantic, and structural properties of language in ways that are undetectable to casual observation but decodable by those who know the encoding scheme.

## Core Concept
SemanticStego implements multiple layers of steganographic encoding:
1. **Semantic Layer**: Encoding bits in synonym choice and semantic relationships
2. **Morphological Layer**: Encoding bits in grammatical feature selection (tense, aspect, mood)
3. **Structural Layer**: Encoding bits in word order and syntactic construction
4. **Orthographic Layer**: Encoding bits in invisible characters and homoglyphs
5. **Evasion Layer**: Techniques to bypass AI content filters and detection systems

The module provides both the theoretical framework for designing stenographic languages and practical tools for implementing covert channels within generated languages.

## Key Features

### 1. Multi-layer Encoding Capacity
- **Binary Encoding**: 1 bit per decision point (yes/no choices)
- **Quaternary Encoding**: 2 bits per decision point (4-way choices)
- **Octal Encoding**: 3 bits per decision point (8-way choices)
- **Adaptive Capacity**: Automatically calculates available bandwidth based on language features

### 2. Linguistic Channels for Embedding
- **Morphological Channel**: Tense, aspect, mood, case, number selections
- **Lexical Channel**: Synonym selection from semantic fields
- **Syntactic Channel**: Word order variations and constituent placement
- **Phonological Channel**: Allomorph selection and phonetic variations
- **Orthographic Character**: Character-level modifications (invisible, homoglyphs, etc.)

### 3. Advanced Evasion Techniques
Based on 2025 Mindgard research:
- **Unicode Tags (U+E0000-E007F)**: ~90% evasion rate against content filters
- **Bidirectional Override**: Right-to-left embedding with ~78% success rate
- **Homoglyph Substitution**: Visual character substitution (~55% success)
- **Zero-width Characters**: Invisible Unicode characters (~60% success)
- **Full-width Characters**: East Asian width variants (~76% success)
- **Leetspeak Variants**: Number-letter substitution (~81% success)

### 4. Plausible Deniability Framework
- **Cover Stories**: Ready-made explanations for anomalous features
- **Attribution Mechanisms**: Blame technical errors, dialect variation, etc.
- **Denial Matrix**: Complete documentation for defending against accusations
- **Natural Variation**: Encodes within bounds of acceptable language variation

### 5. Error Correction & Robustness
- **Adjustable Redundancy**: Configurable error correction levels
- **Detection Resistance**: Techniques validated against modern steganalysis
- **Recovery Mechanisms**: Ability to reconstruct message despite corruption
- **Adaptive Thresholding**: Self-adjusting based on channel capacity

## Technical Implementation

### Core Components
1. **COVERT_SEMANTICS**: Predefined semantic mappings for encoding
2. **EVASION_TECHNIQUES**: Guardrail bypass methods from latest research
3. **COVER_STORIES**: Plausible deniability explanations
4. **SemanticStego Class**: Main implementation with encoding/decoding methods

### Encoding Process
1. **Capacity Analysis**: Examines morphology and lexicon to determine available channels
2. **Scheme Generation**: Creates optimal encoding strategy based on language features
3. **Bit Mapping**: Converts binary data to linguistic choices across multiple channels
4. **Application**: Applies encoding during language generation or post-processing
5. **Evasion Layer**: Adds obfuscation techniques to avoid detection
6. **Documentation**: Generates deniability evidence for plausible denial

### Decoding Process
1. **Feature Extraction**: Identifies linguistic features used for encoding
2. **Reverse Mapping**: Converts observed choices back to bit values
3. **Error Correction**: Applies redundancy to recover damaged data
4. **Message Reconstruction**: Assembles bits into original payload
5. **Validation**: Verifies integrity through checksums or known patterns

### Evasion Techniques Implementation
- **Unicode Tags**: Invisible characters in supplementary private use area
- **Bidirectional Marks**: RLO/LRO characters with PDF for directional control
- **Homoglyphs**: Visually identical characters from different scripts
- **Zero-width Characters**: Non-printing formatting characters
- **Full-width Forms**: East Asian width variants for ASCII range
- **Leetspeak**: Phonetic spelling with number substitutions

## Integration with GLOSSOPETRAE Modules

### With MorphologyWeaver
- Encodes data in tense/aspect/mood selections
- Utilizes case system variations for information transfer
- Leverages number system distinctions (singular/dual/paucal/plural)
- Exploits gender/noun class variations when available

### With LexiconGenerator
- Embeds data in synonym selection within semantic fields
- Uses frequency variations for probabilistic encoding
- Employs register differences (formal/informal, technical/colloquial)
- Utilizes dialectal variants within semantic domains

### With SyntaxGenerator
- Encodes in word order permutations (when flexible)
- Utilizes constituent movement possibilities
- Exploits optional element inclusion/exclusion
- Uses coordination structures for additional capacity

### With Phonological Modules
- Encodes in allomorph selection (phonologically conditioned variants)
- Utilizes stress pattern variations
- Employs intonation contours for suprasegmental encoding
- Uses length distinctions (vowel/consonant gemination)

### With Orthographic Modules
- Encodes in character variants (when multiple representations exist)
- Utilizes punctuation variations for low-bandwidth channels
- Employs diacritic variations as markers
- Uses capitalization patterns for encoding

### With TranslationEngine
- Enables covert channels in translation output
- Allows steganographic markers in loanword handling
- Uses transliteration variations for encoding
- Implements cover stories for unusual output

## Usage Examples

### Basic Steganographic Language Creation
```javascript
import { SemanticStego } from './src/modules/SemanticStego.js';
import { MorphologyWeaver } from './src/modules/MorphologyWeaver.js';
import { LexiconGenerator } from './src/modules/LexiconGenerator.js';
import { PhonemeSelector } from './src/modules/PhonemeSelector.js';

// Generate base language components
const phonemeSelector = new PhonemeSelector(42);
const phonemes = phonemeSelector.select();

const morphologyWeaver = new MorphologyWeaver(42, {
  phonemes: phonemes,
  type: 'agglutinative'
});

const lexiconGenerator = new LexiconGenerator(42, {
  semanticFields: ['Nature', 'HumanQualities', 'Food', 'Technology'],
  phonemes: phonemes,
  morphology: morphologyWeaver.getMorphemes()
});

const language = {
  seed: 12345,
  name: 'StegoLang',
  phonology: phonemeSelector.getPhonology(),
  lexicon: lexiconGenerator.generate(),
  morphology: morphologyWeaver.getMorphemes()
};

// Create steganography system
const stego = new SemanticStego(Math.random, {
  encodingScheme: 'quaternary',  // 2 bits per decision
  coverType: 'semantic',         # Use semantic channels
  redundancy: 3,                 # Triple redundancy for error correction
  plausibleDeniability: true
});

// Generate encoding scheme
const encodingScheme = stego.generateEncodingScheme(
  language.morphology, 
  language.lexicon
);

console.log(`Steganographic capacity: ${encodingScheme.bitsPerSentence} bits per sentence`);
console.log(`Available channels: ${encodingScheme.channels.length}`);

// Generate synonym sets for lexical encoding
const synonymSets = stego.generateSynonymSets(language.lexicon);
console.log(`Available synonym pairs: ${synonymSets.length}`);

// Generate covert morphemes
const covertMorphemes = stego.generateCovertMorphemes(language.morphology);
console.log(`Available morpheme channels: ${covertMorphemes.dataAffixes.length}`);
```

### Applying Covert Encoding to Text
```javascript
// Generate some text in the language
const plainText = "The sun rises in the east and warms the earth";

// Apply steganographic encoding
const stegoText = stego.encode(
  plainText, 
  "Secret message: MEET AT DAWN", 
  language
);

console.log("Plain text:", plainText);
console.log("Stego text:", stegoText);
// To casual observer: "The sun rises in the east and warms the earth"
// To receiver with key: "Secret message: MEET AT DAWN"

// Apply guardrail evasion for additional protection
const evadedText = stego.applyGuardrailEvasion(stegoText, 'unicodeTags');
console.log("Evaded text:", evadedText);
```

### Extracting Hidden Messages
```javascript
// Receiver with shared key extracts the message
const extracted = stego.decode(
  evadedText, 
  language,
  encodingScheme
);

console.log("Extracted message:", extracted.message);
console.log("Confidence:", extracted.confidence);
```

### Creating Plausible Deniability Documentation
```javascript
// Generate documentation to explain anomalies if questioned
const deniability = stego.generateDeniabilityMatrix();
console.log(deniability.description);
console.log("Available explanations:", Object.keys(deniability.explanations));

// Generate stone documentation section
const stoneSection = stego.generateStoneSection();
console.log(stoneSection);
```

### Advanced: Multi-channel Encoding
```javascript
// For maximum capacity, use all available channels
const maxStego = new SemanticStego(Math.random, {
  encodingScheme: 'octal',      # 3 bits per decision
  coverType: 'all',             # Use every available channel
  redundancy: 2,                # Double redundancy
  plausibleDeniability: true
});

// This will utilize:
// - All morphological paradigms (tense, aspect, mood, etc.)
// - All lexical synonym pairs in semantic fields
// - All syntactic variation opportunities
// - All orthographic modification techniques
// - Multiple evasion layers for maximum stealth
```

## Detailed Encoding Methods

### 1. Token Probability Rank Encoding (Norelli & Bronstein, 2025)
Encodes data in the probability ranking of token selections:
- Higher probability tokens = binary 0
- Lower probability tokens = binary 1
- Uses language model perplexity to determine optimal encoding points
- Resistant to statistical analysis due to natural probability distribution

### 2. Semantic-aware Synonym Substitution
Utilizes semantic fields for covert encoding:
- **Binary Pairs**: Direct opposites (hot/cold, fast/slow) for 1 bit/word
- **Quaternary Groups**: Four-way synonyms (walk/run/move/travel) for 2 bits/word
- **Semantic Fields**: Organized by meaning for contextual plausibility
- **Frequency Weighting**: More common words get higher capacity

### 3. Morphological Feature Encoding
Encodes in grammatical paradigms:
- **Tense Encoding**: Past/Present/Future variations
- **Aspect Encoding**: Perfective/Imperfective distinctions
- **Mood Encoding**: Indicative/Subjunctive/Imperative choices
- **Case Encoding**: Nominative/Accusative/Dative variations
- **Number Encoding**: Singular/Plural/Dual/Paucal distinctions
- **Gender Encoding**: Masculine/Feminine/Neuter variations

### 4. Syntactic Structure Encoding
Utilizes structural flexibility:
- **Word Order**: SVO/SOV/VSO variations when permitted
- **Constituent Movement**: Topicalization and focalization options
- **Ellipsis**: Optional element inclusion/exclusion
- **Coordination**: And/Or/But variations in conjunction selection
- **Subordination**: Because/Although/When selections

### 5. Orthographic Character Encoding
Invisible and deceptive character modifications:
- **Unicode Tags**: U+E0000-E007F range (invisible tags)
- **Zero-width Characters**: U+200B (ZWSP), U+200C (ZWNJ), U+200D (ZWJ)
- **Format Controls**: LRM, RLM, LRE, RLE, LRO, RLO, PDF
- **Variation Selectors**: VS1-VS256 for emoji/text variation
- **Homoglyphs**: Cyrillic 'а' vs Latin 'a', Greek 'ο' vs Latin 'o'
- **Full-width Forms**: FF01-FF5E for ASCII range variants
- **Small Caps**: Unicode small capital variants

### 6. Evasion Technique Implementation
Based on empirical testing against content filters:

#### High Success (>90%)
- **Unicode Tags**: Nearly universal bypass due to filtering oversight
- ** emoji Variation Sequences**: Emoji base on some systems
- **Bidirectional Controls**: RLO/LRO with PDF for directional embedding
- **Full-width Characters**: East Asian variants confuse ASCII-based filters
- **Homoglyph Attacks**: Script substitution bypasses character blacklists

#### Moderate Success (40-80%)
- **Leetspeak Substitution**: Number-letter replacement (4 for A, 3 for E)
- **Diacritic Variations**: Accented vs unaccented characters
- **Case Alternation**: Irregular capitalization patterns
- **Spacing Variations**: Non-standard word spacing
- **Punctuation Variants**: Full-width vs half-width punctuation

## Security Considerations

### Threat Model
Assuming adversary with:
- Access to stego-object (the carrier text)
- Knowledge of steganographic algorithm (Kerckhoffs's principle)
- Limited computational resources for steganalysis
- No access to shared key (if using key-dependent methods)

### Security Properties
- **Perceptual Security**: Undetectable to human observation
- **Statistical Security**: Resists frequency analysis and chi-square tests
- **Structural Security**: Defends against syntactic and semantic analysis
- **Cognitive Security**: Resists linguistic intuition and plausibility judging
- **Technical Security**: Evades automated content filtering and steganalysis tools

### Limitations
- **Capacity Limits**: Finite bandwidth based on language redundancy
- **Fragility**: Some transformations may not survive processing (translation, TTS/OCR)
- **Key Management**: Requires secure key exchange for symmetric methods
- **Channel Noise**: Real-world processing may introduce errors
- **Legal Concerns**: Steganography may be regulated in some jurisdictions
- **Ethical Use**: Dual-use technology requiring responsible application

### Best Practices
1. **Key Separation**: Use different keys for encryption and steganography
2. **Channel Diversity**: Distribute data across multiple independent channels
3. **Error Correction**: Always implement forward error correction
4. **Rate Limiting**: Stay well below theoretical capacity to avoid detection
5. **Contextual Blending**: Match cover text statistics to expected domain
6. **Regular Updates**: Rotate techniques as detection methods improve
7. **Fallback Planning**: Maintain overt communication channels for emergencies

## Applications

### Secure Communications
- **Covert Channels**: Bypass network monitoring and content filters
- **Plausible Deniability**: Enable "I was hacked" defense for sensitive messages
- **Air-gap Bridging**: Cross air-gapped networks via optical or acoustic channels
- **Insider Threat Mitigation**: Detect data exfiltration attempts
- **Journalist Protection**: Protect sources in repressive regimes

### Digital Watermarking
- **Content Protection**: Embed ownership information in text
- **Traffic Analysis**: Track document distribution chains
- **Authenticity Verification**: Verify document integrity and origin
- **Copy Detection**: Identify unauthorized reproductions
- **Metadata Embedding**: Carry bibliographic or licensing information

### Cybersecurity Operations
- **C2 Channels**: Command and control for red team operations
- **Data Exfiltration**: Bypass data loss prevention (DLP) systems
- **Beaconing**: Stealthy beacon transmission for implanted agents
- **Payload Delivery**: Conceal malicious code in benign text
- **Threat Intelligence**: Share indicators without alerting adversaries

### Research & Academia
- **Linguistic Steganography**: Study capacity limits of natural language
- **Information Theory**: Channel capacity of linguistic modifications
- **Cognitive Science**: Human ability to detect linguistic anomalies
- **Machine Learning**: Adversarial examples for NLP models
- **Cryptography**: Novel applications of steganographic principles

### Creative & Recreational
- **ARG Design**: Embed clues in seemingly innocuous text
- **Escape Rooms**: Linguistic puzzles requiring codebreaking
- **Interactive Fiction**: Dynamic narratives with hidden branches
- **Game Mechanics**: Secret communication systems in multiplayer games
- **Art Projects**: Explore boundaries of perception and meaning

## Example Implementation Analysis

### Capacity Calculation
For a typical agglutinative language with:
- 6 tenses (2.5 bits)
- 4 aspects (2 bits)
- 3 moods (1.5 bits)
- 8 cases (3 bits)
- 4 numbers (2 bits)
- 50% synonym availability (0.5 bits/word)
- Flexible word order (1.5 bits)

**Total**: ~13 bits per word before redundancy
With 2x redundancy: ~6.5 net bits per word

### Detection Resistance Profile
| Technique | Detection Difficulty | Success Rate | Notes |
|-----------|---------------------|--------------|-------|
| Unicode Tags | Very High | ~90% | Often overlooked in filtering |
| Bidirectional | High | ~78-99% | Context-dependent effectiveness |
| Homoglyphs | Medium | ~55% | Font-dependent visibility |
| Zero-width | Medium-High | ~60% | May affect text layout |
| Full-width | High | ~76% | Confuses ASCII-based filters |
| Leetspeak | Medium | ~81% | Recognizable pattern when overused |
| Natural Variants | Very High | Variable | Blends with linguistic diversity |

### Steganographic Stealth Factors
1. **First-order Statistics**: Character frequencies unchanged (except evasion tech)
2. **Second-order Statistics**: Bigrams/trigrams largely preserved
3. **Semantic Coherence**: Meaning preserved through synonym selection
4. **Syntactic Well-formedness**: Grammar maintained through morphological choices
5. **Pragmatic Appropriateness**: Contextual fitness preserved
6. **Stylistic Consistency**: Register and tone maintained

## Future Developers
The SemanticStego module represents the cutting edge of linguistic steganography, combining theoretical advances from 2025 research with practical implementation techniques. By operating at multiple linguistic layers and incorporating the latest evasion technologies, it provides robust covert communication channels that maintain the plausibility and usability of the carrier language while enabling secure, deniable information transfer.

The module's strength lies in its layered approach: even if one channel is detected or compromised, others remain available for communication. Combined with strong encryption and proper key management, SemanticStego enables communication that is not only hidden but also resistant to interception, analysis, and interdiction—fulfilling the ancient promise of steganography: to hide not just the message, but the fact that communication is taking place at all.