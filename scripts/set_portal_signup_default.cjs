const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '../js/app.js');
let content = fs.readFileSync(appPath, 'utf8');

const target = `    // Initially hide gateway if already logged in as authorized executive
    if (this.currentUser && this.currentUser.email === 'bhuvanjakkula@gmail.com') {
      if (gatewayLayer) gatewayLayer.classList.add('hidden');
    }`;

const replacement = `    // Open First Web Page Layer on Sign Up by default
    if (gatewayLayer) gatewayLayer.classList.remove('hidden');
    if (tabSignUp) {
      tabSignUp.click();
    }`;

content = content.replace(target, replacement);
fs.writeFileSync(appPath, content, 'utf8');
console.log('Successfully set First Web Page Layer to open on Sign Up tab by default');
