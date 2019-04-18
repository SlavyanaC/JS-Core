let AutoService = require('./autoService');
let assert = require('chai').assert;

describe('AutoService', function () {
    let autoService;
    beforeEach(() => {
        autoService = new AutoService(2);
    });

    describe('Constructor', function () {
        it('should set garageCapacity and initialize empty arrays', function () {
            assert.equal(autoService.garageCapacity, 2);
            assert.deepEqual(autoService.workInProgress, []);
            assert.deepEqual(autoService.backlogWork, []);
        });

        it('should set accessor', function () {
            assert.equal(autoService.availableSpace, 2);
        });
    });

    describe('signupForReview(clientName, plateNumber, carInfo)', function () {
        it('should add car to backlog if no space', function () {
            autoService.signUpForReview('Peter', 'CA1234CA', {
                'engine': 'MFRGG23',
                'transmission': 'FF4418ZZ',
                'doors': 'broken'
            });
            autoService.signUpForReview('Peter', 'CA1234CA', {
                'engine': 'MFRGG23',
                'transmission': 'FF4418ZZ',
                'doors': 'broken',
                'wheels': 'broken',
                'tires': 'broken'
            });

            autoService.signUpForReview('Philip', 'PB4321PB', {
                'engine': 'MFRGG23',
                'transmission': 'FF4418ZZ',
                'exaustPipe': 'REMUS'
            });

            let expected = [{
                plateNumber: 'PB4321PB',
                clientName: 'Philip',
                carInfo:
                    {
                        engine: 'MFRGG23',
                        transmission: 'FF4418ZZ',
                        exaustPipe: 'REMUS'
                    }
            }];

            assert.equal(autoService.backlogWork.length, 1);
            assert.deepEqual(autoService.backlogWork, expected);
        });

        it('should add car to workInProgress if free space', function () {
            autoService.signUpForReview('Peter', 'CA1234CA', {
                'engine': 'MFRGG23',
                'transmission': 'FF4418ZZ',
                'doors': 'broken'
            });

            let expected = [{
                plateNumber: 'CA1234CA',
                clientName: 'Peter',
                carInfo:
                    {engine: 'MFRGG23', transmission: 'FF4418ZZ', doors: 'broken'}
            }];

            assert.equal(autoService.workInProgress.length, 1);
            assert.deepEqual(autoService.workInProgress, expected);
        });
    });

    describe('carInfo(clientName, plateNumber)', function () {
        it('should return car from workInProgress', function () {
            autoService.signUpForReview('Peter', 'CA1234CA', {
                'engine': 'MFRGG23',
                'transmission': 'FF4418ZZ',
                'doors': 'broken'
            });
            autoService.signUpForReview('Peter', 'CA1234CA', {
                'engine': 'MFRGG23',
                'transmission': 'FF4418ZZ',
                'doors': 'broken',
                'wheels': 'broken',
                'tires': 'broken'
            });
            autoService.signUpForReview('Philip', 'PB4321PB', {
                'engine': 'MFRGG23',
                'transmission': 'FF4418ZZ',
                'exaustPipe': 'REMUS'
            });

            let expected = {
                plateNumber: 'CA1234CA',
                clientName: 'Peter',
                carInfo:
                    {engine: 'MFRGG23', transmission: 'FF4418ZZ', doors: 'broken'}
            };

            assert.deepEqual(autoService.carInfo('CA1234CA', 'Peter'), expected);
        });

        it('should return car from workInProgress', function () {
            autoService.signUpForReview('Peter', 'CA1234CA', {
                'engine': 'MFRGG23',
                'transmission': 'FF4418ZZ',
                'doors': 'broken'
            });
            autoService.signUpForReview('Peter', 'CA1234CA', {
                'engine': 'MFRGG23',
                'transmission': 'FF4418ZZ',
                'doors': 'broken',
                'wheels': 'broken',
                'tires': 'broken'
            });
            autoService.signUpForReview('Philip', 'PB4321PB', {
                'engine': 'MFRGG23',
                'transmission': 'FF4418ZZ',
                'exaustPipe': 'REMUS'
            });

            let expected = {
                plateNumber: 'PB4321PB',
                clientName: 'Philip',
                carInfo:
                    {
                        engine: 'MFRGG23',
                        transmission: 'FF4418ZZ',
                        exaustPipe: 'REMUS'
                    }
            };

            assert.deepEqual(autoService.carInfo('PB4321PB', 'Philip'), expected);
        });

        it('should return msg if no such car', function () {
            let expected = 'There is no car with platenumber PB9999PB and owner PHILIP.';
            assert.equal(autoService.carInfo('PB9999PB', 'PHILIP'), expected);
        });
    });

    describe('repairCar', function () {
        it('should return msg if no work', function () {
            let expected = 'No clients, we are just chilling...';
            assert.equal(autoService.repairCar(), expected);
        });

        it('should return msg if everything is fine', function () {
            autoService.signUpForReview('Peter', 'CA1234CA', {
                'engine': 'MFRGG23',
                'transmission': 'FF4418ZZ',
                'doors': 'fine'
            });

            let expected = 'Your car was fine, nothing was repaired.';
            assert.equal(autoService.repairCar(), expected);
        });

        it('should return msg with repaired parts', function () {
            autoService.signUpForReview('Peter', 'CA1234CA', {
                'engine': 'MFRGG23',
                'transmission': 'FF4418ZZ',
                'doors': 'broken',
                'wheels': 'broken',
                'tires': 'broken'
            });

            let expected = 'Your doors and wheels and tires were repaired.';
            assert.equal(autoService.repairCar(), expected);
        });
    });
});