import { test, expect } from '@playwright/test';
import UserLogins from './testData/userLogins.json';
import UserInputs from './testData/userInputs.json';
import LoginPage from './pages/loginPage';
import InventoryPage from './pages/inventory';
import CartPage from './pages/cart';
import CheckoutPage from './pages/checkOut';
import CheckoutTwoPage from './pages/checkOutTwo';
import verifyOrderCompletion from './pages/checkOutComplete';

test.describe('SourceDemo Tests', () => {  

  let LOGIN_PAGE: LoginPage;
  let INVENTORY_PAGE: InventoryPage;
  let CART_PAGE: CartPage;
  let CHECK_OUT_PAGE: CheckoutPage;
  let CHECK_OUT_TWO_PAGE: CheckoutTwoPage;
  let VERIFY_ORDER_COMPLETION: verifyOrderCompletion;

  test.beforeAll(async ({ page }) => {
    await page.goto(UserLogins.saucedemo.LoginCredentials.LoginURL);    
    LOGIN_PAGE = new LoginPage(page);
    INVENTORY_PAGE = new InventoryPage(page);
    CART_PAGE = new CartPage(page);
    CHECK_OUT_PAGE = new CheckoutPage(page);
    CHECK_OUT_TWO_PAGE = new CheckoutTwoPage(page);
    VERIFY_ORDER_COMPLETION = new verifyOrderCompletion(page);
  });

  test('01 | Load SauceDemo website and validate login page', async () => {
    await LOGIN_PAGE.validateLoginPage();
  });

  test('02 | Log in as a standard user.', async () => {
    await LOGIN_PAGE.login(
      UserLogins.saucedemo.LoginCredentials.StandardUser.userName,
      UserLogins.saucedemo.LoginCredentials.StandardUser.password
    );
    await INVENTORY_PAGE.verifyInventoryPage();
  });

  test('03 | Sort the products by Price (high to low).', async () => {
    await INVENTORY_PAGE.sortHighToLow();
  });

  test('04 | Add the three cheapest products to your basket from UI.', async() => {
    await INVENTORY_PAGE.addThreeCheapestProductsToCart();
  })

  test('05 | Open the basket.', async () => {
    await INVENTORY_PAGE.navigateToShoppingCart();
    await CART_PAGE.validateCartPage();
  });

  test("06 | Remove the cheapest product from your basket.", async () => {
    await CART_PAGE.removeLowestPriceItem()
  })

  test("07 | Submit First name, Last name and postal code and complete purchase.", async () => {
    await CART_PAGE.navigateToCheckout();
    await CHECK_OUT_PAGE.fillCheckoutForm(UserInputs.saucedemo.UserInputs.firstName, 
                                          UserInputs.saucedemo.UserInputs.lastName, 
                                          UserInputs.saucedemo.UserInputs.postalCode);
    await CHECK_OUT_TWO_PAGE.finishCheckOut();
  })

  test('08 | Verify the order completion.', async () => {
    await VERIFY_ORDER_COMPLETION.verifyCheckoutComplete();
  });

});
