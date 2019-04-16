const moviesService = (() => {
    function getAll() {
        return kinvey.get('appdata', 'movies?query={}&sort={"tickets":-1}', 'kinvey');
    }

    function createMovie({...data}) {
        let genresArr = [];
        data.genres.trim()
            .split(' ')
            .forEach(g => genresArr.push(g));
        data.genres = genresArr;
        data.tickets = Number(data.tickets);
        return kinvey.post('appdata', 'movies', 'kinvey', data);
    }

    function getById(id) {
        return kinvey.get('appdata', `movies/${id}`, 'kinvey');
    }

    function buyTicket(id, data) {
        return kinvey.update('appdata', `movies/${id}`, 'kinvey', data);
    }

    function getUserMovies(userId) {
        return kinvey.get('appdata', `movies?query={"_acl.creator":"${userId}"}&sort={"tickets":-1}`, 'kinvey');
    }

    function editMovie(id, data) {
        let genresArr = [];
        data.genres.trim()
            .split(' ')
            .forEach(g => genresArr.push(g));
        data.genres = genresArr;
        return kinvey.update('appdata', `movies/${id}`, 'kinvey', data);
    }

    function deleteMovie(id) {
        return kinvey.remove('appdata', `movies/${id}`, 'kinvey');
    }

    return {
        getAll,
        createMovie,
        getById,
        buyTicket,
        getUserMovies,
        editMovie,
        deleteMovie,
    }
})();