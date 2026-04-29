///<reference types="cypress" />

class ProductListingPage {
    // Getters for selectors
    get pageTitle() {
        return "span.title";
    }

    get addToCartButton() {
        return '[data-test="add-to-cart-';
    }

    get cartLink() {
        return ".shopping_cart_link";
    }

    get productNameLink() {
        return ".inventory_item_name";
    }

    get removeFromCartButton() {
        return '[data-test="remove-';
    }

    get sortContainer() {
        return ".product_sort_container";
    }

    get burgerMenuButton() {
        return "button#react-burger-menu-btn";
    }

    get priceOfFirstProduct() {
        return cy.get(this.productPrice).first();
    }

    getLastProductPrice() {
        return cy.get(this.productPrices).last();
    }

    get productPrices() {
        return '[data-test="inventory-item-price"]';
    }

    get productNames() {
        return ".inventory_item_name";
    }

    get logoutLink() {
        return "#logout_sidebar_link";
    }

    get aboutLink() {
        return "#about_sidebar_link";
    }

    addToCart(productName) {
        cy.get(`${this.addToCartButton}${productName}"`).should("be.visible").click();
    }

    openCart() {
        cy.get(this.cartLink).should("be.visible").click();
    }

    openProductDetails(productName) {
        // Convert product name from "sauce-labs-backpack" to "Sauce Labs Backpack"
        const displayName = productName
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
        // Find the product by its display name and click it
        cy.get(this.productNameLink).contains(displayName).should("be.visible").click();
    }

    removeFromCart(productName) {
        cy.get(`${this.removeFromCartButton}${productName}"]`).should("be.visible").click();
    }

    filterBy(filterName) {
        cy.get(this.sortContainer).should("be.visible").select(filterName);
    }

    openBurgerMenu() {
        cy.get(this.burgerMenuButton).should("be.visible").click();
    }

    verifyItemsInBurgerMenuAreVisible() {
        cy.get("#inventory_sidebar_link").should("be.visible");
        cy.get("#about_sidebar_link").should("be.visible");
        cy.get("#logout_sidebar_link").should("be.visible");
        cy.get("#reset_sidebar_link").should("be.visible");
    }

    logout() {
        this.openBurgerMenu();
        cy.get(this.logoutLink).should("be.visible").click();
    }

    openAboutPage() {
        cy.get(this.aboutLink).should("be.visible").click();
    }

    verifyProductListingPage() {
        cy.url().should("include", "inventory.html");
        cy.get(this.pageTitle).should("have.text", "Products");
    }

    verifyProductPrice(productPosition, price) {
        if (productPosition === 1) {
            cy.get(this.priceOfFirstProduct).should("have.text", price);
        } else if (productPosition === 6) {
            cy.get(this.priceOfLastProduct).should("have.text", price);
        }
    }

    verifyProductName(productPosition, productName) {
        if (productPosition === 1) {
            cy.get(this.productNameLink).eq(0).should("have.text", productName);
        } else if (productPosition === 6) {
            cy.get(this.productNameLink).eq(5).should("have.text", productName);
        }
    }

    getAllPrices() {
        return cy.get(this.productPrices).then(($prices) => {
            return [...$prices].map((el) => parseFloat(el.innerText.replace("$", "")));
        });
    }

    // Метод для збору всіх назв товарів у масив
    getAllNames() {
        return cy.get(this.productNames).then(($names) => {
            return [...$names].map((el) => el.innerText.trim());
        });
    }

    getProgrammaticallySortedPrices(prices, direction = "asc") {
        const sorted = [...prices];
        return direction === "asc" ? sorted.sort((a, b) => a - b) : sorted.sort((a, b) => b - a);
    }

    verifyAllPricesSorted(expectedPrices) {
        this.getAllPrices().then((actualPrices) => {
            expect(actualPrices).to.deep.equal(expectedPrices);
        });
    }

    getProgrammaticallySortedNames(names, direction = "asc") {
        const sorted = [...names];
        return direction === "asc"
            ? sorted.sort((a, b) => a.localeCompare(b))
            : sorted.sort((a, b) => b.localeCompare(a));
    }

    // Метод для верифікації назв
    verifyAllNamesSorted(expectedNames) {
        this.getAllNames().then((actualNames) => {
            expect(actualNames).to.deep.equal(expectedNames);
        });
    }
}

export default new ProductListingPage();
