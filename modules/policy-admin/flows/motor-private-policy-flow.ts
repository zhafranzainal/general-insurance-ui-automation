import { BasePolicyFlow } from './base-policy-flow.js';
import { createBasePolicyData } from '../data/base-policy.factory.js';
import { createMotorPrivateData } from '../data/motor-private.factory.js';

export class MotorPrivatePolicyFlow extends BasePolicyFlow {

    async execute(): Promise<string> {

        const basePolicyData = createBasePolicyData();
        const motorPrivateData = createMotorPrivateData();

        await this.createProposal();
        await this.fillBasePolicyInfo(basePolicyData);

        await this.policyAdmin.fillDriverInfo(motorPrivateData.driver.relationship);
        await this.policyAdmin.fillVehicleInfo(motorPrivateData);

        return await this.submitAndVerifyPolicy();

    }

}
