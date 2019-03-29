function attachEventsListeners() {
    $('#daysBtn').click(() => {
        let days = $('#days').val();
        $('#hours').val(days * 24);
        $('#minutes').val(days * 24 * 60);
        $('#seconds').val(days * 24 * 60 * 60);
    });

    $('#hoursBtn').click(() => {
        let hours = $('#hours').val();
        $('#days').val(hours / 24);
        $('#minutes').val(hours * 60);
        $('#seconds').val(hours * 60 * 60);
    });

    $('#minutesBtn').click(() => {
        let minutes = $('#minutes').val();
        $('#days').val(minutes / 60 / 24);
        $('#hours').val(minutes / 60);
        $('#seconds').val(minutes * 60);
    });

    $('#secondsBtn').click(() => {
        let seconds = $('#seconds').val();
        $('#days').val(seconds / 60 / 60 / 24);
        $('#hours').val(seconds / 60 / 60);
        $('#minutes').val(seconds / 60);
    });
}