import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const ROUTES = [
  "/",
  "/work",
  "/work/pink-ivory",
  "/services",
  "/services/custom-installations",
  "/pickup",
  "/palettes",
  "/about",
  "/faq",
  "/inquire",
  "/thank-you",
  "/privacy",
];

// Client motion marks the page intro (or garland) ready once hydrated; interact after that.
async function hydrated(page: Page) {
  await expect(
    page.locator("[data-intro].intro-ready, .garland.intro-ready").first(),
  ).toBeAttached({
    timeout: 15000,
  });
}
// After a link click, wait for the carousel transition to finish.
async function settled(page: Page) {
  await expect(page.locator(".pt-stage")).toBeHidden({ timeout: 10000 });
}

test("every page renders one h1 without runtime errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  for (const route of ROUTES) {
    await page.goto(route);
    await expect(page.locator("h1"), route).toHaveCount(1);
  }
  expect(errors).toEqual([]);
});

test("homepage CTA opens the inquiry", async ({ page }, testInfo) => {
  await page.goto("/");
  await hydrated(page);
  await expect(
    page.getByRole("heading", { name: "Swanky", level: 1 }),
  ).toBeVisible();
  await page.screenshot({
    path: `test-results/home-${testInfo.project.name}.png`,
  });
  await page
    .locator(".hero")
    .getByRole("link", { name: "Tell us what you’re celebrating" })
    .click();
  await expect(page).toHaveURL(/\/inquire$/, { timeout: 15000 });
  await settled(page);
  await expect(page.getByLabel("Event date")).toBeVisible();
});

test("navigation menu and page widths", async ({ page }, testInfo) => {
  await page.goto("/");
  await hydrated(page);
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Open menu" }).click();
    const menu = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(menu).toBeVisible();
    await menu.getByRole("link", { name: "Work", exact: true }).click();
    await expect(page).toHaveURL(/\/work$/, { timeout: 15000 });
    await expect(menu).not.toBeVisible();
  } else {
    await page
      .getByRole("navigation", { name: "Main" })
      .getByRole("link", { name: "Services" })
      .click();
    await expect(page).toHaveURL(/\/services$/, { timeout: 15000 });
  }
  for (const route of [...ROUTES, "/ops-preview"]) {
    await page.goto(route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      route,
    ).toBe(true);
  }
});

test("work filters and lightbox", async ({ page }) => {
  await page.goto("/work");
  await hydrated(page);
  await page.getByRole("button", { name: "Pink + Ivory", exact: true }).click();
  await expect(page.locator(".work-card")).toHaveCount(1);
  await page
    .getByRole("button", { name: "View Pink + Ivory Freestanding Garland" })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.getByRole("button", { name: "All", exact: true }).click();
  await expect(page.locator(".work-card")).toHaveCount(3);
});

test("old gallery URL redirects to work", async ({ page }) => {
  await page.goto("/gallery");
  await expect(page).toHaveURL(/\/work$/);
});

test("palette studio carries into the inquiry", async ({ page }) => {
  await page.goto("/palettes");
  await hydrated(page);
  await page.getByRole("button", { name: "Soft Bloom", exact: true }).click();
  await expect(page.locator(".studio-name")).toHaveText("Soft Bloom");
  await page.getByLabel("What are we celebrating?").selectOption("Shower");
  await page.getByRole("link", { name: "Use this palette" }).click();
  await expect(page).toHaveURL(/\/inquire\?/, { timeout: 15000 });
  await settled(page);
  await expect(page.getByLabel("What are we celebrating?")).toHaveValue(
    "Shower",
  );
  await expect(page.locator(".planner-board strong")).toHaveText("Soft Bloom");
});

test("service and story pages link into the inquiry", async ({ page }) => {
  await page.goto("/services");
  await hydrated(page);
  // Cards reveal on scroll (Slush card reveal), so scroll to them like a visitor would.
  await page.evaluate(() =>
    document.querySelector(".service-cards")?.scrollIntoView(),
  );
  await page
    .getByRole("link", { name: /Custom Installations/ })
    .first()
    .click();
  await expect(page).toHaveURL(/\/services\/custom-installations$/, {
    timeout: 15000,
  });
  await settled(page);
  await expect(
    page.getByRole("heading", { name: "Custom Installations", level: 1 }),
  ).toBeVisible();
  await expect(page.getByText("Balloon arches")).toBeVisible();
  await page.goto("/work/pink-ivory");
  await hydrated(page);
  await page.getByRole("link", { name: "Start with these colors" }).click();
  await expect(page).toHaveURL(/vibe=Soft\+Bloom/, { timeout: 15000 });
  await settled(page);
  await expect(page.locator(".planner-board strong")).toHaveText("Soft Bloom");
});

test("guided inquiry validates, saves, reviews and submits", async ({
  page,
}, testInfo) => {
  await page.goto("/inquire?utm_source=instagram&utm_campaign=party");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.locator(".error-summary")).toContainText(
    "Choose an event type",
  );
  await page.getByLabel("What are we celebrating?").selectOption("Birthday");
  await page.getByLabel("Event date", { exact: true }).fill("2099-10-18");
  await page.getByLabel("Venue city").fill("Nashville");
  await page.getByLabel("Venue name").fill("Sample venue");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.getByLabel("Theme or concept")).toBeVisible();
  await page.getByLabel("Theme or concept").fill("Colorful milestone");
  await page.getByLabel("Custom Installations", { exact: true }).check();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByLabel("$1,000–$2,500", { exact: true }).check();
  await page.reload();
  await expect(page.getByLabel("$1,000–$2,500", { exact: true })).toBeChecked();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByLabel("First name", { exact: true }).fill("Demo");
  await page.getByLabel("Last name", { exact: true }).fill("Inquiry");
  await page.getByLabel("Email", { exact: true }).fill("demo@example.com");
  await page.getByLabel("Mobile phone", { exact: true }).fill("6155550100");
  await expect(page.locator(".inquiry-summary")).toContainText("Birthday");
  await page.getByRole("checkbox", { name: /I agree that Swanky/ }).check();
  await page.screenshot({
    path: `test-results/inquiry-${testInfo.project.name}.png`,
    fullPage: true,
  });
  const requestPromise = page.waitForRequest(
    (r) => r.url().endsWith("/api/inquiry") && r.method() === "POST",
  );
  await page.getByRole("button", { name: "Send My Inquiry" }).click();
  const request = await requestPromise;
  expect(request.postDataJSON().attribution.utmSource).toBe("instagram");
  await expect(page).toHaveURL(/\/thank-you\?demo=true/);
  await expect(page.getByRole("status")).toContainText("not sent to Swanky");
  await expect(page.locator(".confirmation-board")).toContainText(
    "Birthday in Nashville",
  );
  expect(
    await page.evaluate(() => localStorage.getItem("swanky-inquiry-v2")),
  ).toBeNull();
});

test("past dates rejected by server and client", async ({ page, request }) => {
  await page.goto("/inquire");
  await page.getByLabel("What are we celebrating?").selectOption("Birthday");
  await page.getByLabel("Event date", { exact: true }).fill("2020-01-01");
  await page.getByLabel("Venue city").fill("Nashville");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.locator(".error-summary")).toContainText("future date");
  const response = await request.post("/api/inquiry", {
    data: { eventDate: "2020-01-01" },
  });
  expect(response.status()).toBe(400);
  expect((await response.json()).fields.eventDate).toContain("future date");
});

test("ops is sample data, unlinked and excluded from search", async ({
  page,
}) => {
  await page.goto("/ops-preview");
  await expect(
    page.getByText("No live customer data", { exact: true }),
  ).toBeVisible();
  await expect(page.getByText("Sample data", { exact: true })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
  await page.goto("/");
  await expect(page.locator('a[href="/ops-preview"]')).toHaveCount(0);
});

test("accessibility of public routes and ops", async ({ page }) => {
  test.setTimeout(120000);
  for (const route of [...ROUTES, "/ops-preview"]) {
    await page.goto(route);
    // Let page intros finish so contrast is measured on settled text, not mid-fade.
    await page.waitForTimeout(3000);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      results.violations,
      `${route}: ${JSON.stringify(results.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })))}`,
    ).toEqual([]);
  }
});

test("API rejects malformed, oversized and invalid content", async ({
  request,
}) => {
  const malformed = await request.post("/api/inquiry", {
    data: "{",
    headers: { "content-type": "application/json" },
  });
  expect(malformed.status()).toBe(400);
  const oversized = await request.post("/api/inquiry", {
    data: { notes: "x".repeat(33000) },
  });
  expect(oversized.status()).toBe(413);
  const invalid = await request.post("/api/inquiry", { data: {} });
  expect(invalid.status()).toBe(400);
});

test("sitemap lists the new pages", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  for (const path of [
    "/work",
    "/services/garlands-backdrops",
    "/pickup",
    "/palettes",
    "/faq",
  ]) {
    expect(xml).toContain(path);
  }
});
