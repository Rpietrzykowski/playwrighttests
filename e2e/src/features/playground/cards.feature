Feature: As a user I can interact with cards

  @smoke
  @regression
  Scenario: As a user I can interact and assert on cards
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    And the "card header" should contain text "Word of the Day"
    And the "card main" should contain text "Automation"
    And the "card type" should contain text "noun"
    And the "card overview" should contain text "Automate the execution of tests"
    And the "card overview" should contain text ""compares actual with expected""
    And the "card action" should contain text "Learn More"
