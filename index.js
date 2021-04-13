const calculator = {
  displayNumber: '0',
  firstNumber: null, 
  secondNumberTurn: false,
  operator: null,
};

function typeNumber(number) {
  const { displayNumber, secondNumberTurn } = calculator;
  
  if (secondNumberTurn === true) {
    calculator.displayNumber = number;
    calculator.secondNumberTurn = false;
  } else {
    calculator.displayNumber = displayNumber === '0' ? number : displayNumber + number;
  }

  console.log(calculator);
}

function operatorController(newOperator) {
  let { firstNumber, displayNumber, operator} = calculator;

  const numberTyped = parseInt(displayNumber);
  if (operator && calculator.secondNumberTurn) {
    calculator.operator = newOperator;
    return;
  }

  if (firstNumber === null && !isNaN(numberTyped)) {
    calculator.firstNumber = numberTyped;
  } else if (operator) {
    const result = doCalculation(firstNumber, numberTyped, operator);
    console.log(result);
    calculator.displayNumber = String(result);
    calculator.firstNumber = result;
  }

  calculator.secondNumberTurn = true;
  calculator.operator = newOperator;
  console.log(calculator);
}

function doCalculation(firstNumber, secondNumber, operator) {
 if (operator === '+') {
    return firstNumber + secondNumber;
  } else if (operator === '-') {
    return firstNumber - secondNumber;
  } else if (operator === '*') {
    return firstNumber * secondNumber;
  } else if (operator === '/') {
    return firstNumber / secondNumber;
  }

  return secondNumber;
}

function clearDisplay() {
  calculator.displayNumber = '0';
  calculator.firstNumber = null; 
  calculator.secondNumberTurn = false; 
  calculator.operator = null; 
}

function fillDisplay(event) {
  const display = document.querySelector('.calculator-display');
  display.value = calculator.displayNumber;
};

fillDisplay();

function deleteNumber() {
  const display = document.querySelector('.calculator-display');
  display.value = display.value.substr(0, display.value.length - 1);
  calculator.displayNumber.length > 1 ? calculator.displayNumber = display.value : calculator.displayNumber = '0';
};

const keyRows = document.querySelector('.rows');
keyRows.addEventListener('click', (event) => {
  const { target } = event;
  const { value } = target;

  if (!target === 'button') {
    return;
  }

  switch (value) {
     case '+':
     case '-':
     case '*':
     case '/':
     case '=':
       operatorController(value);
       break;
     case '⬅️':
       deleteNumber();
       break;
     case 'clear':
       clearDisplay();
       break;
     default: 
       typeNumber(value); 
  }  

  fillDisplay();
});