@worldtimeapi
Feature: Obtain current datetime
    I should be able to obtain the current date and time for a specific area and location

    Scenario: Obtain current date and time for Bogota
        Given I request current date and time for Bogota
        When I check the request response
        Then I should obtain a successful response code
        And timezone should read America/Bogota