handlers.getHome = function (ctx) {
    ctx.isAuthenticated = usersService.isAuthenticated();
    ctx.username = sessionStorage.getItem('username');
    ctx.userId = sessionStorage.getItem('loggedInUserId');

    if (ctx.isAuthenticated) {
        memesService.getAll().then(function (res) {
            ctx.isEmpty = res.length === 0;

            let memesFeed = [];
            for (let meme of res) {
                meme.isOwner = meme.creator === ctx.username;
                memesFeed.push(meme);
            }

            ctx.memesFeed = memesFeed;
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                meme: './templates/memes/meme.hbs',
                memeFeed: './templates/memes/memeFeed.hbs',
            }).then(function () {
                    this.partial('./templates/home/home.hbs');
                }
            );
        });
    } else {
        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            anonymous: './templates/home/anonymous.hbs'
        }).then(function () {
                this.partial('./templates/home/home.hbs');
            }
        );
    }
};