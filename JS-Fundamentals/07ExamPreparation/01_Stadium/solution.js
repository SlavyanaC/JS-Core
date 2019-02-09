function solve() {
    let sectors = ['A', 'B', 'C'];
    let ticketPrices = {
        'A': (zone) => {
            if (zone === 'VIP') {
                return 25;
            }
            return 10;
        },
        'B': (zone) => {
            if (zone === 'VIP') {
                return 15;
            }
            return 7;
        },
        'C': (zone) => {
            if (zone === 'VIP') {
                return 10;
            }
            return 5;
        },
    };
    let sectionElements = document.querySelectorAll('#exercise section');
    let totalProfit = 0;
    let totalFans = 0;

    for (let sector of sectionElements) {
        let team = sector.className;
        let table = sector.getElementsByTagName('table')[0];
        let rows = table.querySelectorAll('tbody tr');

        for (let row of rows) {
            for (let seatIndex = 0; seatIndex < 3; seatIndex++) {
                let td = row.children[seatIndex];
                let btn = td.getElementsByTagName('button')[0];
                btn.addEventListener('click', () => {
                    let ticketPrice = ticketPrices[sectors[seatIndex]](team);
                    let sector = sectors[seatIndex];
                    bookSeat(ticketPrice, btn, team, sector);
                });
            }
        }
    }

    let summaryElement = document.getElementById('summary');
    summaryElement.getElementsByTagName('button')[0].addEventListener('click', () =>{
        let spanElement = summaryElement.getElementsByTagName('span')[0];
        spanElement.innerHTML = `${totalProfit} leva, ${totalFans} fans.`;
    });

    function bookSeat(ticketPrice, btn, team, sector) {
        console.log(btn);
        let resultTextArea = document.getElementById('output');
        let seatNumber = btn.innerHTML;
        if (!btn.getAttribute('style')){
            btn.style.color = 'rgb(255,0,0)';
            totalProfit += +ticketPrice;
            totalFans++;
            resultTextArea.value += ` Seat ${seatNumber} in zone ${team} sector ${sector} was taken.\r\n`;
        } else {
            resultTextArea.value += ` Seat ${seatNumber} in zone ${team} sector ${sector} is unavailable.\r\n`;
        }
    }
}