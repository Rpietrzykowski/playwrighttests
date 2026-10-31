Feature: As a user I expect to be able to edit contacts

  @smoke
  @regression
  Scenario: As a user I expect to be able to edit an existing contact
    Given I am on the "home" page
    And I fill in the "search" input with "Bethany Thornton"
    And I should see "1" "contact" displayed
    When I click the "edit" button
    Then I am directed to the "edit contact" page
    And the "name" should equal the value "Bethany Thornton"
    And the "gender" should equal the value "Female"
    And the "phone" should equal the value "(804) 849-5820"
    And the "street" should equal the value "P.O. Box 515, 4845 Condimentum. Street"
    And the "city" should equal the value "Oostkerk"
    And I fill in the "name" input with "Bethany Edited"
    And I select the "Other" option from the "gender" select
    And I fill in the "phone" input with "+48500100200"
    And I fill in the "street" input with "Dluga 1"
    And I fill in the "city" input with "Gdansk"
    And I click the "save" button

    Then I am directed to the "home" page
    And I fill in the "search" input with "Bethany Edited"
    And the "contact" should be displayed"
    And the "name" should equal the text "Bethany Edited"
    And the "gender" should equal the text "Other"
    And the "address" should equal the text "Dluga 1, Gdansk"
    And I fill in the "search" input with "Bethany Thornton"
    And the "contact" should not be displayed"

  @regression
  Scenario: As a user I expect cancelling an edit to keep the original contact
    Given I am on the "home" page
    And I fill in the "search" input with "Bethany Thornton"
    And I should see "1" "contact" displayed
    When I click the "edit" button
    Then I am directed to the "edit contact" page
    And I fill in the "name" input with "Should Not Be Saved"
    And I click the "cancel" button

    Then I am directed to the "home" page
    And I fill in the "search" input with "Bethany Thornton"
    And the "name" should equal the text "Bethany Thornton"
    And I fill in the "search" input with "Should Not Be Saved"
    And the "contact" should not be displayed"

  @regression
  Scenario: As a user I do not expect edited contacts to persist after a page refresh
    Given I am on the "home" page
    And I fill in the "search" input with "Bethany Thornton"
    And I should see "1" "contact" displayed
    When I click the "edit" button
    Then I am directed to the "edit contact" page
    And I fill in the "name" input with "Bethany Refreshed"
    And I click the "save" button
    Then I am directed to the "home" page
    And I refresh the "home" page
    And I fill in the "search" input with "Bethany Refreshed"
    Then the "contact" should not be displayed"
    And I fill in the "search" input with "Bethany Thornton"
    And the "contact" should be displayed"

  @regression
  Scenario Outline: As a user I expect validation when saving an edited contact with an empty <field>
    Given I am on the "home" page
    And I fill in the "search" input with "Bethany Thornton"
    And I should see "1" "contact" displayed
    When I click the "edit" button
    Then I am directed to the "edit contact" page
    And I fill in the "<field>" input with ""
    And I click the "save" button
    Then the "error message" should contain text "The "<field>" field can't be empty."
    And I am directed to the "edit contact" page

    Examples:
      | field  |
      | name   |
      | phone  |
      | street |
      | city   |

  @regression
  Scenario Outline: As a user I expect validation when saving an edited contact with a whitespace-only <field>
    Given I am on the "home" page
    And I fill in the "search" input with "Bethany Thornton"
    And I should see "1" "contact" displayed
    When I click the "edit" button
    Then I am directed to the "edit contact" page
    And I fill in the "<field>" input with "   "
    And I click the "save" button
    Then the "error message" should contain text "The "<field>" field can't be empty."
    And I am directed to the "edit contact" page

    Examples:
      | field |
      | phone |
      | city  |