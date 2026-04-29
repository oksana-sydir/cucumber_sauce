import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";
import {standardUser} from "../../fixtures/users.json";
import LoginPage from "../../pages/loginPage";
import ProductListingPage from "../../pages/productListingPage";
import ProductDetailsPage from "../../pages/productDetailsPage";
import CartPage from "../../pages/cartPage";

Given("User added product {string} to the cart", (productName) => {
    LoginPage.visit();
    LoginPage.fillUsernameField(standardUser.userName);
    LoginPage.fillPasswordField(standardUser.password);
    LoginPage.submit();
    ProductListingPage.verifyProductListingPage();
    ProductListingPage.addToCart(productName);
});

When("I add a product {string} to the cart", (productName) => {
    ProductListingPage.addToCart(productName);
});

When("I open the cart", () => {
    ProductListingPage.openCart();
});

When("I navigate to the {string} details page", (productName) => {
    ProductListingPage.openProductDetails(productName);
});

When("I click the {string} button", (buttonText) => {
    ProductDetailsPage.clickButton(buttonText);
});

When("I click the {string} button for the product {string}", (buttonText, productName) => {
    CartPage.clickButtonForProduct(buttonText, productName);
});

When("I remove the product {string} from the cart", (productName) => {
    CartPage.removeProductFromCart(productName);
});

Then("The product {string} should be in the cart", (productName) => {
    CartPage.verifyProductInCart(productName);
});

Then("The product {string} should be removed from the cart", (productName) => {
    CartPage.verifyProductNotInCart(productName);
});

Then("The cart badge should show {string}", (count) => {
    CartPage.verifyCartBadgeCount(parseInt(count));
});

Then("The cart badge should show {string} after adding {string}", (count, productName) => {
    CartPage.verifyCounterAfterAddingProduct(productName, parseInt(count));
});
