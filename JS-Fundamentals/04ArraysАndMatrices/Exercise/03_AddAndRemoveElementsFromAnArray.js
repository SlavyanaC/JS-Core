function solve(arr) {
    let num = 1;
    let resultArr = [];
    for (let element of arr) {
        if (element === 'add') {
            resultArr.push(num);
        } else if (element === 'remove') {
            resultArr.pop();
        }

        num++;
    }

    return resultArr.length >= 0 ? resultArr.join('\n\r') : 'Empty';
}

console.log(solve(['add', 'add', 'add', 'add']));
console.log(solve(['add', 'add', 'remove', 'add', 'add']));