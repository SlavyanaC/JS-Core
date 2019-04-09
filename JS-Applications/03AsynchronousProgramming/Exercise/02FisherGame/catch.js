function attachEvents() {
    const baseUrl = 'https://baas.kinvey.com/';
    const appKey = 'kid_rJRSg7zKV';
    const appData = 'appdata/';
    const endpoint = 'biggestCatches';
    const username = 'slavi';
    const password = 'pass123';
    const headers = {
        'Authorization': `Basic ${btoa(username + ':' + password)}`,
        'Content-Type': 'application/json',
    };

    $('.load').on('click', loadCatches);
    $('.add').on('click', addCatch);

    async function loadCatches() {
        try {
            let catches = await $.ajax({
                url: baseUrl + appData + appKey + '/' + endpoint,
                method: 'GET',
                headers,
            });

            $('#catches').empty();
            for (let _catch of catches) {
                let $catchInfo = $(`
            <div class="catch" data-id="${_catch._id}">
                <label>Angler</label>
                <input type="text" class="angler" value="${_catch.angler}"/>
                <label>Weight</label>
                <input type="number" class="weight" value="${_catch.weight}"/>
                <label>Species</label>
                <input type="text" class="species" value="${_catch.species}"/>
                <label>Location</label>
                <input type="text" class="location" value="${_catch.location}"/>
                <label>Bait</label>
                <input type="text" class="bait" value="${_catch.bait}"/>
                <label>Capture Time</label>
                <input type="number" class="captureTime" value="${_catch.captureTime}"/>
            </div>`);

                let $updateBtn = $(`<button class="update">Update</button>`);
                $updateBtn.on('click', updateCatch);
                let $deleteBtn = $('<button class="delete">Delete</button>');
                $deleteBtn.on('click', deleteCatch);

                $catchInfo.append($updateBtn).append($deleteBtn);
                $('#catches').append($catchInfo);
            }
        } catch (e) {
            console.log(e);
        }

        async function updateCatch() {
            // this is the clicked button
            let catchId = $(this).parent().data('id');

            let angler = $(this).parent().find('input.angler').val();
            let weight = +$(this).parent().find('input.weight').val();
            let species = $(this).parent().find('input.species').val();
            let location = $(this).parent().find('input.location').val();
            let bait = $(this).parent().find('input.bait').val();
            let captureTime = +$(this).parent().find('input.captureTime').val();

            let updatedCatch = {angler, weight, species, location, bait, captureTime};
            try {
                await $.ajax({
                    url: baseUrl + appData + appKey + '/' + endpoint + '/' + catchId,
                    method: 'PUT',
                    data: JSON.stringify(updatedCatch),
                    headers,
                });
            } catch (e) {
                console.log(e);
            }

            await loadCatches();
        }

        async function deleteCatch() {
            let catchId = $(this).parent().data('id');
            try {
                await $.ajax({
                    url: baseUrl + appData + appKey + '/' + endpoint + '/' + catchId,
                    method: 'DELETE',
                    headers,
                });
            } catch (e) {
                console.log(e);
            }

            await loadCatches();
        }
    }

    async function addCatch() {
        let angler = $('#addForm input.angler').val();
        let weight = +$('#addForm input.weight').val();
        let species = $('#addForm input.species').val();
        let location = $('#addForm input.location').val();
        let bait = $('#addForm input.bait').val();
        let captureTime = +$('#addForm input.captureTime').val();

        let catchObj = {angler, weight, species, location, bait, captureTime};
        try {
            await $.ajax({
                url: baseUrl + appData + appKey + '/' + endpoint,
                method: 'POST',
                headers,
                data: JSON.stringify(catchObj),
            });
        } catch (e) {
            console.log(e);
        }

        await loadCatches();
    }
}