Feature: Product Listing Page
  Background:
    Given User is logged in
    And I'm on the Product Listing Page

  Scenario: Sort by Price (low to high)
    When I select the filter "Price (low to high)"
    Then The products should be sorted by price in ascending order

  Scenario: Sort by Price (high to low)
    When I select the filter "Price (high to low)"
    Then The products should be sorted by price in descending order

  Scenario: Sort by Name (Z to A)
    When I select the filter "Name (Z to A)"
    Then The products should be sorted by name in descending order

  Scenario: Open the burger menu
    When I click the burger menu button
    Then The burger menu should be visible

  Scenario: Open the About page from the burger menu
    When I click the burger menu button
    And I select "About" from the burger menu
    Then I should be redirected to the "About" page

  Scenario: Navigate to the Product details page
    When I click on a product "Sauce Labs Backpack"
    Then I should be redirected to the "Sauce Labs Backpack" details page