// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard Access', () => {

    test('Admin login redirects to Admin Dashboard', async ({ page }) => {
        await page.goto('/login');

        // Fill Admin Credentials (using magic string from AuthContext)
        await page.fill('input[type="email"]', 'admin@speakpro.com');
        await page.fill('input[type="password"]', '12345');
        await page.click('button[type="submit"]');

        // Wait for redirect
        await page.waitForURL('**/admin');

        // precise Admin check
        await expect(page).toHaveURL(/\/admin/);
        await expect(page.locator('h1')).toContainText('Overview');
        await expect(page.getByText('SpeakPro Admin')).toBeVisible();

        // Check Navigation
        await page.click('text=Students');
        await expect(page.locator('h1')).toContainText('Students');
        await expect(page.getByText('Enrolled Students')).toBeVisible();

        await page.click('text=Teachers');
        await expect(page.locator('h1')).toContainText('Teachers');
        await expect(page.getByText('Manage Teachers')).toBeVisible();

        await page.click('text=Bookings');
        await expect(page.locator('h1')).toContainText('Bookings');
        await expect(page.getByText('Placement Test Requests')).toBeVisible();
    });

    test('Regular student login redirects to Student Dashboard', async ({ page }) => {
        await page.goto('/login');

        // Standard User
        await page.fill('input[type="email"]', 'student@test.com');
        await page.fill('input[type="password"]', '12345');
        await page.click('button[type="submit"]');

        await page.waitForURL('**/dashboard');
        await expect(page).toHaveURL(/\/dashboard/);

        // Cannot access Admin
        await page.goto('/admin');
        await expect(page.locator('text=Access Denied')).toBeVisible();
    });

});
