import { test, expect } from "@playwright/test";

test("USER loggas in och ser produkter", async ({ page }) => {
  // Loggar in
  await page.goto("/login");

  await page.getByLabel("E-post").fill("test@example.com");
  await page.getByLabel("Lösenord").fill("test");
  await page.getByRole("button", { name: "Logga in" }).click();

  // Välkommen-sidan visas
  await expect(
    page.getByRole("heading", {
      name: "Välkommen till KJPJ webbshoppen!",
    }),
  ).toBeVisible();

  await expect(page.getByText("test@example.com")).toBeVisible();
  await expect(page.getByText("Kund", { exact:true })).toBeVisible();

  // Gå till produktsidan
  await page.getByRole("link", { name: "Produkter" }).click();

  // Kontrollera att produkterna visas
  await expect(
    page.getByRole("heading", { name: "Produkter", level: 1 }),
  ).toBeVisible();

  // Kontrollera att produktkorten visas
  await expect(
    page.getByRole("button", { name: "Lägg i kundvagnen" }).first(),
  ).toBeVisible();
});
