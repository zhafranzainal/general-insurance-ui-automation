import { test, expect } from '../../../shared/tests/base.test.js';
import * as dotenv from 'dotenv';
import { LoginPage } from '../../../shared/pages/login.page.js';
import { PolicyAdminPage } from '../pages/policy-admin.page.js';

dotenv.config();

test('Create new policy in Policy Admin', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const policyAdmin = new PolicyAdminPage(page);

    // login
    await loginPage.goto();
    await loginPage.login(process.env.GIMO_USER || '', process.env.GIMO_PASS || '');

    await policyAdmin.navigateToWorklist();
    await policyAdmin.startNewApplication();

    // fill policy form
    await policyAdmin.fillPolicyForm({
        productCode: 'PA001',
        sumInsured: 100000,
        // add other fields here
    });

    // submit
    await policyAdmin.submitPolicy();

    // verify success
    await policyAdmin.verifyPolicyCreated();

});
