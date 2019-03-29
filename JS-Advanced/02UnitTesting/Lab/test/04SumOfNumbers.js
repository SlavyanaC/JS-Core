let assert = require('chai').assert;

function sum(arr) {
    let sum = 0;
    for (let num of arr)
        sum += Number(num);
    return sum;
}

describe('sum', function () {
    it('should return correct sum with arr of nums', function () {
        let arr = [1, 2, 3];
        let expected = 6;
        assert.equal(sum(arr), expected, `Sum of elements in ${arr} does not equal ${expected}`);
    });

    it('should return correct sum with arr of strings', function () {
        let arr = ['1', '2', '3'];
        let expected = 6;
        assert.equal(sum(arr), expected, `Sum of elements in ${arr} does not equal ${expected}`);
    });

    it('should return NaN with arr of non numeric elements', function () {
        let arr = ['test', '2', '3'];
        let expected = NaN;
        assert.isNaN(sum(arr), `Must return ${expected}, but return ${sum(arr)}`);
    });
});