import { expect, test } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://127.0.0.1:5000/");
  await page.getByRole("link", { name: "🧠 AIdea" }).click();
  await page.getByPlaceholder("I'm an LLM pretending to be a").click();
  await page.getByPlaceholder("I'm an LLM pretending to be a").fill("howdy");
  await page.getByPlaceholder("I'm an LLM pretending to be a").press("Tab");
  await page.getByRole("button", { name: "Send" }).press("Enter");
  await expect(page.getByRole("link", { name: "🧠 AIdea" })).toBeVisible();
  await page
    .locator("div")
    .filter({ hasText: /^Loading\.\.\.Send$/ })
    .click();
  await page.getByPlaceholder("I'm an LLM pretending to be a").click();
  await expect(
    page.getByPlaceholder("I'm an LLM pretending to be a"),
  ).toBeVisible();
});
