import { Page, expect } from "@playwright/test";

export default class CheckoutTwoPage {
    page: Page;

    private finishButton = "//button[@id='finish']";

    constructor(page: Page) {
        this.page = page;
    }

    public async finishCheckOut() {
        await this.page.waitForSelector(this.finishButton);
        await this.page.click(this.finishButton);
    }
}
