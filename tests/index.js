const {obfuscateStats, decryptStats} = require('../lib');
const assert = require('assert');

const TEST_DATA = {
    modules: [
        {
            name: './node_modules/folder1/kek.js'
        },
        {
            name: './lib/kek1.js'
        },
        {
            name: './src/kek2.js'
        },
    ]
};

const encrypted = obfuscateStats(TEST_DATA);
const decrypted = decryptStats(encrypted);

for (let i = 0; i < TEST_DATA.modules.length; i++) {
    assert(TEST_DATA.modules[i] == decrypted.modules[i], 'Invalid decryption');
}

