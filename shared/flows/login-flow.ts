import type { Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';

export class LoginFlow {

    constructor(private page: Page) { }

    async loginAs(username: string, password: string) {
        const loginPage = new LoginPage(this.page);
        await loginPage.goto();
        await loginPage.login(username, password);
    }

}
