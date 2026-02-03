import { test, expect } from '@playwright/test';

test.describe('Student Signup Flow', () => {

    test('New user can sign up and see dashboard', async ({ page }) => {
        // 1. Go to Signup Page
        await page.goto('/signup');
        await expect(page).toHaveTitle(/Sign Up/);

        // 2. Fill Form
        const uniqueEmail = `test.student.${Date.now()}@example.com`;
        await page.fill('input[type="text"]', 'Test Student');
        await page.fill('input[type="email"]', uniqueEmail);
        await page.fill('input[type="password"]', 'password123');

        // 3. Submit
        await page.click('button[type="submit"]');

        // 4. Verify Success or Capture Error
        // Check if error displayed
        if (await page.locator('.text-red-600').isVisible()) {
            const err = await page.locator('.text-red-600').textContent();
            console.log('*** SIGNUP UI ERROR ***: ', err);
            throw new Error(`Signup failed in UI: ${err}`);
        }

        // 4. Verify Success Message (Email Confirmation)
        // Since Email Confirmation is ON, we expect to see the "Check your email" screen
        // instead of a redirect to the dashboard.
        try {
            await expect(page.locator('text=Check your email!')).toBeVisible({ timeout: 5000 });
            await expect(page.locator('text=We\'ve sent a confirmation link')).toBeVisible();
        } catch (e) {
            console.log('*** TEST FAILED. PAGE CONTENT: ***');
            console.log(await page.locator('body').innerText());
            throw e;
        }
    });

});
