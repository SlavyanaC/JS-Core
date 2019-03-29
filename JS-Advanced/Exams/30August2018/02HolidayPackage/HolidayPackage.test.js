let HolidayPackage = require('./HolidayPackage');
let assert = require('chai').assert;

describe('HollidayPackage', function () {
    let holidayPackage;

    beforeEach(() => {
        holidayPackage = new HolidayPackage('Denmark', 'Summer');
    });

    describe('Constructor', function () {
        it('should create properties', function () {
            assert.deepEqual(holidayPackage.vacationers, []);
            assert.equal(holidayPackage.destination, 'Denmark');
            assert.equal(holidayPackage.season, 'Summer');
            assert.equal(holidayPackage.insuranceIncluded, false);
        });

        it('should throw error if insuranceIncluded is not bool', function () {
            assert.throws(() => holidayPackage.insuranceIncluded = [], 'Insurance status must be a boolean');
        });
    });

    describe('showVacationers()', function () {
        it('should show no vacationers are added', function () {
            assert.equal(holidayPackage.showVacationers(), 'No vacationers are added yet');
        });

        it('should return all vacationers', function () {
            holidayPackage.addVacationer('Ani Nencheva');
            holidayPackage.addVacationer('Slavi Chonovska');
            let expected = 'Vacationers:\n' +
                'Ani Nencheva\n' +
                'Slavi Chonovska';
            assert.equal(holidayPackage.showVacationers(), expected);
        });
    });

    describe('addVacationer(vacationerName)', function () {
        it('should throw error if name is empty', function () {
            assert.throws(() => holidayPackage.addVacationer(' '), 'Vacationer name must be a non-empty string');
        });

        it('should throw error if name is not a string', function () {
            assert.throws(() => holidayPackage.addVacationer({}), 'Vacationer name must be a non-empty string');
        });

        it('should throw error if name does not contain last name', function () {
            assert.throws(() => holidayPackage.addVacationer('Pesho'), 'Name must consist of first name and last name');
        });

        it('should add vacationer to arr', function () {
            holidayPackage.addVacationer('Stamat Georgiev');
            let expected = ['Stamat Georgiev'];
            assert.deepEqual(holidayPackage.vacationers, expected);
        });
    });

    describe('generateHolidayPackage()', function () {
        it('should throw error if arr is empty', function () {
            assert.throws(() => holidayPackage.generateHolidayPackage(), 'There must be at least 1 vacationer added');
        });

        it('should work', function () {
            holidayPackage.addVacationer('Ani Nencheva');
            holidayPackage.addVacationer('Slavi Chonovska');
            let expected = 'Holiday Package Generated\n' +
                'Destination: Denmark\n' +
                'Vacationers:\n' +
                'Ani Nencheva\n' +
                'Slavi Chonovska\n' +
                'Price: 1000';
            assert.equal(holidayPackage.generateHolidayPackage(), expected);
        });
    });
});