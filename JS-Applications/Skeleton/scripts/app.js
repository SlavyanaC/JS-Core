const handlers = {};

$(() => {
    const app = Sammy('#root', function () {
        this.use('Handlebars', 'hbs');

        // get requests
        this.get('#/index.html', handlers.getHome);
        this.get('/', handlers.getHome);
        this.get('#/home', handlers.getHome);

        this.get('#/register', handlers.getRegister);
        this.get('#/login', handlers.getLogin);
        this.get('#/logout', handlers.getLogout);

        // post requests
        this.post('#/register', handlers.postRegister);
        this.post('#/login', handlers.postLogin);
    });
    app.run('#/');
});
