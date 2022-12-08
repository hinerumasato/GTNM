import { getParameterByName, _DATA_URL_ } from "./Utils/utils.js";
import { getUsers } from "./userData.js";

let user = await getUsers(`${_DATA_URL_}/users?id=${getParameterByName("user-id")}`);
user = user[0];

const userLink = document.querySelector(".user-link");
const cartInfo = document.querySelector(".cart-info");
const navMenuLink = document.querySelectorAll('.nav_menu-link');
const mobileNavMenuLink = document.querySelectorAll('.mobile-header_info_nav_item a');
const mobileHeaderNav = document.querySelector('.mobile-header_wrap');
const oldTop = mobileHeaderNav.offsetTop

console.log(oldTop)

window.onscroll = () => {
    let top = window.scrollY;

    if(top >= oldTop) {
        mobileHeaderNav.style.position = "fixed";
        mobileHeaderNav.style.top = 0;
        mobileHeaderNav.style.left = 0;
        mobileHeaderNav.style.right = 0;
        mobileHeaderNav.style.bottom = 0;
    }
    else {
        mobileHeaderNav.style.position = "relative";
    }
}

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
    navMenuLink[5].setAttribute("href", `./news.html`);
    navMenuLink[8].setAttribute("href", `./contact.html`);

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
    navMenuLink[5].setAttribute("href", `./news.html?user-id=${user.id}`);
    navMenuLink[8].setAttribute("href", `./contact.html?user-id=${user.id}`);

    mobileNavMenuLink[0].setAttribute("href", `./index.html?user-id=${user.id}`);
    mobileNavMenuLink[1].setAttribute("href", `./about-us.html?user-id=${user.id}`);
    mobileNavMenuLink[2].setAttribute("href", `./product.html?user-id=${user.id}`);
    mobileNavMenuLink[3].setAttribute("href", `./news.html?user-id=${user.id}`);
    mobileNavMenuLink[4].setAttribute("href", `./contact.html?user-id=${user.id}`);

    userLink.innerHTML = `<a>Xin chào ${user.username}</a>`

    if (buyProducts != undefined) {
        buyProducts.forEach(buyProduct => {
            cartInfo.innerHTML += `
            
            <div class="cart-item" style="display: flex; width: 100%; gap: 12px">
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
                    <a href="https://facebook.com" target="_blank">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </a>
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
            <span style="color: var(--menu-color); font-weight: bold;">1.200.000đ</span>
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
            Bạn chưa mua gì cả
        </div>`
    }
}

async function search(valueSearch) {
    let queries = window.location.href.split('?')[1];
    if(getParameterByName("search") == undefined) {
        let url = `./product.html?${queries}&search=${valueSearch}`;
        window.location.replace(url); 
    }
    else {
        let newQueries = queries.substring(0, queries.indexOf("&search"));
        let newUrl = `./product.html?${newQueries}&search=${valueSearch}`;
        window.location.replace(newUrl);
    }
}

const listBtn = document.querySelector('.mobile-header_info_nav');
listBtn.onclick = () => {
    const mobileHeaderList = document.querySelector('.mobile-header_info_nav_list');
    mobileHeaderList.classList.toggle('active');
}

const userId = (user == undefined) ? 0 : user.id;

const searchBtn = document.querySelector('.header_center-search-btn');
const mobileSearchBtn = document.querySelector('.mobile-header_search_btn');
const mobileInputField = document.querySelector('.mobile-header_search_input');

searchBtn.onclick = async () => {
    const valueSearch = document.querySelector('.header_center-search input').value;
    await search(valueSearch);
}

mobileSearchBtn.onclick = async () => {
    const mobileValueSearch = mobileInputField.value;
    await search(mobileValueSearch);
}

const input = document.querySelector('.header_center-search input');

input.addEventListener("keypress", (e) => {
    if(e.key == "Enter") {
        e.preventDefault();
        searchBtn.click();
    }
})

mobileInputField.addEventListener("keypress", (e) => {
    if(e.key == "Enter") {
        e.preventDefault();
        mobileSearchBtn.click();
    }
})

export { userId };
