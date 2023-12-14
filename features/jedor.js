const resetColor = "\x1b[0m";
const greenColor = "\x1b[32m";
const redColor = "\x1b[31m";
const whiteColor = "\x1b[37m";
const { readEmailsFromFile } = require('./readEmail')
const { openBrowser } = require('./openBrowser')
const { loopJedor } = require('./loopJedor')

const captureScreenshot = async (page) => {
  const screenshotName = `screenshot_${Date.now()}_${Math.floor(Math.random() * 10000)}.png`;
  const outputPath = `./voucher/${screenshotName}`;
  
  await page.screenshot({
    path: outputPath,
    fullPage: true,
  });

  console.log(`${greenColor}[√] Screenshot captured and saved to: ${outputPath}`);
  return outputPath
};

const jedorCola = async (page, browser) => {
  const urlCola = 'https://ayo.coca-cola.co.id/';
  await page.goto(urlCola, { waitUntil: 'domcontentloaded' });

  const buttonCookies = '#mat-dialog-0 > cookie-management > div > div.confirm-content > button.campaign-btn';
  await page.click(buttonCookies);

  console.log(`→ ${greenColor}Cookies Accepted, redirecting to Facebook page${resetColor}`);

  const countdownDuration = 3000; // 3 seconds
  for (let i = countdownDuration / 1000; i > 0; i--) {
    await page.waitForTimeout(1000);
    console.log(`Redirecting in ${i} seconds...`);
  }

  const facebookUrl = 'https://www.facebook.com/login.php';
  await page.click("body > app-root > div > app-login > div.login-page > div.login-container > div:nth-child(2) > button");
  await page.waitForFunction(
    expectedUrl => window.location.href.includes(expectedUrl),
    { timeout: 30000},
    facebookUrl
  )

  if (page.url(facebookUrl)) {
    console.log();
    console.log(`→ ${greenColor}Berhasil mengarahkan ke web facebook${resetColor}`);
  } else {
    console.log(`${redColor}[!]Gagal mengarahkanmu ke web facebook, coba lagi nanti${resetColor}`);
    return;
  }

  // login
  const emailsAndPasswords = readEmailsFromFile('./email.txt');
  for(const { email, password } of emailsAndPasswords ) {
    await page.waitForSelector('#email');
    await page.type('#email', email);
    await page.waitForSelector('#pass');
    await page.type('#pass', password);
    await page.click('#loginbutton')
    
    // After clicking the login button
    await page.waitForTimeout(6000); // Adjust the duration as needed

    // Check if the consent element is present
    const consentElement = await page.$('.x1lliihq.x6ikm8r.x10wlt62.x1n2onr6.xlyipyv.xuxw1ft');

    if (consentElement) {
      // If the element is present, click on it
      await consentElement.click();
    } else {
      console.log(`Consent element not found(${redColor}GAGAL LOGIN${resetColor})`);
      // return;
      // Handle the case where the element is not found
    }

    // Wait until the page URL matches the expected URL or a timeout occurs
    await page.waitForFunction(
      expectedUrl => window.location.href.includes(expectedUrl),
      { timeout: 30000 }, // Set a reasonable timeout
      'https://ayo.coca-cola.co.id/facebook?code=',
      'https://www.facebook.com/privacy/consent/',
    );

    const currentUrl = page.url();

    if (currentUrl.includes('https://ayo.coca-cola.co.id/facebook?code=')) {
    console.log(`→ Status Login: ${greenColor}Berhasil${resetColor}`);
    } else {
    console.log(`Status Login: ${redColor}Gagal${resetColor}`);
    }

    // Wait for the redirection to 'https://ayo.coca.cola.id'
    await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 30000 });
  
  // // Now, you can interact with the specified selector

  
  const buttonSelectorAfterRedirection = 'body > app-root > div > app-home > div > div > app-main-offers > div > div.rewards.with-items > div:nth-child(2) > div.reward-info > div.bottom-row > div:nth-child(2) > button';
  await page.waitForSelector(buttonSelectorAfterRedirection, { visible: true })
  await page.click(buttonSelectorAfterRedirection);

  // access lokasi
  const buttonLokasi = '#mat-dialog-0 > permission-dialog > div.actions > button.campaign-btn.btn-full-width'
  const buttonKlaimPertama = 'body > app-root > div > app-campaign > campaign-landing-banner > landing-banner > div > button'
  const buttonKlaimKedua = 'body > app-root > div > app-campaign > div > campaign-footer > div > button';
  await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForSelector(buttonLokasi, { visible: true });
  await page.click(buttonLokasi);
  await page.waitForTimeout(2000);
  await page.waitForSelector(buttonKlaimPertama, { visible: true });
  await page.click(buttonKlaimPertama);
  await page.waitForSelector(buttonKlaimKedua, { visible: true });
  await page.waitForTimeout(5000);
  await page.click(buttonKlaimKedua);
  await page.waitForTimeout(5000);
  await page.click(buttonKlaimKedua);
  await page.click(buttonKlaimKedua);
  // function checklist
  await page.waitForSelector("#mat-dialog-2 > redeem-checkbox-dialog > grivy-checkbox:nth-child(1) > label > input", { visible: true });
  await page.click('#mat-dialog-2 > redeem-checkbox-dialog > grivy-checkbox:nth-child(1) > label > input');
  await page.waitForTimeout(1000);
  await page.click('#mat-dialog-2 > redeem-checkbox-dialog > button');
  await page.click(buttonKlaimKedua);
  console.log(`${whiteColor}→ ${whiteColor}Klaim voucher: ${greenColor}Berhasil${resetColor}`);
  await page.waitForTimeout(5000);
  await page.click(buttonKlaimKedua);
  await page.waitForTimeout(10000);
  await page.click(buttonKlaimKedua);
  // Capture screenshot and get the path
  const screenshotPath = await captureScreenshot(page);

  // timeout before processing another one
  await page.waitForTimeout(2000);
  // Close the browser
  await browser.close();
  console.log(`${greenColor}[√] Browser closed`);
  console.log();
  
  // Reopen the browser before the next loop
  const { browser: newBrowser, page: newPage } = await openBrowser();
  browser = newBrowser;
  page = newPage;  

  // calling the loop
  await loopJedor(page);
    
}

}

module.exports = { jedorCola }