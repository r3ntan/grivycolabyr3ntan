const resetColor = "\x1b[0m";
const greenColor = "\x1b[32m";
const redColor = "\x1b[31m";
const whiteColor = "\x1b[37m";

// const timeZone = 'require('./timezone')'
const displayAwal = () => {
    const asciiArt = [
        ' ____   ___ _____    ____ ___   ____    _       ____ ___  _        _    ',
        '| __ ) / _ \\_   _|  / ___/ _ \\ / ___|  / \\     / ___/ _ \\| |      / \\   ',
        '|  _ \\| | | || |   | |  | | | | |     / _ \\   | |  | | | | |     / _ \\  ',
        '| |_) | |_| || |   | |__| |_| | |___ / ___ \\  | |__| |_| | |___ / ___ \\ ',
        '|____/ \\___/ |_|    \\____\\___/ \\____/_/   \\_\\  \\____\\___/|_____/_/   \\_\\',
    ];
    
    asciiArt.forEach(line => console.log(line));
    console.log();
    console.log(`${redColor}[!] KALO KETEMU BUG / ADA SARAN FITUR DM AJA YAGES, TELE USERNAME DIBAWAH${resetColor}`);
    // console.log('[-]', `Current date and time in ${timeZone}: ${formattedDate}`);
    console.log();
    console.log('[+]', 'Github: https://www.github.com/r3ntan');
    console.log('[+]', 'Telegram Username: @posssi');
    console.log();
}

module.exports = { displayAwal };