# Caesar Cipher CLI
Encode and decode a text by [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher).

## Prerequisites 
* Git - [Download & Install Git](https://git-scm.com/downloads)
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading and installing
`git clone https://github.com/vladimir-drachuk/nodejs-course`
`cd nodejs-course/caesar-cipher-cli`
`npm install` or `npm i`

## Running application
`node caesar-cli`
Examples:
`node caesar-cli --action encode --shift 3 --input 'example.txt' --output 'result.txt'`
`node caesar-cli -a decode -s 3 -i 'example.txt' -o 'result.txt'`
`node caesar-cli --action encode --shift 3`

## Options
1. -a, --action: an action encode/decode (required)
2. -s, --shift: a shift (required)
3. -i, --input: an input file (if not specified, standard stdin is used)
4. -o, --output: an output file (if not specified, standard stdout is used)