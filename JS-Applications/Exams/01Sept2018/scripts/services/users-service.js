const usersService = (() => {
    function saveSession(res) {
        sessionStorage.setItem('username', res.username);
        sessionStorage.setItem('authtoken', res._kmd.authtoken);
        sessionStorage.setItem('loggedInUserId', res._id);
    }

    function isAuthenticated() {
        return sessionStorage.getItem('authtoken') !== null;
    }

    function getByUsername(username) {
        return kinvey.get('user', `?query={"username":"${username}"}`, 'kinvey');
    }

    function getById(id) {
        return kinvey.get('user', id, 'kinvey')
    }

    function register(username, password, email, avatarUrl) {
        return kinvey.post('user', '', 'basic', {
            username,
            password,
            email,
            avatarUrl,
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

    function deleteUser(id) {
        return kinvey.remove('user', id, 'kenvey');
    }

    return {
        saveSession,
        isAuthenticated,
        getByUsername,
        getById,
        register,
        login,
        logout,
        deleteUser,
    }
})();