import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = resolve(__dirname, '..', 'data', 'enriched_lexicon.json');

// Strip invisible/control Unicode but keep conlang chars (ï, etc.)
function stripInvis(s) {
  let out = '';
  for (const ch of s) {
    const cp = ch.codePointAt(0);
    if ((cp >= 0x200B && cp <= 0x200F) ||
        (cp >= 0x202A && cp <= 0x202E) ||
        (cp >= 0x2060 && cp <= 0x2069) ||
        (cp >= 0xFE00 && cp <= 0xFE0F) ||
        (cp >= 0xE0000 && cp <= 0xE007F) ||
        cp === 0xFEFF || cp === 0x00AD || cp === 0x200C || cp === 0x200D) continue;
    out += ch;
  }
  return out;
}

const db = JSON.parse(readFileSync(DB_PATH, 'utf-8'));

// Build lemma→glosses index (keyed by stripped lemma)
const lemmaIndex = new Map();
for (const e of db) {
  const key = stripInvis(e.lemma);
  if (!lemmaIndex.has(key)) lemmaIndex.set(key, []);
  lemmaIndex.get(key).push({ gloss: e.gloss, class: e.class, field: e.field || '' });
}

// Build gloss→lemma index
const glossIndex = new Map();
for (const e of db) {
  const key = e.gloss.toLowerCase();
  if (!glossIndex.has(key)) glossIndex.set(key, []);
  glossIndex.get(key).push({ lemma: e.lemma, class: e.class });
}

const cmd = process.argv[2];
const args = process.argv.slice(3);

if (cmd === 'lookup' || cmd === 'l') {
  // lemma → gloss
  for (const word of args) {
    const clean = stripInvis(word);
    const entries = lemmaIndex.get(clean);
    if (entries && entries.length > 0) {
      console.log(word + '\t' + entries.map(e => e.gloss).join(', '));
    } else {
      console.log(word + '\t?');
    }
  }
} else if (cmd === 'rlookup' || cmd === 'r') {
  // gloss → lemma
  for (const word of args) {
    const entries = glossIndex.get(word.toLowerCase());
    if (entries && entries.length > 0) {
      console.log(word + '\t' + entries.map(e => e.lemma).join(', '));
    } else {
      console.log(word + '\t?');
    }
  }
} else if (cmd === 'decode') {
  // Decode conlang text: strip invisibles, stem suffixes (-a, -e, -ru, -qr, -flu, etc.), lookup each root
  const suffixes = ['flu','qru','ko','byu','pli','se','da','lu','qr','o','u','rï','ru','a','e'];
  suffixes.sort((a,b) => b.length - a.length); // longest first

  for (const rawText of args) {
    const text = stripInvis(rawText);
    const tokens = text.split(/\s+/).filter(Boolean);
    const decoded = tokens.map(t => {
      // Try stripping known grammatical suffixes
      let root = t;
      for (const sfx of suffixes) {
        if (root.endsWith(sfx) && root.length > sfx.length + 1) {
          root = root.slice(0, -sfx.length);
          break;
        }
      }
      const entries = lemmaIndex.get(root);
      return {
        surface: t,
        root,
        glosses: entries ? entries.map(e => e.gloss) : ['?'],
      };
    });
    console.log(JSON.stringify(decoded));
  }
} else if (cmd === 'info') {
  console.log(JSON.stringify({ totalEntries: db.length, uniqueLemmas: lemmaIndex.size, uniqueGlosses: glossIndex.size }));
} else {
  console.log('Usage: node lookup_conlang.mjs <lookup|l|rlookup|r|decode|info> <words...>');
  console.log('  lookup/l  <lemmas...>  — lemma → gloss(es)');
  console.log('  rlookup/r <glosses...> — gloss → lemma(s)');
  console.log('  decode    <text...>    — decode conlang text (strip suffixes, lookup roots)');
  console.log('  info                   — DB stats');
}
