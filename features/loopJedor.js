const loopJedor = async(page) => {
    const resetColor = "\x1b[0m";
    const greenColor = "\x1b[32m";
    const redColor = "\x1b[31m";
    const whiteColor = "\x1b[37m";
    
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
}

module.exports = { loopJedor };