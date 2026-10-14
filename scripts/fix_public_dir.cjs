const fs = require('fs');
const path = require('path');

const serverPath = path.join(__dirname, '../server.js');
let code = fs.readFileSync(serverPath, 'utf8');

const target = `const PUBLIC_DIR = __dirname;`;
const replacement = `const PUBLIC_DIR = fs.existsSync(path.join(process.cwd(), 'index.html'))
  ? process.cwd()
  : (fs.existsSync(path.join(__dirname, 'index.html')) ? __dirname : path.join(__dirname, '..'));`;

code = code.replace(target, replacement);
fs.writeFileSync(serverPath, code, 'utf8');
console.log('Successfully updated PUBLIC_DIR in server.js');
