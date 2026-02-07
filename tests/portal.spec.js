import { test, expect } from '@playwright/test';

test.describe('Student Portal Flow', () => {

    test.skip('User can login and see dashboard', async ({ page }) => {
        // 1. Go to Home (using preview/dev server URL from config or hardcoded)
        await page.goto('/');

        // 2. Click Student Login
        await page.getByRole('link', { name: 'Student Login' }).first().click();

        // 3. Should be on /login
        await expect(page).toHaveURL(/.*\/login/);
        await expect(page.getByText('Welcome Back')).toBeVisible();

        // 4. Fill credentials (mock)
        await page.fill('input[type="email"]', 'test@student.com');
        await page.fill('input[type="password"]', 'password123');
        await page.click('button[type="submit"]');

        // 5. Should be redirected to /dashboard
        await expect(page).toHaveURL(/.*\/dashboard/);
        await expect(page.getByText('Student Dashboard')).toBeVisible();
        await expect(page.getByText('test@student.com')).toBeVisible();

        // 6. Check Dashboard content
        await expect(page.getByText('Current Level')).toBeVisible();

        // 7. Logout
        await page.getByRole('button', { name: 'Sign Out' }).click();

        // 8. Should be back home (or redirected to login if protected)
        await expect(page).toHaveURL(/.*\/login/);
        // And "Student Login" should appear again instead of "Dashboard"
        await expect(page.getByRole('link', { name: 'Student Login' }).first()).toBeVisible();
    });

    test('Protected route redirects to login', async ({ page }) => {
        await page.goto('/dashboard');
        // Should be redirected to login
        await expect(page).toHaveURL(/.*\/login/);
    });

});
