import { Page, expect } from "@playwright/test";

export default class Inventory {
    page: Page;
    private sortDropdown = "//select[@data-test='product-sort-container']";
    private productPrice = "//div[@class='inventory_item_price']";
    private productName = "//div[@data-test='inventory-item-name']";
    private addToCartButton = "//button[text()='Add to cart']";
    private shopingCartBtn= "//div[@id='shopping_cart_container']/a";
    private inventoryTitle = "//span[@class='title']";

    constructor(page: Page) {
        this.page = page;
    }
    
    
    private async selectSortOption(value: string) {
        await this.page.waitForSelector(this.sortDropdown, { state: 'visible' });
        await this.page.selectOption(this.sortDropdown, value);
        const selectedValue = await this.page.$eval(this.sortDropdown, (select) => (select as HTMLSelectElement).value);
        expect(selectedValue).toBe(value);
    }


    private async extractItemsFromPage() {
        const itemNames = await this.page.$$eval(this.productName, elements =>
            elements.map(el => el.textContent!.trim())
        );
        const prices = await this.page.$$eval(this.productPrice, elements =>
            elements.map(el => parseFloat(el.textContent!.replace('$', '').trim()))
        );

        return { itemNames, prices };
    }


    private async verifySortedOrder(displayedPrices: number[]) {
        const sortedPrices = [...displayedPrices].sort((a, b) => b - a);
        for (let i = 0; i < displayedPrices.length; i++) {
            if (displayedPrices[i] !== sortedPrices[i]) {
                throw new Error("Sorting does not match the expected order.");
            }
        }
        console.log("Displayed order matches calculated sorted order.");
        expect(displayedPrices).toEqual(sortedPrices);
    }


    public async sortHighToLow() {
        await this.selectSortOption('hilo');
        const { itemNames, prices } = await this.extractItemsFromPage();
        await this.verifySortedOrder(prices);

        console.log("Sorted Items (High to Low):");
        for (let i = 0; i < prices.length; i++) {
            console.log(`${itemNames[i]} - $${prices[i]}`);
        }
    }


    public async addThreeCheapestProductsToCart() {
        let addToCartButtonsCount = await this.page.$$eval(this.addToCartButton, buttons => buttons.length);
        console.log(`Number of Items on the page: ${addToCartButtonsCount}`);
    
        for (let i = 0; i < 3; i++) {
            let clickButton = addToCartButtonsCount - (i + 1);
            const addToCartButtons = await this.page.$$(this.addToCartButton);
            await (addToCartButtons)[clickButton].click();
        }
    }

    public async navigateToShoppingCart() {
        await this.page.click(this.shopingCartBtn);
    }

    public async verifyInventoryPage() {
        await this.page.waitForSelector(this.inventoryTitle); 
        await expect(this.page.locator(this.inventoryTitle)).toHaveText("Products"); 
        console.log("Loaded inventory page successfully.");
    }
    

}
