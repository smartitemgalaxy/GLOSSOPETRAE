# GLOSSOPETRAE — Session Journal

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
