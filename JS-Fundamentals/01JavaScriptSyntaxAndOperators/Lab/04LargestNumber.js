solve(5, -3, 16);
solve(-3, -5, -22.5);

function solve(num1, num2, num3) {
    let result = Math.max(Math.max(num1, num2), num3);
    console.log(`The largest number is ${result}.`);
}