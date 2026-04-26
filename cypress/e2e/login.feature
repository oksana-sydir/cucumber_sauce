Feature: Login Page
  Scenario: Success Login with standard user
    Given I am on the login page
    When I type "standard_user" username and "secret_sauce" password
    And I click the login button
    Then I should be redirected to the Listing page