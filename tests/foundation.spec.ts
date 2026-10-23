import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Phase 1 foundation: the new (swanky) layout, garland, stickers, carousel transition and 404.

// Client motion marks the garland ready once hydrated; interact only after that.
async function hydrated(page: Page) {
  await expect(page.locator(".garland.intro-ready").first()).toBeAttached({
    timeout: 15000,
  });
}

test("lab renders the brand system and passes axe", async ({ page }) => {
  await page.goto("/lab");
  await expect(
    page.getByRole("heading", { name: "Swanky", level: 1 }),
  ).toBeVisible();
  await expect(page.locator(".garland[data-interactive] .b")).toHaveCount(150);
  await expect(page.locator(".sticker svg").first()).toBeVisible();
  await page.waitForTimeout(2500);
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations.map((v) => v.id)).toEqual([]);
});

test("palette chips recolor the garland", async ({ page }) => {
  await page.goto("/lab");
  await hydrated(page);
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

test("carousel transition navigates both ways and cleans up", async ({
  page,
}) => {
  await page.goto("/lab");
  await hydrated(page);
  await page.getByRole("link", { name: "Play the page transition" }).click();
  // Generous timeouts cover the dev server compiling the route on first request.
  await expect(page).toHaveURL(/\/lab\/transition$/, { timeout: 15000 });
  await expect(page.locator(".pt-stage")).toBeHidden({ timeout: 8000 });
  await expect(
    page.getByRole("heading", { name: "It’s all in the details." }),
  ).toBeVisible();
  await expect(page.locator(".pt-old")).toHaveCount(0);
  await page.getByRole("link", { name: "Back to the lab" }).click();
  await expect(page).toHaveURL(/\/lab$/, { timeout: 15000 });
  await expect(page.locator(".pt-stage")).toBeHidden({ timeout: 8000 });
});

test("reduced motion navigates without the carousel", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/lab");
  await hydrated(page);
  await expect(page.getByText("A little more celebration.")).toBeVisible();
  await page.getByRole("link", { name: "Play the page transition" }).click();
  await expect(page).toHaveURL(/\/lab\/transition$/, { timeout: 15000 });
  await expect(page.locator(".pt-stage")).toBeHidden();
  await context.close();
});

test("unknown URLs show the popped 404", async ({ page }) => {
  const response = await page.goto("/this-page-popped");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "This one popped." }),
  ).toBeVisible();
});
