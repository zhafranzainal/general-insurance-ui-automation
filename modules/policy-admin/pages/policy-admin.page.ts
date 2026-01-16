import type { Page, Frame } from '@playwright/test';
import { SideMenu } from '../../../shared/pages/side-menu.page.js';
import { getMicroAppFrame } from '../../../shared/utils/frame-helper.js';
import { getInputGroup, selectDropdownOption } from '../../../shared/utils/dropdown.js';

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

        const manualCoverNoteUsedDropdown = getInputGroup(this.frame, 'editPolicyInfo', 'Manual Cover Note Used');
        await selectDropdownOption(this.frame, manualCoverNoteUsedDropdown, 'No');
    }

    async fillSalesChannelInfo() {
        this.frame = await getMicroAppFrame(this.page);

        await this.frame.waitForSelector('div[data-form-name="editPolicyInfo"]', { state: 'visible' });

        const salesChannelDropdown = getInputGroup(this.frame, 'editPolicyInfo', 'Primary Sales Channel');

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

        const customerSubTypeDropdown = getInputGroup(this.frame, 'CustomerManagement', 'Customer Sub-Type');
        await selectDropdownOption(this.frame, customerSubTypeDropdown, 'N/A');

        const customerNameTextField = getInputGroup(this.frame, 'CustomerManagement', 'Customer Name');

        // Fill in input field
        const customerNameInput = customerNameTextField.locator('input.rb-input');
        await customerNameInput.waitFor({ state: 'visible' });
        await customerNameInput.fill('Hazim Kacak');

        // Locate Date of Birth input group within dialog
        const dobDateInput = getInputGroup(this.frame, 'CustomerManagement', 'Date of Birth');
        await dobDateInput.waitFor({ state: 'visible' });
        await dobDateInput.click();

        // Ensure only if calendar popup is already visible
        const calendarPopup = this.frame.locator('.rb-popup.rb-picker-popup:not(.rb-popup-hide)');
        await calendarPopup.waitFor({ state: 'visible' });

        // Locate the year button
        const yearButton = calendarPopup.locator('.rb-picker-header-view button').nth(1);
        await yearButton.click();

        const prevYearButton = calendarPopup.locator('.rainbow.DoubleArrowLeft16-1');
        await prevYearButton.click();
        await prevYearButton.click();

        const year = calendarPopup.locator('.rb-picker-cell[title="2000"]');
        await year.waitFor({ state: 'visible' });
        await year.click();

        await calendarPopup.locator('.rb-picker-cell[title="2000-01-01"]').click();

        const saveButton = this.frame.locator('#openCustomerInfoDetail').getByRole('button', { name: 'Save' });
        await saveButton.waitFor({ state: 'visible' });
        await saveButton.click();
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
