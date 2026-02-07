// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Dashboard UI', () => {

    test('Dashboard shows correct level and next class for Student', async ({ page }) => {
        // Mock Supabase Auth Token Request (Login)
        await page.route('**/auth/v1/token*', async route => {
            const json = {
                access_token: "mock-access-token-student",
                token_type: "bearer",
                expires_in: 3600,
                refresh_token: "mock-refresh-token",
                user: {
                    id: "student-user-id",
                    aud: "authenticated",
                    role: "authenticated",
                    email: "student@test.com",
                    email_confirmed_at: new Date().toISOString(),
                    user_metadata: {
                        full_name: "Test Student"
                    }
                }
            };
            await route.fulfill({ json });
        });

        // Mock Session Get (initially null or unauthorized if checking session before login)
        await page.route('**/auth/v1/user', async route => {
            await route.fulfill({ status: 401, json: { error: "unauthorized" } });
        });

        // Mock Data Fetching for Student Profile
        await page.route('**/rest/v1/profiles*', async route => {
            // Check if it's a select query for the specific user
            await route.fulfill({
                json: {
                    id: 'student-user-id',
                    email: 'student@test.com',
                    full_name: 'Test Student',
                    level: 'A1 Beginner',
                    progress: 10,
                    created_at: new Date().toISOString()
                }
            });
        });

        // Mock Bookings
        await page.route('**/rest/v1/bookings*', async route => {
            await route.fulfill({ json: [] });
        });

        // 1. Go to Login
        await page.goto('/login');

        // 2. Fill Credentials
        await page.fill('input[type="email"]', 'student@test.com');
        await page.fill('input[type="password"]', '12345');
        await page.click('button[type="submit"]');

        // 3. Wait for redirect
        await page.waitForURL('**/dashboard');

        // 4. Check Elements
        await expect(page.locator('h1')).toContainText('Student Dashboard');

        // Check for "Current Level" section with mocked data
        // The dashboard likely displays "A1 Beginner" if that's what we mocked
        await expect(page.getByText('Current Level')).toBeVisible();
        await expect(page.getByText('A1 Beginner')).toBeVisible();
        await expect(page.getByText('10%')).toBeVisible(); // Progress

        // Check for "Next Class" section
        await expect(page.getByText('Next Class')).toBeVisible();
    });

});
