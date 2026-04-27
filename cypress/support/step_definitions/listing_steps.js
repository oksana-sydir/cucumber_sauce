import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../pages/loginPage";
import ProductListingPage from "../../pages/productListingPage";
import AboutPage from "../../pages/aboutPage";
import ProductDetailsPage from "../../pages/productDetailsPage";
import {standardUser} from "../../fixtures/users.json";
// Background: User is logged in
Given("User is logged in", () => {
    LoginPage.visit();
    LoginPage.fillUsernameField(standardUser.userName);
    LoginPage.fillPasswordField(standardUser.password);
    LoginPage.submit();
});

// Scenario: Sort by Price (low to high)
Given("I'm on the Product Listing Page", () => {
    ProductListingPage.verifyProductListingPage();
});

When("I select the filter {string}", (filterOption) => {
    ProductListingPage.filterBy(filterOption);
});

When("I click the burger menu button", () => {
    ProductListingPage.openBurgerMenu();
});

When("I select {string} from the burger menu", (option) => {
    if (option === "About") {
        ProductListingPage.openAboutPage();
    }
});

When('I click on a product {string}', (productName) => {
    ProductListingPage.openProductDetails(productName);
});

Then("The products should be sorted by price in ascending order", () => {
    ProductListingPage.verifyProductPrice(1, "$7.99");
    ProductListingPage.verifyProductPrice(6, "$49.99");
});

Then("The products should be sorted by price in descending order", () => {
    ProductListingPage.verifyProductPrice(1, "$49.99");
    ProductListingPage.verifyProductPrice(6, "$7.99");
});

Then("The products should be sorted by name in descending order", () => {
    ProductListingPage.verifyProductName(1, "Test.allTheThings() T-Shirt (Red)");
    ProductListingPage.verifyProductName(6, "Sauce Labs Backpack");
});

Then("The burger menu should be visible", () => {
    ProductListingPage.verifyItemsInBurgerMenuAreVisible();
});

Then("I should be redirected to the {string} page", (pageName) => {
    if (pageName === "About") {
        AboutPage.verifyAboutPage();
    }
});

Then('I should be redirected to the {string} details page', (productName) => {
    ProductDetailsPage.verifyProductDetails(productName);
});