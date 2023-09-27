import { getItem } from "./localStorageService";
const get = async function (url) {
    try {
        return await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "text/plain",
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                "Authorization": getItem("token") || ""
            },
            mode: 'cors',
        })
            .then(async function (response) {
                if (!response.ok) {
                    throw new Error('HTTP Error: ' + response.status);
                }
                return await response.json();
            })
            .catch(function (error) {
                console.error('Request failed: ' + error.message, null);
            });
    } catch (error) {
        console.error('Request failed: ' + error.message, null);
    }
};

const post = function (url, body, callback) {
    try {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "text/plain",
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                "Authorization": getItem("token")
            },
            body: JSON.stringify(body),
            mode: 'cors'
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('HTTP Error: ' + response.status);
                }
                return response.json();
            })
            .then(function (data) {
                callback(null, data);
            })
            .catch(function (error) {
                callback('Request failed: ' + error.message, null);
            });
    } catch (error) {
        callback('Request failed: ' + error.message, null);
    }
};


export default { post, get };