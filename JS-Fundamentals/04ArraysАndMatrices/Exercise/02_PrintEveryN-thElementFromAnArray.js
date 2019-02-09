function solve(arr) {
    let step = +arr.pop();
    let result = [];
    for (let i = 0; i < arr.length; i += step) {
        result.push(arr[i]);
    }

    return result.join('\r\n');
}

console.log(solve(['5', '20', '31', '4', '20', '2']));