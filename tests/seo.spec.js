import { test, expect } from '@playwright/test';

test('SEO metadata updates on language change', async ({ page }) => {
    // 1. Go to homepage (Preview Server)
    await page.goto('http://localhost:4173');

    // 2. Check English Title (Default)
    await expect(page).toHaveTitle(/Online English Academy/);

    // Check English Meta Description
    const metaDescEn = await page.getAttribute('meta[name="description"]', 'content');
    expect(metaDescEn).toContain('Master English with certified native teachers');

    // 3. Switch Language to Spanish
    // Find the language dropdown trigger (Desktop version)
    // The navbar has a section hidden on mobile (hidden xl:flex), we target that
    const desktopNav = page.locator('.xl\\:flex');
    await desktopNav.getByRole('button', { name: 'EN' }).click();

    // Click the "Español" option
    await page.getByRole('button', { name: 'Español' }).click();

    // 4. Verify Spanish Title
    await expect(page).toHaveTitle(/Academia de Inglés Online/);

    // Check Spanish Meta Description
    const metaDescEs = await page.getAttribute('meta[name="description"]', 'content');
    expect(metaDescEs).toContain('Domina el inglés con profesores nativos');

    // 5. Verify Open Graph Tags (Just one as a sample)
    const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
    expect(ogTitle).toContain('Academia de Inglés Online');
});
