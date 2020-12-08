import {
  tellMnemonics,
  checkPassword
} from './password_checker.js';
import {
  generatePassword
} from './password_generator.js';

export const numberOfCharactersLbl = document.getElementById('numberOfCharsLabel');
export const newPassword = document.getElementById('new-password');
export const form = document.getElementById("passwordGeneratorForm");
const copyBtn = document.getElementById("copy-text");
const checkStrengthBtn = document.getElementById('strength');
const title = document.getElementById("title");
const passwordInput = document.getElementById("numberOfChars");

function updateNumberOfCharsLbl() {
  numberOfCharactersLbl.innerHTML = passwordInput.value;
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // Important data from index.html file // 
  const lengthOfChars = document.getElementById("numberOfChars").value;
  const ON_DATA = { // to bind the check box data 
    isUppercaseOn: document.getElementById("uppercase").checked,
    isLowercaseOn: document.getElementById('lowercase').checked,
    isNumberOn: document.getElementById('number').checked,
    isSymbolOn: document.getElementById('symbol').checked,
    isAmbOn: document.getElementById('ambChars').checked
  }

  let divisionFactor = 0;
  if (ON_DATA.isUppercaseOn) divisionFactor++;
  if (ON_DATA.isLowercaseOn) divisionFactor++;
  if (ON_DATA.isNumberOn) divisionFactor++;
  if (ON_DATA.isSymbolOn) divisionFactor++;
  if (ON_DATA.isAmbOn) divisionFactor++;

  if (divisionFactor == 0) {
    alert('Checkbox is Empty !\n Tick some checkboxes !');
    return;
  }
  const password = generatePassword(lengthOfChars, divisionFactor, ON_DATA);
  // update index.html  // 
  title.value = password;
  checkPassword(0);
  tellMnemonics(newPassword);
  return password;
});

copyBtn.addEventListener('click', () => {
  if (title.value == '') {
    alert('You didn\'t generate password yet!');
    return;
  }
  title.select();
  title.setSelectionRange(0, 99999)
  document.execCommand("copy");
  alert("Your Password is Copied! \nPassword :  " + title.value);

})
checkStrengthBtn.addEventListener('click', checkPassword);
passwordInput.addEventListener('change', updateNumberOfCharsLbl);
updateNumberOfCharsLbl(); // because the input indicator label should be updated onInit.