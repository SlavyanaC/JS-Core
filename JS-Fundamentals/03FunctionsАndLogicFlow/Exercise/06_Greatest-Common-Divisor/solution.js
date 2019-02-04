function greatestCD() {
    let firstNumElement = document.getElementById('num1');
    let secondNumElement = document.getElementById('num2');
    let resultElement = document.getElementById('result');
    resultElement.innerHTML = calculate(+firstNumElement.value, +secondNumElement.value);

    function calculate(num1, num2) {
        if (!num2) {
            return num1;
        }
        return calculate(num2, num1 % num2);
    }
}