// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Produtos — produtos.html', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/produtos.html');
  });

  test('página carrega com título correto', async ({ page }) => {
    await expect(page).toHaveTitle(/produtos|clube qualidade/i);
  });

  test('navbar está presente', async ({ page }) => {
    await expect(page.locator('.nav')).toBeVisible();
  });

  test('pelo menos um card de produto está visível', async ({ page }) => {
    const cards = page.locator('.product-card');
    await expect(cards.first()).toBeVisible();
  });

  test('cards de produto possuem título e preço', async ({ page }) => {
    const firstCard = page.locator('.product-card').first();
    await expect(firstCard.locator('h3')).toBeVisible();
    await expect(firstCard.locator('.product-price')).toBeVisible();
  });

  test('botões de compra estão presentes nos cards', async ({ page }) => {
    const buttons = page.locator('.product-card .buy-button');
    await expect(buttons.first()).toBeVisible();
  });

});
