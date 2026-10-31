Feature: As a user I can interact with login forms

  @smoke
  @regression
  Scenario Outline: As a user I can populate login details with env variables
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    And I fill in the "email" input with "$.TEST_EMAIL"
    And I fill in the "password" input with "$.TEST_PASSWORD"
    And the "email" should contain the value "admin@testingtalkshub.com.au"
    And the "password" should contain the value "<password>"


    @localhost
    Examples:
      | password     |
      | Password1234 |

    @production
    Examples:
      | password  |
      | 4S42xAr12 |

  @smoke
  @regression
  Scenario Outline: As a user I expect validation on the login input for an incorrect email
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    And I fill in the "email" input with "<email>"
    And I fill in the "password" input with "Password1234"
    And the "email error" should contain text "Please include an '@' in the email address."

    Examples:
      | email     |
      | rpie123   |
      | rpie.test |
      | rpie@     |

  @localhost
  @regression
  Scenario: As a user I can submit the login form with the Enter key using valid credentials
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    And I fill in the "email" input with "$.TEST_EMAIL"
    And I fill in the "password" input with "$.TEST_PASSWORD"
    And the "login button" should be enabled
    And I click accept on the alert dialog
    And I press the "Enter" key
    Then the alert dialog should contain text "Successfully logged in"

  @regression
  Scenario: As a user I see an error alert when submitting wrong credentials with the Enter key
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    And I fill in the "email" input with "wrong.user@test.com"
    And I fill in the "password" input with "wrong123"
    And the "login button" should be enabled
    And I click accept on the alert dialog
    And I press the "Enter" key
    Then the alert dialog should contain text "Wrong email or password combination"

  @smoke
  @regression
  Scenario: As a user I can assert the attributes of the login form fields
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    Then the "email" should have the "required" attribute
    And the "password" should have the "required" attribute
    And the "email" should not have the "disabled" attribute
    And the "password" "minlength" attribute should contain the text "3"
    And the "email" "type" attribute should contain the text "email"
    And the "login button" should have the "disabled" attribute

  @smoke
  @regression
  Scenario: As a user I can only use the login button once the login form is valid
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    And the "login button" should not be enabled
    And I fill in the "email" input with "rpie@test.com"
    And I fill in the "password" input with "Password1234"
    And the "login button" should be enabled
    And I fill in the "email" input with "rpie.test"
    And the "login button" should not be enabled
    And I fill in the "email" input with "rpie@test.com"
    And the "login button" should be enabled
    And I fill in the "email" input with "rpie"
    Then the "login button" should not be enabled
