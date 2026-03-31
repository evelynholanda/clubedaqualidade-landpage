// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Demonstrações — demonstracoes.html', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/demonstracoes.html', { waitUntil: 'domcontentloaded' });
  });

  test('página carrega com título correto', async ({ page }) => {
    await expect(page).toHaveTitle(/Ana Evelyn|Agentes de IA|Demonstra/i);
  });

  test('navbar está presente', async ({ page }) => {
    await expect(page.locator('.nav')).toBeVisible();
  });

  test('footer está presente', async ({ page }) => {
    await expect(page.locator('.footer')).toBeVisible();
  });

});
