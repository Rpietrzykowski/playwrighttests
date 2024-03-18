Feature: As a user I expect to be able to navigate to the home page

  @smoke
  @regression
  Scenario: As a user I expect to ba able to see contacts
    Given I am on the "home" page
    Then the "header logo" should be displayed"
    And the "contacts header" should contain text "Contacts"

  @smoke
  @regression
  Scenario: As a user I don't expect to see a contact that does not exist
    Given I am on the "home" page
    And I fill in the "search" input with "Funky Name"
    Then the "contact" should not be displayed"
    