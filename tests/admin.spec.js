// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard Access', () => {

    test('Admin login redirects to Admin Dashboard', async ({ page }) => {
        // Mock Supabase Auth Token Request (Login)
        await page.route('**/auth/v1/token*', async route => {
            const json = {
                access_token: "mock-access-token",
                token_type: "bearer",
                expires_in: 3600,
                refresh_token: "mock-refresh-token",
                user: {
                    id: "admin-user-id",
                    aud: "authenticated",
                    role: "authenticated",
                    email: "admin@speakpro.com",
                    email_confirmed_at: new Date().toISOString(),
                    placeholders: {
                        is_admin: true // Custom claim if needed, but we check email
                    }
                }
            };
            await route.fulfill({ json });
        });

        // Mock Session Get (for initial load if needed, usually just null)
        await page.route('**/auth/v1/user', async route => {
            // Return null user initially
            await route.fulfill({ status: 401, json: { error: "unauthorized" } });
        });

        // Mock Data Fetching for Dashboard
        await page.route('**/rest/v1/profiles*', async route => {
            await route.fulfill({ json: [{ id: '1', email: 'student@test.com', full_name: 'Test Student', level: 'A1', progress: 0, created_at: new Date().toISOString() }] });
        });

        await page.route('**/rest/v1/teachers*', async route => {
            await route.fulfill({ json: [{ id: 1, name: 'Sarah', role_key: 'senior', bio_key: 'bio', image_url: 'url', is_visible: true, is_deleted: false }] });
        });

        await page.route('**/rest/v1/bookings*', async route => {
            await route.fulfill({ json: [] });
        });

        await page.goto('/login');

        // Fill Admin Credentials
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

    test.skip('Regular student login redirects to Student Dashboard', async ({ page }) => {
        await page.goto('/login');

        // Standard User
        await page.fill('input[type="email"]', 'student@test.com');
        await page.fill('input[type="password"]', '12345');
        await page.click('button[type="submit"]');

        await page.waitForURL('**/dashboard');
        await expect(page).toHaveURL(/\/dashboard/);

        // Cannot access Admin
        await page.goto('/admin');
        await expect(page.getByText('Access Denied')).toBeVisible({ timeout: 5000 });
    });

});
