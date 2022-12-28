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
//фнукция вызывающая выбранную операцию и подставляющая в нее значения
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
console.log(operate("add",2,3));
console.log(operate("sbtrct",6,3));
console.log(operate("mltpl",-5,2));
console.log(operate("dvd",6,2));