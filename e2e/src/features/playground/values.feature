Feature: As a user I can interact with basic values

  @smoke
  @regression
  Scenario Outline: As a user I can assert on the <value key> basic value
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    Then the "<value key>" should equal the text "<expected>"
    And the "<value key>" should not equal the text "<partial>"
    And the "<value key>" should contain text "<partial>"

    Examples:
      | value key   | expected | partial |
      | value one   | 599523   | 59952   |
      | value two   | 44422122 | 4442212 |
      | value three | 51233322 | 5123332 |

  @regression
  Scenario: As a user I can store basic values and compare them
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    And I retrieve the "value one" text and store it as "value one" in global variables
    And I retrieve the "value two" text and store it as "value two" in global variables
    Then the "value one" should equal the "value one" stored in global variables
    And the "value two" should not equal the "value one" stored in global variables
    And the "value three" should not equal the "value two" stored in global variables