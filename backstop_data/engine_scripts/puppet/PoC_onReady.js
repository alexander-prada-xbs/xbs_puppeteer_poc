module.exports = async (page, scenario, vp) => {
    console.log('SCENARIO > ' + scenario.label);
    await require('./clickAndHoverHelper')(page, scenario);
    const { scrollPageToBottom } = require('puppeteer-autoscroll-down');
  
    const lastPosition = await scrollPageToBottom(page, {
        size: 700,
        delay: 500
    });
};