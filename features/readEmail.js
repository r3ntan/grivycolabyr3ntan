const fs = require('fs')

const readEmailsFromFile = ( filePath )=> {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
  
    // Filter out empty lines
    const emailAndPasswordPairs = lines
      .filter(line => line.trim() !== '')
      .map(line => {
        const [email, password] = line.split('|').map(part => part.trim());
        return { email, password };
      });
  
    return emailAndPasswordPairs;
}

module.exports = { readEmailsFromFile };