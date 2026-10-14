const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// Find all sections
const sections = [...html.matchAll(/<section[^>]*id="([^"]+)"/g)].map(m => m[1]);
console.log('--- ALL SECTIONS (' + sections.length + ') ---');
sections.forEach(s => console.log('Section:', s));

// Find all data-view in nav
const navViews = [...html.matchAll(/data-view="([^"]+)"/g)].map(m => m[1]);
console.log('\n--- NAV DATA-VIEWS (' + navViews.length + ') ---');
navViews.forEach(v => console.log('Nav View:', v));

// Check missing sections
const missing = navViews.filter(v => !sections.includes(v));
console.log('\n--- MISSING SECTIONS IN HTML ---', missing);

// Find all buttons with IDs
const buttons = [...html.matchAll(/<button[^>]*id="([^"]+)"/g)].map(m => m[1]);
console.log('\n--- ALL BUTTONS WITH IDs (' + buttons.length + ') ---');
buttons.forEach(b => console.log('Button:', b));

// Find all modals
const modals = [...html.matchAll(/<div[^>]*id="(modal-[^"]+)"/g)].map(m => m[1]);
console.log('\n--- ALL MODALS (' + modals.length + ') ---');
modals.forEach(m => console.log('Modal:', m));

// Find all inputs / selects with IDs
const inputs = [...html.matchAll(/<(?:input|select|textarea)[^>]*id="([^"]+)"/g)].map(m => m[1]);
console.log('\n--- ALL INPUTS/SELECTS/TEXTAREAS (' + inputs.length + ') ---');
console.log('Total count:', inputs.length);
