const fs = require('fs');
const path = require('path');

const sectionsDir = path.join(__dirname, 'src', 'components', 'sections');

const replacements = [
  { from: /text-white/g, to: 'text-slate-900 dark:text-white' },
  { from: /text-slate-900 dark:text-slate-900 dark:text-white/g, to: 'text-slate-900 dark:text-white' },
  { from: /bg-\[#070B19\]/g, to: 'bg-slate-50 dark:bg-[#070B19]' },
  { from: /bg-\[#0F172A\]/g, to: 'bg-white dark:bg-[#0F172A]' },
  { from: /bg-\[#1E293B\]/g, to: 'bg-slate-100 dark:bg-[#1E293B]' },
  { from: /border-gray-800/g, to: 'border-slate-300 dark:border-gray-800' },
  { from: /border-slate-800/g, to: 'border-slate-300 dark:border-slate-800' },
  { from: /text-gray-400/g, to: 'text-slate-600 dark:text-gray-400' },
  { from: /text-slate-400/g, to: 'text-slate-600 dark:text-slate-400' },
  { from: /text-slate-300/g, to: 'text-slate-700 dark:text-slate-300' },
  { from: /bg-slate-800\/40/g, to: 'bg-slate-200/50 dark:bg-slate-800/40' },
  { from: /border-slate-700\/50/g, to: 'border-slate-300 dark:border-slate-700/50' },
  { from: /bg-slate-900\/50/g, to: 'bg-slate-200/50 dark:bg-slate-900/50' },
  { from: /bg-slate-800\/50/g, to: 'bg-slate-200/50 dark:bg-slate-800/50' },
  { from: /bg-slate-800\/30/g, to: 'bg-slate-200/30 dark:bg-slate-800/30' },
  { from: /bg-slate-700\/50/g, to: 'bg-slate-300/50 dark:bg-slate-700/50' },
  { from: /bg-slate-700\/30/g, to: 'bg-slate-300/30 dark:bg-slate-700/30' },
  { from: /text-cyan-300/g, to: 'text-cyan-700 dark:text-cyan-300' },
  { from: /text-emerald-300/g, to: 'text-emerald-700 dark:text-emerald-300' },
  { from: /bg-cyan-400\/10/g, to: 'bg-cyan-600/10 dark:bg-cyan-400/10' },
  { from: /bg-emerald-400\/10/g, to: 'bg-emerald-600/10 dark:bg-emerald-400/10' },
  { from: /border-cyan-400\/20/g, to: 'border-cyan-600/20 dark:border-cyan-400/20' },
  { from: /border-emerald-400\/20/g, to: 'border-emerald-600/20 dark:border-emerald-400/20' },
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Clean up previous faulty replacements if any
  content = content.replace(/bg-white dark:bg-\[#0F172A\]/g, 'bg-[#0F172A]');
  content = content.replace(/bg-slate-50 dark:bg-\[#0F172A\]/g, 'bg-[#0F172A]');
  content = content.replace(/bg-white dark:bg-\[#070B19\]/g, 'bg-[#070B19]');
  content = content.replace(/bg-white dark:bg-\[#1E293B\]/g, 'bg-[#1E293B]');
  content = content.replace(/text-slate-900 dark:text-white/g, 'text-white');
  content = content.replace(/text-slate-600 dark:text-gray-400/g, 'text-gray-400');
  content = content.replace(/text-slate-600 dark:text-slate-400/g, 'text-slate-400');
  content = content.replace(/text-slate-700 dark:text-slate-300/g, 'text-slate-300');
  
  replacements.forEach(({ from, to }) => {
    // We do a global replace
    content = content.replace(from, to);
  });
  
  // Clean up double darks
  content = content.replace(/dark:dark:/g, 'dark:');
  content = content.replace(/text-slate-900 text-slate-900 dark:text-white/g, 'text-slate-900 dark:text-white');
  content = content.replace(/text-slate-900 dark:text-slate-900 dark:text-white/g, 'text-slate-900 dark:text-white');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed ${path.basename(filePath)}`);
}

fs.readdirSync(sectionsDir).forEach(file => {
  if (file.endsWith('.tsx')) {
    processFile(path.join(sectionsDir, file));
  }
});
