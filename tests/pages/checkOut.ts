import { Page, expect } from "@playwright/test";

export default class CheckoutPage {
    page: Page;

    private firstNameInput = "//input[@data-test='firstName']";
    private lastNameInput = "//input[@data-test='lastName']";
    private zipCodeInput = "//input[@data-test='postalCode']";
    private continueButton = "//input[@data-test='continue']";

    constructor(page: Page) {
        this.page = page;
    }

    public async fillCheckoutForm(firstName: string, lastName: string, zipCode: string) {
        await this.page.waitForSelector(this.firstNameInput);
        await this.page.fill(this.firstNameInput, firstName);
        await this.page.fill(this.lastNameInput, lastName);
        await this.page.fill(this.zipCodeInput, zipCode);
        await this.page.click(this.continueButton);
    }
}
