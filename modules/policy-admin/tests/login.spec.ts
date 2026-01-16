import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

test('Login to InsureMO Sandbox', async ({ page }) => {
    await page.goto(process.env.BASE_URL || '');

    await page.fill('input[formcontrolname="username"]', process.env.GIMO_USER || '');
    await page.fill('input[formcontrolname="password"]', process.env.GIMO_PASS || '');
    await page.click('button:has-text("Login")');

    await expect(page).toHaveURL(process.env.BASE_URL + '#/');
});
