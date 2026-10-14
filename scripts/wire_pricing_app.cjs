const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '../js/app.js');
let content = fs.readFileSync(appPath, 'utf8');

// 1. Add view-pricing to viewMeta in setupNavigation
const metaTarget = `      'view-global-sales': {
        title: 'Global Marketing, Sales & Multilingual Hub',
        desc: 'Cross-border customer simulation across 12 languages, worldwide multi-touch attribution, and omnichannel pipelines'
      }
    };`;

const metaReplacement = `      'view-global-sales': {
        title: 'Global Marketing, Sales & Multilingual Hub',
        desc: 'Cross-border customer simulation across 12 languages, worldwide multi-touch attribution, and omnichannel pipelines'
      },
      'view-pricing': {
        title: 'Enterprise Plans & Pricing (USD)',
        desc: 'Predictable, value-backed monthly pricing with an exclusive 3 Months Free Trial on all plans'
      }
    };`;

content = content.replace(metaTarget, metaReplacement);

// 2. Wire #btn-header-pricing in setupNavigation or constructor
const navListenerTarget = `    // Evidence Lab header shortcut button
    const btnLaunchLab = document.getElementById('btn-header-launch-evidence-lab');
    if (btnLaunchLab) {
      btnLaunchLab.addEventListener('click', () => {
        const labNav = document.getElementById('nav-link-evidence-lab');
        if (labNav) labNav.click();
      });
    }`;

const navListenerReplacement = `    // Evidence Lab header shortcut button
    const btnLaunchLab = document.getElementById('btn-header-launch-evidence-lab');
    if (btnLaunchLab) {
      btnLaunchLab.addEventListener('click', () => {
        const labNav = document.getElementById('nav-link-evidence-lab');
        if (labNav) labNav.click();
      });
    }

    // Pricing & Plans header shortcut button
    const btnPricingHeader = document.getElementById('btn-header-pricing');
    if (btnPricingHeader) {
      btnPricingHeader.addEventListener('click', () => {
        const pricingNav = document.getElementById('nav-link-pricing');
        if (pricingNav) pricingNav.click();
      });
    }`;

content = content.replace(navListenerTarget, navListenerReplacement);

// 3. Add keyboard shortcut 'p' or 'P' to setupGlobalKeyboardShortcuts
const keyTarget = `      // 'l' or 'L' toggles live stream terminal drawer
      if (e.key.toLowerCase() === 'l') {
        e.preventDefault();
        const drawer = document.getElementById('terminal-stream-drawer');
        if (drawer) drawer.classList.toggle('open');
        return;
      }`;

const keyReplacement = `      // 'l' or 'L' toggles live stream terminal drawer
      if (e.key.toLowerCase() === 'l') {
        e.preventDefault();
        const drawer = document.getElementById('terminal-stream-drawer');
        if (drawer) drawer.classList.toggle('open');
        return;
      }

      // 'p' or 'P' jumps to pricing plans
      if (e.key.toLowerCase() === 'p') {
        e.preventDefault();
        const pricingNav = document.getElementById('nav-link-pricing');
        if (pricingNav) pricingNav.click();
        return;
      }`;

content = content.replace(keyTarget, keyReplacement);

// 4. In setupCommandPalette, add pricing actions
const cmdPaletteTarget = `    // Action buttons inside command palette`;
const cmdPaletteReplacement = `    // Pricing and Checkout Quick Action
    commands.unshift({
      id: "view-pricing-cmd",
      title: "View Enterprise Plans & Stripe Checkout (3 Months Free Trial)",
      subtitle: "Growth ($499/mo) • Enterprise ($1,499/mo) • Mission-Critical ($3,999/mo)",
      category: "Billing",
      badge: "3 Mo Free",
      action: () => {
        const pricingNav = document.getElementById('nav-link-pricing');
        if (pricingNav) pricingNav.click();
      }
    });

    // Action buttons inside command palette`;

content = content.replace(cmdPaletteTarget, cmdPaletteReplacement);

fs.writeFileSync(appPath, content, 'utf8');
console.log('Successfully wired view-pricing navigation, header button, and command palette in js/app.js');
