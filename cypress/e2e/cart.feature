Feature: Cart Page
  Background:
    Given User added product "sauce-labs-backpack" to the cart

  Scenario: Verify the counter near the cart icon
    Then The cart badge should show "1" after adding "sauce-labs-backpack"

  Scenario: Open the cart and verify the product
    When I open the cart
    Then The product "sauce-labs-backpack" should be in the cart

  Scenario: Remove product from the cart in the pdp
    When I navigate to the "sauce-labs-backpack" details page
    And I click the "Remove from cart" button
    And I open the cart
    Then The product "sauce-labs-backpack" should be removed from the cart
    And The cart badge should show "0"

  Scenario: Remove product from the cart in the cart page
    When I open the cart
    And I click the "Remove" button for the product "sauce-labs-backpack"
    Then The product "sauce-labs-backpack" should be removed from the cart
    And The cart badge should show "0"