Feature: As a user I expect to be able to delete contacts

  @smoke
  @regression
  Scenario: As a user I expect a deleted contact to disappear from the list
    Given I am on the "home" page
    And I fill in the "search" input with "Bethany Thornton"
    And I should see "1" "contact" displayed
    And the "no items message" should not be displayed"
    And I click accept on the alert dialog
    When I click the "delete" button
    Then the alert dialog should contain text "Are you sure you want to remove this contact?"
    And the "contact" should not be displayed"
    And the "no items message" should contain text "There are no items to display"
    And I fill in the "search" input with ""
    And I should see "49" "contact" displayed

  @regression
  Scenario: As a user I expect the contact count to drop by one and the other contacts to stay
    Given I am on the "home" page
    And I should see "50" "contact" displayed
    And the "1st" "name" should contain the text "Abraham Perry"
    And I click accept on the alert dialog
    When I click the "1st" "delete" button
    Then I should see "49" "contact" displayed
    And the "1st" "name" should contain the text "Alea Nieves"
    And I fill in the "search" input with "Abraham Perry"
    And the "contact" should not be displayed"
    And I fill in the "search" input with "Bethany Thornton"
    And I should see "1" "contact" displayed

  @regression
  Scenario: As a user I expect to delete only the chosen contact when several match the search
    Given I am on the "home" page
    And I fill in the "search" input with "Denton"
    And I should see "2" "contact" displayed
    And the "1st" "name" should contain the text "Denton Maxwell"
    And the "2nd" "name" should contain the text "Denton Obrien"
    And I click accept on the alert dialog
    When I click the "2nd" "delete" button
    Then I should see "1" "contact" displayed
    And the "name" should equal the text "Denton Maxwell"
    And I fill in the "search" input with "Denton Obrien"
    And the "contact" should not be displayed"

  @regression
  Scenario: As a user I expect dismissing the confirmation to keep the contact
    Given I am on the "home" page
    And I fill in the "search" input with "Bethany Thornton"
    And I should see "1" "contact" displayed
    And I click dismiss on the alert dialog
    When I click the "delete" button
    Then the alert dialog should contain text "Are you sure you want to remove this contact?"
    And I should see "1" "contact" displayed
    And the "name" should equal the text "Bethany Thornton"
    And I fill in the "search" input with ""
    And I should see "50" "contact" displayed

  @regression
  Scenario: As a user I do not expect deleted contacts to stay deleted after a page refresh
    Given I am on the "home" page
    And I fill in the "search" input with "Bethany Thornton"
    And I should see "1" "contact" displayed
    And I click accept on the alert dialog
    When I click the "delete" button
    Then the "contact" should not be displayed"
    And I refresh the "home" page
    And I should see "50" "contact" displayed
    And I fill in the "search" input with "Bethany Thornton"
    And I should see "1" "contact" displayed
