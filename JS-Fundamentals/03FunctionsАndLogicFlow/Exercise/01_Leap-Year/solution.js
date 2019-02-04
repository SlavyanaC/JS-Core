function leapYear() {
    let button = document.getElementsByTagName('button')[0];
    button.addEventListener('click', () => {
        let inputField = document.getElementsByTagName('input')[0];
        let yearDiv = document.getElementById('year');
        let yearHeader = yearDiv.firstElementChild;
        yearHeader.innerHTML = `${isLeap(inputField.value) ? 'Leap Year' : 'Not Leap Year'}`;
        let inputDiv = yearDiv.lastElementChild;
        inputDiv.innerHTML = inputField.value;
        inputField.value = '';
    });

    function isLeap(year) {
        return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
    }
};