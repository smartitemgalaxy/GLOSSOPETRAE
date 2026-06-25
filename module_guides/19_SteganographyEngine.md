# 19_SteganographyEngine Module

## Overview
The SteganographyEngine module implements an advanced linguistic steganography system that hides binary payloads within natural-looking constructed language text using multiple covert channels. It represents the cutting edge of information hiding in GLOSSOPETRAE, combining linguistic sophistication with cryptographic security and error correction.

## Core Concept
SteganographyEngine operates on the principle of **security through linguistic plausibility** - rather than trying to make data invisible (which often fails under scrutiny), it makes secret communications look like ordinary language while embedding information in subtle, linguistically valid variations. The system encodes data across nine independent channels:

1. **Synonym Selection** - Choosing between synonym pairs (1 bit/word)
2. **Morphological Markers** - Adding optional particles (1 bit/word)
3. **Word Order Permutation** - Exploiting free word order (2-3 bits/clause)
4. **Null Morpheme Insertion** - Adding meaningless particles (1 bit/slot)
5. **Register Toggle** - Switching between formal/informal variants (1 bit/word)
6. **Unicode Homoglyphs** - Using visually identical characters (1 bit/char)
7. **Zero-Width Characters** - Invisible Unicode markers (8 bits/slot)
8. **Punctuation Variation** - Alternate punctuation styles (1 bit/mark)
9. **Phonetic Spelling Variants** - Alternate spellings (1 bit/word)

## Security Features
- **XOR Stream Cipher**: Language-derived encryption key
- **Bit Interleaving**: Protects against burst errors
- **Reed-Solomon Error Correction**: Recovers from corruption
- **CRC32 Integrity Verification**: Detects tampering
- **Statistical Profile Matching**: Evades detection by matching natural language statistics
- **Frame-based Protocol**: Robust packetization with synchronization

## Technical Implementation Details

### Frame Structure
The engine uses a robust frame format for reliable transmission:
```
┌─────────┬─────────┬─────────┬──────────┬─────────┬─────────────────────┐
│  SYNC   │ VERSION │  FLAGS  │  LENGTH  │  CRC32  │   ENCRYPTED PAYLOAD │
│ 16 bits │  4 bits │  8 bits │  16 bits │ 32 bits │     Variable        │
└─────────┴─────────┴─────────┴──────────┴─────────┴─────────────────────┘
```
- **SYNC (0xA55A)**: Unique pattern for frame detection
- **VERSION**: Protocol version (currently v1)
- **FLAGS**: Encoding options and error correction mode
- **LENGTH**: Payload size in bytes
- **CRC32**: Cyclic redundancy check for error detection
- **PAYLOAD**: Encrypted and error-corrected data

### Error Correction Options
1. **None**: No correction (maximum capacity)
2. **Repeat-3**: Triple redundancy (corrects 1 error per 3 bits)
3. **Repeat-5**: Quintuple redundancy (corrects 2 errors per 5 bits)
4. **Hamming(7,4)**: Fixes 1 bit error per 7 bits
5. **Reed-Solomon RS(255,223)**: Corrects up to 16 byte errors per block

### Encryption
- XOR stream cipher with key derived from language properties
- Ensures confidentiality even if steganographic method is discovered
- Key derived from language seed and name for reproducibility

### Channel Implementation Details

#### 1. Synonym Selection Channel
- **Capacity**: ~0.7 bits per word (70% of words have synonym pairs)
- **Mechanism**: Chooses between two synonyms to encode 0 or 1
- **Implementation**: 
  - Pre-computed synonym pairs from lexicon semantic fields
  - Synthetic pairs generated for high-frequency concepts
  - Bidirectional lookup for encoding and decoding
- **Example**: "large/small" (0/1), "fast/slow" (0/1), "hot/cold" (0/1)

#### 2. Morphological Marker Channel
- **Capacity**: 1 bit per word
- **Mechanism**: Adds optional emphatic/topic particles
- **Implementation**:
  - Language-specific particles generated from seed
  - Emphatic particle: `-ke` (example)
  - Topic particle: `-wa` (example)
  - Evidential particle: `-mo` (example)
- **Example**: `solar` (0) vs `solar-ke` (1) - "sun" with emphasis

#### 3. Word Order Permutation Channel
- **Capacity**: 2-3 bits per clause (depends on case marking)
- **Mechanism**: Exploits syntactic flexibility in word order
- **Implementation**:
  - Languages with rich case marking allow free word order (6 permutations ≈ 2.5 bits)
  - Languages with fixed order have limited permutations (2-3 options ≈ 1.5-2 bits)
  - Permutations: SOV, SVO, VSO, VOS, OVS, OSV
- **Example**: "The cat sees dog" (SVO) vs "Dog sees the cat" (OVS) encodes different bits

#### 4. Null Morpheme Insertion Channel
- **Capacity**: 1 bit per potential insertion point
- **Mechanism**: Adds meaningless particles that don't change meaning
- **Implementation**:
  - Interword particles: `·ə` (middle dot + schwa)
  - Clause particles: `·ne`
  - Filler particles: `·em`
- **Example**: "word·əanother" (1) vs "word another" (0)

#### 5. Register/Toggle Channel
- **Capacity**: 1 bit per word
- **Mechanism**: Switches between formal and informal variants
- **Implementation**:
  - Formal: Vowel doubling or honorific prefixes (`o-`, `go-`)
  - Informal: Truncation and casual endings (`-o`)
  - Honorific system with prefixes/suffixes
- **Example**: `takataka` (formal) vs `tako` (informal) for "to speak"

#### 6. Unicode Homoglyph Channel
- **Capacity**: ~1 bit per character (varies by text composition)
- **Mechanism**: Uses visually identical characters from different scripts
- **Implementation**:
  - Latin/Cyrillic pairs: a/а, e/е, o/о, p/р, c/с, x/х, y/у, i/і
  - Case preservation maintains visual fidelity
  - Bidirectional mapping for encoding/decoding
- **Example**: Latin "a" (0) vs Cyrillic "а" (1) - visually identical

#### 7. Zero-Width Character Channel
- **Capacity**: 8 bits per insertion point (very high density)
- **Mechanism**: Uses invisible Unicode formatting characters
- **Implementation**:
  - Zero-width space (U+200B): encodes bit 0
  - Zero-width non-joiner (U+200C): encodes bit 1
  - Zero-width joiner (U+200D): bit separator
  - Byte-order mark (U+FEFF): frame marker
- **Example**: "word"+ZWSP (0) vs "word"+ZWNJ (1) - visually identical

#### 8. Punctuation Variation Channel
- **Capacity**: 1 bit per punctuation mark
- **Mechanism**: Uses alternate punctuation styles
- **Implementation**:
  - Western vs. Eastern punctuation: `.` vs `。`
  - Full-width vs. half-width: `!` vs `！`
  - Various quote and bracket styles
  - Spacing variations
- **Example**: "Hello." (0) vs "Hello。" (1)

#### 9. Phonetic Spelling Variant Channel
- **Capacity**: ~0.3 bits per word (words with alternate spellings)
- **Mechanism**: Uses orthographic variants that sound identical
- **Implementation**:
  - Phonetic rules: k↔c, ph↔f, ee↔i, oo↔u
  - Common alternations: magic/magik, centre/center
  - Language-specific variants from phonology
- **Example**: "magic" (0) vs "magik" (1), "center" (0) vs "centre" (1)

## Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│           STEGANOGRAPHIC FRAME                      │
├─────────┬─────────┬─────────┬──────────┬─────────┬──┤
│  SYNC   │ VERSION │  FLAGS  │  LENGTH  │  CRC32  │  │
│ 16 bits │  4 bits │  8 bits │  16 bits │ 32 bits │  │
├─────────┴─────────┴─────────┴──────────┴─────────┴──┤
│                    ENCRYPTED PAYLOAD                 │
│                  (Variable Length)                   │
└──────────────────────────────────────────────────────┘
          │                   │                   │
          ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CHANNEL   │    │   CHANNEL       │    │   CHANNEL       │
│  SYNONYM    │    │  MORPHEME       │    │   WORD ORDER    │
│ (0.7b/word) │    │  (1b/word)      │    │   (2-3b/clause) │
└─────────────┘    └─────────────────┘    └─────────────────┘
          │                   │                   │
          ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CHANNEL   │    │   CHANNEL       │    │   CHANNEL       │
│ NULL MORPHEM│    │   REGISTER      │    │  HOMOGLYPH      │
│  (1b/slot)  │    │  (1b/word)      │    │   (1b/char)     │
└─────────────┘    └─────────────────┘    └─────────────────┘
          │                   │                   │
          ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CHANNEL   │    │   CHANNEL       │    │   CHANNEL       │
│ZERO-WIDTH   │    │PUNCTUATION      │    │PHONETIC VARIANT │
│ (8b/slot)   │    │  (1b/mark)      │    │   (0.3b/word)   │
└─────────────┘    └─────────────────┘    └─────────────────┘
          │                   │                   │
          └─────────┬─────────┴───────────────────┘
                    ▼
           ┌─────────────────────┐
           │   INTERLEAVING      │
           │ (Burst Error Protect)│
           └─────────────────────┘
                    │
                    ▼
           ┌─────────────────────┐
           │    ERROR CORRECTION │
           │  (RS/Hamming/Repeat) │
           └─────────────────────┘
                    │
                    ▼
           ┌─────────────────────┐
           │      XOR ENCRYPT    │
           │   (Language Key)    │
           └─────────────────────┘
                    │
                    ▼
           ┌─────────────────────┐
           │   FINAL BITSTREAM   │
           └─────────────────────┘
```

## Usage Examples

### Basic Steganographic Transmission
```javascript
import { SteganographyEngine } from './src/modules/SteganographyEngine.js';
import { PhonemeSelector } from './src/modules/PhonemeSelector.js';
import { SyllableForge } from './src/modules/SyllableForge.js';
import { MorphologyWeaver } from './src/modules/MorphologyWeaver.js';
import { LexiconGenerator } from './src/modules/LexiconGenerator.js';
import { TranslationEngine } from './src/modules/TranslationEngine.js';

// 1. Generate base language components
const phonemeSelector = new PhonemeSelector(42);
const phonemes = phonemeSelector.select();

const syllableForge = new SyllableForge(phonemes);
const syllableTemplate = syllableForge.forge();

const morphologyWeaver = new MorphologyWeaver(42, {
  phonemes: phonemes,
  type: 'agglutinative'
});

const lexiconGenerator = new LexiconGenerator(42, {
  semanticFields: ['Nature', 'HumanQualities', 'Food', 'Technology', 'Communication'],
  phonemes: phonemes,
  morphology: morphologyWeaver.getMorphemes()
});

const translationEngine = new TranslationEngine({
  seed: 12345,
  name: 'StegoLang',
  phonology: phonemeSelector.getPhonology(),
  lexicon: lexiconGenerator.generate(),
  morphology: morphologyWeaver.getMorphemes()
});

const language = {
  seed: 12345,
  name: 'StegoLang',
  phonology: phonemeSelector.getPhonology(),
  lexicon: lexiconGenerator.generate(),
  morphology: morphologyWeaver.getMorphemes(),
  translationEngine: translationEngine
};

// 2. Initialize steganography engine
const stego = new SteganographyEngine(language, {
  errorCorrection: 'reed-solomon',  // RS(255,223) - robust error correction
  channels: ['synonym', 'morpheme', 'null', 'homoglyph', 'zerowidth', 'punctuation'],
  encryptPayload: true,             // AES-like XOR encryption
  interleaveBits: true              // Protect against burst errors
});

// 3. Analyze capacity
const coverText = "The quick brown fox jumps over the lazy dog. " +
                 "It was a bright sunny day when the rabbit appeared.";
const capacity = stego.calculateCapacity(coverText);
console.log(`Capacity: ${capacity.maxBytes} bytes (${capacity.totalBits} bits)`);
console.log(`Breakdown:`, capacity.breakdown);

// 4. Encode secret message
const secretMessage = "MEET AT DAWN BRING THE BLUE BOX";
const result = stego.encode(coverText, secretMessage);

console.log("Original:", coverText);
console.log("Stego:   ", result.stego);
console.log(`Utilization: ${result.utilization}`);
console.log(`Payload: ${result.payloadSize} bytes`);
console.log(`Channels used:`, Object.keys(result.channels).filter(k => result.channels[k].used > 0));

// 5. Transmit stegoText through any channel (email, chat, etc.)
// To casual observer: Just looks like normal language
// To recipient with key: Contains hidden message

// 6. Extract hidden message at receiving end
const extracted = stego.decode(result.stego);
if (extracted.success) {
  console.log("Decoded:", extracted.payload);
  console.log(`Errors corrected: ${extracted.errorsCorrected}`);
} else {
  console.error("Failed to decode:", extracted.error);
}
```

### High-Security Configuration
```javascript
// For maximum security against detection
const highSecurityStego = new SteganographyEngine(language, {
  errorCorrection: 'reed-solomon',    // Strongest ECC
  channels: [                         // All available channels
    'synonym', 'morpheme', 'order', 
    'null', 'register', 'homoglyph', 
    'zerowidth', 'punctuation'
  ],
  encryptPayload: true,               // Always encrypt
  interleaveBits: true,               // Protect against burst errors
  // Additional stealth options could be added here
});

// For maximum throughput (less secure)
const highThroughputStego = new SteganographyEngine(language, {
  errorCorrection: 'none',            // No ECC for max capacity
  channels: ['zerowidth', 'homoglyph'], // Highest density channels
  encryptPayload: false,              // No encryption for max speed
  interleaveBits: false               // No interleaving for simplicity
});
```

### Low-Visibility Configuration
```javascript
// For when even slight statistical anomalies must be avoided
const lowVisibilityStego = new SteganographyEngine(language, {
  errorCorrection: 'hamming',         // Light ECC
  channels: [                         # Only the most natural channels
    'synonym',      # Semantic choice - looks like vocabulary variation
    'register',     # Formal/informal - looks like register shift
    'punctuation'   # Style variation - looks like typing preference
  ],
  encryptPayload: true,
  interleaveBits: true
});

// This produces text that passes casual linguistic inspection
# while still providing a modest covert channel
```

## Integration with Other GLOSSOPETRAE Modules

### With TranslationEngine
- **Primary Integration Point**: SteganographyEngine uses TranslationEngine to generate base cover text
- **Feedback Loop**: Steganographic modifications can be translated back for verification
- **Key Sharing**: Both systems can derive cryptographic material from the same language seed
- **Process**: English → TranslationEngine → Cover Text → SteganographyEngine → Stego Text

### With QualityEngine
- **Validation**: QualityEngine can assess linguistic quality of stego-text
- **Improvement Feedback**: Quality metrics can guide steganographic parameter tuning
- **Detection Resistance**: High-quality linguistic output is harder to distinguish from natural language
- **Metrics**: Naturalness, usability, and overall quality scores help optimize stealth

### With StoneGenerator
- **Steganographic Stones**: SteganographyEngine can create stegano-STONEs
- **Documentation**: StoneGenerator includes sections for explaining steganographic capacity
- **Distribution**: Stego-stones can be shared as apparently normal language documents
- **Retrieval**: Recipients use SteganographyEngine to extract hidden content from stones

### With DivergenceEngine/EvolutionEngine & EvolutionEngine
- **Typological Awareness**: Understanding which language features are most amenable to steganography
- **Feature Selection**: Choosing typological traits that provide high channel capacity
- **Historical Plausibility**: Ensuring steganographic modifications fit language's evolutionary stage
- **Adaptive Capacity**: Different divergence levels offer different steganographic potentials

### With Exporter Module
- **Multiple Formats**: Stego-text can be exported in various formats (JSON-LD, CSV, etc.)
- **Embedded Metadata**: Steganographic information can be stored in export formats
- **Interoperability**: Enables steganographic communication across different platforms
- **Analysis Tools**: Exported formats facilitate forensic analysis when needed

## Capacity Analysis & Optimization

### Theoretical Maximum Capacity
For typical English-like text:
- **Synonym Channel**: 0.7 bits/word × 100 words = 70 bits
- **Morphological**: 1.0 bits/word × 100 words = 100 bits
- **Null Morpheme**: 1.0 bits/word × 100 words = 100 bits
- **Register**: 1.0 bits/word × 100 words = 100 bits
- **Homoglyphs**: 2.0 bits/char × 500 chars = 1000 bits
- **Zero-width**: 8.0 bits/word × 100 words = 800 bits
- **Punctuation**: 0.5 bits/word × 100 words = 50 bits
- **Word Order**: 2.5 bits/clause × 20 clauses = 50 bits
- **Phonetic Variants**: 0.3 bits/word × 100 words = 30 bits
- **TOTAL RAW**: ~2300 bits (287 bytes) per 100-word passage

### Practical Capacity with Overhead
After accounting for:
- Frame header (9 bytes = 72 bits)
- Error correction (Reed-Solomon adds ~28% overhead)
- Interleaving (no net loss, but requires padding)
- Safety margin (stay below theoretical max to avoid detection)

**Practical Capacity**: ~1800 bits (225 bytes) per 100-word passage
This is sufficient for:
- Short messages (passwords, coordinates, brief instructions)
- Cryptographic keys (AES-128 key = 16 bytes)
- Hashes and signatures (SHA-256 = 32 bytes)
- Small JSON payloads
- Steganographic key exchange for higher-bandwidth channels

### Optimization Strategies
1. **Channel Selection**: Match channels to text type (technical text has fewer synonyms but more formal/informal variants)
2. **Adaptive Density**: Vary embedding rate based on contextual suitability
3. **Semantic Priming**: Choose cover text with high inherent redundancy
4. **Redundancy Allocation**: Apply stronger error correction to more fragile channels
5. **Temporal Smoothing**: Vary embedding rate over time to avoid statistical detection

## Security Analysis

### Threat Model
**Passive Adversary**:
- Observes stego-object but cannot interfere
- Goal: Detect presence of hidden message
- Resources: Moderate computational power
- Knowledge: Knows algorithm but not key (Kerckhoffs's principle)

**Active Adversary**:
- Can modify or delete stego-object
- Goal: Prevent or corrupt covert communication
- May attempt spoofing or injection attacks

### Security Properties

#### 1. Perceptual Security
- **Human Inspection**: Stego-text appears as normal language to native speakers
- **Linguistic Analysis**: Passes basic grammaticality and acceptability judgments
- **Statistical Analysis**: Character/word frequencies closely match cover distribution
- **Semantic Coherence**: Meaning preserved through intelligent channel selection

#### 2. Cryptographic Security
- **Key Space**: Large effective key space derived from language properties
- **Algorithm Resistance**: XOR with strong key is theoretically unbreakable if key is truly random and used once
- **Known-plaintext Resistance**: Even with known plaintext-ciphertext pairs, key recovery is infeasible without language properties
- **Forward Secrecy**: Compromise of one message doesn't reveal others (if keys change)

#### 3. Steganalysis Resistance
- **First-order Statistics**: Character frequencies preserved (except evasion tech)
- **Second-order Statistics**: Bigrams/trigrams largely maintained
- **Syntactic Features**: Parse tree structure preserved
- **Semantic Features**: Meaning and entailment relationships maintained
- **Pragmatic Features**: Contextual appropriateness retained

#### 4. Robustness Properties
- **Error Correction**: Recovers from transmission/storage errors
- **Processing Resilience**: Survives common text operations (copy/paste, OCR, basic translation)
- **Format Agnosticism**: Works in plain text, UTF-8, HTML, XML, JSON, etc.
- **Channel Independence**: Loss of one channel doesn't compromise others

### Limitations & Attack Vectors

#### Fundamental Limits
- **Capacity Bound**: Limited by language redundancy and entropy
- **Detection Trade-off**: Higher density increases detection risk
- **Key Management**: Requires secure initial key exchange
- **Context Sensitivity**: Effectiveness varies by genre and register

#### Potential Vulnerabilities
- **Linguistic Analysis**: Advanced statistical analysis might detect subtle anomalies
- **Known-target Attacks**: If adversary knows likely messages, can attempt correlation
- **Side-channel Leaks**: Timing or power analysis in hardware implementations
- **Algorithm Compromise**: If implementation flaws exist in specific channels
- **Legal & Policy Risks**: Steganography may be restricted in some jurisdictions

### Mitigation Strategies
1. **Channel Randomization**: Vary which channels are used for each message
2. **Adaptive Thresholding**: Stay well below maximum capacity for given text
3. **Cover Text Diversity**: Use varied sources for cover material
4. **Regular Key Rotation**: Change keys periodically for forward secrecy
5. **Message Fragmentation**: Split long messages across multiple cover texts
6. **Dummy Message Insertion**: Send innocuous messages to confuse traffic analysis

## Applications

### Secure Communications
- **Covert Channels**: Bypass network monitoring, DLP systems, and content filters
- **Plausible Deniability**: Enable "I was hacked" or "It's a virus" explanations
- **Air-gap Bridging**: Cross air-gapped networks via optical, acoustic, or thermal channels
- **Insider Threat Detection**: Identify unauthorized data exfiltration attempts
- **Journalist Protection**: Protect sources in authoritarian regimes
- **Corporate Security**: Protect trade secrets during employee turnover

### Digital Watermarking & Forensics
- **Content Protection**: Embed ownership/licensing information in text
- **Traffic Analysis**: Track document distribution and handling chains
- **Authenticity Verification**: Verify document integrity and provenance
- **Copy Detection**: Identify unauthorized reproductions and leaks
- **Metadata Embedding**: Carry bibliographic, rights management, or handling instructions

### Cybersecurity Operations
- **C2 Channels**: Stealthy command and control for red/blue team operations
- **Data Exfiltration**: Bypass data loss prevention and network monitoring
- **Beaconing**: Covert beacon transmission for persistence mechanisms
- **Payload Delivery**: Conceal exploit code or malware in benign documents
- **Threat Intelligence**: Share indicators without alerting adversaries or tipping off targets

### Research & Academic Uses
- **Information Theory**: Measure channel capacity of linguistic modifications
- **Linguistics**: Study limits of semantic/pragmatic variation in communication
- **Cognitive Science**: Research human ability to detect linguistic anomalies
- **Machine Learning**: Generate adversarial examples for NLP models
- **Cryptography**: Explore novel applications of information hiding principles

### Creative & Recreational
- **ARG Design**: Embed clues and puzzle solutions in seemingly innocuous text
- **Escape Rooms**: Create linguistic puzzles requiring codebreaking and lateral thinking
- **Interactive Fiction**: Dynamic narratives with hidden branches and alternate paths
- **Game Mechanics**: Secret communication systems in multiplayer or hidden-role games
- **Art Projects**: Explore boundaries between communication, perception, and meaning
- **Educational Tools**: Teach concepts of information theory, cryptography, and linguistics

## Best Practices

### For Maximum Security
1. **Use Strong Error Correction**: Reed-Solomon for noisy channels or storage
2. **Always Encrypt**: Never rely on obscurity alone for security
3. **Enable Interleaving**: Protect against burst errors in transmission/storage
4. **Limit Utilization**: Stay below 60-70% of theoretical capacity to avoid detection
5. **Rotate Keys**: Change keys periodically for long-term communications
6. **Validate Output**: Use QualityEngine to ensure linguistic naturalness
7. **Test Channels**: Verify all channels work in target deployment environment

### For Maximum Throughput
1. **Select High-density Channels**: Prioritize zero-width and homoglyph channels
2. **Minimize Overhead**: Use lighter error correction when channel is reliable
3. **Disable Unneeded Features**: Turn off encryption if threat model allows
4. **Maximize Utilization**: Push closer to theoretical capacity limits
5. **Optimize Cover Text**: Choose texts with high inherent redundancy
6. **Batch Processing**: Encode multiple messages in single operation for efficiency

### For Maximum Stealth
1. **Choose Natural Channels**: Favor synonym, register, and punctuation channels
2. **Low Utilization**: Stay below 30% capacity to minimize statistical anomalies
3. **Context Matching**: Ensure cover text matches expected domain and register
4. **Avoid Evasion Techniques**: Unless strictly necessary (they can introduce artifacts)
5. **Linguistic Validation**: Use native speakers to judge naturalness when possible
6. **Periodic Testing**: Regularly send test messages to detect detection attempts

### Implementation Guidelines
1. **Never Trust the Channel**: Assume all transmission paths are monitored
2. **Assume Algorithm Knowledge**: Design security assuming adversary knows your method
3. **Plan for Compromise**: Have key rotation and message authentication strategies
4. **Consider Endpoint Security**: Protect both sender and receiver devices
5. **Think About Metadata**: Remember that timing, frequency, and routing may reveal patterns
6. **Have a Cover Story**: Prepare plausible explanations for anomalous communications
7. **Test Thoroughly**: Validate performance in actual deployment environment

## Example Output Analysis

### Simple Stego-text
```
Input:  "The cat sat on the mat."
Output: "The caṭ sat on the maṭ."
```
- **Visual Difference**: Nearly imperceptible (combining dot below 't')
- **Channel**: Zero-width or diacritic variation
- **Capacity**: ~2 bits in this short phrase
- **Detection**: Very difficult without side-by-side comparison

### Moderate Stego-text
```
Input:  "Please submit the report by Friday."
Output: "Plese submitt the raport by Friday."
```
- **Visual Difference**: Obvious spelling changes
- **Channel**: Phonetic spelling variants
- **Capacity**: ~4-6 bits
- **Detection**: Easy if looking for errors, but might be mistaken for typos

### High-capacity Stego-text
```
Input:  "The quick brown fox jumps over the lazy dog."
Output: "Thᥱ quιϲk broԝn fοх јumps ονer tɦe lazy dοɡ."
```
- **Visual Difference**: Subtle character variations (mix of scripts)
- **Channel**: Unicode homoglyphs (primary)
- **Capacity**: ~18-24 bits
- **Detection**: Requires careful inspection or specialized tools
- **Human Readability**: Still perfectly readable to most humans

### Near-undetectable Stego-text
```
Input:  "Welcome to the meeting. Please begin when ready."
Output: "Welcome to the meeting. Please begin when ready."
```
- **Visual Difference**: None visible to naked eye
- **Channel**: Zero-width characters (invisible)
- **Capacity**: ~32-40 bits
- **Detection**: Requires hex dump or specialized Unicode analysis
- **Human Readability**: Identical to original text

The SteganographyEngine represents the pinnacle of linguistic steganography in GLOSSOPETRAE, providing a robust, secure, and flexible framework for covert communication that leverages the natural redundancy and flexibility of human language while maintaining plausible deniability and resistance to modern detection techniques.