function makeReservation() {
    $('#submit').on('click', onSubmit);
    $('#edit').on('click', onEdit);
    $('#continue').on('click', onContinue);

    let info = [];

    function onSubmit() {
        let fullName = $('#fullName').val();
        let email = $('#email').val();
        let phoneNumber = $('#phoneNumber').val();
        let address = $('#address').val();
        let postalCode = $('#postalCode').val();
        if (fullName !== '' && email !== '') {
            $('#infoPreview').append($('<li>').text(`Name: ${fullName}`))
                .append($('<li>').text(`E-mail: ${email}`))
                .append($('<li>').text(`Phone: ${phoneNumber}`))
                .append($('<li>').text(`Address: ${address}`))
                .append($('<li>').text(`Postal Code: ${postalCode}`));
        }

        info = [fullName, email, phoneNumber, address, postalCode];

        Array.from($('.block input')).forEach(e => e.value = '');
        disableButtons(true);
    }

    function onEdit() {
        let i = 0;
        Array.from($('.block input')).forEach(e => e.value = info[i++]);
        $('#infoPreview').children().remove();
        disableButtons(false);
    }

    function onContinue() {
        disableButtons(false);
        $('#submit').prop('disabled', true);
        $('#container').append($('<h2>').text('Payment details'))
            .append($('<select>')
                .attr('id', 'paymentOptions')
                .addClass('custom-select')
                .append($('<option>').text('Choose')
                    .prop('selected', true)
                    .prop('disabled', true)
                    .prop('hidden', true))
                .append($('<option>')
                    .text('Credit Card')
                    .attr('value', 'creditCard'))
                .append($('<option>')
                    .text('Bank Transfer')
                    .attr('value', 'bankTransfer'))
            )
            .append($('<div>')
                .attr('id', 'extraDetails'));

        $('#paymentOptions').on('change', onSelect);
    }

    function onSelect() {
        let $methods = $('#paymentOptions').children();
        let paymentMethod = $methods.filter(':selected').val();

        $('#extraDetails').children().remove();
        if (paymentMethod === 'creditCard') {
            creditCard();
        } else if (paymentMethod === 'bankTransfer') {
            bankTransfer();
        }

        $('#checkOut').on('click', onCheckOut);
    }

    function onCheckOut() {
        let wrapper = $('#wrapper');
        wrapper.children().remove()
        wrapper.append($('<h4>').text('Thank you for your reservation!'));
    }

    function bankTransfer() {
        $('#extraDetails')
            .append('<p>You have 48 hours to transfer the amount to:<br />IBAN: GR96 0810 0010 0000 0123 4567 890</p>')
            .append($('<button>')
                .attr('id', 'checkOut')
                .text('Check Out'));
    }

    function creditCard() {
        $('#extraDetails')
            .append($('<div>')
                .addClass('inputLabel')
                .text('Card Number')
                .append($('<input>')))
            .append('<br/>')
            .append($('<div>')
                .addClass('inputLabel')
                .text('Expiration Date')
                .append($('<input>')))
            .append('<br/>')
            .append($('<div>')
                .addClass('inputLabel')
                .text('Security Numbers')
                .append($('<input>')))
            .append('<br/>')
            .append($('<button>')
                .attr('id', 'checkOut')
                .text('Check Out'));

    }

    function disableButtons(submitBtnBool) {
        $('#submit').prop('disabled', submitBtnBool);
        $('#edit').prop('disabled', !submitBtnBool);
        $('#continue').prop('disabled', !submitBtnBool);
    }
}