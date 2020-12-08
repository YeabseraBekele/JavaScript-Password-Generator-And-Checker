// final action to check password strength and 
// tell the user mnemonics of the password 
import {
    wordJson
} from './words.js';
import {
    newPassword
} from './main.js';
import {
    UPPERCASE_LETTERS,
    LOWERCASE_LETTERS,
    NUMBERS,
    SYMBOLS,
    ambiguousChars
} from './initializer.js';

export function tellMnemonics(newPassword) {
    const password = newPassword.value.split('');
    let mnemonic = "";
    password.forEach(value => {
        if (value.match(/[A-Z]+/)) {
            let temp = (wordJson[value]).split('');
            temp[0] = temp[0].toUpperCase();
            temp.forEach(e => mnemonic += e);
        } else {
            const temp = wordJson[value.toUpperCase()];
            if (temp === undefined)
                mnemonic += value;
            else
                mnemonic += temp;
        }
        mnemonic += " ";
    });
    document.getElementById('remember-field').innerHTML = mnemonic;
}

function countChars(charBank, copiedPassword) {
    let password = [...copiedPassword.split('')];
    let count = 0;
    password.forEach(value => {
        charBank.forEach(e => {
            if (e == value) count++;
        })
    });
    return count;
}

export function checkPassword(altFlag = 0) {
    let password = (altFlag === 0) ? title.value : newPassword.value;
    const strengthLbl = document.getElementById('strength-lbl');
    const strengthLbl2 = document.getElementById('strength-lbl-2');
    const strengthBar = document.getElementById('strength-bar');
    newPassword.value = password;

    document.getElementById('password-length-count').innerHTML = password.length + ' Total Characters'
    document.getElementById('uppercase-count').innerHTML = countChars(UPPERCASE_LETTERS, password) + ' Uppercase Letters';
    document.getElementById('lowercase-count').innerHTML = countChars(LOWERCASE_LETTERS, password) + ' Lowercase Letters'
    document.getElementById('number-count').innerHTML = countChars(NUMBERS, password) + ' Numbers';
    document.getElementById('symbol-count').innerHTML = countChars(SYMBOLS, password) + ' Symbols';
    document.getElementById('ambiguous-chars-count').innerHTML = countChars(ambiguousChars, password) + ' Ambiguous Characters';

    // check /!\ Based on password length first //
    const passwordLength = password.length;
    if (passwordLength < 8) {
        if (altFlag == 0) {
            strengthLbl.innerHTML = 'Very-Weak';
        }
        strengthBar.className = 'Very-Weak';
        strengthLbl2.innerHTML = 'Very Weak Password';
        return;
    }

    var strength = 0;
    if (password.match(/[a-z]+/)) {
        strength += 1;
    }
    if (password.match(/[A-Z]+/)) {
        strength += 1;
    }
    if (password.match(/[0-9]+/)) {
        strength += 1;
    }
    if (password.match(/[$@#&!]+/)) {
        strength += 1;
    }
    if (document.getElementById('ambChars').checked)
        strength += 1;

    let strengthType = "";
    switch (strength) {
        case 1:
            if (passwordLength >= 12)
                strengthType = 'Medium';
            else
                strengthType = 'Weak';
            break;
        case 2:
            strengthType = 'Weak';
            break;
        case 3:
            strengthType = 'Medium';
            break;
        case 4:
            strengthType = 'Strong';
            break;
        case 5:
            strengthType = "Strong";
            break
    }
    if (passwordLength >= 18 && strength > 2)
        strengthType = 'Very-Strong';
    else if (passwordLength >= 16)
        strengthType = 'Strong';

    if (altFlag == 0) {
        strengthLbl.innerHTML = strengthType;
        strengthBar.className = strengthType;
    }
    strengthLbl2.innerHTML = strengthType + ' Password';
    //console.log(passwordLength,strength);
}