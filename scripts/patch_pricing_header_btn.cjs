const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '../js/app.js');
let content = fs.readFileSync(appPath, 'utf8');

const target = `    const launchLabHeader = document.getElementById('btn-header-launch-evidence-lab');
    if (launchLabHeader) {
      launchLabHeader.addEventListener('click', () => {
        const link = document.getElementById('nav-link-evidence-lab');
        if (link) link.click();
      });
    }`;

const replacement = `    const launchLabHeader = document.getElementById('btn-header-launch-evidence-lab');
    if (launchLabHeader) {
      launchLabHeader.addEventListener('click', () => {
        const link = document.getElementById('nav-link-evidence-lab');
        if (link) link.click();
      });
    }

    const btnPricingHeader = document.getElementById('btn-header-pricing');
    if (btnPricingHeader) {
      btnPricingHeader.addEventListener('click', () => {
        const link = document.getElementById('nav-link-pricing');
        if (link) link.click();
      });
    }`;

content = content.replace(target, replacement);
fs.writeFileSync(appPath, content, 'utf8');
console.log('Patched btn-header-pricing listener in js/app.js');
