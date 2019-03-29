class Vacation {
    constructor(organizer, destination, budget) {
        this.organizer = organizer;
        this.destination = destination;
        this.budget = budget;
        this.kids = {}
    }

    get numberOfChildren() {
        let result = 0;
        for (let grade of Object.keys(this.kids)){
            result += +this.kids[grade].length;
        }
        return result;
    }

    registerChild(name, grade, budget) {
        if (this.budget > budget) {
            return `${name}'s money is not enough to go on vacation to ${this.destination}.`;
        }

        if (this.kids[grade] === undefined) {
            this.kids[grade] = [];
        } else {
            if (this.kids[grade].some(k => k.name === name)) {
                return `${name} is already in the list for this ${this.destination} vacation.`
            }
        }

        this.kids[grade].push({name, budget});
    }

    removeChild(name, grade) {
        if (!this.kids[grade].some(k => k.name === name)) {
            return `We couldn't find ${name} in ${grade} grade.`
        } else {
            this.kids[grade] = this.kids[grade].filter(k => k.name !== name);
        }
    }

    toString() {
        if (this.numberOfChildren === 0){
            return `No children are enrolled for the trip and the organization of ${this.organizer} falls out...`
        }

        let result = `${this.organizer} will take ${this.numberOfChildren} children on trip to ${this.destination}\n`;
        Object.keys(this.kids).sort((a, b) => +a - +b);
        for (let grade of Object.keys(this.kids)) {
            result += `Grade: ${grade}\n`;
            let count = 0;
            for (let kid of this.kids[grade]) {
                result += `${++count}. ${kid.name}-${kid.budget}\n`;
            }
        }

        return result;
    }
}

(() => {
    let vacation = new Vacation('Mr Pesho', 'San diego', 2000);
    vacation.registerChild('Gosho', 6, 3000); // adds Gosho to grade 6
    vacation.registerChild('Stamat', 5, 1999); // Stamat doesn't have enough money
    vacation.registerChild('Pesho', 5, 2500); // adds Pesho to grade 5
    vacation.registerChild('Gosho', 5, 3000); // adds Gosho to grade 5
    vacation.registerChild('Gosho', 5, 3500); // can't add Gosho again
    vacation.removeChild('Pesho', 6); // can't remove Pesho from grade 6
    vacation.removeChild('Gosho', 6); // removes Gosho from grade 6
    console.log('' + vacation);

    let vacation = new Vacation('Miss. Elizabeth', 'The bahamas', 400);
    vacation.registerChild('Gosho', 12, 3400);
    vacation.registerChild('Pesho', 12, 400);
    vacation.registerChild('Pesho', 12, 400);
    vacation.registerChild('Skaro', 11, 400);
    vacation.registerChild('Gosho', 11, 3444);
    console.log(vacation.toString())
})();
