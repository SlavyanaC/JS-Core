solve('1', '5' );
solve('-8', '20');

function solve(num1, num2) {
    let result = 0;
    for (let i = +num1; i <= +num2; i++){
        result += i;
    }

    console.log(result)
}
