const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { displayAwal } = require('./features/displayAwal');
const { jedorCola } = require('./features/jedor');
const { readEmailsFromFile } = require('./features/readEmail')
const { openBrowser } = require('./features/openBrowser')
const prompt = require('prompt-sync')();
puppeteer.use(StealthPlugin());

// color declare
const resetColor = "\x1b[0m";
const greenColor = "\x1b[32m";
const redColor = "\x1b[31m";
const whiteColor = "\x1b[37m";

// clearing terminal
const clearTerminal = () => {
    console.clear();
};

// delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const processAllEmails = async () => {
    const { browser, page } = await openBrowser();
  
    try {
      const emailsAndPasswords = readEmailsFromFile('./email.txt');
  
      for (const { email, password } of emailsAndPasswords) {
        try {
          console.log();
          console.log(`${whiteColor}→ Processing email/nohp/username: ${email}`);
          await jedorCola(page, browser, email, password);
          // console.log(`${greenColor}[√] Email processed: ${email}`);
        } catch (error) {
          console.error(`${redColor}[x] Error occurred: ${error.message}`);
        }
      }
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  };

// main function
const mainMenu = async() => {
    await clearTerminal();
    await displayAwal();

    let browser;
    let page;

    do{
        await sleep(2000);
        console.log(`${greenColor}[+] Pilih menu yang tersedia dibawah ngab${resetColor}`);
        console.log('→ 1. Jedor');
        console.log('→ 2. Exit');
        console.log();
        choice = prompt('Pilih ngab (1/2): ');

        switch(choice) {
            case '1':
            await processAllEmails(browser, page);
            break;

            case '2':
            if(browser) {
                await browser.close();
                console.log('MAKASIH CUY UDAH PAKE PROGRAMNYA');
            }
            break;

            default:
                console.log('Gada pilihannya, (1/2)');
        }
    } while (choice !== '2');
}


mainMenu();