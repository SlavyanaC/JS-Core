function attachEvents() {
    $('#btnLoadTowns').on('click', loadTowns);
}

function loadTowns() {
    let townInput = $('#towns').val();
    let towns = townInput.split(', ');

    towns.forEach(town => {
        let context = {
            town: town
        };
        let html = getHTML(context);
        $('#root').append(html);
    });
}

function getHTML(context) {
    let source = $('#towns-template').html();
    let template = Handlebars.compile(source);
    return template(context);
}