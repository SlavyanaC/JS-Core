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
    usersService.login(username, password).then(function (res) {
        usersService.saveSession(res);
        notifications.showInfo('Login successful.');
        ctx.redirect('#/home');
    }).catch(function (err) {
        notifications.handleError(err);
        handlers.getLogin(ctx);
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
    let {username, password} = ctx.params;
    if (username.length < 3 || password.length < 6) {
        if (username.length < 3) {
            notifications.showError('Username must be at least 3 symbols');
        } else if (password.length < 6) {
            notifications.showError('Password must be at least 6 symbols');
        }
        handlers.getRegister(ctx);
        return;
    }
    usersService.register(username, password).then(function (res) {
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