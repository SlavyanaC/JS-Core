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

        this.get('#/allSongs', handlers.getAllSongs);
        this.get('#/mySongs', handlers.getMySongs);
        this.get('#/createSong', handlers.getCreateSong);

        this.get('#/like/:id', handlers.getSongLike);
        this.get('#/listen/:id', handlers.getSongListen);
        this.get('#/remove/:id', handlers.getSongRemove);

        // post requests
        this.post('#/register', handlers.postRegister);
        this.post('#/login', handlers.postLogin);

        this.post('#/createSong', handlers.postCreateSong);
    });
    app.run('#/');
});
