console.log(solve(['Yoghurt', 48, 'Rise', 138, 'Apple', 52]))

function solve(arr) {
    let obj = {};
    for (let i = 0; i < arr.length; i += 2) {
        let objKey = arr[i];
        let objValue = arr[i + 1];
        obj[objKey] = +objValue;
    }
    return obj;
}