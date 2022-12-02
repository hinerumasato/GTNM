import { getProducts } from "./productData.js";
import { userId } from "./header.js";
import { _DATA_URL_ } from "./Utils/utils.js";

const _RENDER_PRODUCT_AMOUNT = 40;

const products = await getProducts(`${_DATA_URL_}/products?_limit=${_RENDER_PRODUCT_AMOUNT}`);
console.log(products);
let isNeedToAdd = true;
let count = 0;
const itemField = document.querySelector('.container_content-right_items');
products.forEach(product => {
    let quantity = (screen.width >= 740) ? 4 : 2;
    if(isNeedToAdd) {
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
    if(count % quantity == 0) isNeedToAdd = !isNeedToAdd;
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