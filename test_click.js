const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on('console', msg => { if(msg.type()==='error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push('PAGE ERROR: ' + err.message));
  await page.goto('http://127.0.0.1:8765/');
  await page.waitForTimeout(2000);
  console.log('Errors on load:', errors.length > 0 ? errors : 'None');
  // Click 结构类
  try {
    await page.click('[data-broad="结构类"]');
  } catch(e) {
    console.log('Click failed:', e.message);
    // Try by text
    await page.getByText('结构类').click();
  }
  await page.waitForTimeout(1000);
  const resultsVisible = await page.isVisible('#resultsArea');
  console.log('Results visible:', resultsVisible);
  const chatCount = await page.locator('.chat-item').count();
  console.log('Chat items shown:', chatCount);
  const pageTitle = await page.textContent('#pageTitle');
  console.log('Title after click:', pageTitle);
  const heroDisplay = await page.$eval('#hero', el => el.style.display);
  console.log('Hero display:', heroDisplay);
  await browser.close();
})().catch(e => console.error('Error:', e.message));
