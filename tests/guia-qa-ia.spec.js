// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Guia — qa-lideranca-ia-era.html', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/qa-lideranca-ia-era.html', { waitUntil: 'domcontentloaded' });
  });

  test('título da página está correto', async ({ page }) => {
    // título: "Liderança de QA na Era da IA — 2026"
    await expect(page).toHaveTitle(/QA na Era|Era da IA|2026/i);
  });

  test('page-wrap ocupa largura total (sem max-width fixo)', async ({ page }) => {
    const [wrapWidth, viewportWidth] = await page.evaluate(() => [
      document.querySelector('.page-wrap').getBoundingClientRect().width,
      window.innerWidth,
    ]);
    // largura do wrapper deve ser >= 95% do viewport (desconta padding)
    expect(wrapWidth).toBeGreaterThanOrEqual(viewportWidth * 0.95);
  });

  test('cabeçalho do documento está visível', async ({ page }) => {
    await expect(page.locator('.doc-header')).toBeVisible();
  });

  test('seção de evolução da disciplina está visível', async ({ page }) => {
    await expect(page.locator('.evolution-bar')).toBeVisible();
    await expect(page.locator('.evo-step.active')).toContainText(/Agentic QA/i);
  });

  test('métricas da indústria estão visíveis', async ({ page }) => {
    const metrics = page.locator('.metric-card');
    await expect(metrics).toHaveCount(4);
    await expect(page.locator('.metric-num', { hasText: '85%' })).toBeVisible();
    await expect(page.locator('.metric-num', { hasText: '60%' })).toBeVisible();
  });

  test('pilares estratégicos estão visíveis', async ({ page }) => {
    const pillars = page.locator('.pillar-card');
    await expect(pillars.first()).toBeVisible();
    await expect(page.locator('.pillar-card', { hasText: /LLM Testing/i })).toBeVisible();
    await expect(page.locator('.pillar-card', { hasText: /MCP/i })).toBeVisible();
  });

  test('página não exibe barras de rolagem horizontal', async ({ page }) => {
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const clientWidth = await page.evaluate(() => document.body.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 5);
  });

});
