import { test, expect } from '../../../shared/tests/base.test.js';
import * as dotenv from 'dotenv';
import { LoginFlow } from '../../../shared/flows/login-flow.js';

dotenv.config();

test('Login to InsureMO Sandbox', async ({ page }) => {
    const loginFlow = new LoginFlow(page);
    await loginFlow.loginAs(process.env.GIMO_USER || '', process.env.GIMO_PASS || '');
    await expect(page).toHaveURL(process.env.BASE_URL + '#/');
});
