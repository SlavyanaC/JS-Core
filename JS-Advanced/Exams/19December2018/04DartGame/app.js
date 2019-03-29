function dart() {
    let layers = {
        firstLayer: 0,
        secondLayer: 1,
        thirdLayer: 2,
        fourthLayer: 3,
        fifthLayer: 4,
        sixthLayer: 5,
    };
    let isHome = true;

    let $playBoard = $('#playBoard');
    $playBoard.on('click', (e) => {
        let hitLayer = e.target.id;
        let points = Array.from($('table tbody tr td').filter(i => i % 2 === 1));
        let hitDiv = points[layers[hitLayer]];
        let hitPoints = hitDiv.textContent.substring(0, hitDiv.textContent.indexOf(' '));

        let $homeScore = $('#Home');
        let $awayScore = $('#Away');
        let $turns = $('#turns');
        let isFunctioning = true;

        if (isHome) {
            increaseHomeScore();
        } else {
            increaseAwayScore();
        }

        if (!isFunctioning) {
            $playBoard.off('click');
        }

        isHome = !isHome;

        function increaseHomeScore() {
            $homeScore.children()[0].textContent = (+$homeScore.children()[0].textContent + +hitPoints);
            let awayTurn = $('#turns p')[1];
            $turns.prepend(awayTurn);
            if ($homeScore.children()[0].textContent >= 100) {
                $homeScore.children()[1].style.backgroundColor = 'green';
                $awayScore.children()[1].style.backgroundColor = 'red';
                isFunctioning = false;
            }
        }

        function increaseAwayScore() {
            $awayScore.children()[0].textContent = (+$awayScore.children()[0].textContent + +hitPoints);
            let homeTurn = $('#turns p')[1];
            $turns.prepend(homeTurn);

            if ($awayScore.children()[0].textContent >= 100) {
                $awayScore.children()[1].style.backgroundColor = 'green';
                $homeScore.children()[1].style.backgroundColor = 'red';
                isFunctioning = false;
            }
        }
    });
}