const Calculator = require('./calculator');
const assert = require('chai').assert;

describe('Calculator', function () {
    let calculator;

    beforeEach(() => {
        calculator = new Calculator();
    });

    it('should contain empty array', function () {
        assert.isArray(calculator.expenses);
        assert.isEmpty(calculator.expenses);
    });

    describe('function toString()', () => {
        it('should return "empty array" if no expenses', function () {
            let expected = 'empty array';
            let actual = calculator.toString();
            assert.equal(actual, expected);
        });

        it('should return all expenses joint by "->"', function () {
            calculator.add(5);
            calculator.add('Stamat');
            calculator.add(15);

            let expected = '5 -> Stamat -> 15';
            let actual = calculator.toString();
            assert.equal(actual, expected);
        });
    });

    describe('function add(item)', () => {
        it('should add primitive types to expenses', function () {
            calculator.add(5);
            calculator.add(1.15);
            calculator.add('Gosho');
            calculator.add(true);

            let expected = [5, 1.15, 'Gosho', true];
            let actual = calculator.expenses;
            assert.deepEqual(actual, expected);
        });

        it('should add reference types', function () {
            calculator.add({key: 'value'});
            calculator.add([1]);

            let expected = [{key: 'value'}, [1]];
            let actual = calculator.expenses;
            assert.deepEqual(actual, expected);
        });
    });

    describe('function orderBy()', () => {
        it('should order numbers in ascending order', function () {
            calculator.add(-22);
            calculator.add(4);
            calculator.add(0);
            calculator.add(3.2);
            calculator.add(23);

            let expected = '-22, 0, 3.2, 4, 23';
            let actual = calculator.orderBy();

            assert.equal(actual, expected);
        });

        it('should order other types', function () {
            calculator.add({});
            calculator.add([1,2,3]);
            calculator.add('pesho');

            let expected = '1,2,3, [object Object], pesho';
            let actual = calculator.orderBy();

            assert.equal(actual, expected);
        });
    });

    describe('function divideNums()', () =>{
        it('should throw error if expenses contains no numbers', function () {
            calculator.add('Pesho');
            calculator.add('Gosho');

            assert.throws(() => calculator.divideNums(), 'There are no numbers in the array!')
        });

        it('should divide numbers correctly', function () {
            calculator.add(10);
            calculator.add(5);
            calculator.add(2);

            let expected = 1;
            let actual = calculator.divideNums();
            assert.equal(actual, expected);
        });

        it('should return message for division by zero', function () {
            calculator.add(6.2);
            calculator.add(0);

            let expected = 'Cannot divide by zero';
            let actual = calculator.divideNums();
            assert.equal(actual, expected);
        });
    })
});