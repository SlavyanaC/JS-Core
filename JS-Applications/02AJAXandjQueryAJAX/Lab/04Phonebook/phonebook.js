function attachEvents () {
    const baseUrl = 'https://jqueryajax-e7daf.firebaseio.com/phonebook';
    $('#btnLoad').click(loadContacts);
    $('#btnCreate').click(createContact);
    let $phonebook = $('#phonebook');

    function loadContacts() {
        $phonebook.empty();
        $.get(baseUrl + '.json')
            .then(displayContacts)
            .catch(displayError);
    }

    function displayContacts(contacts) {
        for (let key in contacts) {
            let person = contacts[key].person;
            let phone = contacts[key].phone;
            let $li = $('<li>')
                .text(`${person}: ${phone} `);

            $phonebook.append($li);
            $li.append($("<button>Delete</button>").click(deleteContact.bind(this, key)));
        }
    }

    function displayError() {
        $phonebook.append($('<li>').text('Error'));
    }

    function createContact() {
        let newContactJSON = JSON.stringify({
            person: $('#person').val(),
            phone: $('#phone').val(),
        });
        $.post(baseUrl + '.json', newContactJSON)
            .then(loadContacts)
            .catch(displayError);

        Array.from($('input')).forEach(e => e.value = '');
    }

    function deleteContact(key) {
        let request = {
            method: 'DELETE',
            url: `${baseUrl}/${key}.json`
        };
        $.ajax(request)
            .then(loadContacts)
            .catch(displayError);
    }
}