import type { Page } from '@playwright/test';
import { PolicyAdminPage } from '../pages/policy-admin.page.js';
import type { BasePolicyData } from '../../../shared/models/base-policy.js';

export class BasePolicyFlow {

    protected policyAdmin: PolicyAdminPage;

    constructor(protected page: Page) {
        this.policyAdmin = new PolicyAdminPage(page);
    }

    async createProposal() {
        await this.policyAdmin.navigateToWorklist();
        await this.policyAdmin.startNewApplication();
    }

    async fillBasePolicyInfo(data: BasePolicyData) {
        await this.policyAdmin.fillPolicyInfo(data.manualCoverNoteUsed);
        await this.policyAdmin.fillSalesChannelInfo();
        await this.policyAdmin.fillParticipantInfo(data);
    }

    async submitAndVerifyPolicy(): Promise<string> {
        await this.policyAdmin.submitProposal();
        return await this.policyAdmin.verifyPolicyCreated();
    }

}
