function validate() {
    let positionWeights = [2, 4, 8, 5, 10, 9, 7, 3, 6];
    let inputNumber = document.querySelector('div input');
    document.getElementsByTagName('button')[0]
        .addEventListener('click', () => {
            let isCorrectLength = inputNumber.value.length === 10;
            let lastDigit = inputNumber.value[inputNumber.value.length - 1];
            let digitsSum = 0;
            for (let i = 0; i < inputNumber.value.length - 1; i++) {
                let currentDigit =+inputNumber.value[i] * positionWeights[i];
                digitsSum += currentDigit;
            }

            digitsSum = +(digitsSum % 11).toString().split('').pop();

            let resultElement = document.getElementById('response');
            resultElement.innerHTML = lastDigit === digitsSum ? 'This number is Valid!' : 'This number is NOT Valid!';
        });
}