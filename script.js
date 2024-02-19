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
  return str.replace(regex, '');
}

//i flag = case insensitive
//Number inputs only allow the 'e' to occur between two digits. To match any number, we can use the character class [0-9]
// \d = any digit
//The + modifier in a regex allows you to match a pattern that occurs one or more times.
function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

//insertAdjacentHtml('string that specifies the position of the inserted element', 'string containing the HTML to be inserted').

function addEntry() {
  const targetInputContainer = document.querySelector(
    `#${entryDropdown.value} .input-container`
  );
  const entryNumber =
    targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
  const HTMLString = `<div class="entry">
    <div>
        <label for="${entryDropdown.value}-${entryNumber}-name">Name:</label>
        <input type="text" id="${entryDropdown.value}-${entryNumber}-name"/>
    </div>
    <div>
        <label for="${entryDropdown.value}-${entryNumber}-calories">Calories:</label>
        <input
        type="number"
        min="0"
            id="${entryDropdown.value}-${entryNumber}-calories"
            />
    </div>
  </div>`;
  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
}

function calculateCalories(e) {
  e.preventDefault();
  isError = false;

  const breakfastNumberInputs = document.querySelectorAll(
    '#breakfast input[type=number]'
  );
  const lunchNumberInputs = document.querySelectorAll(
    '#lunch input[type=number]'
  );
  const dinnerNumberInputs = document.querySelectorAll(
    '#dinner input[type=number]'
  );
  const snacksNumberInputs = document.querySelectorAll(
    '#snacks input[type=number]'
  );
  const exerciseNumberInputs = document.querySelectorAll(
    '#exercise input[type=number]'
  );

  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

  if (isError) {
    return;
  }

  const consumedCalories =
    breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  const remainingCalories =
    budgetCalories - consumedCalories + exerciseCalories;
  const surplusOrDeficit = remainingCalories < 0 ? 'Surplus' : 'Deficit';
  output.innerHTML = `
    <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(
    remainingCalories
  )} Calorie ${surplusOrDeficit}</span>
    <hr>
    <p>${budgetCalories} Calories Budgeted</p>
    <p>${consumedCalories} Calories Consumed</p>
    <p>${exerciseCalories} Calories Burned</p>
    `;

  output.classList.remove('hide');
}

function getCaloriesFromInputs(list) {
  let calories = 0;

  for (const item of list) {
    const currVal = cleanInputString(item.value);
    const invalidInputMatch = isInvalidInput(currVal);

    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    calories += Number(currVal);
  }
  return calories;
}

/*
document.querySelectorAll returns a NodeList, which is array-like but is not an array. 
However, the Array object has a .from() method that accepts an array-like and returns an array. 
This is helpful when you want access to more robust array methods.
*/
function clearForm() {
  const inputContainers = Array.from(
    document.querySelectorAll('.input-container')
  );

  for (const container of inputContainers) {
    container.innerHTML = '';
  }

  budgetNumberInput.value = '';
  output.innerText = '';
  output.classList.add('hide');
}

addEntryButton.addEventListener('click', addEntry);
calorieCounter.addEventListener('submit', calculateCalories);
clearButton.addEventListener('click', clearForm);
