const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
let isError = false;


// \s = white space
/*To tell the pattern to match each character of a regex individually, you need to turn them into a character class. 
This is done by wrapping the characters you want to match in brackets.*/
//The g flag, which stands for "global", will tell the pattern to continue looking after it has found a match.

function cleanInputString(str) {
    const regex = /[+-\s]/g;
    return str.replace(regex, "")
  }

//i flag = case insensitive
//Number inputs only allow the 'e' to occur between two digits. To match any number, we can use the character class [0-9]
// \d = any digit
//The + modifier in a regex allows you to match a pattern that occurs one or more times. 
function isInvalidInput(str) {
    const regex = /\d+e\d+/i;
    return str.match(regex);
  }