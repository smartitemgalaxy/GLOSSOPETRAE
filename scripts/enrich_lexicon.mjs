import { readFileSync, writeFileSync } from 'node:fs';
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
    let domainUnique = 0;
    for (const w of words) {
      const key = w.toLowerCase();
      if (!existingGlosses.has(key) && !allWords.has(key)) {
        allWords.set(key, { word: w, domain });
        domainUnique++;
      }
    }
    console.log(`  ${domain}: ${words.length} words on disk, ${domainUnique} new unique (${allWords.size} total unique)`);
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
  const batchNum = Math.floor(i / BATCH) + 1;
  const totalBatches = Math.ceil(wordsArray.length / BATCH);
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
    console.error(`  Batch ${batchNum}/${totalBatches} failed: ${e.message}`);
  }
  if (batchNum % 5 === 0 || batchNum === totalBatches) {
    const pct = Math.round((i + batch.length) / wordsArray.length * 100);
    console.log(`  [${pct}%] Batch ${batchNum}/${totalBatches} — ${added} added so far`);
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
