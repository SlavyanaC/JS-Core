$(async () => {
    await loadMonkeys();

    async function loadMonkeys() {
        let allMonkeysHtml = await $.ajax({
            url: './allMonkeys.hbs'
        });

        let monkeyHtml = await $.ajax({
            url: './monkey.hbs'
        });

        let allMonkeysTemplate = Handlebars.compile(allMonkeysHtml);
        let monkeyTemplate = Handlebars.compile(monkeyHtml);
        let context = {monkeys};
        Handlebars.registerPartial('monkey', monkeyTemplate);
        $('div.monkeys').html(allMonkeysTemplate(context));
    }
});

function showInfo(id) {
    $(`#${id}`).toggle();
}