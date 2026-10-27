# Swanky Balloon Co.

A presentation concept for Swanky Balloon Co., built for Aurex Business Labs. Next.js App Router (Webpack production build), TypeScript, Tailwind CSS, locally bundled Cormorant Garamond and Manrope fonts, Motion, Zod, Playwright and axe.

Repository: https://github.com/Aurex-Agency/swanky-balloon-co

## The redesigned site

Built to the direction in `../plan/` (design language, motion plan, build plan): Jenn's Canva palette and type, cartoon balloon garlands and stickers, and a motion system adapted from slush.app.

- `src/app/(swanky)/`: every public page. Home, Work (+ one page per event), Services (+ three collection pages), Pick Up, Palettes (color studio), About, FAQ, Inquire, Thank-you, Privacy.
- `src/app/(ops)/ops-preview`: the internal sample CRM from the concept, unlinked and noindex, with its original styles in its own root layout.
- `src/app/global-not-found.tsx`: the "This one popped." 404 for both groups (`experimental.globalNotFound`).
- `/gallery` permanently redirects to `/work`.

Building blocks:

- Tokens and styles: `src/styles/swanky/` (tokens, base, components, chrome, pages), mirrored in `src/lib/swanky/tokens.ts`. Playfair Display + Montserrat via Fontsource.
- Motion: `src/lib/swanky/gsap.ts` registers GSAP plugins and the `glide` and `float` eases. `MotionProvider` runs Lenis; `TransitionProvider` + `TransitionLink` run the 3D carousel between pages; `PageIntro`, `reveal.tsx`, `Marquee`, `StackingSlider` and `RotatingWord` hold the rest. Reduced motion turns all of it off, and the "Pause motion" control (`src/lib/swanky/ambient.ts`) stops every loop.
- Brand: the master logo is in `public/swanky/brand/logo/`; `npm run brand:logo` regenerates `src/lib/swanky/logo-shapes.ts`. `<Sticker>` and `<Garland>` are drawn in code.
- SEO: per-page metadata and canonicals, LocalBusiness and FAQPage JSON-LD (`src/components/swanky/seo/json-ld.tsx`), `sitemap.ts`, and `public/og.png` for link previews.
- Tests: `tests/smoke.spec.ts` (pages, navigation, gallery, palette carryover, inquiry, accessibility, API, sitemap) and `tests/foundation.spec.ts` (garland, transitions, reduced motion, pause, 404).

## Run locally

```sh
npm ci
cp .env.example .env.local
npm run dev -- --hostname 127.0.0.1
```

- Home: http://127.0.0.1:3000
- Work: http://127.0.0.1:3000/work
- Services: http://127.0.0.1:3000/services
- Color studio: http://127.0.0.1:3000/palettes
- Inquiry: http://127.0.0.1:3000/inquire
- Unlinked sample CRM: http://127.0.0.1:3000/ops-preview
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

`src/data/swanky.ts` holds brand details, navigation, service descriptions, portfolio slots, categories, vibes, color swatches, event types, budget ranges, FAQ, process, testimonials, core marketing copy and typed operations mock data. The service menu follows the owner’s supplied board. Occasion labels, response times and other business policies remain subject to owner confirmation. Interface labels live with their controls.

The active design follows the owner’s September 2026 brand boards: ivory, dusty blue, sage, taupe and chocolate, with serif typography, thin borders and restrained pinstripes. See `BRAND-ALIGNMENT.md` for sources and implementation choices.

Three approved Swanky installation photographs are local in `public/swanky/portfolio/`, extracted from board 8 with user confirmation. They appear in the hero and gallery through optimized Next Image components. Gallery filters describe palettes because event types were not supplied. The lightbox preserves each full photograph. The original nine graphics remain in `public/swanky/brand/` for reference and are no longer displayed.

To add portfolio work, place approved images in `public/swanky/portfolio/` and update the central data file. Set `brand.founderImage` when an approved founder portrait is available; the current about section uses a typographic brand composition. No fabricated portrait or testimonial is shown.

The supplied boards contain no named font family or official hex values. Cormorant Garamond and the website color tokens are interpretations of the visual direction, not claims of exact brand specifications. The wordmark and monogram are web typography inspired by the supplied lockups.

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

### SMS consent mapping

The inquiry form collects two independent, optional SMS choices. `consent.sms`
(and the existing `sms-opt-in` tag) covers inquiry and booking updates only.
`consent.marketingSms` (and `sms-marketing-opt-in`) covers promotional SMS only.
Each opted-in record includes its disclosure and version; `submittedAt` records
the submission time. `consent.marketing` mirrors marketing SMS permission only,
not email permission. Older submissions without the new field default to false.

Before enabling promotional sends in GHL, map and retain both consent records
and the timestamp. Gate each workflow on its corresponding consent and current
SMS DND/unsubscribe status; do not use the informational tag to enroll contacts
in marketing. Tags are routing hints, not an authoritative consent ledger.
Do not treat an unchecked box on a later inquiry as a new opt-in or clear STOP/DND
without an explicit, recorded resubscription. Send opt-in confirmations matching
the categories selected, and verify HELP/STOP handling in GHL.
