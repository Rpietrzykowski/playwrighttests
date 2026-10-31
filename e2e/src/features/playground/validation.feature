Feature: As a user I can interact with validated inputs

  @smoke
  @regression
  Scenario: As a user I can see the validated input in an error state
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    Then the "validation input" should equal the value "Testing Talks Online"
    And the "validation input" should be enabled
    And the "validation input" "aria-invalid" attribute should contain the text "true"

  @regression
  Scenario: As a user I can edit the validated input and the error state remains static
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    And I fill in the "validation input" input with "Robert Pietrzykowski"
    Then the "validation input" should equal the value "Robert Pietrzykowski"
    And the "validation input" should not contain the value "Testing Talks Online"
    And the "outlined error text" should contain text "Incorrect entry."

  @regression
  Scenario: As a user I can clear the validated input
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    And I fill in the "validation input" input with ""
    Then the "validation input" should equal the value ""
    And the "validation input" "aria-invalid" attribute should contain the text "true"