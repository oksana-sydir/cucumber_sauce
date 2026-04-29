///<reference types="cypress" />
import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";
import {standardUser} from "../../fixtures/users";
import LoginPage from "../../pages/loginPage";
import ProductListingPage from "../../pages/productListingPage";
import CartPage from "../../pages/cartPage";
import CheckoutPage from "../../pages/checkoutPage";
import {firstNameIsRequired, lastNameIsRequired, postalCodeIsRequired} from "../../fixtures/errorMessages.json";

Given("I proceed to the checkout first step", () => {
    LoginPage.visit();
    LoginPage.fillUsernameField(standardUser.userName);
    LoginPage.fillPasswordField(standardUser.password);
    LoginPage.submit();
    ProductListingPage.verifyProductListingPage();
    ProductListingPage.addToCart("sauce-labs-backpack");
    ProductListingPage.openCart();
    CartPage.verifyCartIsOpened();
    CartPage.proceedToCheckout();
});

When("I try to proceed to the checkout second step with empty all fields", () => {
    CheckoutPage.continueToOverview();
});

When("I fill in the first name field with {string}", (firstName) => {
    CheckoutPage.fillFirstNameField(firstName);
});

When("I click on the {string} button", (buttonText) => {
    if (buttonText === "Continue") {
        CheckoutPage.continueToOverview();
    } else if (buttonText === "Cancel") {
        CheckoutPage.cancelCheckout();
    } else if (buttonText === "Finish") {
        CheckoutPage.finishCheckout();
    } else {
        throw new Error(`Unknown button: ${buttonText}`);
    }
});

When("I fill in the last name field with {string}", (lastName) => {
    CheckoutPage.fillLastNameField(lastName);
});

When("I fill in the postal code field with {string}", (postalCode) => {
    CheckoutPage.fillPostalCodeField(postalCode);
});

When("I proceed to the checkout second step with valid data", () => {
    CheckoutPage.fillFirstNameField(standardUser.userName);
    CheckoutPage.fillLastNameField(standardUser.lastName);
    CheckoutPage.fillPostalCodeField("12345");
    CheckoutPage.continueToOverview();
    CheckoutPage.verifyStepTwo();
});

Then("The checkout first step should be opened", () => {
    CheckoutPage.verifyStepOne();
});

Then("The error messages {string} should be displayed", (errorMessage) => {
    CheckoutPage.verifyShippingValidation(errorMessage);
});

Then("The error message {string} should be displayed", (errorMessage) => {
    CheckoutPage.verifyShippingValidation(errorMessage);
});

Then("The checkout second step should be opened", () => {
    CheckoutPage.verifyStepTwo();
});

Then("The cart should be opened", () => {
    CartPage.verifyCartIsOpened();
});

Then("The products listing page should be opened", () => {
    ProductListingPage.verifyProductListingPage();
});

Then("The checkout complete page should be opened", () => {
    CheckoutPage.verifyCheckoutIsFinished();
});
