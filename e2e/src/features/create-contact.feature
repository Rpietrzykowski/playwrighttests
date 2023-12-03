Feature: As a user I expect to be able to create contacts

  @dev
  Scenario: As a user I expect to be able to create new contact
    Given I am on the "home" page
    And I click the "create" button
    Then I am directed to the "create contact" page
    And the "create contact header" should contain text "Create Contact"
    And I fill in the "name" input with "Robert Pietrzykowski"
    And I select the "Male" option from the "gender" select
    And I fill in the "phone" input with "+48515509445"
    And I fill in the "street" input with "Wieniawskiego 36"
    And I fill in the "city" input with "Szczecin"
    And I click the "save" button
    
    And I am directed to the "home" page
    And I fill in the "search" input with "Robert Pietrzykowski"
    And the "full name label" should contain text "Name"
    And the "name" should contain text "Robert Pietrzykowski"
    And the "gender label" should contain text "Gender"
    And the "gender" should contain text "Male"
    And the "address label" should contain text "Address"
    And the "address" should contain text "Wieniawskiego 36"
    And the "edit" should be displayed"
    And the "delete" should be displayed"