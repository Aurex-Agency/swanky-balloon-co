# Swanky Balloon Co.

A presentation concept for Swanky Balloon Co., built for Aurex Business Labs. Next.js App Router (Webpack production build), TypeScript, Tailwind CSS, locally bundled Bricolage Grotesque and Manrope fonts, Motion, Zod, Playwright and axe.

Repository: https://github.com/Aurex-Agency/swanky-balloon-co

## Run locally

```sh
npm ci
cp .env.example .env.local
npm run dev -- --hostname 127.0.0.1
```

- Home: http://127.0.0.1:3000
- Gallery: http://127.0.0.1:3000/gallery
- Inquiry: http://127.0.0.1:3000/inquire
- Confirmation: http://127.0.0.1:3000/thank-you
- Unlinked sample CRM: http://127.0.0.1:3000/ops-preview
- Privacy placeholder: http://127.0.0.1:3000/privacy
- Inquiry API: POST `/api/inquiry`

## Quality checks

```sh
npm run typecheck
npm run lint
npm run build
npx playwright install chromium
npm test
```

Tests cover desktop (1440 × 900) and mobile (390 × 844), gallery filtering and keyboard lightbox, palette carryover, required and past-date validation, draft persistence, full demo submission, attribution, mobile navigation, overflow, sample CRM, API validation and axe WCAG checks. Full-page screenshots are generated in ignored `test-results/`.

## Editable content and images

`src/data/swanky.ts` holds brand details, navigation, service descriptions, portfolio slots, categories, vibes, color swatches, event types, budget ranges, FAQ, process, testimonials, core marketing copy and typed operations mock data. Unverified service and occasion copy is commented for owner confirmation. Interface labels live with their controls.

All nine supplied brand graphics are local in `public/swanky/brand/`. `logo-trim.png` is a lossless transparent-padding crop used for layout. Source graphics are retained. No Instagram scraping or third-party portfolio photography is used.

For real portfolio work, add approved files to `public/swanky/portfolio/` and set each item's `image`, `alt`, category and title in the central data file. The card automatically switches from its CSS concept to an optimized Next Image. Set `brand.founderImage` after supplying an approved photo, or keep the brand graphic composition. Supply a behind-the-scenes photo and verified testimonials if available. No fabricated portrait or testimonial is shown.

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_DEMO_MODE` | `true` shows the removable preview badge and Aurex credit and marks the concept noindex. Rebuild after changing. |
| `NEXT_PUBLIC_SITE_URL` | Canonical/metadata/sitemap origin. Use the real production HTTPS origin at launch. |
| `GHL_WEBHOOK_URL` | Server-only HTTPS webhook for normalized inquiry delivery. Empty means successful demo with no delivery. |
| `OWNER_NOTIFICATION_EMAIL` | Reserved for a future email adapter; not used yet. |
| `RESEND_API_KEY` | Reserved server-only setting for a future email adapter; not used yet. |

Never prefix secrets with `NEXT_PUBLIC_`. The form never reads the webhook or email secrets. The API validates and normalizes all input. Production logging contains no contact details. The demo file input does not upload or submit files. Inquiry drafts are stored locally for up to seven days; final confirmation retains only event summary fields for the browser session.

## Deploy

Use a Node.js host with Next.js support and Node 20.9 or newer (developed with Node 24). Set environment variables, run `npm ci` and `npm run build`, then `npm start`. The API requires a server runtime, so do not use a static export. No database is required. The production build uses the supported Webpack compiler because Turbopack’s PostCSS worker is restricted in the development environment. Build-time fonts are local and do not require Google Fonts access.

The repository is prepared for deployment; publication is separate. The CRM route is unlinked and noindex, but is not an authenticated application. Never add live customer data to it. Confirm the final privacy notice and business content before a public launch.

See `SWANKY-SYSTEMS-PLAN.md` for webhook mapping, proposed automation rules and launch decisions. See `SHOWCASE-NOTES.md` for the one-minute presentation.
