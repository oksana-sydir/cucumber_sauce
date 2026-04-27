// <reference types="cypress" />

class ProductDetailsPage {
    get productName() {
        return ".inventory_details_name";
    }

    get productPrice() {
        return ".inventory_details_price";
    }

    verifyProductDetails(expectedName, expectedPrice) {
        cy.get(this.productName).should("have.text", expectedName);
    }
}

export default new ProductDetailsPage();
