handlers.getDashboard = function (ctx) {
    ctx.isAuthenticated = usersService.isAuthenticated();
    ctx.username = sessionStorage.getItem('username');

    petsService.getAllPets().then(function (res) {
        let currentUserId = sessionStorage.getItem('userId');
        ctx.otherPets = res.filter(p => p._acl.creator !== currentUserId).sort((a, b) => b.likes - a.likes);
        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            otherPets: './templates/dashboard/otherPets.hbs',
        }).then(function () {
            this.partial('./templates/dashboard/dashboard.hbs');
        });
    });
};

handlers.getCategory = function (ctx) {
    ctx.isAuthenticated = usersService.isAuthenticated();
    ctx.username = sessionStorage.getItem('username');

    petsService.getAllPets().then(function (res) {
        let currentUserId = sessionStorage.getItem('userId');
        let selectedCategory = ctx.params.category.substr(1);
        ctx.otherPets = res
            .filter(p => p._acl.creator !== currentUserId && p.category === selectedCategory)
            .sort((a, b) => b.likes - a.likes);
        console.log(ctx.otherPets);
        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            otherPets: './templates/dashboard/otherPets.hbs',
        }).then(function () {
            this.partial('./templates/dashboard/dashboard.hbs');
        });
    });
};

handlers.getPetPet = function (ctx) {
    ctx.isAuthenticated = usersService.isAuthenticated();
    ctx.username = sessionStorage.getItem('username');

    let petId = ctx.params.id.substr(1);
    petsService.getPet(petId).then(function (res) {
        res.likes++;
        petsService.petPet(res).then(function () {
            ctx.redirect('#/dashboard');
        }).catch(function (err) {
            notifications.handleError(err);
        })
    });
};

handlers.getOtherPetDetails = function (ctx) {
    ctx.isAuthenticated = usersService.isAuthenticated();
    ctx.username = sessionStorage.getItem('username');

    let petId = ctx.params.id.substr(1);
    petsService.getPet(petId).then(function (res) {
        ctx.pet = res;

        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
        }).then(function () {
            this.partial('./templates/dashboard/detailsOtherPet.hbs');
        });
    });
};