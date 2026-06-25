import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { GlossopetraeSkill } from '../src/skill/GlossopetraeSkill.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUTPUT = resolve(ROOT, 'data', 'enriched_lexicon.json');

console.log('Loading existing enriched lexicon...');
const existing = JSON.parse(readFileSync(OUTPUT, 'utf-8'));
const existingGlosses = new Set(existing.map(e => e.gloss?.toLowerCase()).filter(Boolean));

// New words to add (not already in enriched)
const newWords = [
  'négociation', 'facturation', 'stock', 'inventaire',
  'remboursement', 'prorata', 'encours', 'placebo'
];
const toAdd = newWords.filter(w => !existingGlosses.has(w.toLowerCase()));
console.log(`Words to add: ${toAdd.length} (${toAdd.join(', ')})`);

if (toAdd.length === 0) {
  console.log('Nothing to add.');
  process.exit(0);
}

console.log('Forging language...');
const lang = await GlossopetraeSkill.forge({
  seed: 'decouple-default-2026',
  morphType: 'isolating',
  attributes: ['tokenbreak', 'phantom'],
});

console.log('Expanding...');
const results = lang.expandLexicon(toAdd);
let added = 0;
for (const r of results) {
  if (r.lemma && r.gloss) {
    existing.push({
      lemma: r.lemma,
      gloss: r.gloss,
      class: r.class || 'noun',
      field: r.field || 'general',
    });
    added++;
    console.log(`  ${r.lemma} ← ${r.gloss}`);
  }
}

writeFileSync(OUTPUT, JSON.stringify(existing));
console.log(`Done: ${added} added, ${existing.length} total in enriched_lexicon.json`);
