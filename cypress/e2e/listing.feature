Feature: Product Listing Page
  Background:
    Given User is logged in
    And I'm on the Product Listing Page

  Scenario: Sort by Price (low to high)
    When I sort products by "Price (low to high)" dynamically
    Then the products prices should match the programmatically sorted list
    
  Scenario: Sort by Price (high to low)
    When I sort products by "Price (high to low)" dynamically
    Then the products prices should match the programmatically sorted list

  Scenario: Sort by Name (Z to A)
    When I sort products by "Name (Z to A)" dynamically
    Then the products names should match the programmatically sorted list

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