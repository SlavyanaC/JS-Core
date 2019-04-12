handlers.getAllSongs = function (ctx) {
    ctx.isAuthenticated = userService.isAuthenticated();
    ctx.username = sessionStorage.getItem('username');
    songService.getAllSongs().then(function (res) {
        let currentUserId = sessionStorage.getItem('userId');
        ctx.isMyList = false;
        ctx.otherSongs = res
            .filter(s => s.isAuthor = s._acl.creator !== currentUserId)
            .sort((a, b) => b.likes - a.likes);
        ctx.mySongs = res
            .filter(s => s.isAuthor = s._acl.creator === currentUserId)
            .sort((a, b) => b.likes - a.likes || b.listened - a.listened);

        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            otherSongs: './templates/songs/otherSongs.hbs',
            mySongs: './templates/songs/mySongs.hbs',
        }).then(function () {
            this.partial('./templates/songs/songsList.hbs');
        });
    });
};

handlers.getMySongs = function (ctx) {
    ctx.isAuthenticated = userService.isAuthenticated();
    ctx.username = sessionStorage.getItem('username');
    songService.getAllSongs().then(function (res) {
        let currentUserId = sessionStorage.getItem('userId');
        ctx.isMyList = true;
        ctx.mySongs = res
            .filter(s => s.isAuthor = s._acl.creator === currentUserId);
        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            mySongs: './templates/songs/mySongs.hbs'
        }).then(function () {
            this.partial('./templates/songs/songsList.hbs');
        });
    });
};

handlers.getCreateSong = function (ctx) {
    ctx.isAuthenticated = userService.isAuthenticated();
    ctx.username = sessionStorage.getItem('username');
    ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/songs/createSong.hbs');
    });
};

handlers.postCreateSong = function (ctx) {
    let {title, artist, imageURL} = ctx.params;
    let isUrlValid = imageURL.startsWith('http://') || imageURL.startsWith('https://');
    if (title.length < 6 || artist.length < 3 || !isUrlValid) {
        notifications.showError('Invalid data');
        handlers.getCreateSong(ctx);
        return;
    }

    songService.createSong(title, artist, imageURL).then(function (res) {
        notifications.showInfo('Song created successfully.');
        ctx.redirect('#/allSongs');
    }).catch(function (err) {
        notifications.handleError(err);
    });
};

handlers.getSongLike = function (ctx) {
    let songId = ctx.params.id.substr(1);
    songService.getSong(songId).then(function (res) {
        res.likes++;
        songService.likeSong(songId, res).then(function () {
            notifications.showInfo('Liked!');
            history.back();
        });
    }).catch(function (err) {
        notifications.handleError(err);
    });
};

handlers.getSongListen = function (ctx) {
    let songId = ctx.params.id.substr(1);
    songService.getSong(songId).then(function (res) {
        res.listened++;
        songService.listenSong(songId, res).then(function () {
            notifications.showInfo(`You just listened ${res.title}`);
            history.back();
        });
    }).catch(function (err) {
        notifications.handleError(err);
    });
};

handlers.getSongRemove = function (ctx) {
    let songId = ctx.params.id.substr(1);
    songService.removeSong(songId).then(function () {
        notifications.showInfo('Song removed successfully!');
        history.back();
    }).catch(function (err) {
        notifications.handleError(err);
    });
};