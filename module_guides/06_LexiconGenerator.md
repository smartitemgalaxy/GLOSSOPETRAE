# Lexicon Generator Module

## Purpose
The Lexicon Generator creates your language's vocabulary - the words that speakers actually use to communicate. It doesn't just make random sounds; it generates semantically organized, phonologically appropriate words with full grammatical paradigms, frequency information, and semantic field organization. Think of it as your language's dictionary and thesaurus combined, with built-in grammar.

## What It Does
- Generates vocabulary across semantic fields (nature, society, technology, emotions, etc.)
- Creates phonologically valid words that fit your language's sound patterns
- Assigns appropriate word classes (noun, verb, adjective, etc.)
- Generates full grammatical paradigms (plural forms, verb conjugations, etc.)
- Applies Zipfian frequency distributions (few very common words, many rare words)
- Avoids accidental resemblances to prohibited words or concepts
- Organizes entries by semantic field for easy navigation
- Creates function words (conjunctions, prepositions, pronouns) alongside content words
- Ensures semantic coherence within fields (related concepts have related forms)
- Optionally focuses on core concepts only (for minimal viable language)

## Semantic Field Organization
The generator organizes concepts into meaningful categories, making your lexicon culturally and cognitively realistic:

### 🌿 Core Semantic Fields
Based on linguistic research into universal human experience:

**1. PERSON & SOCIETY** (Most fundamental)
- Pronouns (I, you, we, they, this, that)
- Kinship (mother, father, son, daughter, brother, sister)
- Social roles (leader, friend, enemy, stranger, teacher, healer)
- Body parts (head, hand, eye, heart, blood, bone)
- Emotions & states (happy, sad, angry, afraid, tired, hungry, thirsty)
- Life events (birth, death, marriage, war, peace, celebration)

**2. MATERIAL WORLD** (Survival & technology)
- Natural elements (water, fire, earth, air, stone, wood)
- Flora & fauna (tree, grass, fruit, meat, fish, bird, insect)
- Celestial bodies (sun, moon, star, sky, cloud, rain, wind)
- Landscape features (mountain, valley, river, lake, sea, island)
- Raw materials (metal, clay, fiber, pigment, fuel, medicine)
- Tools & artifacts (knife, pot, cloth, rope, shelter, fire, wheel)

**3. ACTION & PERCEPTION** (Interaction with world)
- Basic actions (go, come, see, hear, touch, take, give, make, break)
- Communication (speak, listen, tell, ask, answer, lie, truth)
- Mental processes (think, know, remember, forget, understand, learn)
- Emotional expressions (laugh, cry, smile, frown, shout, whisper)
- Movement types (walk, run, jump, swim, fly, climb, bend, stretch)
- Sensory modalities (see, hear, smell, taste, touch, balance, temperature)

**4. QUANTITY & RELATION** (Abstract structuring)
- Numbers & counting (one, two, three, many, few, half, all, part, more, less)
- Size & dimension (big, small, long, short, tall, wide, thick, thin)
- Shape & form (round, square, straight, curved, flat, pointed, hollow)
- Position & direction (here, there, above, below, inside, outside, between, middle)
- Time concepts (now, then, before, after, when, while, always, never, often, seldom)
- Order & sequence (first, last, next, previous, before, after, between)
- Comparison & equality (same, different, similar, equal, more than, less than)
- Grouping & structure (group, set, pair, chain, network, hierarchy, system)

**5. COGNITION & SPIRITUALITY** (Higher mental functions)
- Truth & falsity (true, false, real, pretend, possible, impossible, certain, doubtful)
- Value & evaluation (good, bad, beautiful, ugly, right, wrong, fair, just, worthy)
- Belief & faith (believe, doubt, know, think, suppose, hope, fear, pray, worship)
- Concepts & abstractions (idea, thought, concept, law, rule, principle, theory, method)
- Language & symbols (word, name, symbol, sign, picture, sound, music, story, poem)
- Self & identity (self, identity, personality, character, will, desire, intention, purpose)

**6. CREATED & CONSTRUCTED** (Human-made & artificial)
- Constructs & structures (building, road, bridge, wall, fence, gate, roof, floor)
- Textiles & clothing (cloth, thread, needle, sew, weave, dye, wash, wear)
- Containers & storage (bag, box, basket, bowl, pot, jar, bottle, sack, barrel)
- Vehicles & transport (cart, wagon, boat, ship, sled, ski, skate, wing, wheel, engine)
- Written language (writing, reading, alphabet, letter, number, symbol, code, file)
- Computation & logic (calculate, compute, compare, sort, match, select, insert, delete, update, create, read)
- Energy & power (electricity, battery, wire, switch, light, heat, cool, power, energy, force)

Each field contains hundreds of carefully selected concepts representing universal human experiences, with priority given to cross-cultural fundamentals.

## Key Features
### Phonological Realism
- Words conform strictly to your language's phonotactics (syllable structure)
- Respects consonant/vowel alternation patterns and cluster restrictions
- Avoids phonotactically impossible or highly marked sequences
- Matches stress patterns to your language's prosodic system
- Applies allophonic variations where appropriate in derived forms

### Semantic Coherence
- Related concepts often share phonetic or morphological similarities
- Antonyms often have recognizable relationships (sometimes opposites in form)
- Semantic fields show internal consistency (e.g., all water-related terms might share a phonetic element)
- Borrowing/resistance patterns reflect semantic field properties (core vocabulary resists change more)

### Frequency Distribution
- Implements Zipf's law: a few words very common, many words rare
- Core concepts (pronouns, basic verbs, basic nouns) get highest frequency
- Technical/specialized terms get lower frequency
- Function words (articles, conjunctions) often highest frequency despite being "small"

### Paradigm Completeness
- **Nouns**: Generate plural forms, possessive forms, case forms (if your language has case)
- **Verbs**: Generate full conjugation paradigms for tense/aspect/mood/voice combinations
- **Adjectives**: Generate comparative/superlative forms, adverbial forms
- Ensures morphological consistency (if you say "walk" is verb, all derived forms follow verb rules)

### Function Word Generation
- Creates essential grammatical glue: conjunctions, pronouns, demonstratives, interrogatives
- These often become grammaticalized from content words over time (lexicalization)
- Ensures they are phonetically distinct from content words when needed
- Respects your language's preferred strategies (affix vs particle vs word order)

### Semantic Field Sensitivity
Different fields get different treatment:
- **Core vocabulary** (pronouns, basic verbs): Highly conserved, resistant to change
- **Technical terms**: More open to borrowing and innovation
- **Taboo/euphemism fields**: May show avoidance patterns or special formations
- **Flora/fauna**: Often show regional variation and onomatopoeic elements
- **Emotions**: Frequently involve interjections and expressive phonetics
- **Colors**: Often show cultural variation in categorization and naming

## Usage Example
```javascript
import { LexiconGenerator } from './src/modules/LexiconGenerator.js';
import { SyllableForge } from './src/modules/SyllableForge.js';
import { MorphologyWeaver } from './src/modules/MorphologyWeaver.js';

// First, generate prerequisites
const syllableForge = new SyllableForge(Math.random(), {
  structure: '(C)(C)V(C)(C)', // Syllable structure
  onsetPreference: [['s', 'p', 't', 'k'], ['m', 'n', 'l', 'r']],
  codaPreference: [['n', 'm', 'ŋ', 'l', 'r']]
});

const morphologyWeaver = new MorphologyWeaver(
  Math.random(),
  syllableForge,
  {
    morphType: 'agglutinative',
    caseCount: 4,  // Nominative, Accusative, Genitive, Dative
    nounClasses: 2, // Animate/Inanimate
    verbAgreement: true
  }
);

// Generate the lexicon
const lexiconGenerator = new LexiconGenerator(
  Math.random(),           // Random number generator
  syllableForge,          // For phonotactically valid word forms
  morphologyWeaver,       // To attach proper paradigms to words
  {
    // Optional configuration:
    coreOnly: false,       // Set to true for just the ~650 most fundamental concepts
    minEditDistance: 2,    // Minimum phonetic difference between words (prevents confusion)
    attributeModifier: null // Optional: function to modify entries (e.g., for stealth language)
  }
);

const lexicon = lexiconGenerator.generate();
console.log(`Generated ${lexicon.getEntries().length} lexical entries`);
console.log(`Average syllables per word: ${lexicon.avgSyllables.toFixed(1)}`);
console.log(`Semantic fields covered: ${lexicon.semanticFields}`);

// Look up specific words
const waterEntry = lexicon.lookup('water');
if (waterEntry) {
  console.log(`\nWater entry:`);
  console.log(`  Lemma: ${waterEntry.lemma}`);
  console.log(`  Gloss: ${waterEntry.gloss}`);
  console.log(`  Class: ${waterEntry.class}`);
  console.log(`  Field: ${waterEntry.field}`);
  console.log(`  Syllables: ${waterEntry.syllables}`);
  console.log(`  Frequency: ${waterEntry.frequency}`);
  
  // If it's a noun, see its paradigm
  if (waterEntry.class === 'noun' && waterEntry.paradigm) {
    console.log(`  Paradigm:`, waterEntry.paradigm);
  }
}

// Explore by semantic field
const natureWords = lexicon.getByField('nature');
console.log(`\nNature-related words (${natureWords.length}):`);
natureWords.slice(0, 5).forEach(word => {
  console.log(`  ${word.lemma} [${word.gloss}]`);
});

// Get all verbs
const verbs = lexicon.getByClass('verb');
console.log(`\nSample verbs (${verbs.length} total):`);
verbs.slice(0, 5).forEach(v => {
  console.log(`  ${v.lemma} - ${v.gloss}`);
  if (v.paradigm) {
    console.log(`    Paradigm keys: ${Object.keys(v.paradigm).join(', ')}`);
  }
});

// Look at function words
const functionWords = ['and', 'or', 'but', 'if', 'because'].filter(w => lexicon.lookup(w));
console.log(`\nFunction words found:`);
functionWords.forEach(fw => {
  const entry = lexicon.lookup(fw);
  console.log(`  ${fw} → ${entry.lemma} (${entry.class})`);
});

// Generate example sentences using real vocabulary
console.log(`\nExample vocabulary in context:`);
const subject = lexicon.lookup('I')?.lemma || 'mi';
const verb = lexicon.lookup('see')?.lemma || 'vide';
const object = lexicon.lookup('water')?.lemma || 'akwa';
console.log(`"I see water" might be: ${subject} ${verb} ${object}`);

// Check for semantic relationships
const fireEntry = lexicon.lookup('fire');
const waterEntry = lexicon.lookup('water');
if (fireEntry && waterEntry) {
  console.log(`\nElemental pair:`);
  console.log(`  Fire: ${fireEntry.lemma} (${fireEntry.syllables} syllables)`);
  console.log(`  Water: ${waterEntry.lemma} (${waterEntry.syllables} syllables)`);
  // Often these might share phonetic elements or contrasting features
}
```

## Best Practices
### Core vs Extended Lexicon
- **Core only (∼650 concepts)**: 
  - Ideal for minimal viable language, pidgins, or trade jargon
  - Focuses on universals: pronouns, basic kinship, survival terms, basic actions
  - Higher frequency concentration, easier to learn
  - Good for testing grammatical systems before full vocabulary load

- **Full lexicon (∼2000+ concepts)**:
  - Complete expressive language for literature, technical discussion, daily life
  - Includes specialized terminology for professions, hobbies, scientific domains
  - Better represents real-world language richness and specificity
  - Necessary for translation work and complex expression

### Phonological Consistency
- **Respect syllable structure**: If your language forbids final consonants, don't generate words ending in them
- **Match sonority profiling**: Onsets should rise in sonority, codas should fall (generally)
- **Apply harmonic processes**: If your language has vowel harmony, ensure it's respected in derived forms
- **Watch for accidental minimal pairs**: Don't make "pa" and "ba" mean unrelated things if /p/-/b/ contrast isn't stable
- **Consider tone**: If tonal, ensure tone patterns fit your language's tonal grammar

### Semantic Field Strategies
- **Prioritize by culture**: 
  - Desert culture: Expand water, shade, night travel, heat protection terms
  - Maritime culture: Rich fish, wave, wind, boat, navigation vocabulary
  - Agricultural: Detailed crop, soil, season, tool, livestock terminology
  - Technological: Precise tool, material, process, measurement, precision vocabulary
  - Academic: Abstract reasoning, classification, hypothesis, evidence, argument terms

- **Handle sensitive fields carefully**:
  - **Numbers**: Some cultures have limited exact number systems ("one, two, many")
  - **Colors**: Not all languages distinguish blue/green; some have more granular distinctions
  - **Emotions**: Some languages lexicographically separate what we consider "emotion" vs "cognition"
  - **Kinship**: Vast variation in how cultures categorize relatives (some bifurcate, some lineal, some generational)
  - **Space**: Some use absolute cardinal directions, others egocentric (left/right/front/back relative to speaker)

### Frequency Management
- **Follow Zipf's law naturally**: 
  - Rank 1 word: ~7% of all tokens
  - Rank 10 word: ~1.5% of all tokens
  - Rank 100 word: ~0.15% of all tokens
  - Rank 1000 word: ~0.015% of all tokens
- **Function words often rank highest**: "the", "be", "to", "of", "and", "a", "in", "that", "have"
- **Content word frequency**: Reflects real-world usage (more "water" than "quark", more "see" than "neutrino")
- **Consider register**: Formal, informal, sacred, vulgar, technical varieties may have different frequency profiles

### Avoiding Common Pitfalls
- ❌ **Semantic gaps**: Don't have words for "mother" but not "father" without cultural reason
- ❌ **False friends**: Avoid accidental resemblances to undesirable concepts in known languages
- ❌ **Over-systematicity**: Natural languages have exceptions, idioms, and irregular words
- ❌ **Ignoring borrowing resistance**: Core vocabulary (pronouns, numbers, basic kin terms) resists change
- ❌ **Neglecting phonetic symbolism**: Some form-meaning mappings are more natural than others
- ❌ **Making everything predictable**: Natural languages have lexicalized idioms and metaphorical extensions
- ❌ **Forgetting dialectal variation**: Real languages have regional, social, and stylistic variants
- ❌ **Overlooking historical layers**: Older vocabulary often shows different patterns than neologisms

### Specialized Voceneration Strategies
- **Onomatopoeia**: 
  - Sounds: buzz, hum, hiss, roar, splash, crash, bang, twit, tweet, chirp
  - Movements: flip, flop, zigzag, wobble, jiggle, waver, flutter
  - Emotions: giggle, whimper, grunt, sigh, moan, sob, wail
- **Sound symbolism**: 
  - High front vowels (i, e) often associated with smallness, brightness, lightness
  - Low back vowels (a, o, u) often associated with largeness, darkness, heaviness
  - Consonant voicing often relates to perceived strength/softness
- **Morphological transparency**: 
  - Related concepts often share roots (see/sight/vision, know/knowledge/knowledgeable)
  - Antonyms sometimes show morphological relationships (happy/unhappy, possible/impossible)
- **Cultural key concepts**: 
  - Every culture has "untranslatable" words that capture unique worldviews
  - Consider what concepts are culturally central to your speakers

## Integration with Other Modules
The Lexicon Generator depends on:
- **SyllableForge**: Essential - determines what word shapes are phonotactically legal
- **MorphologyWeaver**: Critical - provides paradigms for inflecting words according to your grammar
- **PhonemeSelector**: Influences what sounds are available and their relative frequencies/naturalness
- **Semantic data**: Built-in concept database with frequency, class, and field information
- **Attribute modifiers** (optional): For creating special lexicons (stealth languages, jargon, etc.)

It feeds into:
- **TranslationEngine**: Essential - provides the word-for-word basis for translation
- **AudioForge**: Needs to know how to pronounce each word (syllables, stress patterns)
- **GlyphForge**: Determines what needs to be written (and thus what glyphs are required)
- **NameForge**: Ensures generated names fit phonotactics and avoid existing words
- **SteganographyEngine**: Can hide data in alternative spellings, synonyms, or rare word choices
- **Semantics engines**: Enables studies of semantic shift, metaphor, and conceptual structure
- **LanguageLearner modules**: Provides vocabulary for acquisition simulations and testing

## Pro Tips
### Creating Naturalistic Lexical Relations
- **Echoic formations**: 
  - Reduplication for repetition/intensity: "go-go" (keep going), "talk-talk" (gossip)
  - Ablaut patterns for related concepts: sing/sang/sung, bind/bound/bound
  - Consonant gradation: pat/pet/pit (light touch/firm touch/strike)
- **Metaphorical extension**: 
  - Spatial → temporal: "ahead" (future), "behind" (past)
  - Physical → psychological: "warm" (personality), "sharp" (intellect)
  - Biological → social: "flower" (youth, beauty), "root" (origin, foundation)
- **Taxonomic relations**: 
  - Hyponymy: dog → animal, rose → flower
  - Meronymy: wheel → car, page → book
  - Antonymy: hot/cold, full/empty, push/pull
- **Collocational networks**: 
  - What naturally co-occurs? (salt/pepper, hammer/nail, knife/fork)
  - What strongly avoids each other? (oil/water, fire/water in some contexts)

### Handling Difficult Concepts
- **Abstract concepts**: Often formed by metaphor from concrete domains
  - Time from space: "long meeting", "short break"
  - Mind from body: "heartbroken", "gut feeling", "headache"
  - Social from physical: "weighty issue", "light touch", "heavy heart"
- **Technical terms**: 
  - Often borrow/calque from prestige languages or use descriptive phrases
  - May develop specialized registers or sublanguages
  - Consider creating classifiers or measure words for precise specification
- **Taboo and euphemism**: 
  - Direct terms may be avoided, replaced by borrowings, descriptions, or metaphors
  - Consider "avoidance speech styles or special registers for certain contexts
  - Some cultures have avoidance relationships (e.g., not saying mother-in-law's name)

### Testing Your Lexicon
Before finalizing:
1. **Coverage check**: Can you express basic human needs? (Eat, drink, sleep, shelter, safety, belonging, esteem, self-actualization)
2. **Translation test**: Try translating simple sentences from known languages
3. **Semantic field balance**: Are all fields adequately represented? Any glaring gaps or excesses?
4. **Phonological validity**: Can all words actually be pronounced in your language?
5. **Morphological compatibility**: Do words accept affixes correctly according to your morphology?
6. **Frequency sanity check**: Do the most frequent words make sense for communication?
7. **Learnability simulation**: How many exposures would a learner need to acquire core vocabulary?
8. **Cultural coherence**: Does the vocabulary reflect a coherent cultural worldview?
9. **Register appropriateness**: Do formal/informal/sacred/vulgar distinctions work as expected?
10. **Extensibility**: Can you easily add new terms for emerging concepts without breaking the system?

### Advanced Lexical Engineering
- **Dialectal simulation**: Create regional variants with systematic phonological differences
- **Historical layers**: Mark older vocabulary with different characteristics (shorter, more irregular, different frequency)
- **Register variation**: Develop formal, colloquial, technical, sacred, and vulgar sublexicons
- **Specialized jargons**: Create profession-specific or hobby-specific terminology
- **Loanword strata**: Simulate different historical layers of borrowing with different adaptation patterns
- **Taboo avoidance systems**: Model how certain concepts get avoided or replaced in specific contexts
- **Speech error modeling**: Simulate common malapropisms, blends, and shifts for realism
- **Acquisition tracking**: Simulate which words would be learned first/last by children
- **Network analysis**: Study semantic networks, clustering, and centrality in your lexicon
- **Evolution simulation**: Model how words might change meaning over generations (broadening, narrowing, shift, metaphor)

Remember: A lexicon is more than a list of words - it's a map of a culture's understanding of the world. The best lexicons feel inevitable, like they couldn't possibly be any other way for that people living in that environment with those values and experiences.
