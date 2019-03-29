(function solve(obj) {
    let engines = [
        {power: 90, volume: 1800},
        {power: 120, volume: 2400},
        {power: 200, volume: 3500},
    ];

    let carriages = [
        {type: 'hatchback', color: ''},
        {type: 'coupe', color: ''}
    ];

    let result = {};
    result.model = obj.model;
    result.engine = engines.find(e => e.power >= obj.power);
    result.carriage = carriages.find(c => c.type === obj.carriage);
    result.carriage.color = obj.color;
    result.wheels = [...Array(4)].map(() => obj.wheelsize % 2 === 1 ? obj.wheelsize : obj.wheelsize - 1);

    return result;
})({
    model: 'Opel Vectra',
    power: 110,
    color: 'grey',
    carriage: 'coupe',
    wheelsize: 17
});