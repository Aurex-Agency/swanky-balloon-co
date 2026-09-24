# Validation record

Brand alignment checked September 24, 2026.

- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm run build`: passed using the supported Next.js Webpack compiler.
- `npm test`: all 22 desktop and mobile checks passed in one complete run.
- axe found no tested WCAG 2 A/AA, 2.1 AA or 2.2 AA violations on home, gallery, inquiry, thank-you and operations pages at 1440 × 900 and 390 × 844. Automated checks are not a complete accessibility certification.
- Visually reviewed the homepage, real photography, service menu, palette controls, inquiry and operations styling at desktop and mobile sizes. Also reviewed the tablet homepage at 768 px with no horizontal overflow or missing images.
- No horizontal page overflow on the five tested routes at desktop and mobile widths.
- Verified demo inquiry submission, draft recovery, new palette carryover, attribution, gallery filters, keyboard lightbox, mobile navigation, input validation, request size handling and motion pause.
- Verified the homepage’s manual photo selector, keyboard selection, pickup and delivery disclosures, and mobile inquiry button visibility.
- No homepage browser console or page errors detected.
- No em dashes in authored website source and copy.

Three portfolio images were confirmed by the user as Swanky’s own work and approved for the website. Other artists’ inspiration images, portraits, logos and service prices were not published. Source and styling notes are in `BRAND-ALIGNMENT.md`.

No live GoHighLevel endpoint or credentials were supplied, so external delivery and downstream CRM/email/SMS automations were not tested or enabled. File uploads remain local previews. Demo mode remains enabled in local configuration. No Vercel deployment was performed by this task.
