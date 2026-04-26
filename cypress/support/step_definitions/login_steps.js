import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../pages/loginPage";
import ProductListingPage from "../../pages/productListingPage";

Given("I am on the login page", () => {
  LoginPage.visit();
});

When("I type {string} username and {string} password", (username, password) => {
  LoginPage.fillUsernameField(username);
  LoginPage.fillPasswordField(password);
});

When("I click the login button", () => {
  LoginPage.submit();
});

Then("I should be redirected to the Listing page", () => {
  ProductListingPage.verifyProductListingPage();
});