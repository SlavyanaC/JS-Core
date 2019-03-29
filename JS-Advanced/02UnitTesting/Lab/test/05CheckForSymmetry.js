let assert = require('chai').assert;

function isSymmetric(arr) {
    if (!Array.isArray(arr))
        return false; // Non-arrays are non-symmetric
    let reversed = arr.slice(0).reverse(); // Clone and reverse
    let equal = (JSON.stringify(arr) == JSON.stringify(reversed));
    return equal;
}

describe('isSymetric', function () {
    it('should return false with non array argument', function () {
        let input = 'string';
        let expected = false;
        assert.equal(isSymmetric(input), expected);
    });

    it('should return false with non symmetric arr', function () {
        let input = [1, 2, 3, 3, 1];
        let expected = false;
        assert.equal(isSymmetric(input), expected);
    });

    it('should return true with symmetric arr', function () {
        let input = [1, 2, 3, 3, 2, 1];
        let expected = true;
        assert.equal(isSymmetric(input), expected);
    });

    it('should return true with empty arr', function () {
        let input = [];
        let expected = true;
        assert.equal(isSymmetric(input), expected);
    });

    it('should return true with one element', function () {
        let input = [1];
        let expected = true;
        assert.equal(isSymmetric(input), expected);
    });

    it('should return false with elements of different types', function () {
        let input = [1, 2, '3', 3, '2', 1];
        let expected = false;
        assert.equal(isSymmetric(input), expected);
    });
});