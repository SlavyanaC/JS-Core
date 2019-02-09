function solve(arr) {
    return arr.join(arr.pop());
}

console.log(solve(['One',  'Two',  'Three',  'Four',  'Five',  '-']));