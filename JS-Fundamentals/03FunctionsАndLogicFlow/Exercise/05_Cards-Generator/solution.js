function solve() {
    let fromElement = document.getElementById('from');
    let toElement = document.getElementById('to');
    let selectElement = document.querySelector('#exercise select');

    let cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A',];

    document.getElementsByTagName('button')[0].addEventListener('click', () => {
        let suit = selectElement.options[selectElement.selectedIndex].value;
        suit = suit.split(' ')[1];
        let cardsSection = document.getElementById('cards');
        for (let i = cardValues.indexOf(fromElement.value); i <= cardValues.indexOf(toElement.value); i++) {
            let cardElement = document.createElement('div');
            cardElement.classList.add('card');

            let upperSuitElement = document.createElement('p');
            upperSuitElement.innerHTML = suit;
            cardElement.appendChild(upperSuitElement);

            let cardValueElement = document.createElement('p');
            cardValueElement.innerHTML = cardValues[i];
            cardElement.appendChild(cardValueElement);

            let bottomSuitElement = document.createElement('p');
            bottomSuitElement.innerHTML = suit;
            cardElement.appendChild(bottomSuitElement);
            cardsSection.appendChild(cardElement);
        }
    });
}