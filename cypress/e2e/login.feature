Feature: Login Page
  Scenario: Success Login with standard user
    Given I am on the login page
      When I try to login with these users:
        | username      | password     |
      | standard_user | secret_sauce |
      | problem_user  | secret_sauce |
    Then I should be redirected to the Listing page

  Scenario: Try to login with typed spaces to login and password
    Given I am on the login page
    When I try to login with these users:
      | username | password |
      | " "      | " "      |
    And I click the login button
    Then I should see an error message "Epic sadface: Username and password do not match any user in this service"

  Scenario: Try to login with empty fields
    Given I am on the login page
    And I click the login button
    Then I should see an error message "Epic sadface: Username is required"

  Scenario: Try to login with empty password
    Given I am on the login page
    When I type "standard_user" to the username field
    And I click the login button
    Then I should see an error message "Epic sadface: Password is required"

  Scenario: Try to login with empty username
    Given I am on the login page
    When I type "secret_sauce" to the password field
    And I click the login button
    Then I should see an error message "Epic sadface: Username is required"

  Scenario: Try to login with valid login and invalid password
    Given I am on the login page
    When I try to login with these users:
      | username      | password |
      | standard_user | secret_sauceqw |
    And I click the login button
    Then I should see an error message "Epic sadface: Username and password do not match any user in this service"

  Scenario: Try to login with invalid login and valid password
   Given I am on the login page
   When I try to login with these users:
     | username      | password |
     | standard_userqw | secret_sauce |
   And I click the login button
   Then I should see an error message "Epic sadface: Username and password do not match any user in this service"

  Scenario: Try to login with locked user
    Given I am on the login page
    When I try to login with these users:
      | username      | password |
      | locked_out_user | secret_sauce |
    And I click the login button
    Then I should see an error message "Epic sadface: Sorry, this user has been locked out."