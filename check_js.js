const fs = require('fs');
const html = fs.readFileSync(process.argv[2] || 'static/index.html', 'utf8');
const match = html.match(/<script>([\s\S]*?)<\/script>/);
if (!match) {
  console.log('No script found');
  process.exit(1);
}
const js = match[1];
console.log('Script length:', js.length);
console.log('Last 200 chars:', JSON.stringify(js.slice(-200)));
try {
  new Function(js);
  console.log('JS parses OK');
} catch(e) {
  console.log('Syntax error at:', e.message);
  console.log('Position:', e.stack);
  // Find the line number
  const lines = js.substring(0, e.pos).split('\n');
  const line = lines.length;
  const col = lines[lines.length - 1].length + 1;
  console.log('Line:', line, 'Col:', col);
  // Show context
  const start = Math.max(0, e.pos - 100);
  const end = Math.min(js.length, e.pos + 100);
  console.log('Context:', JSON.stringify(js.slice(start, end)));
}
