solve(5);
solve('name');
solve([1, 5, -3]);

function solve(argument) {
    let result;
    let argumentType = typeof(argument);
    if(argumentType === "number"){
        result = Math.pow(argument, 2) * Math.PI;
        console.log(result.toFixed(2));
    }
    else {
        console.log(`We can not calculate the circle area, because we receive a ${argumentType}.`);
    }
}