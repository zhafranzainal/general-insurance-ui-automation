import { BasePolicyFlow } from './base-policy-flow.js';

export class MotorPrivatePolicyFlow extends BasePolicyFlow {

    async fillProductSpecificInfo() {
        await this.policyAdmin.fillDriverInfo();
        await this.policyAdmin.fillVehicleInfo();
    }

    async execute(): Promise<string> {
        await this.createProposal();
        await this.fillBasePolicyInfo();
        await this.fillProductSpecificInfo();
        return await this.submitAndVerifyPolicy();
    }

}
