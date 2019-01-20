console.log(calculateFritMoney('orange', 2500, 1.80));

function calculateFritMoney(fruit, weightInGrams, pricePerKg) {
    return `I need ${(weightInGrams * pricePerKg / 1000).toFixed(2)} leva to buy ${(weightInGrams / 1000).toFixed(2)} kilograms ${fruit}.`
}