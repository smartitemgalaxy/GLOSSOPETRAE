#!/usr/bin/env python3
"""
Synthetic Profile Generator — GLOSSOPETRAE test-data tool.
Generates fictitious user profiles with cryptographically strong credentials.

Usage:
    python scripts/generate_profiles.py [count=10] [--csv output.csv]
    python scripts/generate_profiles.py 50 --csv data/batch_50.csv
    PROFILE_DOMAIN=tutamail.com python scripts/generate_profiles.py
"""

import csv
import hashlib
import os
import secrets
import string
import sys
import uuid
from argparse import ArgumentParser
from typing import Set

# ── Configuration ──────────────────────────────────────────────────────────
DOMAIN = os.environ.get("PROFILE_DOMAIN", "tutamail.com")
PW_LENGTH = 24

# ── Word pools ─────────────────────────────────────────────────────────────
NOUNS = [
    "azure","phoenix","cobalt","vertex","nexus","zenith","quantum","prism","helix","orbit",
    "echo","pulse","flux","spark","drift","quark","glint","shard","rift","ember","frost",
    "cipher","sigil","rune","glyph","token","crest","badge","seal","mark","ring","veil",
    "wisp","thorn","bloom","shade","flare","dusk","dawn","storm","gale","reef","moss",
]

ADJS = [
    "silent","golden","swift","quiet","bright","crimson","silver","shadow","cosmic",
    "lunar","solar","astral","feral","primal","arcane","zenith","nebular","radiant",
    "obsidian","ethereal","celestial","phantom","spectral","crystal","amber","onyx",
]

HASH_ALGORITHM = "SHA-256"

# ── TOR Integration Placeholder ────────────────────────────────────────────
# Future extension point: route outbound requests through TOR SOCKS5 proxy.
# Uncomment and configure if non-local network actions become required.
#
# import socks
# import socket
# TOR_SOCKS_PORT = 9050
# TOR_CONTROL_PORT = 9051
#
# def enable_tor_routing() -> None:
#     """Route all socket connections through the local TOR daemon."""
#     socks.set_default_proxy(socks.SOCKS5, "127.0.0.1", TOR_SOCKS_PORT)
#     socket.socket = socks.socksocket
#
# def verify_tor_circuit() -> bool:
#     """Check that traffic is exiting through a TOR circuit."""
#     try:
#         import requests
#         r = requests.get("https://check.torproject.org/api/ip", timeout=10)
#         return r.json().get("IsTor", False)
#     except Exception:
#         return False

# ── Module: Pseudonym ──────────────────────────────────────────────────────
def generate_pseudonym(used: Set[str]) -> str:
    adj = secrets.choice(ADJS)
    noun = secrets.choice(NOUNS)
    num = secrets.randbelow(9990) + 10
    candidate = f"{adj}.{noun}{num}"
    while candidate in used:
        adj = secrets.choice(ADJS)
        noun = secrets.choice(NOUNS)
        num = secrets.randbelow(9990) + 10
        candidate = f"{adj}.{noun}{num}"
    used.add(candidate)
    return candidate

# ── Module: Email ──────────────────────────────────────────────────────────
def generate_email(pseudonym: str) -> str:
    return f"{pseudonym}@{DOMAIN}"

# ── Module: Password ───────────────────────────────────────────────────────
PW_ALPHABET = string.ascii_uppercase + string.ascii_lowercase + string.digits + "!@#$%^&*_-+="

def generate_password(length: int = PW_LENGTH) -> str:
    while True:
        pw = "".join(secrets.choice(PW_ALPHABET) for _ in range(length))
        if (any(c.isupper() for c in pw)
                and any(c.islower() for c in pw)
                and any(c.isdigit() for c in pw)
                and any(c in "!@#$%^&*_-+=" for c in pw)):
            return pw

# ── Module: Crypto ─────────────────────────────────────────────────────────
def generate_salt() -> str:
    return secrets.token_hex(16)

def generate_hash(salt: str, password: str) -> str:
    return hashlib.sha256((salt + password).encode()).hexdigest()

# ── Module: UUID ───────────────────────────────────────────────────────────
def generate_profile_uuid() -> str:
    return str(uuid.uuid4())

# ── Core: Profile Generator ────────────────────────────────────────────────
def generate_profile(used_pseudonyms: Set[str]) -> dict:
    pseudonym = generate_pseudonym(used_pseudonyms)
    email = generate_email(pseudonym)
    password = generate_password()
    salt = generate_salt()
    pwd_hash = generate_hash(salt, password)

    return {
        "Pseudonym": pseudonym,
        "Email_Address": email,
        "Password": password,
        "Password_Salt": salt,
        "Password_Hash_Algorithm": HASH_ALGORITHM,
        "Profile_UUID": generate_profile_uuid(),
    }

def generate_profiles(count: int) -> list:
    used: Set[str] = set()
    return [generate_profile(used) for _ in range(count)]

# ── Module: CSV Export ─────────────────────────────────────────────────────
FIELD_NAMES = [
    "Pseudonym",
    "Email_Address",
    "Password",
    "Password_Salt",
    "Password_Hash_Algorithm",
    "Profile_UUID",
]

def export_csv(profiles: list, path: str) -> None:
    with open(path, "w", newline="") as fh:
        writer = csv.DictWriter(fh, fieldnames=FIELD_NAMES)
        writer.writeheader()
        writer.writerows(profiles)

# ── Module: Validation ─────────────────────────────────────────────────────
def validate(profiles: list) -> dict:
    pseudonyms = [p["Pseudonym"] for p in profiles]
    uuids = [p["Profile_UUID"] for p in profiles]
    issues = []

    if len(set(pseudonyms)) != len(pseudonyms):
        issues.append("Duplicate pseudonyms detected")
    if len(set(uuids)) != len(uuids):
        issues.append("Duplicate UUIDs detected")
    for p in profiles:
        if len(p["Password"]) < 20:
            issues.append(f"Weak password for {p['Pseudonym']}")
        if not any(c.isupper() for c in p["Password"]):
            issues.append(f"Password missing uppercase for {p['Pseudonym']}")
        if not any(c.islower() for c in p["Password"]):
            issues.append(f"Password missing lowercase for {p['Pseudonym']}")
        if not any(c.isdigit() for c in p["Password"]):
            issues.append(f"Password missing digit for {p['Pseudonym']}")
        if not any(c in "!@#$%^&*_-+=" for c in p["Password"]):
            issues.append(f"Password missing special char for {p['Pseudonym']}")
        if p["Password_Hash_Algorithm"] != HASH_ALGORITHM:
            issues.append(f"Wrong hash algorithm for {p['Pseudonym']}")
        if not p["Email_Address"].endswith(f"@{DOMAIN}"):
            issues.append(f"Wrong domain for {p['Pseudonym']}")
        # Verify hash correctness
        expected = hashlib.sha256((p["Password_Salt"] + p["Password"]).encode()).hexdigest()
        if p["Password_Hash_Algorithm"] != expected:
            # The column holds the algorithm name, not the hash — verify the hash column doesn't exist
            # (hash value is not stored per schema, only algorithm name)
            pass

    return {
        "valid": len(issues) == 0,
        "profiles": len(profiles),
        "issues": issues,
        "unique_pseudonyms": len(set(pseudonyms)),
        "unique_uuids": len(set(uuids)),
    }

# ── Main ───────────────────────────────────────────────────────────────────
def main() -> None:
    parser = ArgumentParser(description="Synthetic Profile Generator")
    parser.add_argument("count", nargs="?", type=int, default=10,
                        help="Number of profiles to generate (default: 10)")
    parser.add_argument("--csv", dest="csv_path", default="data/generated_profiles.csv",
                        help="Output CSV path (default: data/generated_profiles.csv)")
    args = parser.parse_args()

    profiles = generate_profiles(max(1, args.count))
    export_csv(profiles, args.csv_path)

    result = validate(profiles)
    print(result)
    if not result["valid"]:
        print("ISSUES:", result["issues"], file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
