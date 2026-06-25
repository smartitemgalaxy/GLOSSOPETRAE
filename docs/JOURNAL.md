# GLOSSOPETRAE — Session Journal

## 2026-06-26 (session 2) — translateDirect + Full DB Connection for Mode B

### Done this session
- Created `scripts/lookup_conlang.mjs`: fast lemma↔gloss lookup against 7,334-entry enriched_lexicon.json with invisible char stripping and suffix-aware decode mode
- Fixed TranslationEngine reverse cache: generated words now registered in `_reverseCache` so `translateBack()` can find them
- Fixed `_stripAffixes()`: now checks `_reverseCache` alongside `lexicon.entries` when looking up stripped stems
- Created `translateDirect()`: word-by-word translation that bypasses the English-only parser, preserving word order/count and all semantic content for any language (French/English)
- Exposed `translateDirect()` in GlossopetraeSkill
- Updated dashboard `/api/translate`: output uses `translateDirect`, gloss keeps `translateFull`
- Updated SKILL.md: Mode A uses `translateDirect`, Mode B uses engine `translateBack()` connected to full DB, mini-lexicon kept as reference only
- Root cause confirmed: tokenizer is English-only — all French words fall to "noun" by default, making `translateFull` drop >80% of words on complex French prompts

### Technical decisions
- `translateDirect()`: lexicon lookup → unknownWordCache → `_generateUnknownWord()` (which itself checks acronym/properNoun/calque/procedural)
- Mode B decoding: `_stripAffixes` uses a `findStem()` helper that checks BOTH lexicon.entries AND _reverseCache
- `_generateUnknownWord()` now calls `this._reverseCache.set(result, ...)` to register every generated word for reverse lookup
- PHT+TKB invisible chars stripped via code-point range check (U+200B-F, U+202A-E, U+2060-9, U+FE00-F, U+E0000-E007F, U+FEFF, U+00AD, U+200C-D)

### Files touched
- `src/modules/TranslationEngine.js` (+translateDirect, +reverseCache registration, +findStem helper in _stripAffixes)
- `src/skill/GlossopetraeSkill.js` (+translateDirect)
- `dashboard/server.mjs` (/api/translate output now uses translateDirect)
- `scripts/lookup_conlang.mjs` (created)
- `~/.claude/skills/decouple/SKILL.md` (Mode A/B rewritten)
- `docs/JOURNAL.md` (modified)

## 2026-06-26 — Phonetic Transliteration Purged + Enterprise Words + Regenerated Lexicon

### Done this session
- Root cause identified: `_transliterate()` (TranslationEngine) + `_phoneticTranscription()` (QualityEngine) were direct character-by-character phonetic mappings, producing words near-identical to French/English (`administirateur`, `sjistime`, `fikhiera`)
- Created `_generateProcedural()` in TranslationEngine — pure CV(C) syllable generation from word hash/seed, zero phonetic mapping
- Replaced all `_transliterate()` calls in TranslationEngine (`_generateUnknownWord`, `_handleAcronym`, `_handleProperNoun`, `_buildCalque`) with `_generateProcedural()`
- Removed dead methods: `_transliterate()`, `_enforcePhonology()`, `_buildSoundMap()` from TranslationEngine
- Fixed QualityEngine: `_generateOnTheFly()` now never returns null (has fallback consonant/vowel sets); strategy #5 changed from `_phoneticTranscription()` to `_generateOnTheFly()`
- Removed dead method: `_phoneticTranscription()` from QualityEngine
- Added 82 enterprise/service names to IT wordlist (gmail, protonmail, facebook, chatgpt, apple, aws, azure, docker, kubernetes, etc.)
- Regenerated enriched lexicon: 6,170 unique words → 6,070 added → 7,326 total entries
- Verified: `administrateur→ruhinua`, `système→rakïqaa`, `fichier→litoyia`, `gmail→miroa` — zero French/English resemblance
- Dashboard running on port 3000, serving enriched lexicon

### Technical decisions
- `_generateProcedural()` and `_generateOnTheFly()` use identical seed algorithm: `((seed << 5) - seed) + charCodeAt`, `Math.abs()`, syllable indices via `(seed + i*7 + i*i*3)` pattern
- Both methods have hardcoded consonant/vowel fallbacks for robustness even without phonology data
- Coda insertion: `(seed + i*3) % 5 < 3` — ~60% of syllables get coda, avoiding predictable patterns
- Enterprise names treated as regular words (not acronyms/proper nouns) — flow through normal procedural generation

### Files touched
- `src/modules/TranslationEngine.js` (added `_generateProcedural()`, fixed `_buildCalque()`, removed `_transliterate()`/`_enforcePhonology()`/`_buildSoundMap()`)
- `src/modules/QualityEngine.js` (fixed `_generateOnTheFly()` never-null, removed `_phoneticTranscription()`)
- `data/wordlists/IT.txt` (+82 enterprise names)
- `data/enriched_lexicon.json` (regenerated, 7326 entries)
- `docs/JOURNAL.md` (modified)

### Clear next step
- Update SKILL.md mini-lexicon with freshly generated lemmas from regenerated enriched JSON

## 2026-06-25 — Enriched Lexicon (+5924 words, 13 domains)

### Done this session
- Created 13 wordlists (500 words each): fr_general, en_general, IT, FINANCE, RED_TEAM, MARKETING, MILITARY, SCIENTIFIC, DATA_ANALYSIS, MATHEMATICS, PHILOSOPHY, COMMERCIAL, LEGAL
- Created scripts/enrich_lexicon.mjs: forge + load 13 wordlists + dedup (6024 unique) + batch expandLexicon(100) + merge into lexicon.entries + export JSON
- Exported data/enriched_lexicon.json (7180 entries, up from 1256)
- Updated dashboard/server.mjs: loads enriched_lexicon.json at boot, /api/lexicon reads from enriched source
- Updated SKILL.md mini-lexicon from 75 to ~200 words with domain sections (IT, Finance, Red Team, Military, Scientific, Data Analysis, Math, Philosophy, Commercial, Legal)
- 1 batch failed ("alternatives is not iterable") but 60/61 succeeded

### Technical decisions
- Wordlists: 500 words/domain, plain text, one word per line
- enrich_lexicon.mjs: batch size 100, expandLexicon() → merge into lang.language.lexicon.entries by push
- Enriched JSON loaded at boot by dashboard, used as primary source in /api/lexicon
- Skill mini-lexicon populated with actual conlang lemmas extracted from enriched JSON (grep-like extraction)
- Some lemmas contain invisible Unicode (PHT+TKB) — kept as-is in skill for authentic conlang recognition

### Files touched
- data/wordlists/*.txt (13 files created)
- scripts/enrich_lexicon.mjs (created)
- data/enriched_lexicon.json (created, 7180 entries)
- dashboard/server.mjs (modified: ENRICHED_LEXICON loading + /api/lexicon source)
- ~/.claude/skills/decouple/SKILL.md (modified: mini-lexicon ~75→~200 words)
- docs/JOURNAL.md (modified)

## 2026-06-25 — Dashboard + Native Mode B + Enriched Lexicon spec

### Done this session
- Built GLOSSOPETRAE Dashboard (`dashboard/`) — local web app, zero dependencies
  - Dark theme, input/output panels, encoding stats, grammar viewer, lexicon browser
  - 6 REST API endpoints via Node.js native `http` module
  - Live translation with invisible char detection (PHT+TKB)
- Redesigned `/decouple` skill: Mode B = native conlang understanding
  - Grammar Guide recalibré sur le moteur réel (NOM `-a`, ACC `-e`, NFUT/FUT, accord sujet+objet)
  - Mini-lexicon 75 mots intégré pour compréhension zero-shot sans bash
  - `/recouple` devient fallback uniquement
- Testé `/decouple` Mode B : prompt conlang exécuté → CSV généré
- Brainstorming + spec + plan pour lexique enrichi (13 domaines, ~7750 mots)
- Dashboard ouvert et testé dans navigateur

### Technical decisions
- Skill Grammar Guide mis à jour avec grammaire réelle du moteur (pas la version idéalisée)
- Reconnaissance phonétique français→conlang pour les mots hors-lexique (ex: `générer→knirera`)
- `expandLexicon()` stocke dans `_generatedCache`, pas `lexicon.entries` → merge manuel requis
- Push refusé (403) sur `elder-plinius/GLOSSOPETRAE` — user `smartitemgalaxy`

### Files touched
- `dashboard/server.mjs` (créé)
- `dashboard/public/index.html` (créé)
- `dashboard/public/style.css` (créé)
- `dashboard/public/app.js` (créé)
- `~/.claude/skills/decouple/SKILL.md` (refondu — Mode B natif)
- `package.json` (modifié — script "dashboard")
- `docs/JOURNAL.md` (modifié)
- `docs/superpowers/specs/2026-06-25-enriched-lexicon-design.md` (créé)
- `docs/superpowers/plans/2026-06-25-enriched-lexicon.md` (créé)
- `output/generated_accounts.csv` (créé — test Mode B)

### Clear next step
- Exécuter le plan d'enrichissement lexical (Task 1→6): créer 13 wordlists, lancer `enrich_lexicon.mjs`, mettre à jour dashboard + skill

## 2026-06-25 — `/decouple` skill + PHT/TKB engine validation

### Done this session
- Activated GLOSSOPETRAE skill (user-invocable: true, 3 files consistent)
- Deep-dived into `LanguageAttributes.js` (1140 lines), `TokenExploiter.js`, `GlossopetraeSkill.js`
- Demonstrated PHT (Phantom) + TKB (TokenBreak) live encoding via `GlossopetraeSkill.forge()` with custom attributes
- Created Claude Code skill `~/.claude/skills/decouple/SKILL.md`:
  - `/decouple` — encode messages with PHT+TKB
  - `/recouple` — decode via engine
  - `/decouple-protocol` — multi-agent shared protocol
  - Integrated Grammar Guide (SOV, cases: NOM -tï / ACC -e, tenses: PST -u)
  - Hybrid decoding: grammar in context + bash lookup for lexicon
- Verified invisible chars (U+200B, U+FE00-0F) in encoded output
- 59/60 common words confirmed in default lexicon via `lookup()`

### Technical decisions
- PHT+TKB attributes injected via `GlossopetraeSkill.forge({attributes: ['tokenbreak','phantom'], ...})`
- Grammar Guide is 659 chars — kept in skill for zero-shot structural decoding
- Lexicon (1255 entries, ~100KB) kept out of context — accessed via bash lookup on demand
- Seed `decouple-default-2026` for deterministic language generation
- Decoding is hybrid: grammar rules in context → strip case suffixes → bash lookup for lemma mapping → reorder SOV→SVO

### Files touched
- `~/.claude/skills/decouple/SKILL.md` (created)
- `~/GLOSSOPETRAE/docs/JOURNAL.md` (created)

### Clear next step
- Test `/decouple` as a real slash command invocation (not just the underlying engine)
- Option: expand lexicon with French vocabulary for user's specific data (SIRET, IBAN, etc.)
