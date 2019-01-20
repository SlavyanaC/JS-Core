getTimeToWalk(4000, 0.60, 5);
getTimeToWalk(2564, 0.70, 5.5);

function getTimeToWalk(steps, footprintLength, speedInKm) {
    let distanceInMeters = steps * footprintLength;

    let speedForMeterInSecond = speedInKm / 3.6;
    let timeSeconds = Math.round(distanceInMeters / speedForMeterInSecond);

    let rests = Math.floor(distanceInMeters / 500);
    timeSeconds += rests * 60;

    let seconds = timeSeconds % 60;
    let minutes = ((timeSeconds - seconds) / 60) % 60;
    let hours = Math.floor((timeSeconds - seconds) / 3600);

    formatOutput(hours, minutes, seconds);

    function formatOutput(hours, minutes, seconds) {
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        console.log(`${hours}:${minutes}:${seconds}`);
    }
}
