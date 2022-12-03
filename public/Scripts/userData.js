import { _DATA_URL_ } from "./Utils/utils.js";

async function pushUsers(newUser) {
    await fetch(`${_DATA_URL_}/users`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(newUser)
    })
    .then(response => response.json())

}

async function getUsers(url) {
    const response = await fetch(url);
    return response.json();
}

async function updateUser(id, newData) {
    let url = `${_DATA_URL_}/users/${id}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
    })
    return response.json();
}


export { pushUsers, getUsers, updateUser };