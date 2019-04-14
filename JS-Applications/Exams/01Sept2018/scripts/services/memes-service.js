const memesService = (() => {
    function getMeme(id) {
        return kinvey.get('appdata', `memes/${id}`, kinvey);
    }

    function getAll() {
        return kinvey.get('appdata', 'memes', 'kinvey');
    }

    function getUserMemes(username) {
        return kinvey.get('appdata', `memes?query={"creator":"${username}"}&sort={"_kmd.ect": -1}`, 'kinvey');
    }

    function create({...data}) {
        return kinvey.post('appdata', 'memes', 'kinvey', data);
    }

    function removeMeme(id) {
        return kinvey.remove('appdata', `memes/${id}`, 'kenvey');
    }

    function editMeme(id, {...data}) {
        return kinvey.update('appdata', `memes/${id}`, 'kinvey', data);
    }

    return {
        getMeme,
        getAll,
        create,
        getUserMemes,
        removeMeme,
        editMeme,
    }
})();