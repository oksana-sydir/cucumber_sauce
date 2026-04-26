import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../pages/loginPage";
import ProductListingPage from "../../pages/productListingPage";

Given("I am on the login page", () => {
  LoginPage.visit();
});

When("I type {string} username", (username) => {
  LoginPage.fillUsernameField(username);
});

When("I type {string} password", (password) => {
  LoginPage.fillPasswordField(password);
});

When("I click the login button", () => {
  LoginPage.submit();
});

Then("I should be redirected to the Listing page", () => {
  ProductListingPage.verifyProductListingPage();
});

Then("I should see an error message {string}", (errorMessage) => {
  LoginPage.verifyValidation(errorMessage);
});