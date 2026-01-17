import type { Page, Frame } from '@playwright/test';
import { SideMenu } from '../../../shared/pages/side-menu.page.js';
import { getMicroAppFrame } from '../../../shared/utils/frame-helper.js';
import { FORM_NAMES } from '../data/formNames.js';

import {
    clickButtonInBoxFooter, clickButtonInCard, clickButtonInDialog,
    fillTextField, getInputGroup,
    selectCalendarDate, selectCalendarYear, selectDropdownOption, selectDropdownOptionInTable
} from '../../../shared/utils/form.js';

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
        await selectDropdownOption(this.frame, FORM_NAMES.EDIT_POLICY_INFO, 'Manual Cover Note Used', 'No');
    }

    async fillSalesChannelInfo() {
        this.frame = await getMicroAppFrame(this.page);

        await this.frame.waitForSelector('div[data-form-name="editPolicyInfo"]', { state: 'visible' });

        const salesChannelDropdown = getInputGroup(this.frame, FORM_NAMES.EDIT_POLICY_INFO, 'Primary Sales Channel');

        // Click on the dropdown wrapper
        await salesChannelDropdown.locator('.rb-input-wrapper.rb-tags').click();

        // Wait for dropdown table to appear and select radio button in first row
        const table = this.frame.locator('.rb-table-row');
        await table.first().waitFor({ state: 'visible' });
        await table.getByRole('radio').first().click();
    }

    async fillParticipantInfo() {
        this.frame = await getMicroAppFrame(this.page);

        await clickButtonInCard(this.frame, 'Participant Information', 'Add');

        // Scope to the dialog by title
        const dialog = this.frame
            .locator('.rb-dialog-body-content')
            .filter({ has: this.frame.getByText('Customer Information Detail', { exact: true }) });

        await dialog.waitFor({ state: 'visible' });

        await selectDropdownOption(this.frame, FORM_NAMES.CUSTOMER_MANAGEMENT, 'Customer Sub-Type', 'N/A');
        await selectDropdownOption(this.frame, FORM_NAMES.CUSTOMER_MANAGEMENT, 'ID Type', 'Citizen ID Card (Yellow)');
        await fillTextField(this.frame, FORM_NAMES.CUSTOMER_MANAGEMENT, 'ID No.', '12345');
        await selectDropdownOption(this.frame, FORM_NAMES.CUSTOMER_MANAGEMENT, 'Title', 'Awang');
        await fillTextField(this.frame, FORM_NAMES.CUSTOMER_MANAGEMENT, 'Customer Name', 'Hazim Kacak');

        await selectCalendarDate(this.frame, FORM_NAMES.CUSTOMER_MANAGEMENT, 'Date of Birth', '2000-01-01');

        await selectDropdownOption(this.frame, FORM_NAMES.CUSTOMER_MANAGEMENT, 'Gender', 'Male');
        await fillTextField(this.frame, FORM_NAMES.CUSTOMER_MANAGEMENT, 'Contact No. 1', '60171234567');

        await fillTextField(this.frame, FORM_NAMES.CUSTOMER_MANAGEMENT, 'Contact Person Name', 'Abu Jahal');
        await fillTextField(this.frame, FORM_NAMES.CUSTOMER_MANAGEMENT, 'Contact No', '60123456789');
        await selectDropdownOption(this.frame, FORM_NAMES.CUSTOMER_MANAGEMENT, 'Contact Person ID Type', 'Citizen ID Card (Yellow)');
        await fillTextField(this.frame, FORM_NAMES.CUSTOMER_MANAGEMENT, 'Contact Person ID No', '991012101234');
        await fillTextField(this.frame, FORM_NAMES.CUSTOMER_MANAGEMENT, 'Email', 'test@example.com');
        await selectDropdownOption(this.frame, FORM_NAMES.CUSTOMER_MANAGEMENT, 'Relationship', 'Father');

        const saveButton = this.frame.locator('#openCustomerInfoDetail').getByRole('button', { name: 'Save' });
        await saveButton.waitFor({ state: 'visible' });
        await saveButton.click();
    }

    async fillDriverInfo() {
        this.frame = await getMicroAppFrame(this.page);
        await clickButtonInCard(this.frame, 'Authorised Driver', 'Copy Vehicle Owner');
        await selectDropdownOptionInTable(this.frame, 'Authorised Driver', 'Relationship', 'Self',);
    }

    async fillVehicleInfo() {
        this.frame = await getMicroAppFrame(this.page);
        await fillTextField(this.frame, FORM_NAMES.EDIT_POLICY_AND_ENDO_INFO, 'Vehicle No.', 'BND123');
        await selectCalendarYear(this.frame, FORM_NAMES.EDIT_POLICY_AND_ENDO_INFO, 'Registration Year', 2020);

        await selectDropdownOption(this.frame, FORM_NAMES.EDIT_POLICY_AND_ENDO_INFO, 'Make', 'Audi');
        await selectDropdownOption(this.frame, FORM_NAMES.EDIT_POLICY_AND_ENDO_INFO, 'Model', 'Audi A3 1.2');
        await selectDropdownOption(this.frame, FORM_NAMES.EDIT_POLICY_AND_ENDO_INFO, 'Manufacture Year', '2020');
        await selectDropdownOption(this.frame, FORM_NAMES.EDIT_POLICY_AND_ENDO_INFO, 'Engine Capacity', '1197');
        await selectDropdownOption(this.frame, FORM_NAMES.EDIT_POLICY_AND_ENDO_INFO, 'Battery Capacity', '0');
        await selectDropdownOption(this.frame, FORM_NAMES.EDIT_POLICY_AND_ENDO_INFO, 'Plan Name', 'Motor Private (3P Basic)');
        await selectDropdownOption(this.frame, FORM_NAMES.EDIT_POLICY_AND_ENDO_INFO, 'NCB', '0%');

        await fillTextField(this.frame, FORM_NAMES.EDIT_POLICY_AND_ENDO_INFO, 'Chassis No.', '12345');
        await fillTextField(this.frame, FORM_NAMES.EDIT_POLICY_AND_ENDO_INFO, 'Engine No.', '56789');
        await selectDropdownOption(this.frame, FORM_NAMES.EDIT_POLICY_AND_ENDO_INFO, 'Body Type', 'Sedan');
        await selectDropdownOption(this.frame, FORM_NAMES.EDIT_POLICY_AND_ENDO_INFO, 'Usage', 'Taxi');

    }

    async submitPolicy() {
        this.frame = await getMicroAppFrame(this.page);
        await clickButtonInBoxFooter(this.frame, 'Calculate');
        await clickButtonInBoxFooter(this.frame, 'Buy');
        await clickButtonInDialog(this.frame, 'Generate Quotation Slip', 'OK');
        await clickButtonInBoxFooter(this.frame, 'Issue');
    }

    /** Verify policy creation inside the iframe */
    async verifyPolicyCreated() {
        await this.frame.waitForSelector('text=Policy created successfully', { state: 'visible', timeout: 5000 });
    }

}
