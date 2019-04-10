$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        // get requests
        this.get('#/home', getHome);
        this.get('#/about', getAbout);
        this.get('#/login', getLogin);
        this.get('#/register', getRegister);
        this.get('#/logout', getLogout);
        this.get('#/catalog', getCatalog);
        this.get('#/create', getCreate);
        this.get('#/catalog/:teamId', getTeamDetails);
        this.get('#/join/:teamId', getJoinTeam);
        this.get('#/leave', getLeaveTeam);
        this.get('#/edit/:teamId', getEdit);

        // post requests
        this.post('#/register', postRegister);
        this.post('#/login', postLogin);
        this.post('#/create', postCreate);
        this.post('#/edit/:teamId', postEdit);
    });

    app.run('#/home');
});

function getHome(context) {
    getAuthorizationInfo(context);
    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
    }).then(function () {
        this.partial('./templates/home/home.hbs');
    });
}

function getAbout(context) {
    getAuthorizationInfo(context);
    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
    }).then(function () {
        this.partial('./templates/about/about.hbs');
    });
}

function getLogin() {
    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
        loginForm: './templates/login/loginForm.hbs'
    }).then(function () {
        this.partial('./templates/login/loginPage.hbs');
    });
}

function getRegister() {
    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
        registerForm: './templates/register/registerForm.hbs'
    }).then(function () {
        this.partial('./templates/register/registerPage.hbs');
    });
}

function getLogout() {
    auth.logout();
    sessionStorage.clear();
    auth.showInfo('Logged out successfully!');
    this.redirect('#/home');
}

function getCatalog(context) {
    getAuthorizationInfo(context);
    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
        team: './templates/catalog/team.hbs',
    }).then(function () {
        let _this = this;
        teamsService.loadTeams()
            .then(function (teams) {
                context.teams = teams;
                context.hasNoTeam = teams;
                _this.partial('./templates/catalog/teamCatalog.hbs');
            });
    });
}

function getCreate() {
    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
        createForm: './templates/create/createForm.hbs'
    }).then(function () {
        this.partial('./templates/create/createPage.hbs');
    });
}

function getTeamDetails(context) {
    getAuthorizationInfo(context);
    let teamId = context.params.teamId.substr(1);
    let playerTeamId = sessionStorage.getItem('teamId');
    this.isOnTeam = teamId === playerTeamId;
    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
        teamMember: './templates/catalog/teamMember.hbs',
        teamControls: './templates/catalog/teamControls.hbs',
    }).then(function () {
        let _this = this;
        teamsService.loadTeamDetails(teamId)
            .then(function (res) {
                context.isAuthor = sessionStorage.getItem('userId') === res._acl.creator;
                context.name = res.name;
                context.members = res.members;
                context.comment = res.comment;
                context.teamId = teamId;
                _this.partial('./templates/catalog/details.hbs');
            });
    });
}

function getJoinTeam(context) {
    let teamId = context.params.teamId.substr(1);
    teamsService.joinTeam(teamId);
    sessionStorage.setItem('teamId', teamId);
    this.redirect(`#/catalog/:${teamId}`);
}

function getLeaveTeam() {
    let teamId = sessionStorage.getItem('teamId');
    teamsService.leaveTeam();
    sessionStorage.setItem('teamId', '');
    this.redirect(`#/catalog/:${teamId}`);
}

function getEdit(context) {
    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
        editForm: './templates/edit/editForm.hbs'
    }).then(function () {
        let teamId = context.params.teamId.substr(1);
        let _this = this;
        teamsService.loadTeamDetails(teamId)
            .then(function (res) {
                context.teamId = teamId;
                context.name = res.name;
                context.comment = res.comment;
                _this.partial('./templates/edit/editPage.hbs');
            });
    });
}

function postRegister(context) {
    let _this = this;
    let {username, password, repeatPassword} = context.params;
    auth.register(username, password, repeatPassword).then(function (res) {
        auth.saveSession(res);
        auth.showInfo('Registered successfully!');
        _this.redirect('#/home');
    }).catch(function () {
        auth.showError('Registration failed!')
    });
}

function postLogin(context) {
    let _this = this;
    let {username, password} = context.params;
    auth.login(username, password).then(function (res) {
        auth.saveSession(res);
        auth.showInfo('Login successfully!');
        _this.redirect('#/home');
    }).catch(function () {
        auth.showError('Login failed!')
    });
}

function postCreate(context) {
    let _this = this;
    let {name, comment} = context.params;
    teamsService.createTeam(name, comment).then(function (res) {
        console.log(res);
        sessionStorage.setItem('teamId', res._id);
        auth.showInfo(`${res.name} created successfully!`);
        _this.redirect('#/catalog');
    }).catch(function () {
        auth.showError('Team creation failed!');
    })
}

function postEdit(context) {
    let teamId = context.params.teamId.substr(1);
    let {name, comment} = context.params;
    let _this = this;
    teamsService.edit(teamId, name, comment).then(function (res) {
        auth.showInfo('Team info changed successfully!');
        _this.redirect(`#/catalog/:${teamId}`);
    }).catch(function () {
        auth.showError('Team info update failed!');
    });
}

function getAuthorizationInfo(context) {
    context.loggedIn = !!sessionStorage.getItem('authtoken');
    context.username = sessionStorage.getItem('username');
}
