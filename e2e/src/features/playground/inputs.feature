Feature: As a user I can interact with auto complete inputs



  @smoke
  @regression
  Scenario: As a user I can interact and assert on autocomplete inputs
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    And I fill in the "movies" input with "The G"
    And I click the "the godfather" link
    And the "movies" should contain the value "The Godfather"
    And the "movies" should not contain the value "The Godfather: Part II"

  @smoke
  @regression
  Scenario: As a user I can interact and assert on inputs
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    And the "outlined required" should equal the value "Testing"
    Then the "outlined disabled" should equal the value "Talks"
    And the "outlined read only" should equal the value "Hub"
    And the "outlined required" should be enabled
    And the "outlined disabled" should not be enabled
    And I fill in the "outlined required" input with "Robert Pietrzykowski"
    And the "outlined required" should equal the value "Robert Pietrzykowski"


    @smoke
    @regression
    Scenario: As a user I can interact and assert on input validation
      Given I am on the "home" page
      And I click the "playground" button
      When I am directed to the "playground" page
      And the "outlined error" should contain text "Error"
      And the "outlined error text" should contain text "Incorrect entry"