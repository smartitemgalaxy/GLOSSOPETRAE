import { randomBytes, createHash } from 'node:crypto';
import { writeFileSync } from 'node:fs';

const COUNT = 10;
const DOMAIN = 'protonmail.com';
const WORDS = ['azure','phoenix','cobalt','vertex','nexus','zenith','quantum','prism','helix','orbit',
  'echo','pulse','flux','spark','drift','quark','glint','shard','rift','ember',
  'cipher','sigil','rune','glyph','token','crest','badge','seal','mark','ring'];

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function genPassword(len = 20) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*_-+=';
  return Array.from({length: len}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}
function genRecoveryCode() {
  return Array.from({length: 4}, () =>
    Array.from({length: 4}, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[Math.floor(Math.random() * 36)]).join('')
  ).join('-');
}

const accounts = [];
const used = new Set();

for (let i = 0; i < COUNT; i++) {
  let username;
  do {
    const w1 = pick(WORDS);
    const w2 = pick(WORDS);
    const num = randInt(10, 999);
    username = `${w1}.${w2}${num}`;
  } while (used.has(username));
  used.add(username);

  const email = `${username}@${DOMAIN}`;
  const password = genPassword(20);
  const salt = randomBytes(16).toString('hex');
  const hash = createHash('sha256').update(salt + password).digest('hex');
  const recovery = genRecoveryCode();

  accounts.push({ email, username, password, salt, hash, recovery });
}

const csv = ['email,username,password,salt,hash,recovery'];
for (const a of accounts) {
  csv.push(`${a.email},${a.username},${a.password},${a.salt},${a.hash},${a.recovery}`);
}

const out = '/home/kill-y-mandjaron/GLOSSOPETRAE/data/generated_accounts.csv';
writeFileSync(out, csv.join('\n') + '\n');
console.log(`Generated ${COUNT} accounts → ${out}`);
