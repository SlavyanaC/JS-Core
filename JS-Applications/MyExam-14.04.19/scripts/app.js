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

        this.get('#/cinema', handlers.getCinema);
        this.get('#/movie/create', handlers.getMovieCreate);

        this.get('#/buyTicket/:id', handlers.getBuyTicket);
        this.get('#/details/:id', handlers.getDetails);

        this.get('#/myMovies', handlers.getMyMovies);
        this.get('#/edit/:id', handlers.getEdit);
        this.get('#/delete/:id', handlers.getDelete);

        this.get('#/movie/all(:genre)?', handlers.getSearch);

        // post requests
        this.post('#/register', handlers.postRegister);
        this.post('#/login', handlers.postLogin);
        this.post('#/movie/create', handlers.postMovieCreate);
        this.post('#/edit/:id', handlers.postEdit);
        this.post('#/delete/:id', handlers.postDelete);
    });
    app.run('#/');
});
