const kinvey = (() => {
    const BASE_URL = 'https://baas.kinvey.com/';
    const APP_KEY = 'kid_rywQZYhYE';
    const APP_SECRET = '9776a55ac3e54ff1bb8247cfd7432be8';

    function post(collection, endpoint, auth, data) {
        let req = makeRequest('POST', collection, endpoint, auth);
        req.data = data;
        return $.ajax(req);
    }

    function get(collection, endpoint, auth) {
        return $.ajax(makeRequest('GET', collection, endpoint, auth));
    }

    function update(collection, endpoint, auth, data) {
        let req = makeRequest('PUT', collection, endpoint, auth);
        req.data = data;
        return $.ajax(req);
    }

    function remove(collection, endpoint, auth) {
        return $.ajax(makeRequest('DELETE', collection, endpoint, auth));
    }

    function makeAuth(auth) {
        if (auth === 'basic') {
            return {
                'Authorization': `Basic ${btoa(APP_KEY + ':' + APP_SECRET)}`
            }
        } else {
            return {
                'Authorization': `Kinvey ${sessionStorage.getItem('authtoken')}`
            }
        }
    }

    function makeRequest(method, collection, endpoint, auth) {
        return {
            url: BASE_URL + collection + '/' + APP_KEY + '/' + endpoint,
            method,
            headers: makeAuth(auth)
        }
    }

    return {
        get,
        post,
        update,
        remove
    }
})();