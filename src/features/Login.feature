@regression
Feature: Orange HRM Login

Background: Pre conditions
        Given I navigate to the orangehrm 

@login
Scenario Outline: Validate Login Portal
        And I type a username <username> 
        And I type a password <password>
        And I click on the login button
        Then I should be presented '<message>'
        Examples:
            | username  | password  | message   |
            | Admin     | admin123  | success   |
            | admin1    | admin123  | failed    |