import { getParameterByName, _DATA_URL_ } from "./Utils/utils.js";
import { getProducts } from "./productData.js";
import { userId } from "./header.js";

const _RENDER_PRODUCT_AMOUNT = 8;

let url = (getParameterByName("search") == undefined) ? `${_DATA_URL_}/products?_page=${getParameterByName("page")}&_limit=${_RENDER_PRODUCT_AMOUNT}`
    : `${_DATA_URL_}/products?`;

const databaseProducts = await getProducts(url);
const fullProducts = await getProducts(`${_DATA_URL_}/products?`);
let products = [];
let isNeedToAdd = true;
let count = 0;
const itemField = document.querySelector('.container_content-right_items');
const notification = document.querySelector('.container_content-right_notification');
const paginationList = document.querySelector('.container_content-right_pagination');

let searchName = getParameterByName("search");

if (searchName != undefined) {
    databaseProducts.forEach(databaseProduct => {
        if (databaseProduct.name.toLowerCase().includes(searchName.toLowerCase())
            || databaseProduct.type.toLowerCase().includes(searchName.toLocaleLowerCase())
        )
            products.push(databaseProduct);
    });
}

else products = databaseProducts;

let pageNumbers = Math.ceil(parseFloat(fullProducts.length) / _RENDER_PRODUCT_AMOUNT);

async function generatePagination() {
    for(let i = 0; i < pageNumbers; i++) {
        if(i == 0)
            paginationList.innerHTML += `<div class="pagination-item active"><a href="#" class="pagination-item_link">${i+1}</a></div>`
        else paginationList.innerHTML += `<div class="pagination-item"><a href="#" class="pagination-item_link">${i+1}</a></div>`
    }
}

await generatePagination();
const paginationItems = document.querySelectorAll('.pagination-item');

paginationItems.forEach((item, index) => {
    let link = item.querySelector('a');
    let url = ``;
    if(getParameterByName('user-id') == undefined)
        url = `./product.html?page=${index + 1}`;
    else {
        let userId = getParameterByName('user-id');
        let temp = window.location.href;
        url = temp.substring(0, temp.indexOf("?"));
        url += `?user-id=${userId}&page=${index+1}`;
    }
    link.setAttribute("href", url);
})


let item = paginationItems[parseInt(getParameterByName('page')) - 1];
if(item != undefined) {
    let activeItem = document.querySelector('.pagination-item.active');
    activeItem.classList.remove('active');
    item.classList.add('active');
} 

if (getParameterByName("search") != undefined) {
    notification.classList.add('active');
    if (products.length > 0) {
        notification.style.backgroundColor = "#DFF0D8";
        notification.innerHTML = `Có <b>${products.length}</b> kết quả tìm kiếm với từ khoá <b>"${getParameterByName("search")}"</b>`
        paginationList.style.display = "none";
    }
    else {
        notification.style.backgroundColor = "#F2DEDE";
        notification.innerHTML = `Không tìm thấy bất kỳ kết quả với từ khóa: <b>"${getParameterByName("search")}"</b>`;
        paginationList.style.display = "none";
    }
}

else {
    notification.classList.remove('active');
}

products.forEach(product => {
    let quantity = (screen.width >= 740) ? 4 : 2;
    if (isNeedToAdd) {
        let row = document.createElement('div');
        row.classList.add("row")
        row.classList.add("item-row");
        row.innerHTML += `
            <div class="grid-item c-3 m-6" id-item=${product.id}>
                <div class="products_item_wrap">
                    <a href="#"><img class="products_item_img"
                            src="${product.image}"></a>
                </div>
                <div class="products_item_infor">
                    <p><a href="#">${product.name}</a></p>
                </div>
                <div class="products_item_price">
                    <p>${product.price}</p>
                </div>
            </div>
        `
        itemField.appendChild(row);
        isNeedToAdd = !isNeedToAdd;
    }

    else {
        let row = document.querySelectorAll('.row.item-row')[document.querySelectorAll('.row.item-row').length - 1];
        row.innerHTML += `
            <div class="grid-item c-3 m-6" id-item=${product.id}>
                <div class="products_item_wrap">
                    <a href="#"><img class="products_item_img"
                            src="${product.image}"></a>
                </div>
                <div class="products_item_infor">
                    <p><a href="#">${product.name}</a></p>
                </div>
                <div class="products_item_price">
                    <p>${product.price}</p>
                </div>
            </div>
        `
    }

    count++;
    if (count % quantity == 0) isNeedToAdd = !isNeedToAdd;
});

const gridItems = itemField.querySelectorAll('.grid-item');
gridItems.forEach(gridItem => {
    gridItem.onclick = () => {
        const itemId = gridItem.getAttribute('id-item');
        const url = `./productInfo.html?product-id=${itemId}&user-id=${userId}`;
        gridItem.querySelector('a').setAttribute('href', url);
        console.log(gridItem);
    }
})