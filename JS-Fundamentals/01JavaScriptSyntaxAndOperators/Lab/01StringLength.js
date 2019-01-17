solve('chocolate', 'ice cream', 'cake')
solve('pasta', '5', '22.3');

function solve(arg1, arg2, arg3){
    let sumLength;
    let avgLength;

    let firstStringLength = arg1.length;
    let secondStringLength = arg2.length;
    let thirdStringLength = arg3.length;

    sumLength = firstStringLength + secondStringLength + thirdStringLength;
    avgLength = Math.floor(sumLength / 3);

    console.log(sumLength);
    console.log(avgLength);
}
