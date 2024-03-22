Feature: As a user I can interact with page alerts

  @smoke
  @regression
  Scenario: As a user I can interact and assert on the page alerts
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    And the "error alert" should not contain text "This is an error alert - check it out"
    And the "warning alert" should not contain text "This is an a warning alert - check it out"
    And the "info alert" should not contain text "This is an info alert - check it out"
    And the "success alert" should not contain text "This is a success alert - check it out"