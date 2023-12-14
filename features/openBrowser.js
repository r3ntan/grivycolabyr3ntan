const puppeteer = require('puppeteer-extra');

// open browser
const openBrowser = async() => {
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--aggressive-cache-discard',
            '--disable-cache',
            '--disable-application-cache',
            '--disable-offline-load-stale-cache',
            '--disable-gpu-shader-disk-cache',
            '--media-cache-size=0',
            '--disk-cache-size=0',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-infobars',
            '--no-zygote',
        ],
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
        defaultViewport: null,
    })

    const page = await browser.newPage();
    
    return { browser, page };
}

module.exports = { openBrowser }