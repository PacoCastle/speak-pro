import { test, expect } from '@playwright/test';

test.describe('Student Signup Flow', () => {

    test('New user can sign up and see dashboard', async ({ page }) => {
        // 1. Go to Signup Page
        await page.goto('/signup');
        await expect(page).toHaveTitle(/Sign Up/);

        // 2. Fill Form
        const uniqueEmail = `user${Date.now()}@example.com`;
        await page.fill('input[type="text"]', 'Test Student');
        await page.fill('input[type="email"]', uniqueEmail);
        await page.fill('input[type="password"]', 'password123');

        // 3. Submit
        await page.click('button[type="submit"]');

        // 4. Verify Success or Capture Error
        // 4. Verify Result
        const successMsg = page.locator('text=Check your email!');
        const errorMsg = page.locator('.text-red-600');

        // Wait for either result
        await expect(successMsg.or(errorMsg)).toBeVisible({ timeout: 10000 });

        if (await errorMsg.isVisible()) {
            const err = await errorMsg.textContent();
            console.log('*** SIGNUP UI ERROR ***: ', err);
            throw new Error(`Signup failed in UI: ${err}`);
        }

        await expect(successMsg).toBeVisible();
        await expect(page.locator('text=We\'ve sent a confirmation link')).toBeVisible();
    });

});
