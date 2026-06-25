const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const esc = (s) => String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const state = { page: 1, search: '', grammarLoaded: false };

async function api(method, path, body) {
  const opts = { method, headers: {} };
  if (body) { opts.headers['Content-Type'] = 'application/json'; opts.body = JSON.stringify(body); }
  const res = await fetch(path, opts);
  return res.json();
}

function setBtn(id, loading, text) {
  const b = $(`#${id}`);
  b.disabled = loading;
  b.textContent = text;
}

function clearStats() {
  ['input-len','output-len','invisible','words'].forEach(id => $('#'+id).textContent = '0');
}

async function doTranslate() {
  const text = $('#input-text').value.trim();
  if (!text) return;
  setBtn('btn-translate', true, 'Translating...');
  try {
    const r = await api('POST', '/api/translate', { text });
    $('#output-text').value = r.output;
    $('#gloss-block').textContent = r.gloss ? 'Gloss: ' + r.gloss : '';
    $('#stat-input-len').textContent = r.stats.inputLength;
    $('#stat-output-len').textContent = r.stats.outputLength;
    const inv = r.stats.invisibleChars;
    $('#stat-invisible').textContent = inv;
    $('#stat-invisible').style.color = inv > 0 ? 'var(--accent-orange)' : 'var(--accent)';
    $('#stat-words').textContent = r.stats.wordCount;
    $('#reverse-block').textContent = '';
  } catch (e) { $('#output-text').value = 'Error: ' + e.message; }
  finally { setBtn('btn-translate', false, 'Translate'); }
}

async function doReverse() {
  const text = $('#output-text').value.trim();
  if (!text) return;
  setBtn('btn-reverse', true, '...');
  try {
    const r = await api('POST', '/api/translate-back', { text });
    $('#reverse-block').textContent = 'Reverse: ' + r.output;
  } catch (e) { $('#reverse-block').textContent = 'Error: ' + e.message; }
  finally { setBtn('btn-reverse', false, 'Reverse'); }
}

async function doCopy() {
  const text = $('#output-text').value;
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    const t = $('#copy-toast'); t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2000);
  } catch { /* clipboard unavailable */ }
}

function doClear() {
  $('#input-text').value = '';
  $('#output-text').value = '';
  $('#gloss-block').textContent = '';
  $('#reverse-block').textContent = '';
  clearStats();
}

async function loadGrammar() {
  try {
    const g = await api('GET', '/api/grammar');
    $('#lang-name').textContent = g.languageName || '—';
    $('#lexicon-size').textContent = (g.lexiconSize || 0) + ' words';
    const html = [
      ['Word Order', g.wordOrder?.basic || 'N/A'],
      ['Adjective Position', g.wordOrder?.adjectivePosition || '—'],
      ['Cases', (g.cases || []).map(c => esc(c.name) + ' (' + esc(c.abbr) + ': ' + esc(c.suffix) + ')').join(', ') || 'None'],
      ['Tenses', (g.tenses || []).map(t => esc(t.name) + ' (' + esc(t.abbr) + ': ' + esc(t.suffix) + ')').join(', ') || 'None'],
      ['Agreement', g.agreement?.hasAgreement ? 'Yes' : 'None'],
      ['Attributes', (g.attributes || []).join(', ') || 'None'],
      ['Seed', esc(g.seed || '—')],
    ].map(([k, v]) => `<div class="grammar-item"><span class="grammar-key">${esc(k)}:</span> <span class="grammar-val">${v}</span></div>`).join('\n');
    $('#grammar-content').innerHTML = html;
    state.grammarLoaded = true;
  } catch (e) { $('#grammar-content').textContent = 'Error: ' + e.message; }
}

async function loadLexicon(page, search) {
  if (page !== undefined) state.page = page;
  if (search !== undefined) state.search = search;
  const { page: p, search: s } = state;
  try {
    const r = await api('GET', `/api/lexicon?page=${p}&limit=50&search=${encodeURIComponent(s)}`);
    $('#lexicon-total').textContent = r.total + ' words';
    if (!r.entries || !r.entries.length) {
      $('#lexicon-body').innerHTML = '<tr><td colspan="4" style="color:var(--text-dim)">No words found</td></tr>';
    } else {
      $('#lexicon-body').innerHTML = r.entries.map(e =>
        `<tr><td>${esc(e.lemma)}</td><td>${esc(e.gloss)}</td><td>${esc(e.class)}</td><td>${esc(e.field)}</td></tr>`
      ).join('');
    }
    $('#page-info').textContent = `Page ${r.page} of ${r.totalPages}`;
    $('#btn-prev-page').disabled = r.page <= 1;
    $('#btn-next-page').disabled = r.page >= r.totalPages;
  } catch (e) { console.error('Lexicon load failed:', e); }
}

async function doExpand() {
  const raw = $('#expand-input').value.trim();
  if (!raw) return;
  const words = raw.split(/[,\n]+/).map(w => w.trim()).filter(Boolean);
  if (!words.length) return;
  setBtn('btn-expand', true, 'Adding...');
  try {
    const r = await api('POST', '/api/expand-lexicon', { words });
    if (r.added && r.added.length) {
      $('#expand-result').textContent = 'Added: ' + r.added.map(e => e.gloss + ' → ' + e.lemma).join(', ') + ' | Lexicon: ' + r.lexiconSize + ' words';
    } else {
      $('#expand-result').textContent = r.message || 'No new words added';
    }
    $('#expand-input').value = '';
    loadLexicon(state.page, state.search);
    loadGrammar();
  } catch (e) { $('#expand-result').textContent = 'Error: ' + e.message; }
  finally { setBtn('btn-expand', false, 'Add to Lexicon'); }
}

function switchTab(name) {
  $$('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === name));
  $$('.tab-content').forEach(c => c.style.display = c.id === 'tab-' + name ? 'block' : 'none');
}

function debounce(fn, ms) {
  let t;
  return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
}

function updateUptime() {
  fetch('/api/stats').then(r => r.json()).then(s => {
    const mins = Math.floor(s.uptime / 60000);
    const secs = Math.floor((s.uptime % 60000) / 1000);
    $('#server-uptime').textContent = `up ${mins}m ${secs}s`;
  }).catch(() => {});
}

document.addEventListener('DOMContentLoaded', () => {
  $('#btn-translate').addEventListener('click', doTranslate);
  $('#btn-copy').addEventListener('click', doCopy);
  $('#btn-reverse').addEventListener('click', doReverse);
  $('#btn-clear').addEventListener('click', doClear);
  $('#btn-expand').addEventListener('click', doExpand);
  $('#btn-prev-page').addEventListener('click', () => loadLexicon(state.page - 1));
  $('#btn-next-page').addEventListener('click', () => loadLexicon(state.page + 1));

  $('#input-text').addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 'Enter') { e.preventDefault(); doTranslate(); }
  });

  $('#lexicon-search').addEventListener('input', debounce(e => loadLexicon(1, e.target.value), 300));

  $$('.tab').forEach(t => t.addEventListener('click', () => switchTab(t.dataset.tab)));

  loadGrammar();
  loadLexicon(1, '');
  updateUptime();
  setInterval(updateUptime, 30000);
});
