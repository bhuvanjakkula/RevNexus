const fs = require('fs');
const path = require('path');

// 1. Patch globalOmnichannelSalesEngine.js
const salesPath = path.join(__dirname, '../js/engines/globalOmnichannelSalesEngine.js');
let salesContent = fs.readFileSync(salesPath, 'utf8');
salesContent = salesContent.replace(/Best regards,\\nBhuvan Jakkula\\nRevNexus AI Global Platform/g, 'Best regards,\\nExecutive Revenue Operations\\nRevNexus AI Global Platform');
fs.writeFileSync(salesPath, salesContent, 'utf8');
console.log('Patched globalOmnichannelSalesEngine.js');

// 2. Patch app.js
const appPath = path.join(__dirname, '../js/app.js');
let appContent = fs.readFileSync(appPath, 'utf8');
appContent = appContent.replace(/\$\{this\.currentUser \? this\.currentUser\.name : 'Bhuvan Jakkula'\}/g, "${this.currentUser ? this.currentUser.name : 'Executive Console'}");
fs.writeFileSync(appPath, appContent, 'utf8');
console.log('Patched app.js chat sender');

// 3. Patch index.html line 666
const indexPath = path.join(__dirname, '../index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');
indexContent = indexContent.replace(/No consulting theory or hypothetical text:/g, 'Operational Engineering Console:');
fs.writeFileSync(indexPath, indexContent, 'utf8');
console.log('Patched index.html copy');
