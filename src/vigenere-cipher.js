const { NotImplementedError } = require('../lib');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct; 
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }
_validate(message, key) {
    if (message === undefined || key === undefined) {
      throw new Error('Incorrect arguments!');
    }
  }

  _cipher(text, key, encrypt) {
    this._validate(text, key);

    const msg = text.toUpperCase();
    const k = key.toUpperCase();
    let result = '';
    let keyIdx = 0;

    for (let i = 0; i < msg.length; i++) {
      const ch = msg[i];

      if (this.alphabet.includes(ch)) {
        const keyChar = k[keyIdx % k.length];
        const shift = this.alphabet.indexOf(keyChar);

        let newIdx;
        if (encrypt) {
          newIdx = (this.alphabet.indexOf(ch) + shift) % 26;
        } else {
          newIdx = (this.alphabet.indexOf(ch) - shift + 26) % 26;
        }

        result += this.alphabet[newIdx];
        keyIdx++;
      } else {
        result += ch;
      }
    }

    return this.direct ? result : [...result].reverse().join('');
  }
  
  encrypt(message, key) {
   return this._cipher(message, key, true);
  }

  decrypt(encryptedMessage, key) {
    return this._cipher(encryptedMessage, key, false);
  }
}

module.exports = {
  directMachine: new VigenereCipheringMachine(),
  reverseMachine: new VigenereCipheringMachine(false),
  VigenereCipheringMachine,
};
