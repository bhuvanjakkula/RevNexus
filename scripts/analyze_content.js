const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// Find all paragraphs with more than 150 characters
const pMatches = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)];
console.log(`Total <p> tags: ${pMatches.length}`);

const longPs = pMatches
  .map(m => m[1].replace(/<[^>]+>/g, '').trim())
  .filter(text => text.length > 120);

console.log(`Long paragraphs (>120 chars): ${longPs.length}\n`);
longPs.slice(0, 30).forEach((p, idx) => {
  console.log(`[P ${idx + 1}] (${p.length} chars): ${p.substring(0, 100)}...`);
});
