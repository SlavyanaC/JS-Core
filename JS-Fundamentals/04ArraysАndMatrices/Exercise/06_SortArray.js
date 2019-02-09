function solve(arr) {
    arr = arr.sort(function compare(a, b) {
        if (a.length - b.length !== 0){
            return a.length - b.length;
        } else {
            if (a < b){
                return -1;
            } else if(a > b){
                return 1;
            } else{
                return 0;
            }
        } 
    });

    return arr.join('\r\n');
}

console.log(solve(['alpha', 'beta', 'gamma']));
console.log(solve(['Isacc', 'Theodor', 'Jack', 'Harrison', 'George']));
console.log(solve(['test', 'Deny', 'omen', 'Default']))