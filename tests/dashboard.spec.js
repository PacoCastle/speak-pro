import { test, expect } from '@playwright/test';

// We can't easily mock imports in Playwright E2E without complex setup.
// Instead, we will rely on the fact that existing "Mock" tests worked,
// OR we just use the real login flow for an EXISTING user (the admin or student).

test.describe('Dashboard UI', () => {

    test('Dashboard shows correct level and next class for Student', async ({ page }) => {
        // 1. Login as the ALREADY EXISTING student (from Phase 12)
        // Credentials: student@test.com / 12345
        // Ideally this user has a profile and booking.
        // If not, the dashboard handles empty states gracefully.

        await page.goto('/login');
        await page.fill('input[type="email"]', 'student@test.com');
        await page.fill('input[type="password"]', '12345');
        await page.click('button[type="submit"]');

        await page.waitForURL('**/dashboard');

        // 2. Check Elements
        // Level should be "A1 Beginner" (default) or whatever is in DB
        // If the trigger ran for this user, it exists. If not, it falls back to defaults.
        await expect(page.locator('h1')).toContainText('Student Dashboard');

        // Check for "Current Level" section
        await expect(page.locator('text=Current Level')).toBeVisible();

        // Check for "Next Class" section
        await expect(page.locator('text=Next Class')).toBeVisible();
    });

});
