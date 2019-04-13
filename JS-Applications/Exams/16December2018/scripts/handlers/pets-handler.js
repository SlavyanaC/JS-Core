handlers.getMyPets = function (ctx) {
    ctx.isAuthenticated = usersService.isAuthenticated();
    ctx.username = sessionStorage.getItem('username');

    petsService.getAllPets().then(function (res) {
        let currentUserId = sessionStorage.getItem('userId');
        ctx.myPets = res.filter(p => p._acl.creator === currentUserId);
        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            myPets: './templates/pets/myPets.hbs',
        }).then(function () {
            this.partial('./templates/pets/pets.hbs');
        });
    });
};

handlers.getAddPet = function (ctx) {
    ctx.isAuthenticated = usersService.isAuthenticated();
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/pets/addPet.hbs');
    });
};

handlers.postAddPet = function (ctx) {
    let {name, description, imageURL, category} = ctx.params;
    petsService.addPet(name, description, imageURL, category).then(function () {
        notifications.showInfo('Pet created.');
        ctx.redirect('#/home');
    }).catch(function (err) {
        notifications.handleError(err);
    });
};

handlers.getRemove = function (ctx) {
    ctx.isAuthenticated = usersService.isAuthenticated();
    ctx.username = sessionStorage.getItem('username');

    let petId = ctx.params.id.substr(1);
    petsService.getPet(petId).then(function (res) {
        ctx.pet = res;
        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
        }).then(function () {
            this.partial('./templates/pets/deletePet.hbs');
        });
    });

};

handlers.postRemove = function(ctx){
    let petId = ctx.params.id.substr(1);
    petsService.removePet(petId).then(function () {
        notifications.showInfo('Pet removed successfully!');
        ctx.redirect('#/myPets');
    }).catch(function (err) {
        notifications.handleError(err);
    });
};

handlers.getPetEdit = function (ctx) {
    ctx.isAuthenticated = usersService.isAuthenticated();
    ctx.username = sessionStorage.getItem('username');

    let petId = ctx.params.id.substr(1);
    petsService.getPet(petId).then(function (res) {
        ctx.pet = res;
        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
        }).then(function () {
            this.partial('./templates/pets/editPet.hbs');
        });
    });
};

handlers.postEdit = function (ctx) {
    let petId = ctx.params.id.substr(1);
    let newDescription = ctx.params.description;
    petsService.getPet(petId).then(function (res) {
        res.description = newDescription;
        petsService.editPet(res).then(function () {
            notifications.showInfo('Updated successfully!');
            ctx.redirect('#/dashboard');
        });
    }).catch(function (err) {
        notifications.handleError(err);
    });
};