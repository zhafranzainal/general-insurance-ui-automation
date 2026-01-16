import type { Page } from '@playwright/test';

export class SideMenu {

    constructor(private page: Page) { }

    // Certificate Admin

    async openCertificateAdmin() {
        await this.page.locator('span[title="Certificate Admin"]').click();
    }

    async openWorklist() {
        await this.page.locator('span[title="Worklist"]').click();
    }

    async openCertificateQuery() {
        await this.page.locator('span[title="Certificate Query"]').click();
    }

}
