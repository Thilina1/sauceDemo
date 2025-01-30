import { Page, expect } from "@playwright/test";

export default class LoginPage {
    page: Page;

    private passwordInput = "input[data-test='password']";
    private userNameInput = "input[data-test='username']";
    private loginButton = "input[data-test='login-button']";
    private LoginPagetitle = "div.login_logo";

    constructor(page: Page) {
        this.page = page;
    }

    private async enterUserName(userName: string) {
        await this.page.fill(this.userNameInput, userName);
    }

    private async enterPassword(password: string) {
        await this.page.fill(this.passwordInput, password);
    }

    private async clickLoginButton() {
        await this.page.click(this.loginButton);
    }

    public async validateLoginPage() {
        await expect(this.page.locator(this.LoginPagetitle)).toBeVisible({ timeout: 5000 });
        console.log("Login page is loaded.");
    }

    public async login(userName: string, password: string) {
        await this.enterUserName(userName);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }
}
