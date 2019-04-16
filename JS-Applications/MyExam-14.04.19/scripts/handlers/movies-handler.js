handlers.getCinema = function (ctx) {
    ctx.isAuthenticated = usersService.isAuthenticated();
    ctx.username = sessionStorage.getItem('username');

    moviesService.getAll().then(function (res) {
        ctx.moviesList = res;

        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            moviesList: './templates/movies/movie.hbs',
        }).then(function () {
                this.partial('./templates/movies/cinema.hbs');
            }
        );
    });
};

handlers.getMovieCreate = function (ctx) {
    ctx.isAuthenticated = usersService.isAuthenticated();
    ctx.username = sessionStorage.getItem('username');
    ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
    }).then(function () {
            this.partial('./templates/movies/add.hbs');
        }
    );
};

handlers.postMovieCreate = function (ctx) {
    let {title, imageURL, description, genres, tickets} = ctx.params;
    if (title.length < 6) {
        notifications.showError('Title must be at least 6 symbols.');
        return;
    } else if (description.length < 10) {
        notifications.showError('Description must be at least 6 symbols.');
        return;
    } else if (!imageURL.startsWith('https://') || !imageURL.startsWith('https://')) {
        notifications.showError('ImageURL must start with "http://" or "https://".');
        return;
    } else if (!tickets || isNaN(tickets)) {
        notifications.showError('Available tickets must be a number.');
        return;
    } else if (genres.split(' ').length <= 0) {
        notifications.showError('Genres must be separated by a single space.');
        return;
    }

    moviesService.createMovie({title, imageURL, description, genres, tickets}).then(function () {
        notifications.showInfo('Movie created successfully.');
        ctx.redirect('#/home');
    }).catch(function (err) {
        notifications.handleError(err);
    })
};

handlers.getBuyTicket = function (ctx) {
    let movieId = ctx.params.id.substr(1);
    moviesService.getById(movieId).then(function (res) {
        if (res.tickets <= 0) {
            notifications.showError(`No available tickets for ${res.title}`);
            return;
        }

        res.tickets--;
        moviesService.buyTicket(movieId, res).then(function (res) {
            notifications.showInfo(`Successfully bought ticket for ${res.title}.`);
            history.back();
        });
    }).catch(function (err) {
        notifications.handleError(err);
    });
};

handlers.getDetails = function (ctx) {
    ctx.isAuthenticated = usersService.isAuthenticated();
    ctx.username = sessionStorage.getItem('username');

    let movieId = ctx.params.id.substr(1);
    moviesService.getById(movieId).then(function (res) {
        res.genres = res.genres.join(', ');
        ctx.movie = res;
        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
        }).then(function () {
                this.partial('./templates/movies/details.hbs');
            }
        );
    }).catch(function (err) {
        notifications.handleError(err);
    });
};

handlers.getMyMovies = function (ctx) {
    ctx.isAuthenticated = usersService.isAuthenticated();
    ctx.username = sessionStorage.getItem('username');

    let userId = sessionStorage.getItem('userId');
    moviesService.getUserMovies(userId).then(function (res) {
        ctx.moviesList = res;

        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            moviesList: './templates/movies/myMovie.hbs',
        }).then(function () {
                this.partial('./templates/movies/myCinema.hbs');
            }
        );
    });
};

handlers.getEdit = function (ctx) {
    ctx.isAuthenticated = usersService.isAuthenticated();
    ctx.username = sessionStorage.getItem('username');

    let movieId = ctx.params.id.substr(1);
    moviesService.getById(movieId).then(function (res) {
        res.genres = res.genres.join(' ');
        ctx.movie = res;
        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
        }).then(function () {
                this.partial('./templates/movies/edit.hbs');
            }
        );
    });
};

handlers.postEdit = function (ctx) {
    let movieId = ctx.params.id.substr(1);
    let {title, imageURL, description, genres, tickets} = ctx.params;
    if (title.length < 6) {
        notifications.showError('Title must be at least 6 symbols.');
        return;
    } else if (description.length < 10) {
        notifications.showError('Description must be at least 6 symbols.');
        return;
    } else if (!imageURL.startsWith('https://') || !imageURL.startsWith('https://')) {
        notifications.showError('ImageURL must start with "http://" or "https://".');
        return;
    } else if (!tickets || isNaN(tickets)) {
        notifications.showError('Available tickets must be a number.');
        return;
    } else if (genres.split(' ').length <= 0) {
        notifications.showError('Genres must be separated by a single space.');
        return;
    }

    moviesService.editMovie(movieId, {title, imageURL, description, genres, tickets}).then(function (res) {
        notifications.showInfo(`${title} updated successfylly.`);
        ctx.redirect('#/myMovies');
    }).catch(function (err) {
        notifications.handleError(err);
    });
};

handlers.getDelete = function (ctx) {
    ctx.isAuthenticated = usersService.isAuthenticated();
    ctx.username = sessionStorage.getItem('username');

    let movieId = ctx.params.id.substr(1);
    moviesService.getById(movieId).then(function (res) {
        res.genres = res.genres.join(' ');
        ctx.movie = res;
        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
        }).then(function () {
                this.partial('./templates/movies/delete.hbs');
            }
        );
    });
};

handlers.postDelete = function (ctx) {
    let movieId = ctx.params.id.substr(1);
    moviesService.deleteMovie(movieId).then(function () {
        notifications.showInfo('Movie removed successfully!');
        ctx.redirect('#/home');
    }).catch(function (err) {
        notifications.handleError(err);
    });
};

handlers.getSearch = function (ctx) {
    ctx.isAuthenticated = usersService.isAuthenticated();
    ctx.username = sessionStorage.getItem('username');

    let searchGenre = ctx.params.search;
    moviesService.getAll().then(function (res) {
        let searchMovies = [];
        for (let movie of res) {
            if (movie.genres) {
                if (movie.genres.includes(searchGenre)) {
                    searchMovies.push(movie);
                }
            }
        }

        ctx.moviesList = searchMovies;
        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            moviesList: './templates/movies/movie.hbs',
        }).then(function () {
                this.partial('./templates/movies/cinema.hbs');
            }
        );
    });
};