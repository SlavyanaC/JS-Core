handlers.getLogin = function (ctx) {
    ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/users/login.hbs');
    });
};

handlers.postLogin = function (ctx) {
    let {username, password} = ctx.params;
    if (!/[A-Za-z]{3,}/.test(username) || !/[A-Za-z0-9]{6,}/.test(password)) {
        notifications.showError('Username must be at least 3 symbols. Password must be at least 6 symbols.');
        handlers.getRegister(ctx);
    }
    usersService.login(username, password).then(function (res) {
        usersService.saveSession(res);
        notifications.showInfo('Login successful.');
        ctx.redirect('#/home');
    }).catch(function (err) {
        notifications.handleError(err);
    });
};

handlers.getRegister = function (ctx) {
    ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/users/register.hbs');
    });
};

handlers.postRegister = function (ctx) {
    let {username, password, repeatPass, email, avatarUrl} = ctx.params;
    if (!/[A-Za-z]{3,}/.test(username) || !/[A-Za-z0-9]{6,}/.test(password) || password !== repeatPass) {
        notifications.showError('Username must be at least 3 symbols. Password must be at least 6 symbols.');
        handlers.getRegister(ctx);
    }
    usersService.register(username, password, email, avatarUrl).then(function (res) {
        usersService.saveSession(res);
        notifications.showInfo('User registration successful.');
        ctx.redirect('#/home');
    }).catch(function (err) {
        notifications.handleError(err);
    });
};

handlers.getLogout = function (ctx) {
    usersService.logout().then(ctx.redirect('#/home'));
    notifications.showInfo('Logout successful.');
};

handlers.getProfile = function (ctx) {
    ctx.isAuthenticated = usersService.isAuthenticated();
    ctx.username = sessionStorage.getItem('username');

    let username = ctx.params.username.substr(1);
    usersService.getByUsername(username).then(function (res) {
        ctx.profileUsername = username;
        ctx.avatarUrl = res[0].avatarUrl;
        ctx.email = res[0].email;
        ctx.loggedInUserId = sessionStorage.getItem('loggedInUserId');
        ctx.isOwner = res[0]._id === sessionStorage.getItem('userId');

        memesService.getUserMemes(username).then(function (res) {
            let userMemes = [];
            for (let meme of res){
                meme.isOwner = meme.creator === sessionStorage.getItem('username');
                userMemes.push(meme);
            }

            ctx.userMemes = userMemes;
            ctx.isEmpty = res.length === 0;
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                userMeme: './templates/users/userMeme.hbs',
            }).then(function () {
                    this.partial('./templates/users/profile.hbs');
                }
            );
        })
    });
};

handlers.getDeleteUser = function (ctx) {
    let userId = ctx.params.id.substr(1);
    usersService.deleteUser(userId).then(function () {
        sessionStorage.clear();
        notifications.showInfo('User deleted');
        ctx.redirect('#/memeFeed');
    }).catch(function (err) {
        notifications.handleError(err);
    });
};