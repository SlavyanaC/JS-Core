function solve() {
    let stringElement = document.getElementById('str');
    let textElement = document.getElementById('text');

    let keyword = stringElement.value;

    let northCoordinates = getCoordinates(textElement.value, 'north');
    let eastCoordinates = getCoordinates(textElement.value, 'east');
    let messageExpression = RegExp(keyword + '(.+)' + keyword, 'g');
    let message = messageExpression.exec(textElement.value)[1];

    let northElement = document.createElement('p');
    northElement.innerHTML = northCoordinates;

    let eastElement = document.createElement('p');
    eastElement.innerHTML = eastCoordinates;

    let messageElement = document.createElement('p');
    messageElement.innerHTML = `Message: ${message}`;

    let resultElement = document.getElementById('result');
    resultElement.appendChild(northElement);
    resultElement.appendChild(eastElement);
    resultElement.appendChild(messageElement);

    function getCoordinates(text, geoPosition) {
        let regex = new RegExp(geoPosition + '.*?(\\d{2}).*?,.*?(\\d{6})', 'gmi');
        let match = text.match(regex);

        let fullCoordinates;
        if (geoPosition.toLowerCase() === 'north'){
            fullCoordinates = match[match.length - 1];
        } else {
            fullCoordinates = match[0];
        }

        let coordinatesRegex = new RegExp('(\\d{2}).*?,.*?(\\d{6})', 'gmi');
        let groups = coordinatesRegex.exec(fullCoordinates);

        return groups[1] + '.' + groups[2] + ' ' + geoPosition[0].toUpperCase();
    }
}