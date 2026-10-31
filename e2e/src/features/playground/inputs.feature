Feature: As a user I can interact with auto complete inputs

  @smoke
  @regression
  Scenario Outline: As a user I can interact and assert on autocomplete inputs
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    And I fill in the "movies" input with "<search>"
    And I click the "<movie button>" link
    And the "movies" should contain the value "<movie>"
    And the "movies" should not contain the value "The Godfather: Part II"

  Examples:
    | search | movie button    | movie           |
    | The G  | the godfather   | The Godfather   |
    | The D  | the dark knight | The Dark Knight |


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

  @regression
  Scenario: As a user I can select the first autocomplete option with the keyboard
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    And I fill in the "movies" input with "The G"
    And the "the godfather" should be displayed"
    And I press the "ArrowDown" key
    And I press the "Enter" key
    Then the "movies" should equal the value "The Godfather"
    And the "the godfather" should not be displayed"

  @regression
  Scenario: As a user I can navigate autocomplete options with arrow keys before selecting
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    And I fill in the "movies" input with "The G"
    And the "the godfather" should be displayed"
    And I press the "ArrowDown" key
    And I press the "ArrowDown" key
    And I press the "Enter" key
    Then the "movies" should equal the value "The Godfather: Part II"

  @smoke
  @regression
  Scenario: As a user I can assert which inputs are editable
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    Then the "outlined required" should be editable
    And the "outlined read only" should not be editable
    And the "outlined disabled" should not be editable

  @regression
  Scenario: As a user I can type into the required input but not into the read only input
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    And I click the "outlined required" element
    And I press the "End" key
    And I press the "!" key
    And the "outlined required" should equal the value "Testing!"
    And I click the "outlined read only" element
    And I press the "End" key
    And I press the "!" key
    Then the "outlined read only" should equal the value "Hub"

  @smoke
  @regression
  Scenario: As a user I can assert boolean attributes on inputs
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    Then the "outlined required" should have the "required" attribute
    And the "outlined required" should not have the "readonly" attribute
    And the "outlined required" should not have the "disabled" attribute
    And the "outlined disabled" should have the "disabled" attribute
    And the "outlined disabled" should not have the "required" attribute
    And the "outlined read only" should have the "readonly" attribute
    And the "outlined read only" should not have the "required" attribute
    And the "outlined read only" should not have the "disabled" attribute
