const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// Find all paragraphs with more than 100 characters
const pMatches = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)];
console.log(`Total <p> tags: ${pMatches.length}`);

pMatches.forEach((m, idx) => {
  const clean = m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  if (clean.length > 80) {
    console.log(`[P ${idx + 1}] Line ~${html.substring(0, m.index).split('\n').length} (${clean.length} chars): ${clean.substring(0, 110)}...`);
  }
});
