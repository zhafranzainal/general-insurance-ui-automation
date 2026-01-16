import type { Page } from '@playwright/test';

export class LoginPage {

    constructor(private page: Page) { }

    async goto() {
        await this.page.goto(process.env.BASE_URL || '');
    }

    async login(username: string, password: string) {
        await this.page.fill('input[formcontrolname="username"]', username);
        await this.page.fill('input[formcontrolname="password"]', password);
        await this.page.click('button:has-text("Login")');
    }

}
