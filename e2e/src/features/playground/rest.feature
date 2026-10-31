Feature: As a user I can see data loaded from a REST API

  # Depends on the live external API https://jsonplaceholder.typicode.com/users
  @regression
  Scenario: As a user I can see the first five full names returned by the REST API
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    Then I should see "5" "full name" displayed
    And the "1st" "full name" should contain the text "Leanne Graham"
    And the "2nd" "full name" should contain the text "Ervin Howell"
    And the "3rd" "full name" should contain the text "Clementine Bauch"
    And the "4th" "full name" should contain the text "Patricia Lebsack"
    And the "5th" "full name" should contain the text "Chelsey Dietrich"
    And the "6th" "full name" should not be displayed"