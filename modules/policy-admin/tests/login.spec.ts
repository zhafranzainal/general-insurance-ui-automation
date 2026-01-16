import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { LoginPage } from '../../../shared/pages/login.page.js';

dotenv.config();

test('Login to InsureMO Sandbox', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(process.env.GIMO_USER || '', process.env.GIMO_PASS || '');

    await expect(page).toHaveURL(process.env.BASE_URL + '#/');
});
