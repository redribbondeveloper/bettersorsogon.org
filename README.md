# BetterGov Sorsogon

**The unofficial, community-run guide to government services, offices, and emergency lines across the Province of Sorsogon, Philippines.**

> ⚠️ **Not an official government website.** BetterGov Sorsogon is an independent, volunteer-maintained portal. It is not affiliated with, endorsed by, or connected to any government office or official. Always verify with the office before transacting.

Built on the open-source, CC0-licensed [BetterGov.ph](https://bettergov.ph) ([source](https://github.com/bettergovph/bettergov)) — the first province-wide edition.

## What it covers

| Section | Contents |
|---|---|
| `/hotlines` | 36 verified emergency numbers — national, province-wide, and per-LGU (MDRRMO, police, fire, medical, coast guard incl. Matnog ferry corridor). Print-ready for a barangay hall wall. |
| `/disaster` | Typhoon & disaster guide — PSWS wind-signal explainer, go-bag checklist, before/during/after guidance, PAGASA / PHIVOLCS / NDRRMC links. |
| `/directory` | 39 Provincial Capitol offices (confirmed official emails) + all 15 LGUs. |
| `/directory/:slug` | Per-LGU pages — current 2025–2028 mayors and vice mayors, contacts, local emergency numbers, census stats. |
| `/services` | 24 government services with Sorsogon context — PSA, LTO, PhilHealth, SSS, Pag-IBIG, BIR, NBI, scholarships, and where the nearest actual office is. |
| `/tourism` | 17 sourced attractions — Donsol butanding, Bulusan Volcano Natural Park, Subic Beach & Juag Lagoon, Gubat surfing, festivals. |

## Data integrity

Every fact in `src/data/sorsogon/*.json` carries a `sources` array of URLs it was taken from, and a `verification` flag:

- **`cross-checked`** — two or more independent sources agree
- **`single-source`** — one official source only (rendered with an "unverified" badge in the UI)

The pipeline: (1) researched from official sources → (2) independently re-verified by a second reviewer trying to refute it → (3) published with source links. Anything unconfirmable is `null` or omitted — an honest gap beats a plausible guess. **Data verified as of 2026-08-20.**

## Development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npx playwright test e2e/sorsogon-smoke.spec.ts   # smoke tests (run vite preview --port 4173 first)
```

Stack: React 19 · Vite · TypeScript · Tailwind CSS v4. All content is static JSON — no backend, no database, no analytics, no cookies.

Deploy: any static host. Cloudflare Pages works out of the box (`npm run build`, publish `dist/`).

## Contributing

Corrections are the most valuable contribution — especially phone numbers and office details. Every data file records its sources, so a correction just needs a better official source. Email corrections to hello@bettersorsogon.org or open a pull request here.

## Licenses

- **Code**: open source, derived from BetterGov.ph (CC0)
- **Content**: CC BY 4.0
- **Cost to the People of Sorsogon: ₱0**
