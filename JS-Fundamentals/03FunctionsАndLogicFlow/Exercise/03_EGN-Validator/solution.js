function validate() {
    let yearElement = document.getElementById('year');
    let monthsElement = document.getElementById('month');
    let dateElement = document.getElementById('date');
    let regionElement = document.getElementById('region');
    let maleElement = document.getElementById('male');
    let femaleElement = document.getElementById('female');

    document.getElementsByTagName('button')[0].addEventListener('click', () => generateEgn());

    function generateEgn() {
        let egn = '';
        let year = yearElement.value.toString().substr(-2);
        let month = addLeadingZero(monthsElement.selectedIndex);
        let date = addLeadingZero(dateElement.value);
        let region = regionElement.value.slice(0, 2);
        let gender = maleElement.checked ? 2 : 1;

        let isRegionValid = +region >= 43 && +region <= 999;
        let isYearValid = +yearElement.value >= 1900 && +yearElement.value <= 2100;
        if (!isRegionValid || !isYearValid) {
            return;
        }

        egn = year + month + date + region + gender;
        let lastDigit = calculateGenderDigit(egn);
        egn += lastDigit;

        let resultElement = document.getElementById('egn');
        resultElement.innerHTML = `Your EGN is: ${egn}`;

        (function clearFields() {
            yearElement.value = '';
            monthsElement.selectedIndex = 0;
            dateElement.value = '';
            regionElement.value = '';
            maleElement.checked = '';
            femaleElement.checked = '';
        })();
    }

    function addLeadingZero(number) {
        return +number <= 9 ? `0${number}` : number;
    }

    function calculateGenderDigit(egn) {
        let positionWeights = [2, 4, 8, 5, 10, 9, 7, 3, 6];
        let lastDigit = 0;
        for (let i = 0; i < egn.length; i++) {
            let currentDigit = +egn[i] * positionWeights[i];
            lastDigit += currentDigit;
        }
        lastDigit = +(lastDigit % 11).toString().split('').pop();
        return lastDigit;
    }
}