class Vacationer {
    constructor(fullName, creditCard) {
        this.fullName = fullName;
        this.creditCard = creditCard;
        this.wishList = [];
        this.idNumber = this.generateIDNumber();
    }

    get creditCard() {
        return this._creditCard;
    }

    set creditCard(value) {
        if (value === undefined) {
            this._creditCard = {cardNumber: 1111, expirationDate: '', securityNumber: 111};
        } else {
            this._creditCard = {cardNumber: value[0], expirationDate: value[1], securityNumber: value[2]};
        }
    }

    get fullName() {
        return this._fullName;
    }

    set fullName(value) {
        let pattern = /^[A-Z]{1}[a-z]+$/;
        if (value.length !== 3) {
            throw new Error('Name must include first name, middle name and last name');
        } else if (!value[0].match(pattern) || !value[1].match(pattern) || !value[2].match(pattern)) {
            throw new Error('Invalid full name');
        }

        this._fullName = {firstName: value[0], middleName: value[1], lastName: value[2]};
    }

    generateIDNumber() {
        let firstName = this.fullName['firstName'];
        let middleName = this.fullName['middleName'];
        let lastName = this.fullName['lastName'];
        let vowels = ["a", "e", "o", "i", "u"];
        let lastLetterNum = vowels.includes(lastName[lastName.length - 1]) ? 8 : 7;

        let id = 231 * firstName.charCodeAt(0) + 139 * middleName.length + lastLetterNum.toString();
        return id;
    }

    addCreditCardInfo(input) {
        if (input.length < 3) {
            throw new Error('Missing credit card information');
        } else if (typeof input[0] !== "number" || typeof input[1] !== "string" || typeof input[2] !== "number") {
            throw new Error('Invalid credit card details');
        }

        this.creditCard = input;
    }

    addDestinationToWishList(destination) {
        if (this.wishList.includes(destination)) {
            throw  new Error('Destination already exists in wishlist');
        }

        this.wishList.push(destination);
        this.wishList.sort((a, b) => a.length - b.length);
    }

    getVacationerInfo() {
        let result = `Name: ${Object.values(this.fullName).join(' ')}\n`;
        result += `ID Number: ${this.idNumber}\n`;
        result += `Wishlist:\n`;
        if (this.wishList.length === 0) {
            result += 'empty';
        } else {
            result += this.wishList.join(', ');
        }
        result += '\nCredit Card:\n';
        result += `Card Number: ${this.creditCard['cardNumber']}\n`;
        result += `Expiration Date: ${this.creditCard['expirationDate']}\n`;
        result += `Security Number: ${this.creditCard['securityNumber']}`;

        return result;
    }
}

(() => {
    let fullName = ['Ani', 'Ivanova', 'Nencheva'];
    let creditCard = [123456789, "10/01/2018", 777];
    let vacationer = new Vacationer(fullName, creditCard);
    vacationer.addDestinationToWishList('New Zealand');
    vacationer.addDestinationToWishList('Israel');
    // console.log(vacationer.wishList);
    // console.log(vacationer.getVacationerInfo())

    console.log('-----------------------------------------------');
    let vacationer1 = new Vacationer(["Vania", "Ivanova", "Zhivkova"]);
    vacationer1.addCreditCardInfo(["123456789", "10/01/2018", 777]);
    console.log(vacationer1);
})();