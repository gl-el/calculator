//базовые математические операции
//сложение
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
