/* eslint-disable no-sync */
const { program } = require('commander');
const { encryption } = require('./encryptor');
const fs = require('fs');

program
  .requiredOption('-s, --shift <number>', 'a shift')
  .requiredOption('-a, --action <action>', 'an action encode/decode')
  .option('-i, --input <file-path>', 'an input file')
  .option('-o, --output <file-path>', 'an output file')
  .action(() => {
    const keys = program.opts();
    if (keys.input && !fs.existsSync(`${__dirname}/${keys.input}`)) {
      throw Error('incorrect path');
    }
    if (keys.output && !fs.existsSync(`${__dirname}/${keys.output}`)) {
      throw Error('incorrect path');
    }
    switch (keys.action) {
      case 'encode':
        encryption(keys);
        break;
      case 'decode':
        keys.shift *= -1;
        encryption(keys);
        break;
      default:
        console.error(
          "error:  required option '-a, --action <action>' not specified or incorrect action enter(it can be only encode or decode)"
        );
    }
  });

program.parse(process.argv);
