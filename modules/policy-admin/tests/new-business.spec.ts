import { test } from '../../../shared/tests/base.test.js';
import * as dotenv from 'dotenv';
import { LoginFlow } from '../../../shared/flows/login-flow.js';
import { MotorPrivatePolicyFlow } from '../flows/motor-private-policy-flow.js';

dotenv.config();

test('Create new policy in Policy Admin', async ({ page }) => {

    const loginFlow = new LoginFlow(page);
    await loginFlow.loginAs(process.env.GIMO_USER || '', process.env.GIMO_PASS || '');

    const motorPrivatePolicyFlow = new MotorPrivatePolicyFlow(page);
    const certificateNo = await motorPrivatePolicyFlow.execute();
    console.log('Issued certificate no:', certificateNo);

});
