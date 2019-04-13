const usersService = (() => {
    function saveSession(res) {
        sessionStorage.setItem('username', res.username);
        sessionStorage.setItem('authtoken', res._kmd.authtoken);
    }

    function isAuthenticated() {
        return sessionStorage.getItem('authtoken') !== null;
    }

    function register(username, password) {
        return kinvey.post('user', '', 'basic', {
            username,
            password
        });
    }

    function login(username, password) {
        return kinvey.post('user', 'login', 'basic', {
            username,
            password
        });
    }

    function logout() {
        sessionStorage.clear();
        return kinvey.post('user', '_logout', 'kinvey');
    }

    return {
        saveSession,
        isAuthenticated,
        register,
        login,
        logout
    }
})();