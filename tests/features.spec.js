// @ts-check
import { test, expect } from '@playwright/test';

test.describe('SpeakPro MVP Features', () => {

    test.beforeEach(async ({ page }) => {
        // Assuming local server is running on 5173 (standard Vite)
        // If not running, you need to run `npm run dev` first.
        await page.goto('/');
    });

    test('Homepage loads with correct metadata', async ({ page }) => {
        await expect(page).toHaveTitle(/SpeakPro/);
        await expect(page.locator('h1')).toContainText('English for Everyone');
    });

    test('Teachers section loads dynamic data', async ({ page }) => {
        // Scroll to section
        const teachersSection = page.locator('#teachers');
        await teachersSection.scrollIntoViewIfNeeded();

        // Check for specific dynamic data we added
        await expect(page.getByText('Sarah Jenkins')).toBeVisible();
        await expect(page.getByText('5 Years')).toBeVisible();
    });

    test('Placement Test Booking Flow (Adults)', async ({ page }) => {
        // Handle Alerts (e.g., Supabase Errors)
        page.on('dialog', async dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept();
        });

        // Scroll to test section
        const testSection = page.locator('#test');
        await testSection.scrollIntoViewIfNeeded();

        // Click "Book Now" for Adults
        await page.getByText('Book Now').first().click();

        // Modal should appear
        const modal = page.locator('.fixed.inset-0.z-\\[100\\]');
        await expect(modal).toBeVisible();
        await expect(modal).toContainText('Book Placement Test');
        await expect(modal).toContainText('for Adults');

        // Fill Form
        await page.fill('input[type="text"]', 'E2E Test User');
        await page.fill('input[type="email"]', 'test@example.com');
        await page.fill('input[type="date"]', '2024-05-20');
        await page.selectOption('select', 'Morning');

        // Submit
        await page.click('button[type="submit"]');

        // Check Success State
        await expect(page.getByText('Booking Confirmed!')).toBeVisible();

        // Close
        await page.getByText('Done').click();
        await expect(modal).not.toBeVisible();
    });

});
