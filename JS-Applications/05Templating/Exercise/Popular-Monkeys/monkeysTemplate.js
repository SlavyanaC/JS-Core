$(() => {
    monkeys.forEach(monkey => {
        let html = $(getHtml(monkey));
        html.find('button').on('click', () => {
            $(`#${monkey.id}`).css('display', 'block');
        });

        $('.monkeys').append(html);
    });

    function getHtml(monkey) {
        let source = $('#monkey-template').html();
        let template = Handlebars.compile(source);
        return template(monkey);
    }
});