function attachEvents() {
    const baseUrl = 'https://messenger-ec654.firebaseio.com/messages.json';
    $('#submit').on('click', onSubmitButtonClick);
    $('#refresh').on('click', onRefreshButtonClick);

    function onSubmitButtonClick() {
        let author = $('#author').val();
        let content = $('#content').val();
        let timestamp = Date.now();
        let message = {author, content, timestamp};

        $.ajax({
            url: baseUrl,
            method: 'POST',
            data: JSON.stringify(message),
        });
    }

    function onRefreshButtonClick() {
        $.ajax({
            url: baseUrl,
            method: 'GET',
            success: loadMessages,
        })
    }

    function loadMessages(data) {
        let allMessages = '';
        for (let message of Object.values(data)) {
            allMessages += `${message.author}: ${message.content}\n`;
        }
        $('#messages').text(allMessages);
    }
}