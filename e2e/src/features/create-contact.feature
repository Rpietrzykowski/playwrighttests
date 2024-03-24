Feature: As a user I expect to be able to create contacts

  @smoke
  @regression
  Scenario: As a user I expect to be able to create new contact
    Given I am on the "home" page
    When I click the "create" button
    Then I am directed to the "create contact" page
    And the "create contact header" should contain text "Create Contact"
    And I fill in the "name" input with "Robert Pietrzykowski"
    And I select the "Male" option from the "gender" select
    And I fill in the "phone" input with "+48515509445"
    And I fill in the "street" input with "Wieniawskiego 36"
    And I fill in the "city" input with "Szczecin"
    And I click the "save" button
    
    Then I am directed to the "home" page
    And I fill in the "search" input with "Robert Pietrzykowski"
    And the "search" should not equal the text "Terry Bark"
    And the "contact" should be displayed"
    And the "full name label" should contain text "Name"
    And the "name" should equal the text "Robert Pietrzykowski"
    And the "gender label" should contain text "Gender"
    And the "gender" should equal the text "Male"
    And the "address label" should contain text "Address"
    And the "address" should equal the text "Wieniawskiego 36, Szczecin"
    And the "edit" should be displayed"
    And the "delete" should be displayed"

    @smoke
    @regression
    Scenario: As a user I do net expect saved contacts to persist after a page refresh
      Given I am on the "home" page
      When I click the "create" button
      Then I am directed to the "create contact" page
      And the "create contact header" should contain text "Create Contact"
      And I fill in the "name" input with "Robert Test"
      And I select the "Male" option from the "gender" select
      And I fill in the "phone" input with "+48515509444"
      And I fill in the "street" input with "Wieniawskiego 35"
      And I fill in the "city" input with "Poznan"
      And I click the "save" button

      Then I am directed to the "home" page
      And I fill in the "search" input with "Robert Test"
      And the "contact" should be displayed"
      And the "full name label" should contain text "Name"
      And the "name" should equal the text "Robert Test"
      And the "gender label" should contain text "Gender"
      And the "gender" should equal the text "Male"
      And the "address label" should contain text "Address"
      And the "address" should equal the text "Wieniawskiego 35, Poznan"
      And the "edit" should be displayed"
      And the "delete" should be displayed"
      
      And I refresh the "home" page
      
      And I fill in the "search" input with "Robert Test"
      Then the "contact" should not be displayed"