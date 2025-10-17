@regression
Feature: Orange HRM Login

Background: Pre conditions
        Given user is logged in and navigated to Job Titles page

@create
Scenario: Validate Add Job Title
        When user click add button
        And user type job title "devops"
        And user type job description "automate software development processes"
        And user upload job specification "devops_jobspec.csv"
        And user type note "urgent hiring & wfo"
        And user click save button
        Then user should be able to directed to Job Titles page

@sort
Scenario Outline: Validate Sort Job Title
        When user click sort job title by '<sort>'
        Then user should be able to see job titles in '<result>'
        Examples:
            | sort          | result            |
            | ascending     | ascending order   |
            | descending    | descending order  |