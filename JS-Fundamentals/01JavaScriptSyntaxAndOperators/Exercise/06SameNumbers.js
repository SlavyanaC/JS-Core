solve(2222222);
solve(1234);

function solve(num) {
    num = num.toString();
    let areSame = true;
    let sum = +num[0];
    for (let i = 1; i < num.length; i++){
        if (num[i] !== num[0]){
            areSame = false;
        }
        sum += +num[i];
    }

    console.log(areSame);
    console.log(sum);
}
