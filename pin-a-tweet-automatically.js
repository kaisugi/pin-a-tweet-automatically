const process = require('process');
const puppeteer = require('puppeteer');
require('dotenv').config();

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const TWEETID = process.env.TWEETID;


async function pin(tweetId) {
  const browser = await puppeteer.launch({
    headless: false  // for debugging, set true
  });

  // login
  const page = await browser.newPage();
  await page.goto('https://twitter.com/login', {
    waitUntil: 'networkidle2'
  });
  await page.type('input[name="session[username_or_email]"]', USERNAME);
  await page.type('input[name="session[password]"', PASSWORD);
  await page.click('div[role=button]');
  await page.waitForNavigation();

  // Pin the tweet
  await page.goto(`https://twitter.com/twitter/status/${tweetId}`, {
    waitUntil: 'networkidle2'
  });
  await page.click('div[data-testid="caret"]');
  await page.waitForTimeout(1000);
  await page.click('div[data-testid="pin"]');
  await page.waitForTimeout(1000);
  await page.click('div[data-testid="confirmationSheetConfirm"]');

  await browser.close();
}

(async () => {
  await pin(TWEETID);
})();