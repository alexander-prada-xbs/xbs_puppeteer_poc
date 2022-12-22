@xbs_blog
Feature: Get to XBS blog
    I should be able to get to blog from the home page

    Scenario: Get to blog from the homepage
        Given I am in the XBS homepage
        When I click in the blog link
        Then I should be taken to the blog page