import { BasePage } from "../page-objects/base/BasePage";
import {expect, Page} from "@playwright/test";

const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/';

export class LoginPage extends BasePage {

    get usernameInput() { return this.page.getByPlaceholder("Username"); }
    get passwordInput() { return this.page.getByPlaceholder("Password"); }
    get loginBtn()      { return this.page.getByRole("button", { name: "Login" }); }
    get errorMsg()      { return this.page.locator(".oxd-alert-content-text"); }

    public async navigateToLoginPage(): Promise<void> {
        await this.navigate(url + 'auth/login');
    }
    
    public async fillUsername(username: string): Promise<void> {
        // await this.page.getByPlaceholder('Username').fill(username);
        await this.usernameInput.fill(username);
    }

    public async fillPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    public async clickLoginButton(): Promise<void> {
        await this.loginBtn.click();
    }

    public async directToDashboard(): Promise<void> {
        await this.page.waitForURL(url + 'dashboard/index', { timeout: 10000 });
    }

    public async errorMessage(): Promise<void> {
        await expect(this.errorMsg).toBeVisible();
        await expect(this.errorMsg).toHaveText('Invalid credentials');
    }

    
}