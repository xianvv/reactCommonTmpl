const child_process = require('child_process');
const package = require('../package.json');
const buildScripts = Object.keys(package.scripts).filter(script => script.startsWith('build') && script !== 'build:all');

console.log('buildScripts:', buildScripts);
buildScripts.forEach(script => {
    child_process.exec(`yarn ${script}`, (err, stdout, stderr) => {
        console.log(stdout, stderr);
        if (err) {
            // 失败
            console.log(`失败：${script}`);
        } else {
            // 成功
            console.log(`成功：${script}`);
        }
    });
});