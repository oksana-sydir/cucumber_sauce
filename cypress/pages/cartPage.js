///<reference types="cypress" />

class CartPage {
    // Getters
    get productName() {
        return ".inventory_item_name";
    }

    get pageTitle() {
        return "span.title";
    }

    get cartBadgeCount() {
        return ".shopping_cart_badge";
    }

    get removeButton() {
        return (productName) => `[data-test="remove-${productName}"]`;
    }

    get continueShoppingButton() {
        return "button#continue-shopping";
    }

    get checkoutButton() {
        return "button#checkout";
    }

    verifyCartIsOpened() {
        cy.url().should("include", "cart.html");
        cy.get(this.pageTitle).should("have.text", "Your Cart");
    }

    verifyProductInCart(productName) {
        // Convert product name from "sauce-labs-backpack" to "Sauce Labs Backpack"
        const displayName = productName
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
        // Find the product row by its remove button, then verify the product name within that row
        cy.get(this.removeButton(productName))
        .closest(".cart_item")
        .find(this.productName)
        .should("be.visible")
        .and("have.text", displayName);
    }

    verifyCounterAfterAddingProduct(productName, expectedCount) {
        cy.get(`[data-test="remove-${productName}"]`).should("have.text", "Remove");
        cy.get(this.cartBadgeCount).should("have.text", expectedCount);
    }

    removeProductFromCart(productName) {
        cy.get(this.removeButton(productName)).should("be.visible").click();
    }

    verifyCounterAfterRemovingProduct() {
        cy.get(this.cartBadgeCount).should("not.exist");
    }

    verifyProductNotInCart(productName) {
        // Check that the remove button for this product doesn't exist
        cy.get(this.removeButton(productName)).should("not.exist");
    }

    verifyCartBadgeCount(expectedCount) {
        if (expectedCount === 0) {
            cy.get(this.cartBadgeCount).should("not.exist");
        } else {
            cy.get(this.cartBadgeCount).should("have.text", expectedCount);
        }
    }

    clickButtonForProduct(buttonText, productName) {
        cy.get(`[data-test="remove-${productName}"]`)
        .parent()
        .contains("button", buttonText)
        .should("be.visible")
        .click();
    }

    continueShopping() {
        cy.get(this.continueShoppingButton).should("be.visible").click();
    }

    proceedToCheckout() {
        cy.get(this.checkoutButton).should("be.visible").click();
    }
}

export default new CartPage();
