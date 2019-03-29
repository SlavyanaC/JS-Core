function solve(arr, sort) {
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }
    }

    let tickets = [];
    for (let item  of arr) {
        let tokens = item.split('|');
        let ticket = new Ticket(tokens[0], +tokens[1], tokens[2]);
        tickets.push(ticket);
    }

    tickets.sort((a, b) => {
        if (a[sort] < b[sort]) {
            return -1;
        } else if (a[sort] > b[sort]) {
            return 1;
        }
        return 0;
    });

    return tickets;
}

console.log(solve(['Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed'],
    'destination'
));