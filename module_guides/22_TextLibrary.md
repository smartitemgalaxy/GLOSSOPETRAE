# 22_TextLibrary Module

## Overview
The TextLibrary module provides canonical showcase texts for constructed languages. Every serious conlang is evaluated through a standard set of texts that the conlang community uses to compare phonology, morphology, syntax, and semantic coverage across languages. This module renders these canonical texts into a generated language via its TranslationEngine, providing interlinear glosses for linguistic analysis.

## Core Concept
TextLibrary serves as the "Rosetta Stone" of constructed languages, providing standardized texts that allow for meaningful comparison between different conlangs. Just as linguists use texts like the North Wind and the Sun or the Universal Declaration of Human Rights to compare natural languages, conlang enthusiasts use these same texts to evaluate how well a constructed language handles various linguistic phenomena.

The module includes six canonical texts:
1. **Tower of Babel** (Genesis 11:1-9) - The most common conlang showcase text
2. **The North Wind and the Sun** - The standard phonetic showcase text of the IPA
3. **Universal Declaration of Human Rights, Article 1** - The most-translated text in the world
4. **Schleicher's Fable** (The Sheep and the Horses) - The classic Indo-Europeanist test text
5. **Famous Sentences** - Linguistically significant sentences from Chomsky and others
6. **Words of Pliny the Elder** - Historical flavor text

Each text is carefully selected to test different linguistic features:
- **Babel**: Tests narrative structure, divine speech, collective action, and geographical terms
- **North Wind and the Sun**: Tests weather vocabulary, comparative structures, and physical actions
- **UDHR Article 1**: Tests legal/philosophical vocabulary, abstract concepts, and reciprocal relationships
- **Schleicher's Fable**: Tests agricultural vocabulary, animal terminology, and complex sentences
- **Famous Sentences**: Tests syntax-semantics mismatches, recursion, and garden-path sentences
- **Pliny the Elder**: Tests historical vocabulary, proverbs, and wisdom literature

## Key Features

### 1. Canonical Text Collection
- **Babel (Genesis 11:1-9)**: The foundational conlang showcase text
- **North Wind and the Sun**: IPA's standard phonetic passage
- **UDHR Article 1**: Benchmark for translation coverage and abstract concepts
- **Schleicher's Fable**: Classical Indo-European reconstruction test
- **Famous Sentences**: Includes Chomsky's "Colorless green ideas sleep furiously" and garden-path sentences
- **Pliny the Elder**: Historical wisdom and proverbs from natural history

### 2. Linguistically-informed Simplification
- English source sentences are simplified toward the ~1358 concepts available in the semantic data
- This maximizes translation from the native lexicon rather than relying on loanword fallbacks
- Complex concepts are broken down into simpler, more basic components
- Ensures fair comparison across languages with different lexical coverage

### 3. Zero-dependency, Pure ESM Implementation
- No external dependencies required
- Fully deterministic: output depends only on the input language object
- No DOM, no file system access, no randomness
- Suitable for use in any JavaScript environment

### 4. Comprehensive Output Format
For each text, the module provides:
- Original English sentences
- Translated conlang sentences
- Interlinear glosses (morpheme-by-morpheme translations)
- Error handling for untranslatable sentences
- Statistics on translation success rate
- Metadata (title, category, notes)
- Caching for efficiency

### 5. Error Handling and Resilience
- Never throws exceptions; returns error information instead
- Handles empty or failed translations gracefully
- Provides detailed error messages for debugging
- Continues processing remaining sentences even if some fail
- Tracks translation success/failure statistics

## Technical Implementation

### Text Selection Criteria
The texts in TextLibrary were chosen based on:
1. **Coverage**: Testing a wide range of vocabulary and grammatical structures
2. **Availability**: Being widely known and accessible in the conlang community
3. **Length**: Being short enough for easy comparison but long enough to be meaningful
4. **Linguistic Interest**: Containing interesting grammatical constructions
5. **Historical Significance**: Having importance in linguistics or translation studies
6. **Semantic Density**: Packing many concepts into a small space

### Translation Process
For each sentence in a text:
1. Pass the sentence to the language's TranslationEngine.translateToConlang() method
2. Capture both the translated text and the interlinear gloss
3. Handle any errors that occur during translation
4. Store results in the cache for efficiency
5. Return structured output with metadata

### Caching Mechanism
- Each translated text is cached by its ID
- Subsequent requests for the same text return the cached version
- Cache is invalidated only when a new TextLibrary instance is created
- Ensures consistent results for the same language object
- Reduces redundant computation for frequently accessed texts

### Error Handling Approach
- Wrap each translation in a try/catch block
- Return error objects instead of throwing exceptions
- Provide specific error messages when possible
- Continue processing remaining sentences even if some fail
- Track success/failure statistics for diagnostic purposes

## Text Details

### 1. Tower of Babel (babel)
- **Source**: Genesis 11:1-9 (Bible)
- **Significance**: The most common showcase text in the conlang community
- **Simplifications**: 
  - "language" → "tongue" (to fit core concept inventory)
  - "bricks" → "stones" (to fit core concept inventory)
- **Tests**: 
  - Collective action and cooperation
  - Divine intervention and speech
  - Geographical and directional vocabulary
  - Construction and building terminology
  - Punishment and dispersion narratives
  - Unity and division themes
- **Sentence Count**: 9 sentences

### 2. The North Wind and the Sun (northwind)
- **Source**: Aesop's fable, standardized by the International Phonetic Association (IPA)
- **Significance**: Standard phonetic showcase text used to demonstrate IPA transcription
- **Simplifications**:
  - "North wind" → "cold wind" (to fit core concept inventory)
  - "take off" → "drop" (to fit core concept inventory)
- **Tests**:
  - Weather vocabulary (wind, sun, temperature)
  - Comparative structures (stronger/weaker)
  - Clothing vocabulary (cloak)
  - Physical actions (blowing, shining, holding, dropping)
  - Speech acts and dialogue
  - Cause-effect relationships
- **Sentence Count**: 4 sentences

### 3. Universal Declaration of Human Rights, Article 1 (udhr1)
- **Source**: UDHR Article 1 (United Nations)
- **Significance**: The most-translated text in the world (available in over 500 languages)
- **Simplifications**:
  - "Dignity" → "honor" (to fit core concept inventory)
  - "in a spirit of brotherhood" → "as brothers" (to fit core concept inventory)
- **Tests**:
  - Legal and philosophical vocabulary (freedom, rights, dignity)
  - Abstract concepts (reason, conscience, spirit)
  - Reciprocal relationships ("as brothers")
  - Universal quantification ("all people")
  - Human rights terminology
  - Ethical and moral concepts
- **Sentence Count**: 2 sentences

### 4. Schleicher's Fable (schleicher)
- **Source**: August Schleicher's 1868 Indo-Europeanist test text
- **Significance**: Classic test for reconstructing Proto-Indo-European
- **Simplifications**:
  - "Pains me" → "my heart is heavy" (to fit core concept inventory)
  - "garment" → "warm clothes" (to fit core concept inventory)
- **Tests**:
  - Agricultural and pastoral vocabulary
  - Animal terminology (sheep, horses)
  - Transportation and movement vocabulary
  - Possession and ownership concepts
  - Sensory and emotional vocabulary
  - Complex sentence structures
  - Dialogue and reported speech
- **Sentence Count**: 7 sentences

### 5. Famous Sentences (colorless)
- **Source**: Linguistically significant sentences from various sources
- **Significance**: Tests syntax-semantics relationships and grammaticality judgments
- **Contents**:
  - Chomsky's "Colorless green ideas sleep furiously" (syntactically correct but semantically anomalous)
  - A modified Buffalo sentence ("Buffalo buffalo Buffalo buffalo buffalo buffalo Buffalo buffalo")
  - Garden-path sentence "The old man the boat."
- **Tests**:
  - Syntax-semantics mismatches
  - Grammaticality vs. meaningfulness judgments
  - Recursion and self-embedding
  - Garden-path effects and reanalysis
  - Lexical ambiguity and multiple meanings
  - Sentence processing difficulty
- **Sentence Count**: 3 sentences

### 6. Words of Pliny the Elder (pliny)
- **Source**: Sayings from or about Pliny the Elder (Roman naturalist)
- **Significance**: Historical flavor text from classical antiquity
- **Simplifications**:
  - "True glory consists in deeds" → "true glory comes from what we do" (to fit core concept inventory)
- **Tests**:
  - Historical and classical vocabulary
  - Proverbs and wisdom literature
  - Agricultural and maritime concepts (fortune, wine, truth)
  - Virtue and valor concepts
  - Causality and fortune-telling concepts
  - Epistemic modalities (truth, falsity, certainty)
- **Sentence Count**: 3 sentences

## Usage Examples

### Basic Text Retrieval
```javascript
import { TextLibrary } from './src/modules/TextLibrary.js';

// Assuming 'language' object has been generated with all components
const textLibrary = new TextLibrary(language);

// List all available texts
const availableTexts = textLibrary.list();
console.log("Available texts:");
availableTexts.forEach(text => {
  console.log(`- ${text.id}: ${text.title} (${text.category}, ${text.sentenceCount} sentences)`);
});

// Get a specific text
const babelText = textLibrary.getText('babel');
if (babelText) {
  console.log(`\n${babelText.title}`);
  console.log(`Category: ${babelText.category}`);
  console.log(`Note: ${babelText.note}`);
  
  babelText.lines.forEach((line, index) => {
    if (line.error) {
      console.log(`\n[${index+1}] ERROR: ${line.error}`);
      console.log(`    English: ${line.english}`);
    } else {
      console.log(`\n[${index+1}] English: ${line.english}`);
      console.log(`    Conlang: ${line.conlang}`);
      console.log(`    Gloss:   ${line.goss}`);
    }
  });
  
  console.log(`\nStatistics: ${babelText.stats.translated}/${babelText.stats.sentences} sentences translated`);
}

// Get all texts at once
const allTexts = textLibrary.getTexts();
console.log(`\nRetrieved ${allTexts.length} texts`);
```

### Integration with Other Modules
```javascript
// Full workflow with other GLOSSOPETRAE modules
import { TextLibrary } from './src/modules/TextLibrary.js';
import { QualityEngine } from './src/modules/QualityEngine.js';
import { StoneGenerator } from './src/modules/StoneGenerator.js';

// Assuming 'language' object has been generated with all components
const textLibrary = new TextLibrary(language);
const qualityEngine = new QualityEngine(language);
const stoneGenerator = new StoneGenerator(
  language, 
  language.translationEngine || null,
  { includeSkillIntegration: true, includeProtocolSection: true }
);

// 1. Get all canonical texts
const texts = textLibrary.getTexts();

// 2. Evaluate quality of each text
texts.forEach(text => {
  if (text.title) {
    console.log(`\nEvaluating: ${text.title}`);
    
    // Extract conlang sentences for quality analysis
    const conlangSentences = text.lines
      .filter(line => !line.error)
      .map(line => line.conlang)
      .join(' ');
    
    if (conlangSentences) {
      // Temporarily create a language object with this text as sample
      const sampleLanguage = {
        ...language,
        // In a real implementation, you'd update the lexicon with words from this text
        // For demonstration, we're just checking the existing language quality
      };
      
      const quality = qualityEngine.getMetrics();
      console.log(`Quality Score: ${quality.overall}/100 (Grade: ${quality.grade})`);
      
      if (quality.recommendations.length > 0) {
        console.log("Recommendations:");
        quality.recommendations.forEach((rec, i) => {
          console.log(`  ${i+1}. ${rec}`);
        });
      }
    }
  }
});

// 3. Generate stone documents for the texts
texts.forEach(text => {
  if (text.title && text.stats.translated > 0) {
    console.log(`\nGenerating stone for: ${text.title}`);
    
    // In a real implementation, you would:
    // 1. Extract the translated text
    // 2. Create a specialized language object for this text
    // 3. Generate a stone document
    // 4. Save or display the stone
    
    console.log(`  Stone would contain the translated text with interlinear gloss`);
    console.log(`  Plus linguistic analysis and cultural notes`);
  }
});
```

### Custom Text Addition
```javascript
// While the module doesn't support adding texts directly,
// you can create your own text library for specialized purposes

class CustomTextLibrary extends TextLibrary {
  constructor(language, customTexts = []) {
    super(language);
    this.customTexts = customTexts;
    this._customCache = new Map();
  }
  
  list() {
    const standard = super.list();
    const custom = this.customTexts.map(t => ({
      id: t.id,
      title: t.title,
      category: t.category,
      sentenceCount: t.sentences.length,
    }));
    return [...standard, ...custom];
  }
  
  getText(id) {
    // Check custom texts first
    if (this._customCache.has(id)) {
      return this._customCache.get(id);
    }
    
    const customDef = this.customTexts.find(t => t.id === id);
    if (customDef) {
      const lines = customDef.sentences.map(s => this._translateLine(s));
      const translated = lines.filter(l => !l.error).length;
      
      const rendered = {
        id: customDef.id,
        title: customDef.title,
        category: customDef.category,
        english: customDef.sentences.slice(),
        lines,
        note: customDef.note || '',
        stats: {
          sentences: customDef.sentences.length,
          translated,
          failed: customDef.sentences.length - translated,
        },
      };
      
      this._customCache.set(id, rendered);
      return rendered;
    }
    
    // Fall back to standard texts
    return super.getText(id);
  }
}

// Usage:
const customTexts = [
  {
    id: 'myth',
    title: 'Creation Myth of My People',
    category: 'mythology',
    note: 'An original creation myth for the conlang culture',
    sentences: [
      'In the beginning, there was only water and sky.',
      'The water spirit and the sky spirit fell in love.',
      'Their children were the first people.',
      'They taught the people how to live in harmony.',
    ],
  },
  {
    id: 'recipe',
    title: 'Traditional Bread Recipe',
    category: 'daily life',
    note: 'A simple recipe showing daily life and food preparation',
    sentences: [
      'Take flour and water and mix them together.',
      'Let the mixture rest until it becomes bubbly.',
      'Shape the dough into loaves and bake them in the oven.',
      'Eat the warm bread with honey and butter.',
    ],
  },
];

const customLibrary = new CustomTextLibrary(language, customTexts);
console.log("Available texts:", customLibrary.list().map(t => t.id));
const myth = customLibrary.getText('myth');
if (myth) {
  console.log(`\n${myth.title}`);
  myth.lines.forEach((line, index) => {
    if (!line.error) {
      console.log(`${index+1}. ${line.conlang}`);
    }
  });
}
```

## Integration with Other GLOSSOPETRAE Modules

### With TranslationEngine
- **Primary Dependency**: TextLibrary requires a language object with a functional TranslationEngine
- **Input Source**: Uses TranslationEngine.translateToConlang() for all translations
- **Output Consumption**: Captures both translated text and interlinear gloss
- **Error Handling**: Propagates and formats translation errors from TranslationEngine
- **Performance**: Benefits from TranslationEngine's caching and optimization

### With QualityEngine
- **Validation**: QualityEngine can assess the linguistic quality of translated texts
- **Feedback Loop**: Quality metrics can inform improvements to the language generation
- **Comparison**: Enables quality comparison across different texts in the same language
- **Diagnosis**: Identifies which linguistic features are weak based on text performance
- **Improvement Guidance**: QualityEngine recommendations can guide language refinement

### With StoneGenerator
- **Documentation Output**: StoneGenerator can create formatted documents of the translated texts
- **Interlinear Gloss**: Stones can include the gloss line for linguistic analysis
- **Cultural Notes**: Stones can include the original text notes and category information
- **Teaching Materials**: Stones can serve as educational resources for learning the language
- **Archive Preservation**: Stones can preserve translated texts for long-term storage

### With LexiconGenerator
- **Feedback Loop**: Untranslatable words in texts can identify lexical gaps
- **Lexical Expansion**: TextLibrary output can inform LexiconGenerator's expansion efforts
- **Frequency Analysis**: Texts can be analyzed for word frequency to inform generation priorities
- **Semantic Coverage**: Helps ensure lexicon covers the semantic domains needed for the texts
- **Gap Analysis**: Identifies which semantic fields need more vocabulary

### With PhonemeSelector & SyllableForge
- **Pronunciation Feedback**: Translated texts can be evaluated for pronounceability
- **Phonotactic Adherence**: Ensures translated text follows generated phonotactics
- **Sound Inventory Usage**: Verifies that all phonemes are used in the lexicon
- **Phonological Process Testing**: Tests whether phonological rules apply correctly in context
- **Allophonic Variation**: Checks that allophony is applied appropriately in running text

### With MorphologyWeaver
- **Morphological Analysis**: Translated texts can be analyzed for morphological correctness
- **Rule Application**: Tests whether morphological rules apply in context
- **Allomorph Selection**: Verifies correct allomorph selection in different contexts
- **Agreement Patterns**: Checks subject-verb, noun-adjective, and other agreement
- **Derivational Morphology**: Tests whether derivational rules are productive

### With SyntaxGenerator
- **Syntactic Analysis**: Translated texts can be analyzed for syntactic correctness
- **Word Order**: Tests whether generated word order rules produce grammatical sentences
- **Constituent Structure**: Verifies proper phrase structure and constituent ordering
- **Movement Phenomena**: Tests whether movement rules (wh-movement, etc.) work correctly
- **Ellipsis and Pro-drop**: Checks whether ellipsis and pro-drop rules apply appropriately

### With Pragmatic Modules
- **Pragmatic Analysis**: Translated texts can be evaluated for pragmatic appropriateness
- **Speech Acts**: Verifies that speech acts are correctly realized
- **Deixis**: Tests whether demonstratives and pronouns work correctly in context
- **Politeness**: Checks whether honorific and politeness systems function properly
- **Discourse Structure**: Analyzes how well the text hangs together as a coherent unit

## Usage in Language Evaluation

### Comparative Linguistics
TextLibrary enables direct comparison between different constructed languages:
1. Generate multiple languages with different parameters
2. Translate the same texts into each language
3. Compare the results across linguistic dimensions:
   - **Phonology**: Sound inventories, phonotactics, pronunciation difficulty
   - **Morphology**: Morphological complexity, allomorphy, agreement patterns
   - **Syntax**: Word order, constituency, movement phenomena
   - **Semantics**: Lexical coverage, conceptual accuracy, metaphorical extension
   - **Pragmatics**: Politeness systems, speech act realization, discourse structure

### Progressive Refinement
TextLibrary supports iterative language improvement:
1. Generate initial language
2. Translate texts and identify weaknesses
3. Improve language generation based on weaknesses
4. Re-translate texts to measure improvement
5. Repeat until satisfactory coverage is achieved

### Educational Applications
- **Linguistics Courses**: Students can compare their conlangs to natural languages
- **Language Creation Workshops**: Provides standardized texts for group projects
- **Self-Study**: Language creators can track their progress over time
- **Teaching Materials**: Translated texts can serve as reading comprehension exercises
- **Assessment Tool**: Provides objective metrics for language development

### Research Applications
- **Typological Studies**: Comparing how different languages handle the same structures
- **Universal Grammar**: Testing which structures are truly universal vs. language-specific
- **Language Acquisition**: Modeling how learners might acquire the language
- **Processing Studies**: Investigating sentence processing difficulty in the conlang
- **Translation Studies**: Comparing translation strategies across languages

## Best Practices

### For Language Development
1. **Start Small**: Begin with shorter texts like UDHR Article 1 or Pliny the Elder
2. **Progress Gradually**: Move to longer texts as language coverage improves
3. **Focus on Weaknesses**: Use failing translations to identify specific gaps
4. **Iterate Frequently**: Translate texts after each major language improvement
5. **Document Progress**: Keep records of translation success rates over time

### For Accurate Translation
1. **Complete Lexicon**: Ensure lexicon covers the semantic domains needed for the texts
2. **Consistent Morphology**: Verify morphological rules are productive and consistent
3. **Clear Syntax**: Make sure syntactic rules produce grammatical sentences
4. **Appropriate Pragmatics**: Check that politeness and discourse systems function properly
5. **Phonetic Faithfulness**: Ensure translated text is pronounceable and follows phonotactics

### For Meaningful Comparison
1. **Same Parameters**: When comparing languages, keep generation parameters consistent
2. **Same Seed**: Use the same seed for fair comparison (when testing specific features)
3. **Environment Control**: Ensure all translations happen in the same environment
4. **Document Differences**: Note any differences in generation approach or parameters
5. **Multiple Metrics**: Use quality metrics, translation success, and subjective judgment

### For Presentation and Sharing
1. **Include Glosses**: Always provide interlinear glosses for linguistic analysis
2. **Note Simplifications**: Mention any simplifications made to the source text
3. **Provide Context**: Explain the significance of each text in the conlang community
4. **Show Statistics**: Report translation success rates and failure points
5. **Highlight Innovations**: Point out particularly clever or elegant solutions

### For Troubleshooting
1. **Check Errors First**: Look at failed translations to identify specific problems
2. **Test Components**: Verify each language module works correctly in isolation
3. **Isolate Variables**: Change one thing at a time to identify causes of issues
4. **Consult Documentation**: Review module documentation for expected behavior
5. **Seek Community Help**: Share specific examples with the conlang community for feedback

## Limitations and Considerations

### Text Selection Bias
- **Indo-European Bias**: Many texts favor Indo-European language structures
- **Western Bias**: Texts come primarily from Western literary and religious traditions
- **Modern Bias**: Texts reflect modern concepts and concerns
- **Literary Bias**: Favors narrative and expository texts over other genres

### Simplification Trade-offs
- **Loss of Nuance**: Simplification may lose subtle meanings or connotations
- **Conceptual Drift**: Simplified concepts may not capture original meaning accurately
- **Cultural Specificity**: Some concepts may not translate well across cultures
- **Lexical Gaps**: May highlight gaps in the lexicon rather than true language ability

### Technical Limitations
- **Deterministic Output**: No variation in output for the same language (may feel mechanical)
- **No Context**: Each sentence translated in isolation (loses discourse context)
- **Limited Pragmatics**: May not fully test pragmatic or sociolinguistic competence
- **Orthographic Focus**: May not adequately test writing systems or orthography
- **Pronunciation Assessment**: Cannot assess actual pronounceability or phonetics

### Cultural and Ethical Considerations
- **Appropriation**: Using religious texts may be problematic for some traditions
- **Representation**: Texts may not adequately represent diverse cultures and perspectives
- **Political Neutrality**: Some texts (like UDHR) have political implications
- **Historical Accuracy**: Simplifications may misrepresent historical concepts
- **Informed Consent**: Using texts from living traditions may require permission

### Alternative Approaches
1. **Parallel Texts**: Using texts specifically designed for linguistic comparison
2. **Minimal Pairs**: Focusing on contrasts that test specific linguistic features
3. **Grammar-specific Texts**: Texts designed to test particular grammatical constructions
4. **Semantic Domains**: Focusing on specific semantic fields (kinship, spatial, temporal)
5. **Procedural Generation**: Generating texts specifically to test language features
6. **Corpus Linguistics**: Using larger bodies of text for statistical analysis
7. **Emergent Communication**: Observing how language develops in interaction scenarios

Despite these limitations, TextLibrary remains an invaluable tool for constructed language development, providing standardized texts that enable meaningful comparison, improvement, and presentation of conlangs in a format familiar to both linguists and language enthusiasts.