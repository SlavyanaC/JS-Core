function getInfo() {
    let baseUrl = 'https://judgetests.firebaseio.com/businfo/';
    let $stopId = $('#stopId');
    let url = `${baseUrl}${$stopId.val()}.json`;
    let $result = $('#result');
    $result.empty();
    $.get(url)
        .then(displayBuses)
        .catch(displayError);

    function displayBuses(stop) {
        let $stopName = $('<div>').attr('id', 'stopName').text(stop.name);
        $result.append($stopName);
        let $busesUl = $('<ul>').attr('id', 'buses');
        $result.append($busesUl);
        for (let key in stop.buses){
            let $busInfo = $('<li>').text(`Bus ${key} arrives in ${stop.buses[key]} minutes`);
            $busesUl.append($busInfo);
        }
    }

    function displayError() {
        let $error = $('<div>').attr('id', 'stopName').text('Error');
        $result.append($error);
    }
}