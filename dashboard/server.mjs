import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { GlossopetraeSkill } from '../src/skill/GlossopetraeSkill.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = resolve(__dirname, 'public');
const PORT = 3000;

console.log('Forging language with seed=decouple-default-2026 + PHT+TKB...');
const LANG = await GlossopetraeSkill.forge({
  seed: 'decouple-default-2026',
  morphType: 'isolating',
  attributes: ['tokenbreak', 'phantom'],
});
console.log(`Language ready: ${LANG.language.name}, ${LANG.info.lexiconSize} words`);

const ENRICHED_PATH = resolve(__dirname, '..', 'data', 'enriched_lexicon.json');
let ENRICHED_LEXICON = null;
try {
  ENRICHED_LEXICON = JSON.parse(readFileSync(ENRICHED_PATH, 'utf-8'));
  console.log(`Enriched lexicon loaded: ${ENRICHED_LEXICON.length} entries`);
} catch {
  console.log('No enriched lexicon found, using base lexicon');
}

const cache = new Map();
const MAX_CACHE = 500;

function getCached(key) { return cache.get(key); }
function setCache(key, value) {
  if (cache.size >= MAX_CACHE) cache.delete(cache.keys().next().value);
  cache.set(key, value);
}

function json(res, code, data) {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

async function parseBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  try { return JSON.parse(Buffer.concat(chunks).toString()); }
  catch { return {}; }
}

function countInvisible(s) {
  let n = 0;
  for (const ch of s) {
    const cp = ch.codePointAt(0);
    if ((cp >= 0x200B && cp <= 0x200F) ||
        (cp >= 0x202A && cp <= 0x202E) ||
        (cp >= 0x2060 && cp <= 0x2069) ||
        (cp >= 0xFE00 && cp <= 0xFE0F) ||
        (cp >= 0xE0000 && cp <= 0xE007F) ||
        cp === 0xFEFF || cp === 0x00AD) n++;
  }
  return n;
}

const MIME = { html: 'text/html', css: 'text/css', js: 'application/javascript', json: 'application/json', png: 'image/png', svg: 'image/svg+xml' };

function serveStatic(res, url) {
  let filePath = url === '/' ? 'index.html' : url.slice(1);
  filePath = resolve(PUBLIC, filePath);
  if (!filePath.startsWith(PUBLIC)) return json(res, 403, { error: 'Forbidden' });
  try {
    const data = readFileSync(filePath);
    const ext = filePath.split('.').pop();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
    res.end(data);
  } catch {
    json(res, 404, { error: 'Not found' });
  }
}

const server = createServer(async (req, res) => {
  const { method, url } = req;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') { res.writeHead(204); return res.end(); }

  if (method === 'GET' && !url.startsWith('/api/')) return serveStatic(res, url);

  const parsed = new URL(url, `http://localhost:${PORT}`);

  if (method === 'POST' && parsed.pathname === '/api/translate') {
    const body = await parseBody(req);
    const text = (body.text || '').trim();
    if (!text) return json(res, 400, { error: 'No text provided' });
    const key = text.toLowerCase();
    const cached = getCached(key);
    if (cached) return json(res, 200, { ...cached, cached: true });
    try {
      const r = LANG.translateFull(text);
      const direct = LANG.translateDirect(text);
      const out = {
        input: text,
        output: direct,
        gloss: r.gloss || '',
        stats: {
          inputLength: text.length,
          outputLength: direct.length,
          invisibleChars: countInvisible(direct),
          wordCount: direct.split(/\s+/).filter(Boolean).length,
        },
      };
      setCache(key, out);
      json(res, 200, out);
    } catch (e) {
      json(res, 500, { error: e.message });
    }
    return;
  }

  if (method === 'POST' && parsed.pathname === '/api/translate-back') {
    const body = await parseBody(req);
    const text = (body.text || '').trim();
    if (!text) return json(res, 400, { error: 'No text provided' });
    try {
      const out = LANG.translateBack(text);
      json(res, 200, { input: text, output: out });
    } catch (e) {
      json(res, 500, { error: e.message });
    }
    return;
  }

  if (method === 'GET' && parsed.pathname === '/api/grammar') {
    const g = LANG.getGrammar();
    json(res, 200, {
      languageName: LANG.language.name,
      seed: LANG.language.seed,
      attributes: (LANG.language.attributes || []).map(a => typeof a === 'string' ? a : (a.code || a.name || '?')),
      lexiconSize: LANG.info.lexiconSize,
      wordOrder: g.wordOrder,
      cases: g.cases,
      tenses: g.tenses,
      agreement: g.agreement,
    });
    return;
  }

  if (method === 'GET' && parsed.pathname === '/api/lexicon') {
    const page = Math.max(1, parseInt(parsed.searchParams.get('page')) || 1);
    const limit = Math.min(200, Math.max(1, parseInt(parsed.searchParams.get('limit')) || 50));
    const search = (parsed.searchParams.get('search') || '').toLowerCase();
    const source = ENRICHED_LEXICON || LANG.getLexicon();
    let entries = source
      .filter(e => e.lemma && e.gloss)
      .map(e => ({ lemma: e.lemma, gloss: e.gloss, class: e.class, field: e.field || '' }));
    if (search) entries = entries.filter(e => e.lemma.toLowerCase().includes(search) || e.gloss.toLowerCase().includes(search));
    const total = entries.length;
    const totalPages = Math.ceil(total / limit) || 1;
    entries = entries.slice((page - 1) * limit, page * limit);
    json(res, 200, { entries, total, page, totalPages });
    return;
  }

  if (method === 'POST' && parsed.pathname === '/api/expand-lexicon') {
    const body = await parseBody(req);
    const words = body.words;
    if (!Array.isArray(words) || !words.length) return json(res, 400, { error: 'Provide words as array' });
    try {
      const added = LANG.expandLexicon(words);
      cache.clear();
      json(res, 200, {
        added: added.map(e => ({ lemma: e.lemma, gloss: e.gloss, class: e.class })),
        message: `${added ? added.length : 0} word(s) added`,
        lexiconSize: LANG.info.lexiconSize,
      });
    } catch (e) {
      json(res, 500, { error: e.message });
    }
    return;
  }

  if (method === 'GET' && parsed.pathname === '/api/stats') {
    json(res, 200, {
      cacheSize: cache.size,
      lexiconSize: LANG.info.lexiconSize,
      languageName: LANG.language.name,
      seed: LANG.language.seed,
      uptime: Math.floor(process.uptime() * 1000),
    });
    return;
  }

  json(res, 404, { error: 'Not found' });
});

server.listen(PORT, () => {
  console.log(`Dashboard: http://localhost:${PORT}`);
});
