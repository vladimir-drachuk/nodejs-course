'use strict';

const stream = require('stream');

class CaesarCipher extends stream.Transform {
    constructor(shift, options = {}) {
        options = Object.assign({}, options, { decodeStrings: false });
        super(options);
        this.shift = shift;
        this.beginLowerCase = 97;
        this.beginUpperCase = 65;
        this.endLowerCase = 122;
        this.endUpperCase = 90;
        this.alphabetAmount = 26;
    }

    _caesar(code, minValue, maxValue) {
        return (this.shift >= 0)
         ? ((code + +this.shift - minValue) % this.alphabetAmount) + minValue
         : maxValue - ((maxValue - code - +this.shift) % this.alphabetAmount);
    }

    _shift(symbol) {
        let code = symbol.charCodeAt();
        if (code >= this.beginLowerCase && code <= this.endLowerCase
         || code >= this.beginUpperCase && code <= this.endUpperCase) {
            code = (code > this.endUpperCase)
                ? this._caesar(code, this.beginLowerCase, this.endLowerCase)
                : this._caesar(code, this.beginUpperCase, this.endUpperCase)
        }
        return String.fromCharCode(code);
    }

    _transform(chunk) {
        const transformChunk = chunk
            .toString()
            .split('')
            .map((item) => this._shift(item))
            .join('')
        this.push(transformChunk)
    }
}

module.exports = CaesarCipher;