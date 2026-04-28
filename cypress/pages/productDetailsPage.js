// <reference types="cypress" />

class ProductDetailsPage {
    get productName() {
        return ".inventory_details_name";
    }

    get productPrice() {
        return ".inventory_details_price";
    }

    get removeButton() {
        return '[data-test="remove-sauce-labs-backpack"]';
    }

    verifyProductDetails(expectedName, expectedPrice) {
        cy.get(this.productName).should("have.text", expectedName);
    }

    clickButton(buttonText) {
        cy.contains("button", buttonText).should("be.visible").click();
    }
}

export default new ProductDetailsPage();
