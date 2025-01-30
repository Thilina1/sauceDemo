import { Page, expect } from "@playwright/test";

export default class Cart {
    page: Page;

    private inventoryItemPrices = "//div[@class='inventory_item_price'][@data-test='inventory-item-price']";
    private removeButton = "//button[contains(@data-test, 'remove-sauce-labs')]";  
    private checkoutButton = "//button[@data-test='checkout']";
    private cartTitle = "//span[@data-test='title']";

    constructor(page: Page) {
        this.page = page;
    }

    private async getLowestPriceItemIndex() {
        const prices = await this.page.$$eval(this.inventoryItemPrices, (priceElements) => {
            return priceElements.map(el => parseFloat(el.textContent!.replace('$', '')));
        });

        let lowestPrice = prices[0];
        let lowestPriceIndex = 0;

        for (let i = 1; i < prices.length; i++) {
            if (prices[i] < lowestPrice) {
                lowestPrice = prices[i];
                lowestPriceIndex = i;
            }
        }

        console.log(`Lowest price is $${lowestPrice}, found at index: ${lowestPriceIndex}`);
        return lowestPriceIndex;
    }

    public async removeLowestPriceItem() {
        const lowestPriceIndex = await this.getLowestPriceItemIndex();
        const removeButtons = await this.page.$$(this.removeButton);
        await removeButtons[lowestPriceIndex].click();
        console.log(`Removed item at index ${lowestPriceIndex} from cart.`);
    }

    public async navigateToCheckout() {
        await this.page.click(this.checkoutButton);
        console.log("Navigated to Checkout Page.");
    }

    public async validateCartPage() {
        await expect(this.page.locator(this.cartTitle)).toHaveText("Your Cart");
        console.log("Cart page is loaded Successfully.");
    }

}
