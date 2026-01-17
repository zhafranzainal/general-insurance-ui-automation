import type { Page } from '@playwright/test';
import { PolicyAdminPage } from '../pages/policy-admin.page.js';

export class BasePolicyFlow {

    protected policyAdmin: PolicyAdminPage;

    constructor(protected page: Page) {
        this.policyAdmin = new PolicyAdminPage(page);
    }

    async createProposal() {
        await this.policyAdmin.navigateToWorklist();
        await this.policyAdmin.startNewApplication();
    }

    async fillBasePolicyInfo() {
        await this.policyAdmin.fillPolicyInfo();
        await this.policyAdmin.fillSalesChannelInfo();
        await this.policyAdmin.fillParticipantInfo();
    }

    async submitAndVerifyPolicy() {
        await this.policyAdmin.submitProposal();
        return await this.policyAdmin.verifyPolicyCreated();
    }

}
