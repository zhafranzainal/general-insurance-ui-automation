import type { Page, Frame } from '@playwright/test';
import { SideMenu } from '../../../shared/pages/side-menu.page.js';
import { getMicroAppFrame } from '../../../shared/utils/frame-helper.js';

export class PolicyAdminPage {

    private sideMenu: SideMenu;
    private frame!: Frame;

    constructor(private page: Page) {
        this.sideMenu = new SideMenu(page);
    }

    async navigateToWorklist() {
        await this.sideMenu.openCertificateAdmin();
        await this.sideMenu.openWorklist();

        this.frame = await getMicroAppFrame(this.page);

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

    async fillPolicyInfo() {
        this.frame = await getMicroAppFrame(this.page);

        await this.frame.waitForSelector('div[data-form-name="editPolicyInfo"]', { state: 'visible' });

        // Locate "Manual Cover Note Used" input group
        const manualCoverNoteUsedDropdown = this.frame
            .locator('div.rb-input-group[data-form-name="editPolicyInfo"]')
            .filter({ has: this.frame.locator('span.rb-input-group-label-text:text("Manual Cover Note Used")') });

        // Click on the dropdown wrapper
        await manualCoverNoteUsedDropdown.locator('.rb-input-wrapper.rb-tags').click();

        // Wait for dropdown options to appear and select "No"
        const optionNo = this.frame.locator('.rb-select-option[title="No"]');
        await optionNo.waitFor({ state: 'visible' });
        await optionNo.click();
    }

    async fillSalesChannelInfo() {
        this.frame = await getMicroAppFrame(this.page);

        await this.frame.waitForSelector('div[data-form-name="editPolicyInfo"]', { state: 'visible' });

        // Locate "Primary Sales Channel" input group
        const salesChannelDropdown = this.frame
            .locator('div.rb-input-group[data-form-name="editPolicyInfo"]')
            .filter({ has: this.frame.locator('span.rb-input-group-label-text:text("Primary Sales Channel")') });

        // Click on the dropdown wrapper
        await salesChannelDropdown.locator('.rb-input-wrapper.rb-tags').click();

        // Wait for dropdown table to appear and select radio button in first row
        const table = this.frame.locator('.rb-table-row');
        await table.first().waitFor({ state: 'visible' });
        await table.getByRole('radio').first().click();
    }

    async fillParticipantInfo() {
        this.frame = await getMicroAppFrame(this.page);

        // Scope to "Participant Information" card
        const participantCard = this.frame
            .locator('.rb-card')
            .filter({ has: this.frame.getByText('Participant Information', { exact: true }) });

        await participantCard.waitFor({ state: 'visible' });

        // Click Add button inside this card only
        const addButton = participantCard.getByRole('button', { name: 'Add' });
        await addButton.waitFor({ state: 'visible' });
        await addButton.click();

        // Scope to the dialog by title
        const dialog = this.frame
            .locator('.rb-dialog-body-content')
            .filter({ has: this.frame.getByText('Customer Information Detail', { exact: true }) });

        await dialog.waitFor({ state: 'visible' });

        // Click Search button inside this dialog
        const searchButton = dialog.getByRole('button', { name: 'Search' });
        await searchButton.waitFor({ state: 'visible' });
        await searchButton.click();
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
