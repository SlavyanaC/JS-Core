function solve(matrix) {
    return checkRows(matrix) && checkCols(matrix);

    function checkRows(matrix) {
        let firstArrSum = sumRowDigits(matrix[0]);
        for (let arrIndex = 1; arrIndex < matrix.length; arrIndex++) {
            let currentArrSum = sumRowDigits(matrix[arrIndex]);
            if (firstArrSum !== currentArrSum) {
                return false;
            }
        }

        function sumRowDigits(arr) {
            let sum = 0;
            for (let elem of arr) {
                sum += elem;
            }
            return sum;
        }

        return true;
    }

    // TODO: finish this
    function checkCols(matrix) {
        let expectedSum = 0;

        for (let colIndex = 0; colIndex < matrix.length; colIndex++) {
            let currentColSum = calculateColSum(colIndex, matrix);
        }

        function calculateColSum(colIndex, matrix) {
            return undefined;
        }

        return false;
    }
}

console.log(solve(
    [[4, 5, 6],
        [6, 5, 4],
        [5, 5, 5]]));

console.log(solve(
    [[11, 32, 45],
        [21, 0, 1],
        [21, 1, 1]]
));