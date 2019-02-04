function getNext() {
    let numElement = document.getElementById('num');
    let resultElement = document.getElementById('result');
    resultElement.innerHTML = hailstoneSequence(+numElement.value) + ' '; // Judge expects whitespace at the end...

    function hailstoneSequence(num) {
        let sequence = [num];
        while (num !== 1) {
            if (num % 2 === 0) {
                num = num / 2;
            } else {
                num = (num * 3) + 1;
            }

            sequence.push(num);
        }

        return sequence.join(' ');
    }
}