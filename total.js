const fs = require('fs');

// Calculate total working hours

const content = fs.readFileSync('working-hours.md').toString();
const lines = content.split(/\r?\n/).filter(x => !x.startsWith('| total |'));
const total = lines.reduce((a, b) => a + Number((extract(b) ?? 0)), 0);

console.log(total);
lines.push(`| total | ${total} |`);
const result = lines.join('\n');
fs.writeFileSync('working-hours.md', result);

function extract(string) {
    return string.match(/(?<=\|[^|]+\| +)\d+(?= \|)/)?.toString();
}