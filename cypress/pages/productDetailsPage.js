// <reference types="cypress" />

class ProductDetailsPage {
    get productName() {
        return ".inventory_details_name";
    }

    get productPrice() {
        return ".inventory_details_price";
    }

    getRemoveButton(productName) {
        return `[data-test="remove-${productName}"]`;
    }

    verifyProductDetails(expectedName, expectedPrice) {
        cy.get(this.productName).should("have.text", expectedName);
    }

    clickButton(buttonText) {
        // Handle "Remove from cart" button - may just say "Remove" on the page
        if (buttonText.toLowerCase().includes("remove")) {
            cy.get("button")
            .filter(":visible")
            .contains(/remove/i)
            .should("be.visible")
            .click();
        } else {
            cy.get("button").contains(buttonText).should("be.visible").click();
        }
    }

    removeProduct(productName) {
        cy.get(this.getRemoveButton(productName)).should("be.visible").click();
    }
}

export default new ProductDetailsPage();
