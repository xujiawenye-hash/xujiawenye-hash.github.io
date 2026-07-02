const fs = require('fs');
const html = fs.readFileSync(process.argv[2] || 'static/index.html', 'utf8');
const match = html.match(/<script>([\s\S]*?)<\/script>/);
if (!match) {
  console.log('No script found');
  process.exit(1);
}
const js = match[1];
fs.writeFileSync('extracted.js', js);
console.log('Extracted JS to extracted.js, length:', js.length);
