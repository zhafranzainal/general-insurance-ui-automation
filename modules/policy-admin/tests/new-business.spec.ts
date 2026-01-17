import { test } from '../../../shared/tests/base.test.js';
import * as dotenv from 'dotenv';
import { LoginFlow } from '../../../shared/flows/login-flow.js';
import { PolicyAdminPage } from '../pages/policy-admin.page.js';

dotenv.config();

test('Create new policy in Policy Admin', async ({ page }) => {

    const loginFlow = new LoginFlow(page);
    await loginFlow.loginAs(process.env.GIMO_USER || '', process.env.GIMO_PASS || '');

    const policyAdmin = new PolicyAdminPage(page);
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
