import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../pages/loginPage";
import ProductListingPage from "../../pages/productListingPage";

Given("I am on the login page", () => {
    LoginPage.visit();
});

When("I try to login with these users:", (dataTable) => {
    // dataTable.hashes() повертає масив об'єктів: [{username: '...', password: '...'}, ...]
    dataTable.hashes().forEach((row) => {
        LoginPage.visit();
        LoginPage.fillUsernameField(row.username);
        LoginPage.fillPasswordField(row.password);
        LoginPage.submit();
        // Додай перевірку для кожного циклу
        if (row.username === "standard_user" && row.password === "secret_sauce") {
            ProductListingPage.verifyProductListingPage();
        } else if (row.username === "locked_out_user" && row.password === "secret_sauce") {
            LoginPage.verifyValidation("Epic sadface: Sorry, this user has been locked out.");
        } else if (row.username === "problem_user" && row.password === "secret_sauce") {
            ProductListingPage.verifyProductListingPage();
        } else {
            LoginPage.verifyValidation("Epic sadface: Username and password do not match any user in this service");
        }
    });
});

When("I type {string} to the username field", (username) => {
    LoginPage.fillUsernameField(username);
});

When("I type {string} to the password field", (password) => {
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
