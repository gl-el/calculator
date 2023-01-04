//базовые математические операции
// понятно из название функции, комменты не нужны
//сложение
let firstNumber, secondNumber = "";//переменные для математических операций
function add(a, b) {
  return a + b;
}
//вычитание
function subtract(a, b) {
  return a - b;
}
//умножение
function multiply(a, b) {
  return a * b;
}
//деление
function divide(a, b) {
  return a / b;
}
//функция вызывающая выбранную операцию и подставляющая в нее значения
function operate(op, a, b) {
  switch (op) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      if (b === 0) {
        return "can't divide by 0"
      } else {
        return divide(a, b);
      }
  }
}

// не нужна
let digit; //переменная для хранения цифр с клавиатуры
let number = "";//переменная для хранения введенного числа

// не используется
let dotCounter = 0;//счетчик нажатий на точку на клавиатуре

//получаем значения цифр с кнопок
const btnsNum = document.querySelectorAll("button.number");
btnsNum.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const digit = e.target.value;//получаем значение с кнопки
    number += digit.toString();//добавляем цифру к числу
    currString = number;

    displayCurr();

    const dot = document.querySelector(".dot")

    number.indexOf(".") > -1
        ? dot.disabled = true
        : dot.disabled = false;
  });
});

//выводим числа на экран в основное поле
let currString = "";
const displayCurrent = document.querySelector(".display-current");
function displayCurr() {
  displayCurrent.textContent = currString;
}
//вывод чисел на экран в дополнительное поле
let lastString = "";
const displayLast = document.querySelector(".display-last");
function displayLst() {
  displayLast.textContent = lastString;
}
//получаем значения операций с кнопок
let operation = ""//переменная для хранения операции с кнопок
let operationPrev = ""
let operationValue = ""//переменная для хранения значений кнопок с операциями
let operationCount = "first";//определяет порядок обработки операций
const btnsOp = document.querySelectorAll("button.operations");
btnsOp.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    operationValue = e.target.value;
    operation = e.target.id;
    count();
    operationPrev = operation;
    lastString = `${firstNumber}${operationValue}`;
    displayLst();
    displayCurr();
  });
});
function count() {
  // switch
  if (operationCount === "first") {
    firstNumber = number;
    number = "";
    operationCount = "continue";
  } else if (operationCount === "afterEqual") {
    secondNumber = number;
    number = "";
    currString = firstNumber;
    operationCount = "continue";
  }
  else if (operationCount === "continue") {
    secondNumber = number;
    number = "";
    firstNumber = operate(operationPrev, Number(firstNumber), Number(secondNumber));
    if (!Number.isInteger(firstNumber)) firstNumber = Math.round((firstNumber + Number.EPSILON) * 10000) / 10000;
    currString = firstNumber.toString();
  }
}
//функция очистки
function clearDisplay() {
  firstNumber = "";
  secondNumber = "";
  number = "";
  currString = "";
  lastString = "";
  operationValue = "";
  operationCount = "first";
  displayCurr();
  displayLst();
}
const btnClear = document.getElementById("clear");
btnClear.addEventListener('click', () => {
  clearDisplay();
});
//функция удаления цифр из ввода
function removeSymbol() {
  number = number.slice(0, -1);
  currString = number;
  // второй раз проверка, можно вынести в отдельную функцию
  number.indexOf(".") > -1 ? document.querySelector(".dot").disabled = true : document.querySelector(".dot").disabled = false;
}
const btnDel = document.getElementById("del");
btnDel.addEventListener('click', () => {
  removeSymbol();
  displayCurr();
});
//считаем
const btnEqual = document.getElementById("finish");
btnEqual.addEventListener('click', () => {
  equal();
});
function equal() {
  secondNumber = number;
  let result = operate(operation, Number(firstNumber), Number(secondNumber));
  if (!Number.isInteger(result)) result = Math.round((result + Number.EPSILON) * 10000) / 10000;
  lastString = `${firstNumber}${operationValue}${secondNumber}=`;
  firstNumber = result;
  currString = `${result}`;
  displayCurr();
  displayLst();
  number = "";
  operationCount = "afterEqual"
}
//модификаторы
//плюс минус
function invert(num) {
  return (Number(num) - (Number(num) * 2)).toString();
}
const btnInvert = document.getElementById("invertion");
btnInvert.addEventListener('click', () => {
  if (operationCount === "afterEqual") {
    firstNumber = invert(firstNumber);
    currString = firstNumber;
  } else {
    number = invert(number);
    currString = number;
  }
  displayCurr();
})
//процент
const btnPercent = document.getElementById("percent");
btnPercent.addEventListener('click', () => {
  percent();
})
function percent() {
  // используй строгое равенство ===
  if (operationCount == "first") {
    firstNumber = number;
    number = "";
    firstNumber = Number(firstNumber) * 0.01;
    currString = firstNumber;
    operationCount = "afterEqual";
  } else {
    if (operation == "+" || operation == "-") {
      currString = `${number}%`;
      number = (firstNumber * 0.01 * Number(number));
    } else if (operation == "*" || operation == "/") {
      currString = `${number}%`;
      number = 0.01 * Number(number);
    }
  }
  displayCurr();
}

//ввод с клавиатуры
window.addEventListener('keydown', (e) => {
  keyPressed = e.key;
  //цифры
  if (keyPressed >= 0 && keyPressed <= 9) {
    document.getElementById(keyPressed).click();
  }
  //разделитель
  if (keyPressed == "." || keyPressed == ",") {
    document.getElementById("dot").click();
  }
  //математические операции
  if (keyPressed == "-" || keyPressed == "+" || keyPressed == "*" || keyPressed == "/") {
    document.getElementById(keyPressed).click();
  }
  //нажатие кнопки =
  if (keyPressed == "Enter") {
    document.getElementById("finish").click();
  }
  //удаление посимвольное
  if (keyPressed == "Backspace") {
    document.getElementById("del").click()
  }
  //очистка дисплея
  if (keyPressed == "Delete") {
    document.getElementById("clear").click();
  }
  //нажатие процента
  if (keyPressed == "%") {
    document.getElementById("percent").click();
  }
});
btns = document.querySelectorAll("button");
function defBtn() {
  btns.forEach((btn) => {
    btn.classList.remove("button-active");
  });
};

btns.forEach((btn) => {
  btn.addEventListener('click', () => {
    defBtn();
    btn.classList.add("button-active");
  });
});