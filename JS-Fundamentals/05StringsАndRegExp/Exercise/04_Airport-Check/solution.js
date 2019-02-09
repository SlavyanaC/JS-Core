function solve() {
    let inputElement = document.getElementById('str');

    let nameRegex = new RegExp('\\s([A-Z][a-zA-Z]*)-(([A-Z][a-zA-Z]*).-)*([A-Z][a-zA-Z]*)\\s', 'g');
    let name = (inputElement.value.match(nameRegex)).toString().trim();
    name = name.replace('-', ' ');

    let flightRegex = new RegExp('\\s[A-Z]{3}\\/[A-Z]{3}', 'g');
    let flight = (inputElement.value.match(flightRegex)).toString().trim();

    let flightNumberRegex = new RegExp('\\s[A-Z]{1,3}[0-9]{1,5}\\s', 'g');
    let flightNumber = (inputElement.value.match(flightNumberRegex)).toString().trim();

    let companyRegex = new RegExp('-\\s[A-Z][a-z]*\\*[A-Z][a-z]*\\s', 'g');
    let company = (inputElement.value.match(companyRegex)).toString().trim();
    company = company.slice(2);
    company = company.replace('*', ' ');

    let infoObject = {
        'name': `Mr/Ms, ${name}, have a nice flight!`,
        'flight': `Your flight number ${flightNumber} is from ${flight.slice(0, 3)} to ${flight.slice(4)}.`,
        'company': `Have a nice flight with ${company}.`,
        'all': `Mr/Ms, ${name}, your flight number ${flightNumber} is from ${flight.slice(0, 3)} to ${flight.slice(4)}. Have a nice flight with ${company}.`
    };

    let wantedInfo = inputElement.value.split(',');
    wantedInfo = wantedInfo[wantedInfo.length - 1].trim();

    let resultElement = document.getElementById('result');
    switch (wantedInfo) {
        case 'name':
            resultElement.innerHTML = infoObject.name;
            break;
        case 'flight':
            resultElement.innerHTML = infoObject.flight;
            break;
        case 'company':
            resultElement.innerHTML = infoObject.company;
            break;
        case 'all':
            resultElement.innerHTML = infoObject.all;
            break;
    }
}