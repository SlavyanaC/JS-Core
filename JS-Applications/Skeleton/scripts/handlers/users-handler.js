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
        notifications.showInfo('User logged in successfully!');
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
    if (password !== repeatPassword){
        notifications.showError('Passwords do not match!');
        return;
    }
    usersService.register(username, password).then(function (res) {
        usersService.saveSession(res);
        notifications.showInfo('User registered successfully!');
        ctx.redirect('#/home');
    }).catch(function (err) {
        notifications.handleError(err);
    });
};

handlers.getLogout = function (ctx) {
    usersService.logout().then(ctx.redirect('#/home'));
    notifications.showInfo('User logged out successfully!');
};