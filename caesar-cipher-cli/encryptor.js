const fs = require('fs');
const { pipeline } = require('stream');
const CaesarCipher = require('./transform-stream');

function encryption(keys) {
  const transformStream = new CaesarCipher(keys.shift);
  pipeline(
    keys.input ? fs.createReadStream(keys.input) : process.stdin,
    transformStream,
    keys.output
      ? fs.createWriteStream(keys.output, { flags: 'a' })
      : process.stdout,
    err => {
      if (err) console.error('Pipline failed', err);
    }
  );
}

module.exports = { encryption };
