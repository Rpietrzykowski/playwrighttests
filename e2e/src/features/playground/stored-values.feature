Feature: As a user I can interact with stored values
  
  @smoke
  @regression
  Scenario: As a user I can interact and assert on stored values
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    And I retrieve the "first value" text and store it as "first value" in global variables
    And the "first value" should equal the "first value" stored in global variables
    And I retrieve the "second value" text and store it as "second value" in global variables
    And the "third value" should not equal the "first value" stored in global variables
    And I retrieve the "third value" text and store it as "third value" in global variables
    And I retrieve the "fourth value" text and store it as "fourth value" in global variables
    And I retrieve the "fifth value" text and store it as "fifth value" in global variables
    And the "fourth value" should contain the "first value" stored in global variables
    And the "fifth value" should contain the "first value" stored in global variables