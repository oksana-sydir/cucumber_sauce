Feature: Checkout page

  Background:
    Given I proceed to the checkout first step

  Scenario: The first step checkout should be opened
    Then The checkout first step should be opened

  Scenario: Try to proceed to the checkout second step with empty all fields
    When I try to proceed to the checkout second step with empty all fields
    Then The error message "Error: First Name is required" should be displayed

  Scenario: Try to proceed to the checkout second step with empty last name and postal code
    When I fill in the first name field with "John"
    And I click on the "Continue" button
    Then The error message "Error: Last Name is required" should be displayed

  Scenario: Try to proceed to the checkout second step with empty first name and postal code
    When I fill in the last name field with "Doe"
    And I click on the "Continue" button
    Then The error message "Error: First Name is required" should be displayed

  Scenario: Try to proceed to the checkout second step with empty first name and last name
    When I fill in the postal code field with "12345"
    And I click on the "Continue" button
    Then The error message "Error: First Name is required" should be displayed

  Scenario: Try to proceed to the checkout second step with empty postal code
    When I fill in the first name field with "John"
    And I fill in the last name field with "Doe"
    And I click on the "Continue" button
    Then The error message "Error: Postal Code is required" should be displayed

  Scenario: Proceed to the checkout second step with valid data
    When I fill in the first name field with "John"
    And I fill in the last name field with "Doe"
    And I fill in the postal code field with "12345"
    And I click on the "Continue" button
    Then The checkout second step should be opened

  Scenario: Cancel checkout first step and return to the cart
    When I click on the "Cancel" button
    Then The cart should be opened

  Scenario: Cancel checkout second step and return to the PLP
    Given I proceed to the checkout second step with valid data
    When I click on the "Cancel" button
    Then The products listing page should be opened

  Scenario: Finish checkout
    Given I proceed to the checkout second step with valid data
    When I click on the "Finish" button
    Then The checkout complete page should be opened