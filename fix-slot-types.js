const fs = require('fs');
const path = require('path');
const dir = 'c:/Users/badal/OneDrive/Desktop/Techphillia/HarvestHub/components/ui';

function processDir(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('asChild ? Slot :')) {
        content = content.replace(/asChild \? Slot : ([^\n;]+)/g, '(asChild ? Slot : $1) as any');
        fs.writeFileSync(fullPath, content);
        console.log('Fixed', fullPath);
      }
    }
  }
}

processDir(dir);
