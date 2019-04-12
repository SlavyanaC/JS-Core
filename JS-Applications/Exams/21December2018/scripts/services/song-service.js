const songService = (() => {
    function getAllSongs() {
        return kinvey.get('appdata', 'songs', 'kinvey');
    }

    function createSong(title, artist, imageURL, listened = 0, likes = 0) {
        return kinvey.post('appdata', 'songs', 'kinvey', {
            title,
            artist,
            imageURL,
            listened,
            likes,
        });
    }

    function getSong(id) {
        return kinvey.get('appdata', `songs/${id}`, 'kinvey');
    }

    function likeSong(id, data) {
        return kinvey.update('appdata', `songs/${id}`, 'kinvey', data);
    }

    function listenSong(id, data) {
        return kinvey.update('appdata', `songs/${id}`, 'kinvey', data);
    }

    function removeSong(id) {
       return kinvey.remove('appdata', `songs/${id}`, 'kinvey');
    }

    return {
        getAllSongs,
        createSong,
        getSong,
        likeSong,
        listenSong,
        removeSong,
    }
})();