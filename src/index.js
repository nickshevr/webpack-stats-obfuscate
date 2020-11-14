const lib = require('../lib');
const fs = require('fs');
const assert = require('assert');
const promisify = require('util').promisify;

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const filePath = process.argv[2];
const func = process.argv[3] || 'obfuscateStats';

assert(typeof filePath === 'string', 'Specify path as 1st argument');
assert(filePath.includes('.json'), 'Can read only json files');

readFile(filePath)
    .then(JSON.parse)
    .then(lib[func])
    .then(obfuscatedStats => {
        const newPath = filePath.split('.json');

        return writeFile(`${newPath[0]}.${func}.json`, JSON.stringify(obfuscatedStats));
    })
    .catch(console.error);
