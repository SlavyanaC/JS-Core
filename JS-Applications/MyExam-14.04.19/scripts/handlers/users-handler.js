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
    let {username, password, repeatPassword} = ctx.params;
    if (username.length < 3) {
        notifications.showError('Username must be at least 3 symbols.');
        return;
    } else if (password.length < 6) {
        notifications.showError('Password must be at least 6 symbols.');
        return;

    } else if (password !== repeatPassword) {
        notifications.showError('Passwords do not match.');
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
    usersService.logout().then(ctx.redirect('#/login'));
    notifications.showInfo('Logout successful.');
};