class Kitchen {
    constructor(budget) {
        this.budget = +budget;
        this.menu = [];
        this.productsInStock = [];
        this.actionsHistory = [];
    }

    loadProducts(products) {
        for (let product of products) {
            let tokens = product.split(' ');
            let name = tokens[0];
            let quantity = tokens[1];
            let price = tokens[2];
            if (this.budget >= price) {
                this.budget -= price;
                this._addProductToStock(name, quantity);
            } else {
                this.actionsHistory.push(`There was not enough money to load ${quantity} ${name}`)
            }
        }

        return this.actionsHistory.join('\r\n');
    }

    addToMenu(meal, neededProducts, price) {
        if (!this.menu.some(m => m.name === meal)) {
            let newMeal = {
                name: meal,
                neededProducts: neededProducts,
                price: price,
            };
            this.menu.push(newMeal);
            return `Great idea! Now with the ${meal} we have ${this.menu.length} meals in the menu, other ideas?`;
        }

        return `The ${meal} is already in our menu, try something different.`;
    }

    showTheMenu() {
        if (!this.menu.some(m => m)) {
            return 'Our menu is not ready yet, please come later...';
        }

        return this.menu.map(m => `${m.name} - $ ${m.price}`).join('\r\n').trim();
    }

    makeTheOrder(meal) {
        if (!this.menu.some(m => m.name === meal)) {
            return `There is not ${meal} yet in our menu, do you want to order something else?`;
        }

        let currentMeal = this.menu.find(m => m.name === meal);
        let haveProducts = this._checkForProducts(currentMeal);
        if (!haveProducts) {
            return `For the time being, we cannot complete your order (${meal}), we are very sorry...`;
        } else {
            this._useProducts(currentMeal);
            this.budget += currentMeal.price;
            return `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${currentMeal.price}.`
        }
    }

    _addProductToStock(name, quantity) {
        if (this.productsInStock.some(p => p.name === name)) {
            this.productsInStock.find(p => p.name === name).quantity += +quantity;
        } else {
            let product = {
                name: name,
                quantity: +quantity,
            };
            this.productsInStock.push(product);
        }

        this.actionsHistory.push(`Successfully loaded ${quantity} ${name}`)
    }

    _checkForProducts(mealObj) {
        for (let i = 0; i < mealObj.neededProducts.length; i++) {
            let productTokens = mealObj.neededProducts[i].split(' ');
            let neededProduct = productTokens[0];
            let neededQuantity = productTokens[1];
            if (!this.productsInStock.some(p => p.name === neededProduct) ||
                this.productsInStock.find(p => p.name === neededProduct).quantity < neededQuantity) {
                return false;
            }
        }

        return true;
    }

    _useProducts(mealObj) {
        for (let i = 0; i < mealObj.neededProducts.length; i++) {
            let productTokens = mealObj.neededProducts[i].split(' ');
            let neededProduct = productTokens[0];
            let neededQuantity = productTokens[1];
            this.productsInStock.find(p => p.name === neededProduct).quantity -= +neededQuantity;
        }
    }
}

(() => {
    let kitchen = new Kitchen(1000);

    console.log(kitchen.loadProducts(["Banana 10 5", "Strawberries 50 30", "Honey 5 50", "Banana 5 5"]));
    console.log(kitchen.addToMenu('Banana cake', ['Banana 83'], 7));
    console.log(kitchen.addToMenu('Honey cake', ['Honey 5;', 'Strawberries 10'], 12));
    console.log(kitchen.addToMenu('Banana cake', ['Banana 5'], 7));
    console.log(kitchen.showTheMenu());
    console.log(kitchen.makeTheOrder('Steak'));
    console.log(kitchen.makeTheOrder('Banana cake'));
    console.log(kitchen.makeTheOrder('Honey cake'));
})();