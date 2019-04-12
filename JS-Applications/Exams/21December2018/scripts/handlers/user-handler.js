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
    userService.login(username, password).then(function (res) {
        userService.saveSession(res);
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
        notifications.showError('Username must be at least 3 characters and password must be at least 6 characters');
        handlers.getRegister(ctx);
        return;
    }
    userService.register(username, password).then(function (res) {
        userService.saveSession(res);
        notifications.showInfo('User registration successful.');
        ctx.redirect('#/home');
    }).catch(function (err) {
        notifications.handleError(err);
    });
};

handlers.getLogout = function (ctx) {
    userService.logout().then(ctx.redirect('#/home'));
    notifications.showInfo('User logged out successfully!');
};