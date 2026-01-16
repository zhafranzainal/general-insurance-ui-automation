import type { Page, Frame } from '@playwright/test';
import { SideMenu } from '../../../shared/pages/side-menu.page.js';

export class PolicyAdminPage {

    private sideMenu: SideMenu;
    private frame!: Frame;

    constructor(private page: Page) {
        this.sideMenu = new SideMenu(page);
    }

    async navigateToWorklist() {
        await this.sideMenu.openCertificateAdmin();
        await this.sideMenu.openWorklist();

        // Wait for iframe to appear and get frame handle
        const iframeElement = await this.page.locator('#micro-app-iframe').elementHandle();
        if (!iframeElement) throw new Error('Micro app iframe not found!');
        this.frame = await iframeElement.contentFrame() as Frame;
        if (!this.frame) throw new Error('Failed to get contentFrame from iframe');

        // Wait for "New Application" button inside iframe
        await this.frame.getByRole('button', { name: 'New Application' }).waitFor();
    }

    async startNewApplication() {
        await this.frame.getByRole('button', { name: 'New Application' }).click();

        // Wait for dialog to appear
        const dialog = this.frame.locator('div.rb-dialog-body-content:has-text("New Application")');
        await dialog.waitFor({ state: 'visible' });

        // Locate "Product Code" cell inside dialog table
        const mpCell = dialog.getByRole('cell', { name: 'MP', exact: true });
        await mpCell.waitFor({ state: 'visible' });

        // Get the parent row of that cell
        const targetRow = mpCell.locator('xpath=ancestor::tr');

        // Click the "New Application" action button in that row
        await targetRow.locator('button.rb-btn-type-link.rb-icon-btn').click();
    }

    async fillPolicyForm(policyData: { productCode: string; sumInsured: number }) {
        await this.frame.fill('input[formcontrolname="productCode"]', policyData.productCode);
        await this.frame.fill('input[formcontrolname="sumInsured"]', policyData.sumInsured.toString());

        // TODO: fill remaining mandatory fields inside iframe
    }

    /** Submit policy inside the iframe */
    async submitPolicy() {
        await this.frame.click('button:has-text("Submit")');
    }

    /** Verify policy creation inside the iframe */
    async verifyPolicyCreated() {
        await this.frame.waitForSelector('text=Policy created successfully', { state: 'visible', timeout: 5000 });
    }

}
