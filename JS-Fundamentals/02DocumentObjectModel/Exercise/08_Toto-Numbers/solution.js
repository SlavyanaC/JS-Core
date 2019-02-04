function solve() {
    let btn = document.getElementsByTagName('button')[0];
    btn.addEventListener('click', () => {
        let inputField = document.getElementsByTagName('input')[0];
        let numbers = inputField.value.split(' ');

        if (!areNumbersValid(numbers)) {
            return;
        }

        let divContainer = document.getElementById('allNumbers');
        for (let i = 1; i <= 49; i++) {
            let divElement = document.createElement('div');
            divElement.innerText = +i;
            divElement.classList.add('numbers');
            divContainer.appendChild(divElement);

            if (numbers.includes(i.toString())) {
                divElement.style.background = 'orange';
            }
        }

        inputField.disabled = true;
        btn.disabled = true;
    });

    function areNumbersValid(numbers) {
        if (numbers.length !== 6) {
            return false;
        }

        for (let num of numbers) {
            if (+num < 1 || +num > 49) {
                return false;
            }
        }

        return true;
    }
}