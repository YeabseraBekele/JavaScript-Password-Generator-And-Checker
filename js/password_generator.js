// To generate the new password //
import {
    UPPERCASE_LETTERS,
    LOWERCASE_LETTERS,
    NUMBERS,
    SYMBOLS,
    ambiguousChars
} from './initializer.js';

export function generatePassword(lenChar, divFactor, onData) {
    let partition = Math.floor(lenChar / divFactor);
    let temp = "";
    while (temp.length < lenChar) {
        if (onData.isUppercaseOn) {
            generateRandomCharsLength(UPPERCASE_LETTERS, partition).forEach(e => {
                temp += e;
            });
        }
        if (onData.isLowercaseOn) {
            generateRandomCharsLength(LOWERCASE_LETTERS, partition).forEach(e => {
                temp += e;
            });
        }
        if (onData.isNumberOn) {
            generateRandomCharsLength(NUMBERS, partition).forEach(e => {
                temp += e;
            });
        }
        if (onData.isSymbolOn) {
            generateRandomCharsLength(SYMBOLS, partition).forEach(e => {
                temp += e;
            });
        }
        if (onData.isAmbOn) {
            generateRandomCharsLength(ambiguousChars, partition).forEach(e => {
                temp += e;
            });
        }
        
    }

    temp = shufflePassword(temp.split(''));
    temp = temp.slice(0, lenChar);
    return temp;
}

function generateRandomCharsLength(charBank, length) {
    let temp = [];
    for (let i = 0; i < length; i++) {
        temp.push(charBank[Math.floor(Math.random() * (charBank.length))]);
    }
    return temp;
}

function shufflePassword(password) {
    for (let i = password.length - 1; i > 0; i--) {
        let tempSwap = password[i];
        let index = Math.floor(Math.random() * password.length);
        password[i] = password[index];
        password[index] = tempSwap;
    }
    let shuffledPassword = "";
    password.forEach(e => {
        shuffledPassword += e;
    });
    return shuffledPassword;
}