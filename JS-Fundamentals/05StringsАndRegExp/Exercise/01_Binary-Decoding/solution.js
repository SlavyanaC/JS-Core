function solve() {
    let inputElement = document.getElementById('str');
    let resultElement = document.getElementById('result');

    let inputDigitsSum = calculateInputSum(inputElement.value);
    let clearedInput = trimInput(inputElement.value, inputDigitsSum);
    resultElement.innerHTML = decodeInput(clearedInput);

    function calculateInputSum(inputDigits) {
        let sum = inputDigits.split('').reduce(function (a, b) { return +a + +b }, 0);
        if (sum > 9) {
            sum = calculateInputSum(sum.toString());
        }

        return sum;
    }

    function trimInput(inputString, inputDigitsSum) {
        inputString = inputString.slice(inputDigitsSum);
        inputString = inputString.slice(0, -inputDigitsSum);
        return inputString;
    }

    function decodeInput(clearedInput) {
        let result;
        for (let i = 0; i < clearedInput.length; i += 8) {
            let asciiCode = clearedInput.slice(i, i + 8);
            let charFromAscii = String.fromCharCode(parseInt(asciiCode, 2));
            if (charFromAscii.match(/[a-z]/i) || charFromAscii === '') {
                result += charFromAscii;
            }
        }
        result = result.slice(9);
        return result
    }
}