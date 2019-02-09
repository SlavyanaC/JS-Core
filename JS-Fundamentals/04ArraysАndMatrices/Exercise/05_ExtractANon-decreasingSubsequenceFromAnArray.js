function solve(arr) {
    let currentBiggest = arr[0];
    let resultArr = [];
    resultArr.push(currentBiggest);
    for (let index = 1; index < arr.length; index++) {
        if (arr[index] >= currentBiggest) {
            currentBiggest = arr[index];
            resultArr.push(arr[index]);
        }
    }

    return resultArr.join('\r\n');
}

console.log(solve([1, 3, 8, 4, 10, 12, 3, 2, 24]));