const handlers = {};

$(() => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        // get requests
        this.get('#/index.html', handlers.getHome);
        this.get('/', handlers.getHome);
        this.get('#/home', handlers.getHome);

        this.get('#/register', handlers.getRegister);
        this.get('#/login', handlers.getLogin);
        this.get('#/logout', handlers.getLogout);

        this.get('#/myPets', handlers.getMyPets);
        this.get('#/addPet', handlers.getAddPet);
        this.get('#/myPets/edit/:id', handlers.getPetEdit);
        this.get('#/delete/:id', handlers.getRemove);

        this.get('#/dashboard', handlers.getDashboard);
        this.get('#/dashboard/:category', handlers.getCategory);
        this.get('#/dashboard/pet/:id', handlers.getPetPet);
        this.get('#/otherPets/details/:id', handlers.getOtherPetDetails);

        // post requests
        this.post('#/register', handlers.postRegister);
        this.post('#/login', handlers.postLogin);
        this.post('#/addPet', handlers.postAddPet);
        this.post('#/edit/:id', handlers.postEdit);
        this.post('#/delete/:id', handlers.postRemove);
    });
    app.run('#/');
});
