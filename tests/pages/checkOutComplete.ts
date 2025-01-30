import { Page, expect } from "@playwright/test";

export default class CheckoutComplete {
    page: Page;

    private completeOrderText = "//h2[@class='complete-header']";


    constructor(page: Page) {
        this.page = page;
    }

    public async verifyCheckoutComplete() {
        await this.page.waitForSelector(this.completeOrderText);
        await expect(this.page.locator(this.completeOrderText)).toHaveText("Thank you for your order!");
        console.log("Order completed successfully!");
    }
}
