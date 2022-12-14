import { getProducts } from "./productData.js";
import { userId } from "./header.js";
import { _DATA_URL_ } from "./Utils/utils.js";

const products = await getProducts(`${_DATA_URL_}/products`);
const newProductField = document.querySelector('.new-product-field');
const saleProductField = document.querySelector('.sale-product-field');
const popularProductField = document.querySelector('.popular-product-field');

async function renderProducts(itemField, startIndex, amount) {
    let isNeedToAdd = true;
    let count = 0;
    for(let i = startIndex; count < amount; i++) {
        let product = products[i];
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
    }

    const gridItems = itemField.querySelectorAll('.grid-item');
    gridItems.forEach(gridItem => {
        gridItem.onclick = () => {
            const itemId = gridItem.getAttribute('id-item');
            const url = `./productInfo.html?product-id=${itemId}&user-id=${userId}`;
            gridItem.querySelector('a').setAttribute('href', url);
            console.log(gridItem);
        }
    })
}

await renderProducts(newProductField, 0 ,4);
await renderProducts(saleProductField, 4, 8);
await renderProducts(popularProductField, 20, 8);