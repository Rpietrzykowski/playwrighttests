Feature: As a user I can interact with tooltips

  @smoke
  @regression
  Scenario: As a user I can interact and assert on the tooltips
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    And the "tooltip" "title" attribute should contain the text "This is a tooltip"
    Then the "tooltip" "title" attribute should not contain the text "This is not a tooltip"
    And I click the "show hide button" button
    And the "show hide text" should not be displayed"