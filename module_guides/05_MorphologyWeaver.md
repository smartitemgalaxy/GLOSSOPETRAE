# Morphology Weaver Module

## Purpose
The Morphology Weaver creates your language's grammatical structure - how words change to express meaning beyond their core definition. It builds the entire system of prefixes, suffixes, infixes, and other morphological processes that handle grammar like tense, plurality, possession, and more. Think of it as your language's "grammar engine."

## What It Does
- Designs complete nominal (noun/adjective) morphology systems
- Creates verbal (verb) morphology with tense, aspect, mood, voice, and agreement
- Builds derivational morphology for creating new words from existing ones
- Generates adpositions (prepositions/postpositions) and conjunctions
- Ensures all morphological components work together cohesively
- Produces naturalistic, linguistically plausible systems that follow universal tendencies

## Morphological Types
The Weaver intelligently selects your language's morphological type based on learnability and natural language distributions:

### 🔹 Isolating (15% probability)
- **What**: Minimal or no morphology; meaning conveyed through word order and particles (e.g., Vietnamese, Mandarin Chinese)
- **Structure**: Words are mostly invariant; grammatical relations shown by syntax
- **Best for**: Languages prioritizing simplicity, rapid acquisition, or analytic expression
- **Example sentence**: "I eat rice yesterday" (no past tense on verb)

### 🔹 Agglutinative (35% probability - weighted for LLM friendliness)
- **What**: Clear, separable morphemes each carrying one meaning (e.g., Turkish, Finnish, Japanese)
- **Structure**: Root + suffix1 + suffix2 + suffix3... (each suffix = one grammatical function)
- **Benefits**: Highly transparent, excellent for language learning, predictable parsing
- **Example**: Turkish "evlerimizden" = ev-ler-imiz-den (house-PLURAL-OUR-FROM) = "from our houses"

### 🔹 Fusional (25% probability)
- **What**: Morphemes fuse multiple meanings together (e.g., Spanish, Latin, Russian)
- **Structure**: Single ending encodes multiple grammatical categories simultaneously
- **Trade-offs**: More compact but less transparent; requires learning fusional patterns
- **Example**: Spanish "hablaba" = speak-IMITIVE-PAST-1ST/3RD-SINGULAR = "I/he/she was speaking"

### 🔹 Polysynthetic (15% probability)
- **What**: Very complex words that can express entire sentences in single words (e.g., Inuktitut, Mohawk)
- **Structure**: Numerous incorporated elements (nouns, adverbs) within the verb complex
- **Features**: Noun incorporation, extensive affixation, high information density per word
- **Example**: Central Alaskan Yup'ik "tuntussuqatarniksaitengqiggtuq" = "He had not yet said again that he was going to hunt reindeer"

### 🔹 Introflexive (10% probability)
- **What**: Internal modification of the root (vowel/consonant changes) rather than just affixing (e.g., Arabic, Somali)
- **Structure**: Root consonants + vowel patterns (like English sing/sang/sung, but more systematic)
- **Combination**: Often used alongside affixation (especially in Semitic languages)
- **Example**: Arabic k-t-b root: kataba (wrote), yaktubu (writes), maktub (written), kitab (book)

## Key Features
### Nominal (Noun) System
- **Case Systems**: From none (like English) to 6+ cases (like Finnish or Turkish)
  - Nominative/Accusative (subject/object)
  - Ergative/Absolutive (for transitive/intransitive subjects)
  - Genitive (possession)
  - Dative (indirect object)
  - Locative (location)
  - Instrumental (means)
  - Comitative (accompaniment)
  - Vocative (addressing)
  - And many others...

- **Number Systems**: Beyond singular/plural
  - Dual (exactly two)
  - Trial (exactly three)
  - Paucal (a few)
  - Plural (more than one)
  - Sometimes even greater plural or collective distinctions

- **Noun Classes/Gender Systems**:
  - Grammatical gender (masculine/feminine/neuter)
  - Semantic systems (animate/inanimate, human/non-human)
  - Classifier systems (like East Asian languages)
  - Bantu-style noun classes (dozens of categories with agreement)

- **Definiteness**: Articles (like English "the"/"a"), affixes, or none (context-dependent)

### Verbal (Verb) System
- **Tense**: When the action happens
  - Past/Non-past, Future/Non-future, Remote/Present/Hesternal/Yesterday tenses
  - Aspect often interacts closely with tense (perfective past vs imperfective past)

- **Aspect**: How the action unfolds in time
  - Perfective (completed action) vs Imperfective (ongoing/repeated)
  - Habitual, Continuous, Progressive, Prospective (about to), Retrospective (just finished)
  - Iterative (repeated), Semelfactive (single occurrence)

- **Mood**: The speaker's attitude toward the proposition
  - Indicative (statements of fact)
  - Imperative (commands/requests)
  - Subjunctive (hypothetical/wished-for situations)
  - Conditional (dependent on conditions)
  - Optative (expressing hope/wish)
  - Jussive (commanding third party)
  - Potential (expressing possibility)

- **Voice**: Perspective on the action
  - Active (subject does action)
  - Passive (action done to subject)
  - Middle/Reflexive (subject acts on/for self)
  - Antipassive (demotes object in ergative systems)
  - Causative (subject causes someone else to do action)
  - Applicative (adds beneficiary, instrument, locative, etc.)

- **Agreement**: Verb changes to match subject/object
  - Person (1st/2nd/3rd)
  - Number (singular/dual/plural)
  - Gender (if language has grammatical gender)
  - Noun class (in class languages)
  - Sometimes both subject AND object agreement (polypersonal agreement)

- **Evidentiality**: How you know what you're saying is true
  - Direct evidence (I saw it)
  - Reported evidence (I heard it from someone)
  - Inferential evidence (I deduce it from clues)
  - Assumed (I assume it's true)
  - Mirative (surprise - I just found out!)

- **Polarity**: Negation and affirmation systems
  - Negative particles, affixes, or suppletive forms
  - Sometimes distinct negative verbs

### Derivational Morphology
- **Word Formation**: Creating new words from existing roots
  - Nominalization: verb → noun ("act" → "action")
  - Verbalization: noun/adjective → verb ("child" → "childish" → "to childishly act")
  - Adjectivalization: noun/verb → adjective ("danger" → "dangerous")
  - Diminutives/Augmentatives: small/large versions ("dog" → "doggie" or "dogzilla")
  - Pejoratives/Amelioratives: negative/positive connotations
  - Causatives: make someone/something do X ("laugh" → "make laugh")

### Syntax Integration
- **Word Order**: Subject-Verb-Object (SVO), Subject-Object-Verb (SOV), Verb-Subject-Object (VSO), etc.
- **Alignment**: How languages treat subjects of transitive vs intransitive verbs
  - Nominative-Accusative (English: "I" vs "me")
  - Ergative-Absolutive (Basque: different marking for "I ran" vs "I saw him")
  - Active-Stative (based on volition/control)
  - Tripartite (separate marking for A, S, and P)
- **Adpositions**: Prepositions (before noun) vs Postpositions (after noun)
- **Particles**: Uninflected words for grammatical functions (topic, focus, question, etc.)

## Usage Example
```javascript
import { MorphologyWeaver } from './src/modules/MorphologyWeaver.js';
import { SyllableForge } from './src/modules/SyllableForge.js';

// First, generate syllable structures (needed for affix generation)
const syllableForge = new SyllableForge(Math.random(), {
  structure: '(C)(C)V(C)(C)', // Allow complex syllables
  onsetPreference: [['s', 'p', 't', 'k'], ['l', 'r', 'j', 'w']],
  codaPreference: [['n', 'm', 'ŋ', 'l', 'r', 's']]
});

// Now create the morphology system
const morphologyWeaver = new MorphologyWeaver(
  Math.random(),           // Random number generator
  syllableForge,          // Pass in syllable structure for affix compatibility
  {
    // Optional: Guide the system toward your linguistic goals:
    morphType: 'agglutinative',  // Want clear, separable morphemes
    caseCount: 6,               // Request 6 cases (NOM, ACC, GEN, DAT, LOC, INS)
    nounClasses: 3,             // Three noun classes (like masculine/feminine/neuter)
    verbAgreement: true,        // Verbs should agree with subject
    wordOrder: 'SOV',           // Subject-Object-Verb order (like Japanese/Turkish)
    alignment: 'nominative-accusative', // Standard alignment
    complexity: 'medium'        // Overall morphological complexity
  }
);

const morphology = morphologyWeaver.weave();
console.log(`Morphological Type: ${morphism.typeDescription}`);
console.log(`Word Order: ${morphism.wordOrder.description}`);
console.log(`Alignment: ${morphism.alignment}`);

// Explore the nominal system
console.log(`\nNominal System:`);
console.log(`- Case: ${morphism.nominal.caseSystem.description}`);
console.log(`- Number: ${morphism.nominal.numberSystem.description}`);
console.log(`- Noun Classes: ${morphism.nominal.nounClasses.description}`);
console.log(`- Definiteness: ${morphism.nominal.definiteness.description}`);

// See what cases are actually implemented
if (morphism.nominal.caseSystem.cases.length > 0) {
  console.log(`Cases: ${morphism.nominal.caseSystem.cases.map(c => c.name).join(', ')}`);
}

// Explore the verbal system
console.log(`\nVerbal System:`);
console.log(`- Tense: ${morphism.verbal.tenses.description}`);
console.log(`- Aspect: ${morphism.verbal.aspects.description}`);
console.log(`- Mood: ${morphism.verbal.moods.description}`);
console.log(`- Voice: ${morphism.verbal.voices.description}`);
console.log(`- Agreement: ${morphism.verbal.agreement.description}`);

// Check for interesting features
if (morphism.verbal.evidentiality.evidentials.length > 0) {
  console.log(`- Evidentiality: ${morphism.verbal.evidentiality.description}`);
}
if (morphism.verbal.polarity.negation.type !== 'none') {
  console.log(`- Negation: ${morphism.verbal.polarity.description}`);
}

// Look at derivational options
console.log(`\nDerivational System:`);
console.log(`- Processes: ${morphism.derivational.processes.count} types`);
morphism.derivational.processes.examples.forEach(p => {
  console.log(`  • ${p.name}: ${p.meaning}`);
});

// See sample affix patterns
console.log(`\nSample Morphology:`);
if (morphism.nominal.affixes.template.length > 0) {
  console.log(`Noun structure: ${morphism.nominal.affixes.order.join('-')}`);
}
if (morphism.verbal.template.slots.length > 0) {
  console.log(`Verb template: ${morphism.verbal.template.formula}`);
}
```

## Best Practices
### Choosing Your Morphological Type
- **For language learning tools**: Agglutinative is ideal (transparent, regular)
- **For naturalistic isolation**: Let the system choose based on your phonology/syllable structure
- **For ancient/languge families**: Research real families (Afro-Asiatic = often introflexive, Austronesian = often agglutinative)
- **For alien/languages**: Consider what biology/psychology would favor (e.g., hive mind might favor polysynthetic with incorporated objects)
- **For secret/coded languages**: Consider highly agglutinative with affix stacking for density

### Designing Effective Case Systems
1. **Start with core functions**: Nominative (subject), Accusative (object), Genitive (possession)
2. **Add spatial cases**: Locative (in/at), Ablative (from), Allative (to/toward)
3. **Consider sociocognitive cases**: Instrumental (with/by means), Comitative (together with), Sociative (like)
4. **Think about obviation**: Some languages mark proximity/distance from discourse center
5. **Match to culture**: Nomadic cultures often develop rich locative/spatial case systems

### Building Natural Verb Systems
- **Universals to consider**:
  - Almost all languages have some past/non-past distinction
  - Imperatives are extremely rare to lack
  - If you have future tense, you very likely have past tense
  - Perfective/imperfective aspect is extremely common cross-linguistically
- **Avoid over-marking**: Very few languages mark 10+ tenses, moods, and aspects simultaneously
- **Consider hierarchy**: Often Mood > Tense > Aspect in terms of semantic scope
- **Think about evidentiality**: If your culture values epistemological honesty, evidential systems may be elaborate

### Making Derivation Feel Natural
- **Start productive**: Begin with highly productive derivational patterns (like -er for agentives in English: teach → teacher)
- **Consider semantic transparency**: Learners should be able to guess meaning from parts
- **Watch for blocking**: If a word already exists, new formations may be blocked (e.g., we don't say *"stealer" because "thief" exists)
- **Chain carefully**: Some derivations can apply multiple times (un- + do- + -able = undoable), others cannot (*unhappier vs *unhappy+er)

### Syntax-Morphology Harmony
- **Head direction consistency**: If your language is head-final (SOV), expect postpositions, relative clauses before nouns, etc.
- **Agreement and word order**: Rich agreement often correlates with freer word order (like Latin)
- **Case and adpositions**: Languages with rich case systems often need fewer adpositions (case handles spatial relations)
- **Polysynthesis and word order**: Polysynthetic languages often have very free word order since the verb contains all arguments

### Avoiding Common Pitfalls
- ❌ **Overwhelming complexity**: Remember that actual language users have to learn and use this!
- ❌ **Ignoring frequency**: Make common grammatical markers simple and short (Zipf's law)
- ❌ **Inconsistent symbolism**: Don't use the same affix for completely unrelated functions
- ❌ **Forgetting iconicity**: Some form-meaning mappings are more natural (plural often marked by repetition/reduplication)
- ❌ **Neglecting phonological constraints**: Affixes must fit your language's sound patterns
- ❌ **Creating unspeakable clusters**: Watch for impossible consonant combinations at morpheme boundaries
- ❌ **Making everything obligatory**: In natural language, much morphology is optional or context-dependent

## Integration with Other Modules
The Morphology Weaver depends on:
- **SyllableForge**: Essential - determines what kinds of affixes are phonotactically legal
- **PhonemeSelector**: Influences what sounds can appear in morphemes
- **LexiconGenerator**: Provides root words that morphology will attach to
- **SyntaxEngine** (implied): Works with word order and syntactic constraints
- **SemanticStego** (optional): Can embed meaning in morphological choices

It provides critical input to:
- **GlyphForge**: Determines what diacritics or special characters might be needed for morphological marking
- **AudioForge**: Needs to know how to pronounce morpheme boundaries and alternations
- **TranslationEngine**: Essential for generating correct grammatical forms
- **NameForge**: Ensures generated names respect morphological constraints
- **LanguageAttributes**: The morphology both influences and is influenced by cultural traits
- **SteganographyEngine**: Can hide data in choice of synonymous morphological forms

## Pro Tips
### Creating Naturalistic Irregularity
Even highly regular languages have some irregularity:
- **High-frequency words**: Tend to be irregular (think "go/went/gone", "be/am/is/are/was/were")
- **Short words**: More prone to irregularity and suppletion
- **Historical layers**: Older vocabulary often shows more irregularity
- **Loanwords**: May retain foreign morphology or resist native patterns

### Designing for Learnability
If creating a language for learners:
1. **Start transparent**: Begin with agglutinative tendencies
2. **Limit irregularity**: Concentrate it in very high-frequency words
3. **Make paradigms predictable**: If you can guess one form, you should get others right
4. **Provide clear markers**: Avoid zero-marking for important distinctions when possible
5. **Consider regularity gradients**: Core grammar more regular, periphery more idiomatic

### Cultural Embedding in Morphology
Your morphology can reflect cultural values:
- **Evidentiality systems**: High in cultures that distinguish direct/indirect knowledge carefully
- **Honorifics**: Complex verbal morphology for social hierarchy (like Japanese)
- **Possessive constructions**: Reflect societal views on ownership vs relationship
- **Spatial systems**: Reflect environment (Inuit languages have many snow-related terms)
- **Taboo avoidance**: May lead to special grammatical constructions or avoidance patterns

### Testing Your Morphology
Before finalizing:
1. **Generate paradigm charts**: For nouns, pronouns, verbs in different tenses
2. **Try translating sentences**: Start simple, add complexity
3. **Check for blocking**: Ensure synonymous forms aren't competing unnaturally
4. **Test length**: Are words becoming impossibly long with multiple affixes?
5. **Check reversibility**: Can you reliably parse words back to roots?
6. **Try language games**: Pig Latin, backslang, or secret speech versions should work
7. **Consider acquisition order**: What would children learn first? Last?

### Advanced Techniques
- **Split systems**: Different parts of speech behave differently (e.g., nouns ergative, verbs accusative)
- **Fluid-S systems**: Some intransitive subjects pattern with agents, others with patients
- **Hierarchical alignment**: Agreement patterns change based on person hierarchy (2 > 1 > 3)
- **Distributed exponentials**: One grammatical meaning spread over multiple affixes
- **Zero morphology**: Sometimes the absence of an affix carries meaning (like English plural -Ø in sheep)
- **Suppletion**: Completely different roots for related meanings (go/went, good/better/best)
- **Defectiveness**: Some lexical items missing certain forms (like English modals lacking infinitive/participle)

Remember: The most natural-sounding morphologies balance expressiveness with learnability - they give speakers the tools they need to communicate precisely without requiring unreasonable effort to produce or comprehend.
