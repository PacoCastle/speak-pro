import { test, expect } from '@playwright/test';

test.describe('Debug Admin Access', () => {
    test('Check what student sees on /admin', async ({ page }) => {
        await page.goto('/login');
        await page.fill('input[type="email"]', 'student@test.com');
        await page.fill('input[type="password"]', '12345');
        await page.click('button[type="submit"]');
        await page.waitForURL('**/dashboard');

        console.log("Logged in. Navigating to /admin...");
        await page.goto('/admin');
        await page.waitForLoadState('networkidle');

        const title = await page.title();
        console.log(`Page Title: ${title}`);

        const h1 = await page.locator('h1').innerText(); // Get H1 text
        console.log(`H1 Text: ${h1}`);

        if (h1.includes('Overview')) {
            console.log("!!! FAILURE: Student sees Admin Dashboard !!!");
        } else if (h1.includes('Access Denied')) {
            console.log("SUCCESS: Student sees Access Denied");
        } else {
            console.log("UNKNOWN STATE");
            console.log(await page.innerText('body'));
        }
    });
});
