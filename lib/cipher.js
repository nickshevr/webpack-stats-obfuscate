const crypto = require('crypto');
const assert = require('assert');

const ALGO = 'aes-128-cbc';
const IV_LENGTH = 16;

if (process.env.NODE_ENV !== 'test') {
    assert(typeof process.env.KEY === 'string', 'Please, specify KEY env');
    assert(process.env.KEY.length === 16, 'Key should be 16 characters');
} else {
    process.env.KEY = 'g9PwJRx07He7r4Jx6r57PDPUc1vc014q'.slice(0, 16);
}

const KEY = process.env.KEY;

const encrypt = text => {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv(ALGO, Buffer.from(KEY), iv);
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
};

const decrypt = text => {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv(ALGO, Buffer.from(KEY), iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
};

module.exports = {
    decrypt,
    encrypt
};
