// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Home — index.html', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('título da página está correto', async ({ page }) => {
    await expect(page).toHaveTitle(/Ana Evelyn.*QA.*IA/i);
  });

  test('navbar exibe todos os links esperados', async ({ page }) => {
    const nav = page.locator('.nav-menu');
    await expect(nav.getByRole('link', { name: /início/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /sobre/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /produtos/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /demonstrações/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /contato/i })).toBeVisible();
  });

  test('hero exibe os dois CTAs principais', async ({ page }) => {
    const cta = page.locator('.hero-fixed-cta');
    await expect(cta.getByRole('link', { name: /acesse meu conteúdo/i })).toBeVisible();
    await expect(cta.getByRole('link', { name: /conheça minha história/i })).toBeVisible();
  });

  test('stats bar exibe os 4 indicadores', async ({ page }) => {
    const stats = page.locator('.stat-item');
    await expect(stats).toHaveCount(4);
    await expect(page.locator('.stat-number', { hasText: '5+' })).toBeVisible();
    await expect(page.locator('.stat-number', { hasText: '75%' })).toBeVisible();
    await expect(page.locator('.stat-number', { hasText: '100+' })).toBeVisible();
    await expect(page.locator('.stat-number', { hasText: '4' })).toBeVisible();
  });

  test('card "Artigo em Destaque" está visível', async ({ page }) => {
    const card = page.locator('.featured-article-card');
    await expect(card).toBeVisible();
    await expect(card.locator('.featured-article-title')).toContainText(/liderança de qa na era da ia/i);
    await expect(card.locator('.featured-article-badge')).toContainText(/gratuito/i);
  });

  test('botão "Ler o Guia Gratuito" aponta para a página correta', async ({ page }) => {
    const link = page.locator('.featured-article-cta a');
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'qa-lideranca-ia-era.html');
  });

  test('banner de atenção está visível com CTA', async ({ page }) => {
    const banner = page.locator('.attention-banner');
    await expect(banner).toBeVisible();
    await expect(banner.locator('.banner-cta')).toBeVisible();
  });

  test('footer exibe contatos de Ana e Pablo', async ({ page }) => {
    const footer = page.locator('.footer');
    await expect(footer.getByText('Ana Evelyn')).toBeVisible();
    await expect(footer.getByText('Pablo Andrade')).toBeVisible();
    await expect(footer.getByText(/evelynholanda@gmail\.com/i)).toBeVisible();
  });

  test('CTA "Acesse Meu Conteúdo" redireciona para produtos.html', async ({ page }) => {
    const link = page.locator('.hero-fixed-cta a').first();
    await expect(link).toHaveAttribute('href', 'produtos.html');
  });

});
