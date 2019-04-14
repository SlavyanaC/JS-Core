handlers.getCreate = function (ctx) {
    ctx.isAuthenticated = usersService.isAuthenticated();
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/memes/create.hbs');
    });
};

handlers.postCreate = function (ctx) {
    let {title, description, imageUrl} = ctx.params;
    if (title.length > 33 || !title) {
        notifications.showError('Title name must no exceed 33 symbols.');
    } else if (description.length > 450 || !description) {
        notifications.showError('Description name must no exceed 450 symbols.');
    } else if (!imageUrl.startsWith('http') || !imageUrl.startsWith('http') || !imageUrl) {
        notifications.showError('Image url must start with "http" or "https"');
    }
    let creator = sessionStorage.getItem('username');
    memesService.create({title, description, imageUrl, creator}).then(function () {
        notifications.showInfo('Meme created.');
        ctx.redirect('#/home');
    }).catch(function (err) {
        notifications.handleError(err);
    });
};

handlers.getDeleteMeme = function (ctx) {
    let memeId = ctx.params.id.substr(1);
    memesService.removeMeme(memeId).then(function (res) {
        notifications.showInfo('Meme deleted.');
        ctx.redirect('#/home');
    }).catch(function (err) {
        notifications.handleError(err);
    });
};

handlers.getEditMeme = function (ctx) {
    let memeId = ctx.params.id.substr(1);
    ctx.isAuthenticated = usersService.isAuthenticated();
    ctx.username = sessionStorage.getItem('username');
    memesService.getMeme(memeId).then(function (res) {
        ctx.meme = res;
        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',

        }).then(function () {
            this.partial('./templates/memes/edit.hbs');
        });
    });
};

handlers.postEditMeme = function (ctx) {
    let memeId = ctx.params.id.substr(1);
    let {title, description, imageUrl} = ctx.params;
    memesService.editMeme(memeId, {title, description, imageUrl}).then(function () {
        notifications.showInfo(`Meme ${title} updated`);
        ctx.redirect('#/home');
    }).catch(function (err) {
        notifications.handleError(err);
    });
};

handlers.getDetailsMeme = function (ctx) {
    let memeId = ctx.params.id.substr(1);
    ctx.isAuthenticated = usersService.isAuthenticated();
    ctx.username = sessionStorage.getItem('username');

    memesService.getMeme(memeId).then(function (res) {
        ctx.meme = res;
        ctx.isOwner = res.creator === sessionStorage.getItem('username');
        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',

        }).then(function () {
            this.partial('./templates/memes/details.hbs');
        });
    });
};