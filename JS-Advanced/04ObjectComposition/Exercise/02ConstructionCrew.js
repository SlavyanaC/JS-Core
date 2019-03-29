function solve(worker) {
    if (!worker.handsShaking) {
        return worker;
    }

    let weight = worker.weight;
    let experience = worker.experience;

    let requiredAmount = (weight * experience) * 0.1;

    worker.bloodAlcoholLevel += requiredAmount;
    worker.handsShaking = false;
    return worker;
}