import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const widths = [320, 375, 768, 1024, 1440];

test('loads without console messages or failed requests', async ({ page }) => {
  const problems: string[] = [];

  page.on('console', (message) => {
    if (message.type() === 'error' || message.type() === 'warning') {
      problems.push(`console ${message.type()}: ${message.text()}`);
    }
  });
  page.on('pageerror', (error) => problems.push(`page error: ${error.message}`));
  page.on('requestfailed', (request) => problems.push(`request failed: ${request.url()}`));
  page.on('response', (response) => {
    if (response.status() >= 400) problems.push(`${response.status()}: ${response.url()}`);
  });

  await page.goto('/', { waitUntil: 'networkidle' });

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  expect(problems).toEqual([]);
});

for (const width of widths) {
  test(`has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );

    expect(overflow).toBe(0);
  });
}

test('has one h1 and no skipped heading levels', async ({ page }) => {
  await page.goto('/');

  const levels = await page
    .locator('h1, h2, h3, h4, h5, h6')
    .evaluateAll((headings) => headings.map((heading) => Number(heading.tagName[1])));

  expect(levels.filter((level) => level === 1)).toHaveLength(1);
  expect(levels[0]).toBe(1);

  for (let index = 1; index < levels.length; index++) {
    expect(levels[index] - levels[index - 1]).toBeLessThanOrEqual(1);
  }
});

test('every in-page link points at an existing element', async ({ page }) => {
  await page.goto('/');

  const missing = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .map((link) => link.getAttribute('href') ?? '')
        .filter((href) => href.length < 2 || !document.getElementById(href.slice(1))),
    );

  expect(missing).toEqual([]);
});

test('has no accessibility violations', async ({ page }) => {
  // Entrance animations fade text in, which axe would read as low contrast mid-flight.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  const { violations } = await new AxeBuilder({ page }).analyze();

  expect(violations.map((violation) => `${violation.id}: ${violation.help}`)).toEqual([]);
});

test('shows the hero immediately with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  const heading = page.getByRole('heading', { level: 1 });
  const style = await heading.evaluate((element) => {
    const computed = getComputedStyle(element);
    return { animation: computed.animationName, opacity: computed.opacity };
  });

  expect(style).toEqual({ animation: 'none', opacity: '1' });
});

test('every icon referenced in the head resolves', async ({ page, request }) => {
  await page.goto('/');

  const hrefs = await page
    .locator('link[rel~="icon"], link[rel="apple-touch-icon"]')
    .evaluateAll((links) => links.map((link) => (link as HTMLLinkElement).href));

  expect(hrefs).toHaveLength(3);

  for (const href of hrefs) {
    const response = await request.get(href);
    expect(response.status(), href).toBe(200);
  }
});

test('the SVG favicon is outlines only, with no font dependency', async ({ request }) => {
  const svg = await (await request.get('/favicon.svg')).text();

  expect(svg).toContain('<path');
  expect(svg).not.toContain('<text');
  expect(svg).not.toContain('font-family');
});
