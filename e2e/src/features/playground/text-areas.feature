Feature: As a user I can interact with text areas

  @regression
  @smoke
  Scenario: As a user I can interact and assert on text areas
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    And the "textarea" should contain the value "Testing Talks Hub has been established to teach the community how to build world class automation "
    And I fill in the "textarea" input with "Learning to input into textarea"
    And the "textarea" should not contain text "Learning to input into textarea"