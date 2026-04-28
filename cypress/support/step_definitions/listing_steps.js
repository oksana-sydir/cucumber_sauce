import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../pages/loginPage";
import ProductListingPage from "../../pages/productListingPage";
import AboutPage from "../../pages/aboutPage";
import ProductDetailsPage from "../../pages/productDetailsPage";
import {standardUser} from "../../fixtures/users.json";
let expectedPrices = [];
let expectedNames = [];
// Background: User is logged in
Given("User is logged in", () => {
    LoginPage.visit();
    LoginPage.fillUsernameField(standardUser.userName);
    LoginPage.fillPasswordField(standardUser.password);
    LoginPage.submit();
});

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
    } else if (option === "Logout") {
        ProductListingPage.clickLogout();
    } else {
        throw new Error(`Unknown burger menu option: ${option}`);
    }
});

When("I click on a product {string}", (productName) => {
    ProductListingPage.openProductDetails(productName);
});

When("I sort products by {string} and verify the order", (filterOption) => {
    // 1. Зчитуємо ціни ДО сортування
    ProductListingPage.getAllPrices().then((originalPrices) => {
        // 2. Зберігаємо в пам'ять, як вони МАЮТЬ виглядати після сортування (Low to High = 'asc')
        expectedPrices = ProductListingPage.getProgrammaticallySortedPrices(originalPrices, "asc");

        // 3. Виконуємо дію на сайті (використовуємо value 'lohi' для надійності)
        ProductListingPage.filterBy("lohi");
    });
});

When("I sort products by {string} dynamically", (filterOption) => {
    if (filterOption === "Price (low to high)") {
        // 1. Отримуємо поточні ціни до сортування
        ProductListingPage.getAllPrices().then((originalPrices) => {
            // 2. Сортуємо програмно у порядку зростання (asc)
            expectedPrices = ProductListingPage.getProgrammaticallySortedPrices(originalPrices, "asc");

            // 3. Вибираємо фільтр "lohi" на сайті
            ProductListingPage.filterBy("lohi");
        });
    } else if (filterOption === "Price (high to low)") {
        // 1. Отримуємо поточні ціни до сортування
        ProductListingPage.getAllPrices().then((originalPrices) => {
            // 2. Сортуємо програмно у порядку спадання (desc)
            expectedPrices = ProductListingPage.getProgrammaticallySortedPrices(originalPrices, "desc");

            // 3. Вибираємо фільтр "hilo" на сайті
            ProductListingPage.filterBy("hilo");
        });
    } else if (filterOption === "Name (Z to A)") {
        // 1. Отримуємо список назв ДО сортування
        ProductListingPage.getAllNames().then((originalNames) => {
            // 2. Сортуємо масив програмно від Z до A ('desc')
            expectedNames = ProductListingPage.getProgrammaticallySortedNames(originalNames, "desc");

            // 3. Вибираємо фільтр на сайті (value = "za")
            ProductListingPage.filterBy("za");
        });
    }
});

Then("the products prices should match the programmatically sorted list", () => {
    // 4. Порівнюємо результат на сайті з тим, що ми насортували програмно
    ProductListingPage.verifyAllPricesSorted(expectedPrices);
});

Then("the products names should match the programmatically sorted list", () => {
    // 4. Порівнюємо результат на сайті з тим, що ми насортували програмно
    ProductListingPage.verifyAllNamesSorted(expectedNames);
});

Then("The burger menu should be visible", () => {
    ProductListingPage.verifyItemsInBurgerMenuAreVisible();
});

Then("I should be redirected to the {string} page", (pageName) => {
    if (pageName === "About") {
        AboutPage.verifyAboutPage();
    } else {
        throw new Error(`Unknown page name: ${pageName}`);
    }
});

Then("I should be redirected to the {string} details page", (productName) => {
    ProductDetailsPage.verifyProductDetails(productName);
});
