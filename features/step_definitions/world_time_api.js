const assert = require('assert');
const { Given, When, Then, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
const https = require('https');

setDefaultTimeout(60 * 1000);
let statusCode, timeZone, result, body;

Given('I request current date and time for Bogota', async function () {
    var url = 'https://worldtimeapi.org/api/timezone/America/Bogota';
    result = await fetch(url);
    body = await result.json();
});

When('I check the request response', function () {
    timeZone = body.timezone;
    statusCode = result.status;
});

Then('I should obtain a successful response code', function () {
    assert(statusCode == 200, "Unexpected response code");
});

Then('timezone should read America\\/Bogota', function () {
    assert(timeZone == "America/Bogota", "Timezone is incorrect");
});