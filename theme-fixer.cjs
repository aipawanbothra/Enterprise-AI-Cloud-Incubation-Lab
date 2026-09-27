const fs = require('fs');
const path = require('path');

const sectionsDir = path.join(__dirname, 'src', 'components', 'sections');

const replacements = [
  { from: /\btext-white\b/g, to: 'text-slate-900 dark:text-white' },
  { from: /\bbg-\[#070B19\]\b/g, to: 'bg-white dark:bg-[#070B19]' },
  { from: /\bbg-\[#0F172A\]\b/g, to: 'bg-slate-50 dark:bg-[#0F172A]' },
  { from: /\bbg-\[#1E293B\]\b/g, to: 'bg-white dark:bg-[#1E293B]' },
  { from: /\bborder-gray-800\b/g, to: 'border-slate-200 dark:border-gray-800' },
  { from: /\bborder-slate-800\b/g, to: 'border-slate-200 dark:border-slate-800' },
  { from: /\btext-gray-400\b/g, to: 'text-slate-600 dark:text-gray-400' },
  { from: /\btext-slate-400\b/g, to: 'text-slate-600 dark:text-slate-400' },
  { from: /\btext-slate-300\b/g, to: 'text-slate-700 dark:text-slate-300' },
  { from: /\bbg-slate-800\/40\b/g, to: 'bg-slate-100 dark:bg-slate-800/40' },
  { from: /\bborder-slate-700\/50\b/g, to: 'border-slate-300 dark:border-slate-700/50' },
  { from: /\bbg-slate-900\/50\b/g, to: 'bg-slate-100 dark:bg-slate-900/50' },
  { from: /\bbg-slate-800\/50\b/g, to: 'bg-slate-100 dark:bg-slate-800/50' },
  { from: /\bbg-slate-800\/30\b/g, to: 'bg-slate-100 dark:bg-slate-800/30' },
  { from: /\bbg-slate-700\/50\b/g, to: 'bg-slate-200 dark:bg-slate-700/50' },
  { from: /\bbg-slate-700\/30\b/g, to: 'bg-slate-200 dark:bg-slate-700/30' }
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  replacements.forEach(({ from, to }) => {
    // Avoid double replacements if the script is run multiple times
    content = content.replace(from, (match, offset, fullText) => {
      // Basic check to see if we already replaced this
      const substring = fullText.substring(Math.max(0, offset - 20), offset);
      if (substring.includes('dark:')) {
        return match;
      }
      return to;
    });
  });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed ${path.basename(filePath)}`);
}

// Ignore HeroSection as I already updated it manually
const ignoreFiles = ['HeroSection.tsx'];

fs.readdirSync(sectionsDir).forEach(file => {
  if (file.endsWith('.tsx') && !ignoreFiles.includes(file)) {
    processFile(path.join(sectionsDir, file));
  }
});
