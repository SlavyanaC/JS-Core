function solve() {
    Array.from(document.querySelectorAll('#exercise div img'))
        .forEach(card => card.addEventListener('click', getCardValue));

    function getCardValue(e) {
        let cardElement = e.target;
        console.log(e);
        cardElement.src = './images/whiteCard.jpg';
        cardElement.removeEventListener('click', getCardValue);

        let playerElement = cardElement.parentNode;
        let resultSpans = document.getElementById('result').children;
        let firstPlayerResult = resultSpans[0];
        let secondPlayerResult = resultSpans[2];

        if (playerElement.id === 'player1Div') {
            firstPlayerResult.textContent = cardElement.name;
        } else if (playerElement.id === 'player2Div') {
            secondPlayerResult.textContent = cardElement.name;
        }

        if (firstPlayerResult.textContent && secondPlayerResult.textContent) {
            let winner;
            let loser;

            if (+firstPlayerResult.textContent > +secondPlayerResult.textContent) {
                winner = document.querySelector(`#player1Div img[name="${firstPlayerResult.textContent}"]`);
                loser = document.querySelector(`#player2Div img[name="${secondPlayerResult.textContent}"]`);
            } else {
                winner = document.querySelector(`#player2Div img[name="${secondPlayerResult.textContent}"]`);
                loser = document.querySelector(`#player1Div img[name="${firstPlayerResult.textContent}"]`);
            }

            winner.style.border = '2px solid green';
            loser.style.border = '2px solid darkred';

            document.getElementById('history').textContent += `[${firstPlayerResult.textContent} vs ${secondPlayerResult.textContent}] `;

            setTimeout(function(){
                firstPlayerResult.textContent = '';
                secondPlayerResult.textContent = '';
            }, 2000);
        }
    }
}