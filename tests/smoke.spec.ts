import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function prepareScreenshot(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  for (const img of await page.locator("img").all()) {
    if (await img.isVisible()) {
      await img.evaluate(async (element) => {
        element.scrollIntoView({ block: "center", behavior: "instant" });
        await (element as HTMLImageElement).decode().catch(() => {});
      });
    }
  }
  await page.evaluate(async () => {
    await Promise.all(
      Array.from(document.images).map((img) => img.decode().catch(() => {})),
    );
    (document.activeElement as HTMLElement | null)?.blur();
    window.scrollTo({ top: 0, behavior: "instant" });
  });
}

test("homepage, primary CTA and visual acceptance", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Make the moment impossible to miss." }),
  ).toBeVisible();
  await prepareScreenshot(page);
  await page.screenshot({
    path: `test-results/home-${testInfo.project.name}.png`,
    fullPage: true,
  });
  await page
    .locator(".hero")
    .getByRole("link", { name: "Start Your Party" })
    .click();
  await expect(page).toHaveURL(/\/inquire/);
  await expect(page.getByLabel("Event date")).toBeVisible();
});
test("gallery filters and keyboard lightbox", async ({ page }) => {
  await page.goto("/gallery");
  await page.getByRole("button", { name: "Showers", exact: true }).click();
  await expect(page.locator(".gallery-card")).toHaveCount(1);
  await page
    .getByRole("button", { name: "View Soft Pastel Shower Backdrop" })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.getByRole("button", { name: "All", exact: true }).click();
  await expect(page.locator(".gallery-card")).toHaveCount(6);
});
test("palette updates and survives navigation", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Soft Bloom", exact: true }).click();
  await expect(
    page.getByTestId("palette-preview").locator(".balloon-cluster"),
  ).toHaveAttribute("style", /--balloon-0: #f7b5dc/);
  await page.getByLabel("What are we celebrating?").selectOption("Shower");
  await page.getByRole("link", { name: "Use This Palette" }).click();
  await expect(page.getByLabel("What are we celebrating?")).toHaveValue(
    "Shower",
  );
  await expect(page.locator(".planner-board strong")).toHaveText("Soft Bloom");
});
test("guided inquiry validates, saves, reviews and submits", async ({
  page,
}, testInfo) => {
  await page.goto("/?utm_source=instagram&utm_campaign=party");
  await page
    .locator(".hero")
    .getByRole("link", { name: "Start Your Party" })
    .click();
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
  await page.getByLabel("Custom Balloon Art", { exact: true }).check();
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
  await prepareScreenshot(page);
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
    await page.evaluate(() => localStorage.getItem("swanky-inquiry-v1")),
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
test("navigation and page widths", async ({ page }, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(
      page.getByRole("navigation", { name: "Mobile navigation" }),
    ).toBeVisible();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Work", exact: true })
      .click();
    await expect(page).toHaveURL(/\/gallery/);
    await expect(
      page.getByRole("navigation", { name: "Mobile navigation" }),
    ).not.toBeVisible();
  }
  for (const route of [
    "/",
    "/inquire",
    "/gallery",
    "/ops-preview",
    "/thank-you",
  ]) {
    await page.goto(route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      route,
    ).toBe(true);
  }
});
test("ops is sample data, unlinked and excluded from search", async ({
  page,
}, testInfo) => {
  await page.goto("/ops-preview");
  await expect(
    page.getByText("No live customer data", { exact: true }),
  ).toBeVisible();
  await expect(page.getByText("Sample data", { exact: true })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
  await prepareScreenshot(page);
  await page.screenshot({
    path: `test-results/ops-${testInfo.project.name}.png`,
    fullPage: true,
  });
  await expect(page.locator('.site-header a[href="/ops-preview"]')).toHaveCount(
    0,
  );
});
test("accessibility of public routes and ops", async ({ page }) => {
  for (const route of [
    "/",
    "/gallery",
    "/inquire",
    "/ops-preview",
    "/thank-you",
  ]) {
    await page.goto(route);
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

test("homepage has no runtime errors and motion can pause", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Pause event line" }).click();
  await expect(page.locator(".marquee")).toHaveClass(/marquee-paused/);
  await page.getByRole("button", { name: "Play event line" }).click();
  await page.getByRole("button", { name: "Soft Bloom", exact: true }).click();
  await expect(page.locator(".starter-board strong")).toHaveText("Soft Bloom");
  expect(errors).toEqual([]);
});
