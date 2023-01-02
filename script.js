//базовые математические операции
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
        case "add":
            return add(a, b);
        case "sbtrct":
            return subtract(a, b);
        case "mltpl":
            return multiply(a, b);
        case "dvd":
            if (b === 0) {
                return "can't divide by 0"
            } else {
                return divide(a, b);
            }
    }
}
let digit; //переменная для хранения цифр с клавиатуры
let number = "";//переменная для хранения введенного числа
//получаем значения цифр с кнопок
const btnsNum = document.querySelectorAll("button.number");
btnsNum.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        digit = e.target.value;//получаем значение с кнопки
        number += digit.toString();//добавляем цифру к числу
        currString = number;
        displayCurr();
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
let operationValue = ""//переменная для хранения значений кнопок с операциями
let operationCount = "first";//счетчик количества нажатий на операции
const btnsOp = document.querySelectorAll("button.operations");
btnsOp.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        operationValue = e.target.value;
        if (operationCount === "first") {
            firstNumber = number;
            number = "";
            operation = e.target.id;
            operationCount = "continue";
        } else if (operationCount === "afterEqual") {
            secondNumber = number;
            number = "";
            operation = e.target.id;
            currString = firstNumber;
            operationCount = "continue";
        }
        else if (operationCount === "continue") {
            secondNumber = number;
            number = "";
            let operationNew = e.target.id;
            firstNumber = operate(operation, Number(firstNumber), Number(secondNumber));
            if (!Number.isInteger(firstNumber)) firstNumber = Math.round((firstNumber + Number.EPSILON) * 10000) / 10000;
            currString = firstNumber.toString();
            operation = operationNew;
        }
        lastString = `${firstNumber}${operationValue}`;
        displayLst();
        displayCurr();
    });
});
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
}
const btnDel = document.getElementById("del");
btnDel.addEventListener('click', () => {
    removeSymbol();
    displayCurr();
});
//считаем
const btnEqual = document.getElementById("finish");
btnEqual.addEventListener('click', () => {
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
});
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
    if (operationCount == "first") {
        firstNumber = number;
        number = "";
        firstNumber = Number(firstNumber) * 0.01;
        currString = firstNumber;
        operationCount = "afterEqual";
    } else {
        if (operation == "add" || operation == "sbtrct") {
            currString = `${number}%`;
            number = (firstNumber * 0.01 * Number(number));
        } else if (operation == "mltpl" || operation == "dvd") {
            currString = `${number}%`;
            number = 0.01 * Number(number);
        }
    }
    displayCurr();
})

