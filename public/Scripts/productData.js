import { _DATA_URL_ } from "./Utils/utils.js";

async function getProducts(url) {
    const response = await fetch(url);
    return response.json();
}

async function postProducts(data) {
    const response = await fetch(`${_DATA_URL_}/products`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

async function deleteProduct(id) {
    let url = `${_DATA_URL_}/products/${id}`;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    return response.json();
}

async function updateProduct(id, data) {
    let url = `${_DATA_URL_}/products/${id}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

export { getProducts, postProducts, deleteProduct, updateProduct };