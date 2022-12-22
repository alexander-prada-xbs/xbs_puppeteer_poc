const assert = require('assert');
const { Given, When, Then, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
const puppeteer = require('puppeteer');

setDefaultTimeout(60 * 1000);
var browser, page;

Given('I am in the XBS homepage', async function () {
    browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    });
    page = await browser.newPage();
    page.setViewport({width: 1280, height: 800, deviceScaleFactor: 1});
    await page.goto("https://crossborder.ai/", {waitUntil: 'domcontentloaded'});
});

When('I click in the blog link', async function () {
    page.click("a[title=Blog]");
    await page.waitForNavigation({timeout: 0});
});

Then('I should be taken to the blog page', async function () {
    var title = await page.evaluate(() => {
        const element = document.querySelectorAll("div.text-block.col-12.col-md-8.col-lg-7.offset-lg-1 h5")[0];
        if (!element)
            return null;

        return element.innerText
    });
    assert(title == "BLOG", "Incorrect title text");
});

AfterAll(async function () {
    await browser.close();
});