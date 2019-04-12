handlers.getHome = function (ctx) {
    ctx.isAuthenticated = userService.isAuthenticated();
    ctx.username = sessionStorage.getItem('username');
    ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
    }).then(function () {
            this.partial('./templates/home.hbs');
        }
    );
};