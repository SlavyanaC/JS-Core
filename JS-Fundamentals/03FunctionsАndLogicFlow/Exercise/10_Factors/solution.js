function solve() {
    let numElement = document.getElementById('num');
    let num = +numElement.value;
    let result = [];
    for (let i = 1; i <= num; i++){
        if (num % i ===0) {
            result.push(i);
        }
    }

    let resultElement = document.getElementById('result');
    resultElement.innerHTML = result.join(' ');
}