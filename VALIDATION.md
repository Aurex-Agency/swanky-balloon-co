# Validation record

Checked September 24, 2026.

- `npm run typecheck`: passed.
- `npm run lint`: passed. Generated Playwright reports are excluded from lint.
- `npm run build`: passed using the supported Next.js Webpack compiler. The default Turbopack production build encountered a local PostCSS worker port restriction, so the reproducible build script uses `next build --webpack`.
- `npm test`: 20 desktop/mobile checks verified. The final full run passed 18 checks; its two homepage screenshot checks timed out while Playwright waited for an intentionally floating sticker to become stationary. The screenshot helper was corrected to support moving elements. `npm test -- --grep 'homepage, primary CTA'` then passed both checks.
- axe checks found no WCAG 2 A/AA, 2.1 AA or 2.2 AA violations on the home, gallery, inquiry, thank-you and operations routes at desktop and mobile sizes. Automated checks are not a complete accessibility certification.
- Desktop and mobile screenshots were reviewed at 1440 × 900 and 390 × 844. Fixed mobile headline spacing, underline placement, supporting text sizes, sample-data visibility and keyboard access to the scrolling calendar.
- No horizontal page overflow on the five requested routes at the tested widths.
- Demo inquiry submission, local draft recovery, palette carryover, campaign attribution, gallery/lightbox keyboard interaction, mobile navigation, input validation, request size handling and motion pause verified.
- Homepage browser console and page-error checks passed.
- Authored source and documentation contain no em dashes.

No live GoHighLevel endpoint or credentials were supplied, so external delivery and downstream CRM/email/SMS automations were not tested or enabled. File uploads remain a local-only interface. The source is ready for a Node-hosted deployment; no remote deployment or GitHub push was performed.
