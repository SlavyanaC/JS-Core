function solve() {
    const validKingdoms = ['CASTLE', 'DUNGEON', 'FORTRESS', 'INFERNO', 'NECROPOLIS', 'RAMPART', 'STRONGHOLD', 'TOWER', 'CONFLUX'];

    const armyPower = {
        'MAGES': {'attack': 70, 'defense': 30},
        'FIGHTERS': {'attack': 50, 'defense': 50},
        'TANKS': {'attack': 20, 'defense': 80},
    };

    let createdCastles = [];

    $('#kingdom div button').on('click', rebuildKingdom);
    $('#characters div button').on('click', joinKingdom);
    $('#actions button').on('click', war);

    function rebuildKingdom() {
        let $inputFields = $('#kingdom div input');
        let $kingdom = $inputFields.eq(0);
        let $king = $inputFields.eq(1);

        let areValid = true;
        if (!validKingdoms.includes($kingdom.val().toUpperCase())) {
            $kingdom.val('');
            areValid = false;
        }
        if ($king.val().length < 2 || !isNaN($king.val())) {
            $king.val('');
            areValid = false;
        }

        if (areValid) {
            let $kingdomMap = $('#map').find(`#${$kingdom.val().toLocaleLowerCase()}`);

            let $h1 = $(`<h1>${$kingdom.val().toUpperCase()}</h1>`);
            let $div = $(`<div class="castle"></div>`);
            let $h2 = $(`<h2>${$king.val().toUpperCase()}</h2>`);
            let $fieldset = $(
                '<fieldset><legend>Army</legend><p>TANKS - 0</p><p>FIGHTERS - 0</p><p>MAGES - 0</p><div class="armyOutput"></div></fieldset>'
            );
            $kingdomMap.append($h1).append($div).append($h2).append($fieldset);
            $kingdomMap.css('display', 'inline-block');
            createdCastles.push($kingdom.val().toUpperCase());
        }
    }

    function joinKingdom() {
        let $inputFields = $('#characters div input');
        let $character = $inputFields.eq(3);
        let $kingdom = $inputFields.eq(4);
        let $type = $('input[type="radio"]:checked');
        let isKingdomCreated = checkIfKingdomExists($kingdom.val());

        let areValid = true;
        if ($character.val().length < 2 || !isNaN($character.val())) {
            $character.val('');
            areValid = false;
        }
        if (!isKingdomCreated) {
            $kingdom.val('');
            areValid = false;
        }

        if ($type.val() !== undefined && areValid) {
            let $p = $('#map')
                .find(`#${$kingdom.val().toLocaleLowerCase()}`)
                .find(`p:contains("${$type.val().toUpperCase()}")`);
            let temp = $p.text().split(' - ');
            $p.text(`${temp[0]} - ${++temp[1]}`);

            let $kingdomMap = $('#map').find(`#${$kingdom.val().toLocaleLowerCase()}`);
            let $army = $kingdomMap.find('.armyOutput');
            let names = $army.text();
            names += $character.val() + ' ';
            $army.text(names);
        }
    }

    function war() {
        let $inputFields = $('#actions input');
        let $attacker = $inputFields.eq(0);
        let $defender = $inputFields.eq(1);

        let attackerExists = checkIfKingdomExists($attacker.val());
        let defenderExists = checkIfKingdomExists($defender.val());

        let areValid = true;
        if (!attackerExists) {
            $attacker.val('');
            areValid = false;
        }
        if (!defenderExists) {
            $defender.val('');
            areValid = false;
        }

        if (areValid) {
            let totalAttack = calculatePower($attacker, 'attack');
            let totalDefense = calculatePower($defender, 'defense');

            if (totalAttack > totalDefense) {
                let attackerKing = $('#map').find(`#${$attacker.val().toLowerCase()}`).find('h2').text();
                let $defenderKing = $('#map').find(`#${$defender.val().toLowerCase()}`).find('h2');
                $defenderKing.text(attackerKing);
            }
        }
    }

    function calculatePower($kingdom, warSide) {
        let $kingdomMap = $('#map').find(`#${$kingdom.val().toLowerCase()}`).find('p');
        let totalPower = 0;
        for (let i = 0; i < 3; i++) {
            let kvp = $kingdomMap.eq(i).text().split(' - ');
            totalPower += armyPower[kvp[0]][warSide] * kvp[1];
        }

        return totalPower;
    }

    function checkIfKingdomExists(kingdomName) {
        return createdCastles.includes(kingdomName.toUpperCase());
    }
}

solve();
