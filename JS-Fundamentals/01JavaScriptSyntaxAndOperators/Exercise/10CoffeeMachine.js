function solve(arr) {
    let drinkTypes = ['coffee', 'tea'];
    let drinkPrices = {'tea': 0.8, 'caffeine': 0.8, 'decaf': 0.9,};
    let drink = {};
    let incomeReport = 0;
    for (let orderIndex = 0; orderIndex < arr.length; orderIndex++) {
        let orderTokens = arr[orderIndex].split(', ');
        let coinsInserted = +orderTokens[0];
        drink.name = orderTokens[1];
        if (drink.name === drinkTypes[0]) { // coffee
            drink.caffeineType = orderTokens[2];
            let hasMilk = orderTokens[3] === 'milk';
            drink.milkMultiplier = hasMilk ? 1.1 : 1;
            hasMilk ? (drink.sugarPrice = +orderTokens[4] === 0 ? 0 : 0.1) :
                      (drink.sugarPrice = +orderTokens[3] === 0 ? 0 : 0.1);
        } else { // tea
            drink.caffeineType = 'tea';
            let hasMilk = orderTokens[2] === 'milk';
            drink.milkMultiplier = hasMilk ? 1.1 : 1;
            hasMilk ? (drink.sugarPrice = +orderTokens[3] === 0 ? 0 : 0.1) :
                      (drink.sugarPrice = +orderTokens[2] === 0 ? 0 : 0.1)
        }
        let drinkPrice = drinkPrices[drink.caffeineType];
        drink.totalPrice = (+(drinkPrice * drink.milkMultiplier).toFixed(1) + drink.sugarPrice);
        let areCoinsEnough = coinsInserted >= drink.totalPrice;
        let absDiff = Math.abs(drink.totalPrice - coinsInserted);
        let result;
        if (areCoinsEnough) {
            result = `You ordered ${drink.name}. Price: ${drink.totalPrice.toFixed(2)}$ Change: ${absDiff.toFixed(2)}$`;
            incomeReport += +drink.totalPrice;
        } else {
            result = `Not enough money for ${drink.name}. Need ${absDiff.toFixed(2)}$ more.`;
        }
        console.log(result);
    }

    console.log(`Income Report: ${incomeReport.toFixed(2)}$`);
}

solve(['1.00, coffee, caffeine, milk, 4', '0.40, tea, milk, 2', '1.00, coffee, decaf, 0']);
solve(['8.00, coffee, decaf, 4', '1.00, tea, 2']);
