require('@babel/register');
const fs = require('fs');
const path = require('path');
const benchmarks = require('beautify-benchmark');

const { argv } = process;

const getBenchmarksToRun = () => {
  const allFiles = fs.readdirSync(__dirname);

  if (argv.includes('--all') || argv.includes('all')) {
    return allFiles.filter(x => x !== 'index.js');
  }

  const argvs = argv.slice(2, argv.length);
  return allFiles.filter(file => argvs.some(arg => file.includes(arg)));
};

async function runBenchmark(filePath) {
  try {
    require(path.join(__dirname, filePath))
      .on('cycle', event => {
        benchmarks.add(event.target);
      })
      .on('complete', () => {
        benchmarks.log();
      })
      .run();
  } catch (err) {
    console.log(err);
    process.exit();
  }
}

async function main() {
  const benchmarksToRun = getBenchmarksToRun();

  for (const filePath of benchmarksToRun) {
    console.log(`Running ${filePath}`);
    await runBenchmark(filePath);
  }
}

main()
  .then(console.log)
  .catch(console.log);
