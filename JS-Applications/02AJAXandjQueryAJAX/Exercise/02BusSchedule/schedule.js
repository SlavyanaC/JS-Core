function solve() {
    const baseUrl = 'https://judgetests.firebaseio.com/schedule/';
    let currentStop = {
        name: 'depot',
        next: 'depot',
    };

    return {
        depart: onDepart,
        arrive: onArrive,
    };

    function onDepart() {
        $.get(`${baseUrl}${currentStop.next}.json`)
            .then(depart)
            .catch(displayError);
    }

    function onArrive() {
        $.get(`${baseUrl}${currentStop.name}.json`)
            .then(arrive)
            .catch(displayError);
    }

    function depart(data) {
        currentStop.name = data.name;
        currentStop.next = data.next;
        $('.info').text(`Next stop ${currentStop.name}`);
        swapButtons();
    }

    function arrive(data) {
        $('.info').text(`Arriving at ${currentStop.name}`);
        swapButtons();
    }

    function displayError() {
        $('#depart').prop('disabled', true);
        $('#arrive').prop('disabled', true);
        $('.info').text('Error');
    }

    function swapButtons() {
        let $depart = $('#depart');
        let $arrive = $('#arrive');

        if ($depart.is(":disabled")) {
            $depart.prop('disabled', false);
            $arrive.prop('disabled', true);
        } else {
            $depart.prop('disabled', true);
            $arrive.prop('disabled', false);
        }
    }
}


let result = solve();