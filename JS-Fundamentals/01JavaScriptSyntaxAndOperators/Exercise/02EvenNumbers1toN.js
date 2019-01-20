getEvenNumbers(5)

function getEvenNumbers(num) {
    for (let i = 1; i <= num; i++) {
        if (i % 2 == 0) {
            console.log(i);
        }
    }
}