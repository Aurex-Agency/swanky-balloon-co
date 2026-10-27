import { test, expect } from "@playwright/test";
import {
  emptyDraft,
  inquirySchema,
  normalizeInquiry,
} from "../src/lib/inquiry";
import { legal } from "../src/data/swanky";

const validDraft = {
  ...emptyDraft,
  eventType: "Birthday",
  eventDate: "2099-10-18",
  venueCity: "Nashville",
  serviceInterests: ["Custom Installations"],
  budgetRange: "I’m not sure yet",
  firstName: "Test",
  lastName: "Inquiry",
  email: "test@example.com",
  phone: "6155550100",
  consent: true,
};

for (const smsConsent of [false, true]) {
  for (const marketingSmsConsent of [false, true]) {
    test(`independent SMS choices: informational=${smsConsent}, marketing=${marketingSmsConsent}`, async ({
      page,
    }) => {
      await page.addInitScript((draft) => {
        localStorage.setItem(
          "swanky-inquiry-v2",
          JSON.stringify({ draft, step: 3, savedAt: Date.now() }),
        );
      }, validDraft);
      // Intercept delivery: exercising consent must never send a real inquiry.
      await page.route("**/api/inquiry", (route) =>
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ ok: true, demo: true }),
        }),
      );
      await page.goto("/inquire");
      const informational = page.locator("#smsConsent");
      const marketing = page.locator("#marketingSmsConsent");
      await expect(informational).not.toBeChecked();
      await expect(marketing).not.toBeChecked();
      await informational.setChecked(smsConsent);
      await marketing.setChecked(marketingSmsConsent);
      await expect(informational).toBeChecked({ checked: smsConsent });
      await expect(marketing).toBeChecked({ checked: marketingSmsConsent });
      const pending = page.waitForRequest(
        (r) => r.url().endsWith("/api/inquiry") && r.method() === "POST",
      );
      await page.getByRole("button", { name: "Send My Inquiry" }).click();
      const body = (await pending).postDataJSON();
      const inquiry = normalizeInquiry(inquirySchema.parse(body));
      expect(inquiry.consent.sms.optedIn).toBe(smsConsent);
      expect(inquiry.consent.marketingSms.optedIn).toBe(marketingSmsConsent);
      expect(inquiry.consent.marketing).toBe(marketingSmsConsent);
      if (inquiry.consent.marketingSms.optedIn) {
        expect(inquiry.consent.marketingSms.disclosure).toBe(
          legal.marketingSmsDisclosure,
        );
        expect(inquiry.consent.marketingSms.version).toBe("2026-10-27");
      }
      expect(Number.isNaN(Date.parse(inquiry.submittedAt))).toBe(false);
    });
  }
}

test("older forms never acquire marketing permission", () => {
  const { marketingSmsConsent: omitted, ...olderDraft } = validDraft;
  void omitted;
  const inquiry = normalizeInquiry(inquirySchema.parse(olderDraft));
  expect(inquiry.consent.marketingSms).toEqual({ optedIn: false });
  expect(inquiry.consent.marketing).toBe(false);
});
