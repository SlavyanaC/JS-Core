console.log(getGCD(15, 5));

function getGCD(num1, num2) {
    if (!num2) {
        return num1;
    }

    return getGCD(num2, num1 % num2);
}