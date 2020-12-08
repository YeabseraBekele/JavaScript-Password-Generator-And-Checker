
// Check some check boxes because it let the user to generate 
// a strong password by default 
document.getElementById("uppercase").checked = true;
document.getElementById("lowercase").checked = true;
document.getElementById("number").checked = true;
document.getElementById("symbol").checked = true;

export const UPPERCASE_LETTERS = assignCharacters(65, (65 + 26));
export const LOWERCASE_LETTERS = assignCharacters(97, (97 + 26));
export const NUMBERS = assignCharacters(48, 58);
export const SYMBOLS = ['!', '@', '#', '$', '%', '&', '*', '(', ')', '?'];
 const TEMP_AMBIGUOUS_CHARS = assignCharacters(33, 48).concat(assignCharacters(58, 65))
    .concat(assignCharacters(91, 97).concat(assignCharacters(123, 127)));

export let ambiguousChars = [];
TEMP_AMBIGUOUS_CHARS.forEach((ambChar, index) => {
    let flag = true;
    SYMBOLS.forEach(s => {
        if (s == ambChar) {
            flag = false;
        }
    })
    if (flag) {
        ambiguousChars.push(ambChar);
    }
});

function assignCharacters(fromIndex, toIndex) {
    const tempCharacterBank = [];
    for (let i = fromIndex; i < toIndex; i++) {
        tempCharacterBank.push(String.fromCharCode(i));
    }
    return tempCharacterBank;
}

