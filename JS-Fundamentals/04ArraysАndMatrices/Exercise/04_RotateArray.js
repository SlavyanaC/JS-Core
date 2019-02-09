function solve(arr) {
    let rotationsCount = arr.pop();
    for (let rotation = 0; rotation < rotationsCount; rotation++){
        if (rotationsCount % arr.length === 0){
            return arr.join(' ');
        }
        arr.unshift(arr.pop());
    }

    return arr.join(' ');
}

console.log(solve(['1','2', '3',  '4',  '2']));
console.log(solve(['Banana', 'Orange','Coconut', 'Apple','15']));