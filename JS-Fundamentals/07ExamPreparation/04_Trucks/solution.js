function solve() {
    let trucks = [];
    let backupTiresSets = [];

    document.getElementsByTagName('button')[0].addEventListener('click', addTruck);
    document.getElementsByTagName('button')[1].addEventListener('click', addTires);
    document.getElementsByTagName('button')[2].addEventListener('click', work);
    document.getElementsByTagName('button')[3].addEventListener('click', endShift);

    function addTruck() {
        let plateNumber = document.getElementById('newTruckPlateNumber').value;
        let tiresCondition = document.getElementById('newTruckTiresCondition').value;
        if (!trucks.some(t => t.plateNumber === plateNumber)) {
            let truck = {
                'plateNumber': plateNumber,
                'tiresCondition': tiresCondition.split(' ').filter(el => el !== '').map(t => +t),
                'traveledDistance': 0,
            };
            trucks.push(truck);

            let trucksDiv = document.createElement('div');
            trucksDiv.classList.add('truck');
            trucksDiv.innerHTML = truck.plateNumber;

            let allTrucksDiv = document.querySelector('#exercise > section:nth-child(2) > fieldset:nth-child(2) > legend');
            allTrucksDiv.appendChild(trucksDiv);
        }
    }

    function addTires() {
        let tiresSet = document.getElementById('newTiresCondition').value;
        tiresSet = tiresSet.split(' ').filter(el => el !== '').map(t => +t);
        backupTiresSets.push(tiresSet);

        let tiresDiv = document.createElement('div');
        tiresDiv.classList.add('tireSet');
        tiresDiv.innerHTML = tiresSet.join(' ');

        let allTiresDiv = document.querySelector('#exercise > section:nth-child(2) > fieldset:nth-child(1) > div');
        allTiresDiv.appendChild(tiresDiv);
    }

    function work() {
        let truckPlate = document.getElementById('workPlateNumber').value;
        let distance = +document.getElementById('distance').value;

        let truck = trucks.find(t => t.plateNumber === truckPlate);
        let requiredTireCondition = parseInt(distance / 1000);

        if (truck.tiresCondition.every(t => t >= requiredTireCondition)) {
            changeTires(truck, requiredTireCondition, distance);
        } else {
            let canChangeTiresSet = canChangeTires(truck, requiredTireCondition);
            if (canChangeTiresSet) {
                truck.tiresCondition = backupTiresSets[0];
                backupTiresSets.shift();
                changeTires(truck, requiredTireCondition, distance);
            }
        }
    }

    function changeTires(truck, requiredTireCondition, distance) {
        truck.tiresCondition = truck.tiresCondition.map(t => t -= requiredTireCondition);
        truck.traveledDistance += distance;
    }

    function canChangeTires(truck, requiredTireCondition) {
        if (backupTiresSets.length <= 0) {
            return false;
        }
        let set = backupTiresSets[0];
        for (let tire of set) {
            if (tire < requiredTireCondition) {
                return false;
            }
        }
        return true;
    }

    function endShift() {
        let resultTextArea = document.getElementsByTagName('textarea')[0];
        for (let truck of trucks) {
            resultTextArea.value += `Truck ${truck.plateNumber} has traveled ${truck.traveledDistance}.\r\n`;
        }
        resultTextArea.value += `You have ${backupTiresSets.length} sets of tires left.\r\n`;
    }
}