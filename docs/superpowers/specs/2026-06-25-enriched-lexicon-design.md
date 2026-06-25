# Enriched Lexicon — GLOSSOPETRAE Decouple

**Goal:** Extend the `decouple-default-2026` conlang lexicon from 1256 to ~7750 words across 13 domains, enabling native conlang understanding (Mode B) without bash fallback for any domain.

**Seed:** `decouple-default-2026` (deterministic)
**Attributes:** `tokenbreak`, `phantom`
**Morphology:** `isolating`

---

## Architecture

```
GLOSSOPETRAE/
  data/
    wordlists/                    # 13 text files, 500 words each
      fr_general.txt
      en_general.txt
      IT.txt
      FINANCE.txt
      RED_TEAM.txt
      MARKETING.txt
      MILITARY.txt
      SCIENTIFIC.txt
      DATA_ANALYSIS.txt
      MATHEMATICS.txt
      PHILOSOPHY.txt
      COMMERCIAL.txt
      LEGAL.txt
    enriched_lexicon.json          # Final export (~7750 entries)
  scripts/
    enrich_lexicon.mjs             # One-shot expansion script
  dashboard/
    server.mjs                     # Updated: loads enriched_lexicon.json
    public/                        # Unchanged
  .claude/skills/decouple/
    SKILL.md                       # Updated: extended mini-lexicon (~200 words)
```

## Wordlists

- **Source:** French/English frequency lists + domain-specific glossaries (MITRE ATT&CK, AMF, ISO 27001, Code Civil, etc.)
- **Format:** One word per line, no definitions
- **Language:** French for admin/legal/commercial, English for IT/Red Team/scientific, mixed otherwise
- **Dedup:** Script filters against existing 1256-word lexicon + cross-domain dedup

## Script: `enrich_lexicon.mjs`

1. Forge language with `decouple-default-2026`, `morphType: isolating`, `['tokenbreak','phantom']`
2. Read each wordlist, normalize (trim, lowercase), filter existing words
3. Call `expandLexicon()` in batches of 100
4. Merge generated entries into `lexicon.entries` (plain Array push)
5. Write `enriched_lexicon.json` — full entries array as JSON
6. Log: added/skipped per domain, final total

## Dashboard Changes

- `server.mjs` loads `data/enriched_lexicon.json` at boot into `ENRICHED_LEXICON`
- `GET /api/lexicon` reads from `ENRICHED_LEXICON` instead of `LANG.getLexicon()`
- `POST /api/translate` unaffected (expansion already works via `_generatedCache`)
- `GET /api/grammar` unaffected

## Skill Mini-Lexicon

Add ~130 words to `SKILL.md` mini-lexicon (15-20 per domain) for Mode B zero-shot coverage.

## Verification

1. `enrich_lexicon.mjs` runs to completion, produces `enriched_lexicon.json`
2. `wc -l` shows ~7750 entries
3. Dashboard starts, `/api/lexicon?search=siret` returns the SIRET entry
4. Dashboard starts, `/api/lexicon?search=ransomware` returns IT term
5. `/api/lexicon?search=ROI` returns finance term
6. Skill Mode B: query with French conlang prompt → understood natively
