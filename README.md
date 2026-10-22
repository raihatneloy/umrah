# Umrah 2026 — offline companion

A single-file-per-screen offline web app (PWA) for a family Umrah, 24–31 October 2026.
Install it on Android from Chrome → *Add to Home screen*. After the first load it needs **no network at all**.

## What it does
- **Today** — the day's plan, live prayer times computed on the device (Umm al-Qura), countdowns in Riyadh time
- **Rites** — the 13 steps of Umrah in order, with the du'ā for each, the ruling, the common mistake, the fix, and ṭawāf/sa'ī counters
- **Du'ā** — 16 entries, each carrying its own grading and citation; amber where the source itself says the wording is a companion's, weak or disputed
- **Vault** — passports, e-visa, certificates, bookings, permits. AES-256-GCM under a PIN-derived key (PBKDF2 310k), stored in IndexedDB, with a full-screen "present mode" for the QR at the gate, a local PDF renderer (vendored pdf.js) so the e-visa opens with no network, and a wake lock that keeps the screen on while you show it. Documents are imported on the phone; **none are in this repo**
- **More** — tick-list, emergency numbers, embassy, driver card, qibla bearing

## Provenance
Every Arabic passage, ruling and citation is copied from named sources (haj.gov.sa guides, sunnah.com, the
Quran.com API, official fatwa pages) with the URL recorded. `data.js` is generated from that
verified dataset. Where the schools differ, the difference is printed rather than resolved. Nothing is
written from memory.

## Privacy
This repo contains no names, passport numbers, visa numbers, booking references or documents of any kind.
Do not add them — the vault is filled on the device.

## Files
`index.html` · `app.js` · `data.js` (generated) · `sw.js` (offline cache) · `manifest.webmanifest` · `fonts/` (subset woff2)
