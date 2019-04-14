const handlers = {};

$(() => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        // get requests
        this.get('#/index.html', handlers.getHome);
        this.get('/', handlers.getHome);
        this.get('#/home', handlers.getHome);

        this.get('#/register', handlers.getRegister);
        this.get('#/login', handlers.getLogin);
        this.get('#/logout', handlers.getLogout);
        this.get('#/profile/:username', handlers.getProfile);
        this.get('#/deleteUser/:id', handlers.getDeleteUser);

        this.get('#/create', handlers.getCreate);
        this.get('#/getDeleteMeme/:id', handlers.getDeleteMeme);
        this.get('#/editMeme/:id', handlers.getEditMeme);
        this.get('#/details/:id', handlers.getDetailsMeme);

        // post requests
        this.post('#/register', handlers.postRegister);
        this.post('#/login', handlers.postLogin);
        this.post('#/create', handlers.postCreate);
        this.post('#/editMeme/:id', handlers.postEditMeme);
    });
    app.run('#/');
});
