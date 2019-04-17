class Hotel {
    constructor(name, capacity) {
        this.name = name;
        this.capacity = capacity;
        this.bookings = [];
        this.currentBookingNumber = 1;

        this.roomsCapacity = {
            single: parseInt(this.capacity * 0.5),
            double: parseInt(this.capacity * 0.3),
            maisonette: parseInt(this.capacity * 0.2),
        }
    }

    get roomsPricing() {
        return {
            single: 50,
            double: 90,
            maisonette: 135,
        }
    }

    get servicesPricing() {
        return {
            food: 10,
            drink: 15,
            housekeeping: 25,
        }
    }

    rentARoom(clientName, roomType, nights) {
        if (this.roomsCapacity[roomType] > 0) {
            let clientBooking = {
                clientName,
                roomType,
                nights,
                roomNumber: this.currentBookingNumber,
            };
            this.currentBookingNumber++;
            this.roomsCapacity[roomType]--;

            this.bookings.push(clientBooking);
            return `Enjoy your time here Mr./Mrs. ${clientBooking.clientName}. Your booking is ${clientBooking.roomNumber}.`;
        } else {
            let output = `No ${roomType} rooms available! `;
            for (let roomType of Object.keys(this.roomsCapacity)) {
                if (this.roomsCapacity[roomType] > 0) {
                    output += `Available ${roomType} rooms: ${this.roomsCapacity[roomType]}. `;
                }
            }
            return output.trim();
        }
    }

    roomService(currentBookingNumber, serviceType) {
        if (this.bookings.some(b => b.roomNumber === currentBookingNumber)) {
            if (!this.servicesPricing.hasOwnProperty(serviceType)) {
                return `We do not offer ${serviceType} service.`;
            }
            let booking = this.bookings.find(b => b.roomNumber === currentBookingNumber);
            if (!booking.hasOwnProperty('services')) {
                booking.services = [];
            }
            booking.services.push(serviceType);
            return `Mr./Mrs. ${booking.clientName}, Your order for ${serviceType} service has been successful.`;
        } else {
            return `The booking ${currentBookingNumber} is invalid.`;
        }
    }

    checkOut(currentBookingNumber) {
        if (this.bookings.some(b => b.roomNumber === currentBookingNumber)) {
            let booking = this.bookings.find(b => b.roomNumber === currentBookingNumber);
            let nightsPrice = this._calculateNights(booking);
            let servicesPrice = this._calculateServices(booking);
            let result = `We hope you enjoyed your time here, Mr./Mrs. ${booking.clientName}. The total amount of money you have to pay is ${nightsPrice + servicesPrice} BGN.`;
            if (booking.services && booking.services.length > 0) {
                result += ` You have used additional room services, costing ${servicesPrice} BGN.`
            }

            this.roomsCapacity[booking.roomType]++;
            this.bookings = this.bookings.filter(b => b.roomNumber !== booking.roomNumber);
            return result;
        } else {
            return `The booking ${currentBookingNumber} is invalid.`;
        }
    }

    report() {
        let result = `${this.name.toUpperCase()} DATABASE:\n` + '-'.repeat(20) + '\n';
        if (this.bookings.length > 0) {
            for (let booking of this.bookings) {
                result += `bookingNumber - ${booking.roomNumber}\n`;
                result += `clientName - ${booking.clientName}\n`;
                result += `roomType - ${booking.roomType}\n`;
                result += `nights - ${booking.nights}\n`;
                if (booking.services && booking.services.length > 0) {
                    result += 'services: ' + booking.services.join(', ') + '\n';
                }
                if (booking.roomNumber !== this.currentBookingNumber - 1) {
                    result += '-'.repeat(10) + '\n';
                }
            }
        } else {
            result += 'There are currently no bookings.';
        }

        return result.trim();
    }

    _calculateNights(booking) {
        return Number(this.roomsPricing[booking.roomType] * booking.nights);
    }

    _calculateServices(booking) {
        let result = 0;
        if (booking.services && booking.services.length > 0) {
            booking.services.forEach(s => result += this.servicesPricing[s]);
        }
        return result;
    }
}

(() => {
    let hotel = new Hotel('HotUni', 10);

    hotel.rentARoom('Peter', 'single', 4);
    hotel.rentARoom('Robert', 'double', 4);
    hotel.rentARoom('Geroge', 'maisonette', 6);

    hotel.roomService(3, 'housekeeping');
    hotel.roomService(3, 'drink');
    hotel.roomService(2, 'room');

    console.log(hotel.report());

})();