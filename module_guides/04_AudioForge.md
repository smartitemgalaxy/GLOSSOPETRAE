# AudioForge Module

## Purpose
AudioForge gives your constructed language a voice. It's a sophisticated speech synthesizer that turns written text in your conlang into audible speech - complete with proper pronunciation, intonation, accent, and even individual speaker characteristics. Think of it as a text-to-speech engine specifically designed for your unique language.

## What It Does
- Converts Romanized text into high-quality audio (22.05 kHz PCM)
- Applies accurate phonetic pronunciation based on your language's sound system
- Adds natural prosody: stress patterns, intonation, rhythm, and emotional tone
- Simulates realistic speech imperfections (jitter, shimmer, breathiness)
- Models proper articulation physics (consonant transitions, vowel formants)
- Generates deterministic output: same text + same seed = identical audio every time
- Works without external dependencies - pure JavaScript DSP

## Core Technology
Based on the Klatt synthesizer (used in early text-to-speech systems), AudioForge implements a source-filter model:
1. **Source**: Creates vocal cord vibration (with jitter/shimmer for realism)
2. **Filter**: Shapes the sound through your vocal tract (formants for vowels, constrictions for consonants)
3. **Post-processing**: Adds aspiration, frication, and proper release for consonants

## Key Features
### Pronunciation Accuracy
- **Allophony**: Automatically applies context-sensitive sound changes (e.g., /t/ becomes aspirated [tʰ] at word start)
- **Coarticulation**: Smooth transitions between sounds (your mouth doesn't instantaneously jump positions)
- **Prosody Modeling**: Word stress, phrasal intonation, sentence rhythm, and final lengthening
- **Phonetic Realism**: Accurate formant frequencies, bandwidths, and dynamic transitions

### Voice Customization
- **Speaker Characteristics**: Adjust pitch (fundamental frequency), vocal tract length, and timbre
- **Speech Rate**: Control speaking speed from slow and clear to rapid conversational
- **Emotional Tone**: Add happiness, sadness, anger, or neutrality through pitch contour and timing
- **Accent Features**: Simulate regional accents or second-language pronunciation patterns

### Technical Excellence
- **Deterministic Output**: Essential for scientific reproducibility - same seed always yields identical audio
- **No External Dependencies**: Runs in any JavaScript environment (browser or Node.js)
- **High-Quality Output**: 22.05 kHz mono PCM (CD-quality would be 44.1 kHz stereo, but mono is sufficient for speech)
- **WAV Export**: Easy conversion to standard audio files for use in other applications
- **Web Audio API Ready**: Directly playable in modern browsers

## Usage Example
```javascript
import { AudioForge } from './src/modules/AudioForge.js';
import { Glossopetrae } from './src/Glossopetrae.js';

// Generate a language first
const language = Glossopetrae.quick(42, { 
  preference: 'melodic', 
  phonemeInventorySize: 'average' 
});

// Create the audio synthesizer for this language
const audioForge = new AudioForge(language, {
  // Optional voice characteristics
  basePitch: 120,           // Hz (average male ~110, female ~200)
  speakingRate: 1.0,        // 1.0 = normal, 0.5 = slow, 2.0 = fast
  breathiness: 0.1,         // 0 = creaky voice, 1.0 = very breathy
  vocalTractLength: 17.0    // cm (average adult male ~17.0, female ~14.5)
});

// Synthesize a single word
const wordResult = audioForge.synthesizeWord("saluton"); // "hello" in Esperanto-like
console.log(`Duration: ${wordResult.duration.toFixed(2)} seconds`);
console.log(`Sample count: ${wordResult.samples.length}`);

// Save as WAV file (Node.js
// const wavBytes = audioForge.toWav(wordResult.samples);
// // Write wavBytes to file in Node.js or create Blob in browser

// Play in browser (if in browser environment)
// await audioForge.speak("bonan tagon"); // "good day"

// Synthesize a full sentence with question intonation
const sentenceResult = audioForge.synthesizeSentence(
  "mi amas vin", // "I love you"
  { 
    mode: 'question', 
    speakingRate: 0.9,  // Slightly slower for emotional effect
    finalPitchBoost: 1.3 // Raise pitch at end for question
  }
);
```

## Best Practices
### For Natural-Sounding Speech
1. **Match Voice to Speaker**: 
   - Larger vocal tract → deeper, more resonant sound (good for aliens, giants, or bass voices)
   - Smaller vocal tract → brighter, higher-pitched (good for children, fairies, or sopranos)
   - Adjust `vocalTractLength` parameter accordingly (typical range: 12-18 cm)

2. **Use Prosody Strategically**:
   - Statements: Falling pitch contour at end
   - Questions: Rising pitch (yes/no) or sustained (wh-questions)
   - Lists: Rising on non-final items, falling on last
   - Emphasis: Increase amplitude and duration on stressed words

3. **Leverage Determinism**:
   - For language learning apps: Generate all audio once, store it, reuse forever
   - For consistent NPC voices: Seed based on character ID
   - For reproducible research: Fixed seed ensures identical stimuli across experiments

4. **Optimize for Intelligibility**:
   - Slightly slower speech (0.8-0.9x) improves clarity for foreign accents
   - Moderate breathiness (0.05-0.15) adds warmth without reducing clarity
   - Ensure proper consonant bursts and vowel formants for place/manner distinction

### Creative Applications
- **Character Voices**: 
  - Robot: Monotone pitch, zero jitter/shimmer, precise timing
  - Alien: Unusual formant spacing, subharmonics, or rough voice quality
  - Elder: Increased jitter/shimmer, slower rate, possible tremor
  - Child: Higher pitch, shorter vocal tract, less stable formants

- **Emotional Speech**:
  - Angry: Higher average pitch, wider pitch range, faster rate, increased amplitude
  - Sad: Lower pitch, narrower range, slower rate, breathy voice, monotone
  - Happy: Elevated pitch, wider range, faster tempo, smile effect (raised F2/F3)
  - Fearful: High pitch, loud, fast, irregular rhythm

- **Environmental Effects**:
  - Distant/echoey: Add reverb post-processing (outside AudioForge but easy to add)
  - Underwater: Low-pass filter effect (reduces high frequencies)
  - Telephone: Bandpass 300-3400 Hz (simulate old phone lines)
  - Whisper: Nearly no vocal fold vibration, mostly noise source

## Integration with Other Modules
AudioForge consumes:
- **PhonemeSelector**: Gets the actual consonant/vowel inventories
- **ProsodyEngine** (via language object): Receives stress patterns, tone rules, intonation preferences
- **PhonologicalRules** (via language object): Applies sandhi, assimilation, and other context-sensitive changes
- **MorphologyWeaver** (indirectly): Gets the actual word forms to pronounce

It produces output for:
- **Exporter**: Save audio as WAV files or create soundboards
- **TranslationEngine**: Provides pronunciation guidance alongside translations
- **SophonticAnalyzer**: Enables studies of sound symbolism and phonetic iconicity
- **SteganographyEngine**: Can encode data in subtle prosodic or timbral variations

## Pro Tips
### Creating Distinct Accents
To simulate a "foreign accent" in your language:
1. **Substitute difficult sounds**: Replace rare phonemes with similar native ones
2. **Transfer prosody**: Apply intonation patterns from speaker's native language
3. **Adjust timing**: Different languages have different speech rhythms (mora-timed, syllable-timed, stress-timed)
4. **Add systematic errors**: Consistent mispronunciations (e.g., always replacing 'θ' with 's' or 't')

### Generating Voice Variations
For a cast of characters from the same linguistic community:
- Keep the same language object (phonology, grammar)
- Vary only the AudioForge parameters:
  - Pitch: 80-250 Hz covers most human voices
  - Jitter/Shimmer: 0.01 (smooth) to 0.15 (very rough/aged)
  - Breathiness: 0.0 (creaky) to 0.3 (very breathy)
  - Speaking rate: 0.6 (slow, deliberate) to 1.8 (excited, rapid)

### Language Learning Applications
Create minimal pairs for auditory discrimination:
- "pat" vs "bat" (voicing contrast)
- "sak" vs "shak" (place contrast)
- "ta" vs "taa" (length contrast)
- Rising vs falling tone on same syllable (tone languages)

### Scientific Uses
- **Phonetic experiments**: Synthesize stimuli with controlled parameters
- **Historical linguistics**: Compare how ancient pronunciations might have sounded
- **Speech pathology**: Generate test stimuli for assessment tools
- **AI training data**: Create balanced phonetic datasets for speech recognition models
- **Accessibility**: Generate audio for visually impaired language learners

Remember: The most convincing synthetic speech often comes not from perfect pronunciation, but from *appropriate imperfections* - the slight hesitations, breath sounds, and prosodic variations that make human speech uniquely alive.
