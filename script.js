//базовые математические операции
//сложение
let firstNumber, secondNumber="";//переменные для математических операций
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
            return divide(a, b);
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
        displayCurr();
    });
});
//выводим числа на экран в основное поле
const displayCurrent = document.querySelector(".display-current");
function displayCurr() {
    displayCurrent.textContent = number;
}
//вывод чисел на экран в дополнительное поле
const displayLast = document.querySelector(".display-last");
function displayLst() {
    displayLast.textContent = `${firstNumber} ${operationValue} ${secondNumber}`;
}
//получаем значения операций с кнопок
let operation = ""//переменная для хранения операции с кнопок
let operationValue = ""//переменная для хранения значений кнопок с операциями
let operationCount = 0;//счетчик количества нажатий на операции
const btnsOp = document.querySelectorAll("button.operations");
btnsOp.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        operation = e.target.id;
        operationValue = e.target.value;
        operationCount++;
        firstNumber = Number(number);
        number = "";
        displayLst();
        displayCurr();

    });
});
//модификаторы числа


//функция очистки значений
function clearDisplay() {
    firstNumber = "";
    secondNumber = "";
    number = ""
    operationValue = ""
    operationCount = 0;
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
}
const btnDel = document.getElementById("del");
btnDel.addEventListener('click', () => {
    removeSymbol();
    displayCurr();
});
//считаем
const btnEqual = document.getElementById("finish");
btnEqual.addEventListener('click', () => {
    secondNumber = Number(number);
    number = operate(operation, firstNumber, secondNumber)
    displayCurr();
    displayLst();
});
console.log(50%+10);