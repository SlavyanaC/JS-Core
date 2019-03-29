let Warehouse = require('./Warehouse');
let assert = require('chai').assert;

describe('Warehouse', function () {
    describe('constructor', function () {
        it('should throw error if negative capacity', function () {
            assert.throws(() => new Warehouse(-1), `Invalid given warehouse space`);
        });

        it('should create warehouse with valid capacity', function () {
            let warehouse = new Warehouse(100);
            assert.equal(warehouse._capacity, 100);
        });
    });

    describe('addProduct(type, product, quantity)', function () {
        it('should throw error if not enough room', function () {
            let warehouse = new Warehouse(100);
            assert.throws(() => warehouse.addProduct('test', 'product', 1000), `There is not enough space or the warehouse is already full`)
        });

        it('should add new product', function () {
            let warehouse = new Warehouse(100);
            let result = warehouse.addProduct('Food', 'product', 5);

            assert.property(result, 'product');
            assert.equal(result['product'], 5);
        });

        it('should increase existing product\'s quantity', function () {
            let warehouse = new Warehouse(100);
            warehouse.addProduct('Food', 'product', 5);
            let result = warehouse.addProduct('Food', 'product', 10);

            assert.equal(result['product'], 15);
        });
    });

    describe('revision()', function () {
        it('should return correct message if warehouse is empty', function () {
            let warehouse = new Warehouse(100);
            assert.equal(warehouse.revision(), `The warehouse is empty`);
        });

        it('should return correct revision', function () {
            let warehouse = new Warehouse(100);
            warehouse.addProduct('Food', 'watermelon', 5);
            warehouse.addProduct('Food', 'steak', 10);
            warehouse.addProduct('Drink', 'whiskey', 10);
            let expected = 'Product type - [Food]\n- watermelon 5\n- steak 10\nProduct type - [Drink]\n- whiskey 10';

            assert.equal(warehouse.revision(), expected);
        });
    });

    describe('orderProducts(type)', function () {
        it('should order products correctly ', function () {
            let warehouse = new Warehouse(100);
            warehouse.addProduct('Food', 'watermelon', 5);
            warehouse.addProduct('Food', 'steak', 10);
            warehouse.addProduct('Food', 'steak', 5);
            warehouse.addProduct('Drink', 'whiskey', 10);
            let expected = {steak: 15, watermelon: 5};
            assert.deepEqual(warehouse.orderProducts('Food'), expected);
        });
    });

    describe('occupiedCapacity()', function () {
        it('should return correct occupied capacity', function () {
            let warehouse = new Warehouse(100);
            warehouse.addProduct('Food', 'watermelon', 5);
            warehouse.addProduct('Food', 'steak', 10);
            warehouse.addProduct('Food', 'steak', 5);
            warehouse.addProduct('Drink', 'whiskey', 10);
            assert.equal(warehouse.occupiedCapacity(), 30);
        });
    });

    describe('scrapeAProduct(product, quantity)', function () {
        it('should throw error if invalid product', function () {
            let warehouse = new Warehouse(100);
            assert.throws(() => warehouse.scrapeAProduct('invalid', 1), `invalid do not exists`)
        });

        it('should reduce product\s quantity', function () {
            let warehouse = new Warehouse(100);
            warehouse.addProduct('Food', 'watermelon', 10);
            let result = warehouse.scrapeAProduct('watermelon', 5);
            assert.equal(result['watermelon'], 5);
        });

        it('should reduce product\s quantity', function () {
            let warehouse = new Warehouse(100);
            warehouse.addProduct('Food', 'watermelon', 10);
            let result = warehouse.scrapeAProduct('watermelon', 15);
            assert.equal(result['watermelon'], 0);
        });
    });
});