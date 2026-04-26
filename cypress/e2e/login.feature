Feature: Login Page
  Scenario: Success Login with standard user
    Given I am on the login page
    When I type "standard_user" username
    And I type "secret_sauce" password
    And I click the login button
    Then I should be redirected to the Listing page

  Scenario: Try to login with typed spaces to login and password
    Given I am on the login page
    When I type "   " username
    And I type "   " password
    And I click the login button
    Then I should see an error message "Epic sadface: Username and password do not match any user in this service"

  Scenario: Try to login with empty fields
    Given I am on the login page
    And I click the login button
    Then I should see an error message "Epic sadface: Username is required"

  Scenario: Try to login with empty password
    Given I am on the login page
    When I type "standard_user" username
    And I click the login button
    Then I should see an error message "Epic sadface: Password is required"

  Scenario: Try to login with empty username
    Given I am on the login page
    When I type "secret_sauce" password
    And I click the login button
    Then I should see an error message "Epic sadface: Username is required"

  Scenario: Try to login with valid login and invalid password
    Given I am on the login page
    When I type "standard_user" username
    And I type "invalid_password" password
    And I click the login button
    Then I should see an error message "Epic sadface: Username and password do not match any user in this service"

  Scenario: Try to login with invalid login and valid password
   Given I am on the login page
   When I type "standard_userqw" username
    And I type "secret_sauce" password
    And I click the login button
    Then I should see an error message "Epic sadface: Username and password do not match any user in this service"

  Scenario: Try to login with locked user
    Given I am on the login page
    When I type "locked_out_user" username
    And I type "secret_sauce" password
    And I click the login button
    Then I should see an error message "Epic sadface: Sorry, this user has been locked out."