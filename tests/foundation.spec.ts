import { test, expect, type Page } from "@playwright/test";

// Motion system: garland, recolor, carousel transition, reduced motion, pause, 404.

async function hydrated(page: Page) {
  await expect(
    page.locator("[data-intro].intro-ready, .garland.intro-ready").first(),
  ).toBeAttached({
    timeout: 15000,
  });
}

test("hero garland renders and recolors", async ({ page }) => {
  await page.goto("/");
  await hydrated(page);
  await expect(page.locator(".garland[data-interactive] .b")).toHaveCount(150);
  const chip = page.getByRole("button", { name: "Blue Hour" });
  await chip.click();
  await expect(chip).toHaveAttribute("aria-pressed", "true");
  await expect
    .poll(async () =>
      page
        .locator(".garland[data-interactive] circle")
        .evaluateAll(
          (els) => new Set(els.map((e) => e.getAttribute("fill"))).size,
        ),
    )
    .toBeLessThanOrEqual(3);
});

test("carousel transition navigates and cleans up", async ({ page }) => {
  await page.goto("/");
  await hydrated(page);
  await page
    .locator(".hero")
    .getByRole("link", { name: "See the work" })
    .click();
  // Generous timeouts cover the dev server compiling the route on first request.
  await expect(page).toHaveURL(/\/work$/, { timeout: 15000 });
  await expect(page.locator(".pt-stage")).toBeHidden({ timeout: 8000 });
  await expect(
    page.getByRole("heading", { name: "It’s all in the details." }),
  ).toBeVisible();
  await expect(page.locator(".pt-old")).toHaveCount(0);
  await page.getByRole("link", { name: "Swanky Balloon Co. home" }).click();
  await expect(page).toHaveURL(/\/$/, { timeout: 15000 });
  await expect(page.locator(".pt-stage")).toBeHidden({ timeout: 8000 });
});

test("reduced motion navigates without the carousel", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  await hydrated(page);
  await page
    .locator(".hero")
    .getByRole("link", { name: "See the work" })
    .click();
  await expect(page).toHaveURL(/\/work$/, { timeout: 15000 });
  await expect(page.locator(".pt-stage")).toBeHidden();
  await context.close();
});

test("pause motion stops looping animation and is remembered", async ({
  page,
}) => {
  await page.goto("/");
  await hydrated(page);
  await page
    .locator(".ticker")
    .getByRole("button", { name: "Pause motion" })
    .click();
  await expect(page.locator("html")).toHaveClass(/motion-paused/);
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/motion-paused/);
  await page
    .locator(".ticker")
    .getByRole("button", { name: "Play motion" })
    .click();
  await expect(page.locator("html")).not.toHaveClass(/motion-paused/);
});

test("unknown URLs show the popped 404", async ({ page }) => {
  const response = await page.goto("/this-page-popped");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "This one popped." }),
  ).toBeVisible();
});
