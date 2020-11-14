const {encrypt, decrypt} = require('./cipher');
const {obfuscateNumber} = require('./number');

const IGNORE_STRINGS = [
    'node_modules',
    'lib',
    'src',
];

const IGNORED_ARRAYS = [
    'chunks',
];

const IGNORED_NUMBERS = [
    'id',
    'id2',
];

const IGNORED_KEYS = [
    'source',
];

const obfuscateStats = (stats, func = encrypt) => {
    const queue = [{
        node: stats,
        parent: null,
        key: null,
    }];

    for (const vertex of queue) {
        const {node, parent, key} = vertex;

        if (IGNORED_KEYS.includes(key)) {
            continue;
        }

        if (Array.isArray(node) && !IGNORED_ARRAYS.includes(key)) {
            for (let i = 0; i < node.length; i++) {
                queue.push({
                    node: node[i],
                    parent: node,
                    key: i,
                });
            }
        }

        if (typeof node === 'object' && !!node) {
            for (const [key, value] of Object.entries(node)) {
                queue.push({
                    node: value,
                    parent: node,
                    key,
                });
            }
        }

        if (typeof node === 'string') {
            const tokens = node.split('/');
            const newName = tokens.reduce((acc, elem) => {
                if (IGNORE_STRINGS.includes(elem)) {
                    acc += `${elem}/`;

                    return acc;
                }

                if (elem === '.') {
                    acc += `${elem}/`;

                    return acc;
                }

                acc += `${func(elem)}/`;

                return acc;
            }, '');

            parent[key] = newName.slice(0, -1) + '.js';
        }

        if (typeof node === 'number' && !IGNORED_NUMBERS.includes(key)) {
            parent[key] = obfuscateNumber(node);
        }
    }

    return stats;
};

const decryptStats = stats => obfuscateStats(stats, decrypt);

module.exports = {
    obfuscateStats,
    decryptStats,
};
