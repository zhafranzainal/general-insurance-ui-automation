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

    // certificate information
    await policyAdmin.fillPolicyInfo();
    await policyAdmin.fillSalesChannelInfo();
    await policyAdmin.fillParticipantInfo();
    await policyAdmin.fillDriverInfo();
    await policyAdmin.fillVehicleInfo();
    await policyAdmin.submitPolicy();

    const certNo = await policyAdmin.verifyPolicyCreated();
    console.log('Issued certificate no:', certNo);

});
