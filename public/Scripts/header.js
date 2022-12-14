import { getParameterByName, _DATA_URL_ } from "./Utils/utils.js";
import { getUsers, updateUser } from "./userData.js";
import { getProducts } from "./productData.js";

let user = await getUsers(`${_DATA_URL_}/users?id=${getParameterByName("user-id")}`);
user = user[0];

const products = await getProducts(`${_DATA_URL_}/products`);
const userLink = document.querySelector(".user-link");
const navMenuLink = document.querySelectorAll('.nav_menu-link');
const mobileNavMenuLink = document.querySelectorAll('.mobile-header_info_nav_link');
const cartInfo = document.querySelector(".cart-info");
const productList = document.querySelector(".product-list");
const productTypeSet = new Set();


function formatNumber(str) {
    let result = "";
    for(let i = 0; i < str.length; i++)
        if(str[i] >= '0' && str[i] <= '9')
            result += str[i];
    return result;
}

function splitNumber(number) {
    let temp = String(number);
    let result = "";
    let count = 0;

    while(count < temp.length) {
        result = temp[temp.length - 1 - count] + result;
        count++;
        if(count % 3 == 0 && count != 0) {
            result = "." + result;
        }
    }

    if(count % 3 == 0)
        result = result.substring(1, result.length);

    return result;
}

products.forEach(product => {
    productTypeSet.add(product.type.toLowerCase())
})

productTypeSet.forEach(productName => {
    productList.innerHTML += `
        <li class="product-item">
            <a href="./product.html?search=${productName}&user-id=${getParameterByName("user-id")}">
                ${productName}
            </a>
        </li>
    `
})



if (user == undefined) {
    userLink.innerHTML = `<a href="./login.html">Đăng nhập</a> / <a href="./signin.html">Đăng ký</a>`;
    cartInfo.innerHTML += `
        <div class="empty-cart">
            Bạn cần đăng nhập để xem giỏ hàng
        </div>
    `

    navMenuLink[0].setAttribute("href", `./index.html`);
    navMenuLink[1].setAttribute("href", `./about-us.html`);
    navMenuLink[2].setAttribute("href", `./product.html`);
    navMenuLink[3].setAttribute("href", `./news.html`);
    navMenuLink[4].setAttribute("href", `./contact.html`);

    mobileNavMenuLink[0].setAttribute("href", `./index.html`);
    mobileNavMenuLink[1].setAttribute("href", `./about-us.html`);
    mobileNavMenuLink[2].setAttribute("href", `./product.html`);
    mobileNavMenuLink[3].setAttribute("href", `./news.html`);
    mobileNavMenuLink[4].setAttribute("href", `./contact.html`);
}

else {
    const buyProducts = user["buy-products"];

    navMenuLink[0].setAttribute("href", `./index.html?user-id=${user.id}`);
    navMenuLink[1].setAttribute("href", `./about-us.html?user-id=${user.id}`);
    navMenuLink[2].setAttribute("href", `./product.html?user-id=${user.id}`);
    navMenuLink[3].setAttribute("href", `./news.html?user-id=${user.id}`);
    navMenuLink[4].setAttribute("href", `./contact.html?user-id=${user.id}`);

    mobileNavMenuLink[0].setAttribute("href", `./index.html?user-id=${user.id}`);
    mobileNavMenuLink[1].setAttribute("href", `./about-us.html?user-id=${user.id}`);
    mobileNavMenuLink[2].setAttribute("href", `./product.html?user-id=${user.id}`);
    mobileNavMenuLink[3].setAttribute("href", `./news.html?user-id=${user.id}`);
    mobileNavMenuLink[4].setAttribute("href", `./contact.html?user-id=${user.id}`);

    userLink.innerHTML += `
        <a>Xin chào ${user.name}</a>
        <a href="./index.html" style="display: block;">Đăng xuất</a>
    `

    if (buyProducts != undefined && buyProducts.length != 0) {
        let sum = 0;
        buyProducts.forEach(buyProduct => {
            sum += parseInt(formatNumber(buyProduct.price));
            cartInfo.innerHTML += `
            
            <div class="cart-item" style="display: flex; width: 100%; gap: 12px"}>
                <div>
                    <img width="120px"
                        src="${buyProduct.image}" />
                </div>
                <div style="text-align: left; width: 100%;">
                    <h5 style="margin-bottom: 12px;">${buyProduct.name}</h5>
                    <div style="color: red; margin-bottom: 8px;">${buyProduct.price}</div>
                    <div style="display: flex">
                        <button class="quantity-btn">-</button>
                        <input style="width: 40px; text-align: center;" type="text" value="1" />
                        <button class="quantity-btn">+</button>
                    </div>
                </div>
        
                <div>
                    <i class="fa fa-trash" aria-hidden="true" productId=${buyProduct.id}></i>
                </div>
            </div> `
        });
        cartInfo.innerHTML += `<hr />
        <div style="
        display: flex;
        justify-content: space-between;
        padding-top: 16px;
        padding-bottom: 16px;
        ">
            <span>Tổng cộng: </span>
            <span style="color: var(--menu-color); font-weight: bold;">${splitNumber(sum)}đ</span>
        </div>
        <div style="
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        margin-top: 16px;
        ">
            <button style="
        background: var(--menu-color);
        color: white;
        border: none;
        height: 32px;
        ">
                Giỏ hàng
            </button>
            <button
                style="background-color: #fff; border: solid 1px #ccc; outline: none; cursor: pointer">Thanh
                Toán</button>
        </div>`
    }
    else {
        cartInfo.innerHTML +=
            `<div class="empty-cart">
            Bạn chưa thêm sản phẩm nào trong giỏ hàng
        </div>`
    }
}

const listBtn = document.querySelector('.mobile-header_info_nav');
const deleteCartProductBtns = document.querySelectorAll(".fa.fa-trash");
deleteCartProductBtns.forEach((btn, index) => {
    const products = user["buy-products"];
    const newProducts = [];
    btn.onclick = async () => {
        for(let i = 0; i < index; i++)
            newProducts.push(products[i]);
        for(let i = index + 1; i < products.length; i++)
            newProducts.push(products[i]);
        user["buy-products"] = newProducts;
        await updateUser(getParameterByName("user-id"), user);
    }

})
listBtn.onclick = () => {
    const mobileHeaderList = document.querySelector('.mobile-header_info_nav_list');
    mobileHeaderList.classList.toggle('active');
    console.log(mobileHeaderList)
}

const userId = (user == undefined) ? 0 : user.id;

function search(valueSearch) {
    let queries = window.location.href.split('?')[1];
    if (getParameterByName("search") == undefined) {
        let url = `./product.html?${queries}&search=${valueSearch}`;
        window.location.replace(url);
    }
    else {
        let newQueries = queries.substring(0, queries.indexOf("&search"));
        let newUrl = `./product.html?${newQueries}&search=${valueSearch}`;
        window.location.replace(newUrl);
    }
}

const searchBtn = document.querySelector('.header_center-search-btn');
const mobileSearchBtn = document.querySelector(".mobile-header_search_btn");
searchBtn.onclick = async () => {
    search(document.querySelector('.header_center-search input').value);
}

mobileSearchBtn.onclick = async () => {
    search(document.querySelector(".mobile-header_search_input").value);
}

const input = document.querySelector('.header_center-search input');
const mobileInput = document.querySelector(".mobile-header_search_input");

input.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        e.preventDefault();
        searchBtn.click();
    }
})

mobileInput.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        e.preventDefault();
        mobileSearchBtn.click();
    }
})

const mobileHeader = document.querySelector(".mobile-header_wrap");
mobileHeader.style.zIndex = 9999;
document.onscroll = () => {
    let scrollTop = document.documentElement.scrollTop;
    if(scrollTop >= 108) {
        mobileHeader.style.position = "fixed";
        mobileHeader.style.top = 0;
        mobileHeader.style.left = 0;
        mobileHeader.style.right = 0;
        mobileHeader.style.bottom = 0;
    }
    else {
        mobileHeader.style.position = "relative";
    }
}

document.addEventListener('keyup', e => {
    if (e.ctrlKey && e.key === 'Enter') {
        window.location.replace("./login.html");
    }
});

export { userId };
