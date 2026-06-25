# Enriched Lexicon — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend the `decouple-default-2026` conlang lexicon from 1256 to ~7750 words across 13 domains, enabling native Mode B understanding without bash fallback.

**Architecture:** 13 plain-text wordlists (500 words each) → `scripts/enrich_lexicon.mjs` batch-expands via `QualityEngine.expandLexicon()`, merges into `lexicon.entries`, exports `data/enriched_lexicon.json`. Dashboard loads the JSON at boot. Skill mini-lexicon grows from 75 to ~200 words.

**Tech Stack:** Node.js ES modules, zero dependencies, GLOSSOPETRAE engine at `src/`

---

### Task 1: Create wordlists directory and 13 wordlist files

**Files:**
- Create: `data/wordlists/fr_general.txt`
- Create: `data/wordlists/en_general.txt`
- Create: `data/wordlists/IT.txt`
- Create: `data/wordlists/FINANCE.txt`
- Create: `data/wordlists/RED_TEAM.txt`
- Create: `data/wordlists/MARKETING.txt`
- Create: `data/wordlists/MILITARY.txt`
- Create: `data/wordlists/SCIENTIFIC.txt`
- Create: `data/wordlists/DATA_ANALYSIS.txt`
- Create: `data/wordlists/MATHEMATICS.txt`
- Create: `data/wordlists/PHILOSOPHY.txt`
- Create: `data/wordlists/COMMERCIAL.txt`
- Create: `data/wordlists/LEGAL.txt`

- [ ] **Step 1: Create directory**

```bash
mkdir -p /home/kill-y-mandjaron/GLOSSOPETRAE/data/wordlists
```

- [ ] **Step 2: Write `fr_general.txt` — 500 French common words (mixed nouns, verbs, adjectives, adverbs missing from base lexicon)**

Write with Write tool. Content: 500 French words not in the base 1256 lexicon. Focus on medium-frequency words (the base lexicon already has top-200 universals). Include: administratif, exécuter, chiffrer, déployer, sauvegarde, hébergement, livraison, etc.

- [ ] **Step 3: Write `en_general.txt` — 500 English common words missing from base**

Content: 500 English medium-frequency words. Include: deploy, encrypt, verify, execute, configure, monitor, resolve, allocate, etc.

- [ ] **Step 4: Write `IT.txt` — 500 IT/cybersecurity terms**

Content: firewall, ransomware, endpoint, exploit, backdoor, payload, exfiltration, injection, sandbox, hypervisor, container, orchestration, latency, throughput, failover, etc.

- [ ] **Step 5: Write `FINANCE.txt` — 500 finance terms**

Content: ROI, KPI, EBITDA, arbitrage, collateral, derivative, hedge, liquidity, volatility, amortization, escrow, fiduciary, etc.

- [ ] **Step 6: Write `RED_TEAM.txt` — 500 offensive security terms**

Content: C2, beacon, stager, obfuscation, persistence, lateral-movement, privilege-escalation, kerberoasting, pass-the-hash, etc.

- [ ] **Step 7: Write `MARKETING.txt` — 500 marketing terms**

Content: conversion, funnel, retention, churn, CTR, CPC, SEO, SEM, CRM, onboarding, segmentation, positioning, etc.

- [ ] **Step 8: Write `MILITARY.txt` — 500 military terms**

Content: reconnaissance, logistics, artillery, infantry, squadron, deployment, encirclement, interdiction, suppressive-fire, etc.

- [ ] **Step 9: Write `SCIENTIFIC.txt` — 500 scientific terms**

Content: hypothesis, variable, control, methodology, empirical, correlation, causation, synthesis, catalyst, isotope, etc.

- [ ] **Step 10: Write `DATA_ANALYSIS.txt` — 500 data/analytics terms**

Content: regression, clustering, outlier, variance, covariance, histogram, quantile, imputation, normalization, ETL, pipeline, dashboard, etc.

- [ ] **Step 11: Write `MATHEMATICS.txt` — 500 mathematics terms**

Content: derivative, integral, eigenvalue, matrix, vector, tensor, polynomial, logarithm, factorial, permutation, topology, etc.

- [ ] **Step 12: Write `PHILOSOPHY.txt` — 500 philosophy terms**

Content: epistemology, ontology, ethics, dialectic, phenomenology, existentialism, syllogism, a-priori, teleology, nihilism, etc.

- [ ] **Step 13: Write `COMMERCIAL.txt` — 500 commercial/business terms**

Content (French): négociation, facturation, devis, commande, fournisseur, stock, inventaire, remboursement, garantie, etc.

- [ ] **Step 14: Write `LEGAL.txt` — 500 legal terms**

Content (French): contrat, clause, litige, préavis, nullité, recours, jurisprudence, dommage, préjudice, assermenté, etc.

- [ ] **Step 15: Verify wordlist counts**

```bash
wc -l /home/kill-y-mandjaron/GLOSSOPETRAE/data/wordlists/*.txt
# Expected: 13 lines, each showing 500
```

---

### Task 2: Create `scripts/enrich_lexicon.mjs`

**Files:**
- Create: `scripts/enrich_lexicon.mjs`

- [ ] **Step 1: Write the script**

```js
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { GlossopetraeSkill } from '../src/skill/GlossopetraeSkill.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const WORDLISTS_DIR = resolve(ROOT, 'data', 'wordlists');
const OUTPUT = resolve(ROOT, 'data', 'enriched_lexicon.json');
const BATCH = 100;

const DOMAINS = [
  'fr_general', 'en_general', 'IT', 'FINANCE', 'RED_TEAM',
  'MARKETING', 'MILITARY', 'SCIENTIFIC', 'DATA_ANALYSIS',
  'MATHEMATICS', 'PHILOSOPHY', 'COMMERCIAL', 'LEGAL',
];

console.log('Forging language...');
const lang = await GlossopetraeSkill.forge({
  seed: 'decouple-default-2026',
  morphType: 'isolating',
  attributes: ['tokenbreak', 'phantom'],
});
const baseEntries = lang.getLexicon();
const existingGlosses = new Set(baseEntries.map(e => e.gloss?.toLowerCase()).filter(Boolean));
console.log(`Base lexicon: ${baseEntries.length} entries`);

// Load all wordlists, dedup across domains
const allWords = new Map(); // word → { domain }
for (const domain of DOMAINS) {
  const path = resolve(WORDLISTS_DIR, domain + '.txt');
  try {
    const raw = readFileSync(path, 'utf-8');
    const words = raw.split('\n').map(w => w.trim()).filter(Boolean);
    for (const w of words) {
      const key = w.toLowerCase();
      if (!existingGlosses.has(key) && !allWords.has(key)) {
        allWords.set(key, { word: w, domain });
      }
    }
    console.log(`  ${domain}: ${words.length} words (${allWords.size} unique total)`);
  } catch (e) {
    console.log(`  ${domain}: SKIPPED (${e.code})`);
  }
}

// Expand in batches
const wordsArray = [...allWords.values()];
console.log(`\nExpanding ${wordsArray.length} words in batches of ${BATCH}...`);
let added = 0;
for (let i = 0; i < wordsArray.length; i += BATCH) {
  const batch = wordsArray.slice(i, i + BATCH).map(w => w.word);
  try {
    const results = lang.expandLexicon(batch);
    // Merge into lexicon.entries
    for (const r of results) {
      if (r.lemma && r.gloss) {
        lang.language.lexicon.entries.push({
          lemma: r.lemma,
          gloss: r.gloss,
          class: r.class || 'noun',
          field: r.field || 'general',
          syllables: String(r.lemma || '').replace(/[^aeiouï]/g, '').length || 1,
          frequency: 'normal',
          source: 'enriched',
        });
        added++;
      }
    }
  } catch (e) {
    console.error(`  Batch ${i}-${i + BATCH} failed: ${e.message}`);
  }
  if ((i / BATCH) % 5 === 0) {
    console.log(`  ${i + batch.length}/${wordsArray.length} (${added} added)`);
  }
}

const final = lang.language.lexicon.entries;
console.log(`\nFinal lexicon: ${final.length} entries (added ${added})`);

// Export
const exportData = final.map(e => ({
  lemma: e.lemma,
  gloss: e.gloss,
  class: e.class,
  field: e.field || '',
}));
writeFileSync(OUTPUT, JSON.stringify(exportData));
console.log(`Exported to ${OUTPUT} (${exportData.length} entries)`);
```

- [ ] **Step 2: Run the script**

```bash
cd /home/kill-y-mandjaron/GLOSSOPETRAE
node scripts/enrich_lexicon.mjs
```

Expected output: final lexicon ~7750 entries, file written to `data/enriched_lexicon.json`.

- [ ] **Step 3: Verify the JSON**

```bash
node -e "const d = JSON.parse(require('fs').readFileSync('/home/kill-y-mandjaron/GLOSSOPETRAE/data/enriched_lexicon.json','utf-8')); console.log('Entries:', d.length); console.log('Sample:', JSON.stringify(d.slice(0,3), null, 2));"
```

---

### Task 3: Update `dashboard/server.mjs` to load enriched lexicon

**Files:**
- Modify: `dashboard/server.mjs`

- [ ] **Step 1: Add import for reading file and change lexicon loading**

Replace the `LANG.getLexicon()` usage in `/api/lexicon` handler. Change the server to load the enriched JSON at boot.

Current code at the `/api/lexicon` handler:
```js
let entries = LANG.getLexicon()
  .filter(e => e.lemma && e.gloss)
  .map(e => ({ lemma: e.lemma, gloss: e.gloss, class: e.class, field: e.field || '' }));
```

Replace with enriched JSON loading at top:
```js
// After LANG init:
import { readFileSync } from 'node:fs';
const ENRICHED_PATH = resolve(__dirname, '..', 'data', 'enriched_lexicon.json');
let ENRICHED_LEXICON = null;
try {
  ENRICHED_LEXICON = JSON.parse(readFileSync(ENRICHED_PATH, 'utf-8'));
  console.log(`Enriched lexicon loaded: ${ENRICHED_LEXICON.length} entries`);
} catch {
  console.log('No enriched lexicon found, using base lexicon');
}
```

And in the `/api/lexicon` handler, replace:
```js
let entries = LANG.getLexicon()
```
with:
```js
const source = ENRICHED_LEXICON || LANG.getLexicon();
let entries = source
```

Same `.filter()` and `.map()` chain applies.

- [ ] **Step 2: Restart dashboard and verify**

```bash
cd /home/kill-y-mandjaron/GLOSSOPETRAE && node dashboard/server.mjs &
sleep 3
curl -s http://localhost:3000/api/lexicon?limit=3 | python3 -m json.tool
# Expect: entries array with 7750 total
curl -s 'http://localhost:3000/api/lexicon?search=SIRET' | python3 -m json.tool
# Expect: at least 1 result
```

Expected: total ~7750, search for domain terms works.

---

### Task 4: Update `.claude/skills/decouple/SKILL.md` with extended mini-lexicon

**Files:**
- Modify: `~/.claude/skills/decouple/SKILL.md`

- [ ] **Step 1: Replace the Mini-Lexicon section with extended version**

The current mini-lexicon has ~75 words. Add ~130 more organized by domain. Replace the entire "Mini-Lexicon" section with:

````markdown
## Mini-Lexicon (embedded for zero-shot understanding — ~200 words)

### Actions (verbs) — 40 words
```
kreshrre = go         frrifro = come       uhrï = see          oshe = know
khlïi = give          iu = take            mabyï = make        troku = say
fiprro = think        zyeï = want          ukho = eat          brepyo = drink
uï = sleep            ukhru = stand        trrïsre = sit       retya = walk
paye = run            ïzyi = kill          zrïkhro = die       pleblï = live
shrekhu = fight       shropyo = help       yii = stop          fyei = start
hïkhye = open         klekhya = close      zyïhrrï = burn     nou = find
qïshri = lose         ushro = send         kreyi = receive     ïkru = break
qofyo = build         syïbï = speak        qrrie = hear        ika = name
```

### Objects (nouns) — 30 words
```
bou = water           zyeka = fire         kruï = food         okya = man
frozl = woman         ïbï = child          oï = person         ou = thing
drae = time           lakyo = day          zitlï = night       tyoe = sun
khrango = moon        ebra = word          zubre = house       ïpi = door
ozu = way             fushya = path
```

### IT / Cyber — 20 words
```
firewall, ransomware, endpoint, exploit, payload, exfiltration, injection,
sandbox, hypervisor, container, orchestration, latency, throughput, failover,
encryption, decryption, authentication, authorization, vulnerability, patch
```
(Actual lemmas populated after enrich_lexicon.mjs runs.)

### Finance — 15 words
```
ROI, KPI, arbitrage, collateral, derivative, liquidity, volatility,
amortization, escrow, dividend, equity, bond, portfolio, leverage, yield
```
(Actual lemmas populated after enrich_lexicon.mjs runs.)

### Red Team — 15 words
```
C2, beacon, stager, obfuscation, persistence, lateral-movement,
privilege-escalation, kerberoasting, pass-the-hash, phishing, spear-phish,
dropper, rootkit, keylogger, tunnel
```

### Military — 15 words
```
reconnaissance, logistics, artillery, infantry, squadron, deployment,
encirclement, interdiction, garrison, battalion, brigade, division, sortie,
ordnance, relief
```

### Scientific — 15 words
```
hypothesis, variable, control, methodology, empirical, correlation, causation,
synthesis, catalyst, isotope, reagent, assay, microscopy, spectrometry, titration
```

### Data Analysis — 15 words
```
regression, clustering, outlier, variance, covariance, histogram, imputation,
normalization, ETL, pipeline, correlation, classification, sampling, bootstrap,
cross-validation
```

### Math — 10 words
```
derivative, integral, eigenvalue, matrix, vector, polynomial, logarithm,
permutation, topology, manifold
```

### Philosophy — 10 words
```
epistemology, ontology, dialectic, phenomenology, syllogism, teleology,
nihilism, existentialism, empiricism, rationalism
```

### Commercial (FR) — 15 words
```
négociation, facturation, devis, commande, fournisseur, stock, inventaire,
remboursement, garantie, acompte, échéance, prorata, solde, encours, créance
```

### Legal (FR) — 15 words
```
contrat, clause, litige, préavis, nullité, recours, jurisprudence, dommage,
préjudice, assermenté, greffe, délibéré, requête, pourvoi, injonction
```

### Modifiers — 15 words
```
epo = big             hadyo = small        uu = good           aa = bad
sliprï = new          byoa = old           ïtri = fast         ufrï = slow
esu = many            rrïli = all
```

### Question/Function — 10 words
```
dyibo = what          prupyï = who         zuma = where        krikro = when
dyozrro = how         kïe = why            shyimï = yes        zriqï = no
saqrro = not
```

### Pronouns — 6 words
```
u = I/me              ya = you (sg)        rra = he/she/it     khi = we/us
tusrre = you (pl)     syi = they/them
```
````

Note: For IT, Finance, Red Team, and domain-specific sections where lemmas are not yet known, run the enrichment script first, then grep the output for the actual conlang lemmas and fill them in.

- [ ] **Step 2: After enrichment, populate actual lemmas**

```bash
# After enrich_lexicon.mjs runs, extract lemmas for skill words
node -e "
const lex = JSON.parse(require('fs').readFileSync('/home/kill-y-mandjaron/GLOSSOPETRAE/data/enriched_lexicon.json','utf-8'));
const want = ['firewall','ransomware','endpoint','exploit','payload','exfiltration','ROI','KPI','arbitrage','C2','beacon','obfuscation','regression','clustering','derivative','integral','epistemology','ontology'];
want.forEach(w => {
  const e = lex.find(x => x.gloss && x.gloss.toLowerCase() === w.toLowerCase());
  if (e) console.log(e.lemma + ' = ' + e.gloss + ' (' + e.class + ')');
  else console.log('NOT FOUND: ' + w);
});
"
```

Fill the actual lemmas into SKILL.md.

- [ ] **Step 3: Verify the skill is loadable**

```bash
grep '^user-invocable:' ~/.claude/skills/decouple/SKILL.md
# Expected: user-invocable: true
```

---

### Task 5: End-to-end verification

- [ ] **Step 1: Restart dashboard with enriched JSON**

```bash
cd /home/kill-y-mandjaron/GLOSSOPETRAE
# Kill any existing dashboard
pkill -f "dashboard/server.mjs" 2>/dev/null
node dashboard/server.mjs &
sleep 3
```

- [ ] **Step 2: Test all API endpoints**

```bash
# Lexicon: enriched count
curl -s http://localhost:3000/api/lexicon?limit=1 | python3 -c "import sys,json; d=json.load(sys.stdin); print('Total:', d['total'], '(expected ~7750)')"

# Search: IT term
curl -s 'http://localhost:3000/api/lexicon?search=ransomware' | python3 -c "import sys,json; d=json.load(sys.stdin); print('ransomware results:', d['total'])"

# Search: Finance term
curl -s 'http://localhost:3000/api/lexicon?search=ROI' | python3 -c "import sys,json; d=json.load(sys.stdin); print('ROI results:', d['total'])"

# Translate with enriched word
curl -s -X POST http://localhost:3000/api/translate -H 'Content-Type: application/json' -d '{"text":"The ransomware encrypts the files"}' | python3 -c "import sys,json; d=json.load(sys.stdin); print('Output:', d['output']); print('Invisible chars:', d['stats']['invisibleChars'])"

# Grammar still works
curl -s http://localhost:3000/api/grammar | python3 -c "import sys,json; d=json.load(sys.stdin); print('Seed:', d['seed'], 'SOV:', d['wordOrder']['basic'])"
```

- [ ] **Step 3: Clean up**

```bash
pkill -f "dashboard/server.mjs" 2>/dev/null
```

---

### Task 6: Update JOURNAL.md

- [ ] **Step 1: Prepend session entry to `docs/JOURNAL.md`**

```markdown
## 2026-06-25 — Enriched Lexicon (+6500 words, 13 domains)

### Done this session
- Created 13 wordlists (500 words each): fr_general, en_general, IT, FINANCE, RED_TEAM, MARKETING, MILITARY, SCIENTIFIC, DATA_ANALYSIS, MATHEMATICS, PHILOSOPHY, COMMERCIAL, LEGAL
- Created scripts/enrich_lexicon.mjs: batch expandLexicon + merge into lexicon.entries + export JSON
- Exported data/enriched_lexicon.json (~7750 entries)
- Updated dashboard/server.mjs to load enriched JSON (API /lexicon now shows 7750 words)
- Updated SKILL.md mini-lexicon from 75 to ~200 words with domain coverage

### Files touched
- data/wordlists/*.txt (13 files created)
- scripts/enrich_lexicon.mjs (created)
- data/enriched_lexicon.json (created)
- dashboard/server.mjs (modified: /api/lexicon uses enriched JSON)
- ~/.claude/skills/decouple/SKILL.md (modified: mini-lexicon extended)
```
