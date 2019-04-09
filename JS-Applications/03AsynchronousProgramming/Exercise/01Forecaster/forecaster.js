function attachEvents() {
    const baseUrl = 'https://judgetests.firebaseio.com/locations.json';
    const conditionsBaseUrl = 'https://judgetests.firebaseio.com/forecast/';
    const symbols = {
        'Sunny': '&#x2600',
        'Partly sunny': '&#x26C5',
        'Overcast': '&#x2601',
        'Rain': '&#x2614',
        'Degrees': '&#176'
    };

    $('#submit').on('click', getWeather);

    async function getWeather() {
        let cities = await $.ajax({
            url: baseUrl,
        });

        let location = $('#location').val();
        let locationObj = cities.find(c => c.name === location);

        let currentConditions = await $.ajax({
            url: conditionsBaseUrl + 'today/' + locationObj.code + '.json',
        });

        let upcomingForecast = await $.ajax({
            url: conditionsBaseUrl + 'upcoming/' + locationObj.code + '.json',
        });

        $('#forecast').css('display', 'block');
        displayCurrentConditions(currentConditions);
        displayUpcomingForecast(upcomingForecast);
    }

    function displayCurrentConditions(currentConditions) {
        let currentCondition = currentConditions.forecast.condition;
        let temperature = currentConditions.forecast.low + symbols['Degrees'] + '/' + currentConditions.forecast.high + symbols['Degrees'];
        $('#current')
            .append($('<span>')
                .addClass('condition symbol')
                .html(symbols[currentCondition]))
            .append($('<span>').addClass('condition')
                .append($('<span>')
                    .addClass('forecast-data')
                    .text(currentConditions.name))
                .append($('<span>')
                    .addClass('forecast-data')
                    .html(temperature))
                .append($('<span>')
                    .addClass('forecast-data')
                    .text(currentCondition)));
    }

    function displayUpcomingForecast(upcomingForecast) {
        for (let day of upcomingForecast.forecast) {
            let temperature = day.low + symbols['Degrees'] + '/' + day.high + symbols['Degrees'];
            $('#upcoming')
                .append($('<span>')
                    .addClass('upcoming')
                    .append($('<span>')
                        .addClass('symbol')
                        .html(symbols[day.condition]))
                    .append($('<span>')
                        .addClass('forecast-data')
                        .html(temperature))
                    .append($('<span>')
                        .addClass('forecast-data')
                        .text(day.condition)));
        }
    }
}