'use strict';

const fs = require('fs');
const { pipeline, Readable } = require('stream');
const CaesarCipher = require('./transform-stream')

function encryption(keys) {
    const transformStream = new CaesarCipher(keys.shift);
    let readFormStd;

    if (!keys.input) {
        readFormStd = Readable.from(process.stdin);
    }
    
    pipeline(
        (keys.input)
            ? fs.createReadStream(keys.input)
            : readFormStd,
        transformStream,
        (keys.output)
            ? fs.createWriteStream(keys.output, { flags: 'a' })
            : process.stdout,
        (err) => { if (err) console.error('Pipline failed', err); },
    )
}

module.exports = { encryption };