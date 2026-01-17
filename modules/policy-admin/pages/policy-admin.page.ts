import type { Page, Frame } from '@playwright/test';
import { SideMenu } from '../../../shared/pages/side-menu.page.js';
import { getMicroAppFrame } from '../../../shared/utils/frame-helper.js';
import { FORM_NAMES } from '../data/formNames.js';

import {
    clickButtonInBoxFooter, clickButtonInCard, clickButtonInDialog,
    fillTextField, fillTextFieldInDialog, getInputGroup,
    selectCalendarDate, selectCalendarYear, selectDropdownOption, selectDropdownOptionInTable
} from '../../../shared/utils/form.js';

import type { BasePolicyData } from '../../../shared/models/base-policy.js';
import type { MotorPrivateData } from '../../../shared/models/motor-private.js';

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

    async fillPolicyInfo(manualCoverNoteUsed: string) {
        this.frame = await getMicroAppFrame(this.page);
        await this.frame.waitForSelector('div[data-form-name="editPolicyInfo"]', { state: 'visible' });
        await selectDropdownOption(this.frame, FORM_NAMES.EDIT_POLICY_INFO, 'Manual Cover Note Used', manualCoverNoteUsed);
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

    async fillParticipantInfo(data: BasePolicyData) {
        this.frame = await getMicroAppFrame(this.page);

        await clickButtonInCard(this.frame, 'Participant Information', 'Add');

        // Scope to the dialog by title
        const dialog = this.frame
            .locator('.rb-dialog-body-content')
            .filter({ has: this.frame.getByText('Customer Information Detail', { exact: true }) });

        await dialog.waitFor({ state: 'visible' });

        const { participant, contactPerson } = data;

        await selectDropdownOption(this.frame, FORM_NAMES.CUSTOMER_MANAGEMENT, 'Customer Sub-Type', participant.customerSubType);
        await selectDropdownOption(this.frame, FORM_NAMES.CUSTOMER_MANAGEMENT, 'ID Type', participant.idType);
        await fillTextField(this.frame, FORM_NAMES.CUSTOMER_MANAGEMENT, 'ID No.', participant.idNo);
        await selectDropdownOption(this.frame, FORM_NAMES.CUSTOMER_MANAGEMENT, 'Title', participant.title);
        await fillTextField(this.frame, FORM_NAMES.CUSTOMER_MANAGEMENT, 'Customer Name', participant.name);
        await selectCalendarDate(this.frame, FORM_NAMES.CUSTOMER_MANAGEMENT, 'Date of Birth', participant.dob);
        await selectDropdownOption(this.frame, FORM_NAMES.CUSTOMER_MANAGEMENT, 'Gender', participant.gender);
        await fillTextField(this.frame, FORM_NAMES.CUSTOMER_MANAGEMENT, 'Contact No. 1', participant.contactNo);

        await fillTextField(this.frame, FORM_NAMES.CUSTOMER_MANAGEMENT, 'Contact Person Name', contactPerson.name);
        await fillTextField(this.frame, FORM_NAMES.CUSTOMER_MANAGEMENT, 'Contact No', contactPerson.contactNo);
        await selectDropdownOption(this.frame, FORM_NAMES.CUSTOMER_MANAGEMENT, 'Contact Person ID Type', contactPerson.idType);
        await fillTextField(this.frame, FORM_NAMES.CUSTOMER_MANAGEMENT, 'Contact Person ID No', contactPerson.idNo);
        await fillTextField(this.frame, FORM_NAMES.CUSTOMER_MANAGEMENT, 'Email', contactPerson.email);
        await selectDropdownOption(this.frame, FORM_NAMES.CUSTOMER_MANAGEMENT, 'Relationship', contactPerson.relationship);

        const saveButton = this.frame.locator('#openCustomerInfoDetail').getByRole('button', { name: 'Save' });
        await saveButton.waitFor({ state: 'visible' });
        await saveButton.click();
    }

    async fillDriverInfo(relationship: string) {
        this.frame = await getMicroAppFrame(this.page);
        await clickButtonInCard(this.frame, 'Authorised Driver', 'Copy Vehicle Owner');
        await selectDropdownOptionInTable(this.frame, 'Authorised Driver', 'Relationship', relationship);
    }

    async fillVehicleInfo(data: MotorPrivateData) {

        this.frame = await getMicroAppFrame(this.page);

        const { vehicle, cover } = data;

        await fillTextField(this.frame, FORM_NAMES.EDIT_POLICY_AND_ENDO_INFO, 'Vehicle No.', vehicle.vehicleNo);
        await selectCalendarYear(this.frame, FORM_NAMES.EDIT_POLICY_AND_ENDO_INFO, 'Registration Year', vehicle.registrationYear);

        await selectDropdownOption(this.frame, FORM_NAMES.EDIT_POLICY_AND_ENDO_INFO, 'Make', vehicle.make);
        await selectDropdownOption(this.frame, FORM_NAMES.EDIT_POLICY_AND_ENDO_INFO, 'Model', vehicle.model);
        await selectDropdownOption(this.frame, FORM_NAMES.EDIT_POLICY_AND_ENDO_INFO, 'Manufacture Year', vehicle.manufactureYear);
        await selectDropdownOption(this.frame, FORM_NAMES.EDIT_POLICY_AND_ENDO_INFO, 'Engine Capacity', vehicle.engineCapacity);
        await selectDropdownOption(this.frame, FORM_NAMES.EDIT_POLICY_AND_ENDO_INFO, 'Battery Capacity', vehicle.batteryCapacity);
        await selectDropdownOption(this.frame, FORM_NAMES.EDIT_POLICY_AND_ENDO_INFO, 'Plan Name', cover.planName);
        await selectDropdownOption(this.frame, FORM_NAMES.EDIT_POLICY_AND_ENDO_INFO, 'NCB', cover.noClaimBonus);

        await fillTextField(this.frame, FORM_NAMES.EDIT_POLICY_AND_ENDO_INFO, 'Chassis No.', vehicle.chassisNo);
        await fillTextField(this.frame, FORM_NAMES.EDIT_POLICY_AND_ENDO_INFO, 'Engine No.', vehicle.engineNo);
        await selectDropdownOption(this.frame, FORM_NAMES.EDIT_POLICY_AND_ENDO_INFO, 'Body Type', vehicle.bodyType);
        await selectDropdownOption(this.frame, FORM_NAMES.EDIT_POLICY_AND_ENDO_INFO, 'Usage', vehicle.usage);

    }

    async submitProposal() {
        this.frame = await getMicroAppFrame(this.page);
        await clickButtonInBoxFooter(this.frame, 'Calculate');
        await clickButtonInBoxFooter(this.frame, 'Buy');
        await fillTextFieldInDialog(this.frame, 'Generate Quotation Slip', 'Email', 'test@example.com');
        await clickButtonInDialog(this.frame, 'Generate Quotation Slip', 'OK');
        await clickButtonInBoxFooter(this.frame, 'Issue');
    }

    async verifyPolicyCreated(): Promise<string> {
        this.frame = await getMicroAppFrame(this.page);

        // Locate dialog
        const dialog = this.frame.locator('div.rb-dialog-body:has(h4.rb-dialog-title:text-is("Issued"))');
        await dialog.waitFor({ state: 'visible' });

        // Verify success message
        const message = dialog.locator('.rb-dialog-content');
        await message.waitFor({ state: 'visible' });

        const messageText = (await message.innerText()).trim();
        if (!messageText.includes('Issue successfully!')) {
            throw new Error(`Unexpected dialog message: ${messageText}`);
        }

        // Extract certificate number
        const certMatch = messageText.match(/Certificate No\.\s*:\s*(\S+)/);
        if (!certMatch || !certMatch[1]) {
            throw new Error('Certificate number not found in success message');
        }

        const certificateNo: string = certMatch[1];

        // Verify buttons exist
        await dialog.locator('button:has-text("Return to Home Page")').waitFor({ state: 'visible' });
        await dialog.locator('button:has-text("View Certificate")').waitFor({ state: 'visible' });

        return certificateNo;
    }

}
