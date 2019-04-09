$(() => {
    renderCatTemplate();

    function renderCatTemplate() {
        cats.forEach(cat => {
            let html = $(getHTML(cat));
            html.find('button').on('click', (e) => {
                if (e.target.textContent === 'Show status code') {
                    e.target.textContent = 'Hide status code';
                    html.find(`#${cat.id}`).css('display', 'block');
                } else {
                    e.target.textContent = 'Show status code';
                    html.find(`#${cat.id}`).css('display', 'none');
                }
            });
            $('#allCats').append(html);
        });
    }

    function getHTML(context) {
        let source = $('#cat-template').html();
        let template = Handlebars.compile(source);
        return template(context);
    }
});
