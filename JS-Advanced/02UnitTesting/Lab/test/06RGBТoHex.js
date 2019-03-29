let assert = require('chai').assert;

function rgbToHexColor(red, green, blue) {
    if (!Number.isInteger(red) || (red < 0) || (red > 255))
        return undefined; // Red value is invalid
    if (!Number.isInteger(green) || (green < 0) || (green > 255))
        return undefined; // Green value is invalid
    if (!Number.isInteger(blue) || (blue < 0) || (blue > 255))
        return undefined; // Blue value is invalid
    return "#" +
        ("0" + red.toString(16).toUpperCase()).slice(-2) +
        ("0" + green.toString(16).toUpperCase()).slice(-2) +
        ("0" + blue.toString(16).toUpperCase()).slice(-2);
}

describe('rgbToHexColor', function () {
    it('should return color in hexadecimal with three nums in range of 0 to  255', function () {
        let red = 150;
        let green = 250;
        let blue = 35;

        let result = rgbToHexColor(red, green, blue);
        let expect = '#96FA23';
        let firstChar = result[0];

        assert.equal(result.toUpperCase(), result, `${result} is not upper case`);
        assert.equal(result, expect, `${result} is not equal to ${expect}`);
        assert.equal(firstChar, '#', 'Result not starting with #');
        assert.equal(result.length, 7, 'Result lenght in incorrect');
    });

    it('should return color in hexadecimal with three numbers', function () {
        let red = 150;
        let green = 250;
        let blue = 35;

        let result = rgbToHexColor(red, green, blue);
        let expect = '#' +
            ("0" + red.toString(16).toUpperCase()).slice(-2) +
            ("0" + green.toString(16).toUpperCase()).slice(-2) +
            ("0" + blue.toString(16).toUpperCase()).slice(-2);

        assert.equal(result, expect, `${result} is not equal to ${expect}`);
    });

    it('should return color #FFFFFF with three numbers with 255 value', function () {
        let red = 255;
        let green = 255;
        let blue = 255;

        let result = rgbToHexColor(red, green, blue);
        let expect = '#FFFFFF';
        let firstChar = result[0];

        assert.equal(result.toUpperCase(), result, `${result} is not upper case`);
        assert.equal(result, expect, `${result} is not equal to ${expect}`);
        assert.equal(firstChar, '#', 'Result not starting with #');
        assert.equal(result.length, 7, 'Result lenght in incorrect');
    });

    it('should return color #000000 with three numbers with 0 value', function () {
        let red = 0;
        let green = 0;
        let blue = 0;

        let result = rgbToHexColor(red, green, blue);
        let expect = '#000000';
        let firstChar = result[0];

        assert.equal(result.toUpperCase(), result, `${result} is not upper case`);
        assert.equal(result, expect, `${result} is not equal to ${expect}`);
        assert.equal(firstChar, '#', 'Result not starting with #');
        assert.equal(result.length, 7, 'Result lenght in incorrect');
    });

    it('should return undefined with three numbers with value less than 0', function () {
        let red = -1;
        let green = -1;
        let blue = -1;

        let result = rgbToHexColor(red, green, blue);
        let expect = undefined;

        assert.equal(result, expect, `${result} is not equal to ${expect}`);
    });

    it('should return undefined with non numeric argument', function () {
        let red = '1';
        let green = 2;
        let blue = 3;

        let result = rgbToHexColor(red, green, blue);
        let expect = undefined;

        assert.equal(result, expect, `${result} is not equal to ${expect}`);
    });

    it('should return undefined with argument bigger than 255', function () {
        let red = 256;
        let green = 2;
        let blue = 3;

        let result = rgbToHexColor(red, green, blue);
        let expect = undefined;

        assert.equal(result, expect, `${result} is not equal to ${expect}`);
    });

    it('should return hexadecimal with three nums in range of 0 to 255', function () {
        let red = 1;
        let green = 2;
        let blue = 3;

        let result = rgbToHexColor(red, green, blue);
        let expect = '#010203';
        let firstChar = result[0];

        assert.equal(result, expect, `${result} is not equal to ${expect}`);
        assert.equal(firstChar, '#', 'Result not starting with #');
        assert.equal(result.length, 7, 'Result lenght in incorrect');
    });
});