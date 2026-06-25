#!/usr/bin/env node
/**
 * Synthetic Profile Generator — GLOSSOPETRAE test-data tool.
 * Generates fictitious accounts with cryptographically strong credentials.
 *
 * Usage:
 *   node scripts/generate_profiles.mjs [count=10] [--csv out.csv]
 *   node scripts/generate_profiles.mjs 50 --csv data/batch_50.csv
 */

import { randomBytes, createHash, randomUUID } from 'node:crypto';
import { writeFileSync } from 'node:fs';

// ── Configuration ──────────────────────────────────────────────────────────
const COUNT = Math.max(1, parseInt(process.argv[2]) || 10);
const OUT = process.argv.includes('--csv')
  ? process.argv[process.argv.indexOf('--csv') + 1]
  : 'data/generated_profiles.csv';
const DOMAIN = process.env.PROFILE_DOMAIN || 'protonmail.com';
const PW_LENGTH = 24;

// ── Word pools for pseudonym generation ────────────────────────────────────
const NOUNS = [
  'azure','phoenix','cobalt','vertex','nexus','zenith','quantum','prism','helix','orbit',
  'echo','pulse','flux','spark','drift','quark','glint','shard','rift','ember','frost',
  'cipher','sigil','rune','glyph','token','crest','badge','seal','mark','ring','veil',
  'wisp','thorn','bloom','shade','flare','dusk','dawn','storm','gale','reef','moss',
];

const ADJS = [
  'silent','golden','swift','quiet','bright','crimson','silver','shadow','cosmic',
  'lunar','solar','astral','feral','primal','arcane','zenith','nebular','radiant',
  'obsidian','ethereal','celestial','phantom','spectral','crystal','amber','onyx',
];

// ── Module: Pseudonym ──────────────────────────────────────────────────────
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function generatePseudonym(used) {
  let candidate;
  do {
    const adj = pick(ADJS);
    const noun = pick(NOUNS);
    const num = randInt(10, 9999);
    candidate = `${adj}.${noun}${num}`;
  } while (used.has(candidate));
  used.add(candidate);
  return candidate;
}

// ── Module: Email ──────────────────────────────────────────────────────────
function generateEmail(pseudonym) {
  return `${pseudonym}@${DOMAIN}`;
}

// ── Module: Password ───────────────────────────────────────────────────────
const PW_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*_-+=';

function generatePassword(length = PW_LENGTH) {
  // Use crypto-grade randomness for each character
  const bytes = randomBytes(length * 2);
  let pw = '';
  for (let i = 0; i < length; i++) {
    pw += PW_CHARS[bytes[i] % PW_CHARS.length];
  }
  // Ensure at least one of each required class
  if (!/[A-Z]/.test(pw) || !/[a-z]/.test(pw) || !/[0-9]/.test(pw) || !/[!@#$%^&*_\-+=]/.test(pw)) {
    return generatePassword(length); // rare, just retry
  }
  return pw;
}

// ── Module: Crypto ─────────────────────────────────────────────────────────
function generateSalt() {
  return randomBytes(16).toString('hex');
}

function generateHash(salt, password) {
  return createHash('sha256').update(salt + password).digest('hex');
}

// ── Module: UUID ───────────────────────────────────────────────────────────
function generateProfileUUID() {
  return randomUUID();
}

// ── Core: Profile Generator ────────────────────────────────────────────────
function generateProfile(usedPseudonyms) {
  const username = generatePseudonym(usedPseudonyms);
  const email = generateEmail(username);
  const password = generatePassword();
  const salt = generateSalt();
  const hash = generateHash(salt, password);
  const profileUUID = generateProfileUUID();

  return { email, username, password, salt, hash, profile_uuid: profileUUID };
}

function generateProfiles(count) {
  const used = new Set();
  return Array.from({ length: count }, () => generateProfile(used));
}

// ── Module: CSV Export ─────────────────────────────────────────────────────
function toCSV(profiles) {
  const header = 'email,username,password,salt,hash,profile_uuid';
  const rows = profiles.map(p =>
    `${p.email},${p.username},${p.password},${p.salt},${p.hash},${p.profile_uuid}`
  );
  return [header, ...rows].join('\n') + '\n';
}

// ── Main ───────────────────────────────────────────────────────────────────
const profiles = generateProfiles(COUNT);
writeFileSync(OUT, toCSV(profiles));
console.log(JSON.stringify({
  generated: COUNT,
  output: OUT,
  columns: ['email', 'username', 'password', 'salt', 'hash', 'profile_uuid'],
  domain: DOMAIN,
  sample: profiles[0].username,
}));
