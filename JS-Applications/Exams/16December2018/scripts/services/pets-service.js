const petsService = (() => {
    function getPet(id) {
        return kinvey.get('appdata', `pets/${id}`, 'kinvey');
    }

    function getAllPets() {
        return kinvey.get('appdata', 'pets', 'kinvey');
    }

    function addPet(name, description, imageURL, category, likes = 0) {
        return kinvey.post('appdata', 'pets', 'kinvey', {
            name,
            description,
            imageURL,
            category,
            likes,
        });
    }

    function removePet(id) {
        return kinvey.remove('appdata', `pets/${id}`, 'kinvey');
    }

    function petPet(data) {
        return kinvey.update('appdata', `pets/${data._id}`, 'kinvey', data);
    }

    function editPet(data) {
        return kinvey.update('appdata', `pets/${data._id}`, 'kinvey', data);
    }

    return {
        getPet,
        getAllPets,
        addPet,
        removePet,
        petPet,
        editPet,
    }
})();