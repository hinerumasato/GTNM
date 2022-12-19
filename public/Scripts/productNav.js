import { getProducts } from "./productData.js";
import { _DATA_URL_, renderItem, getParameterByName } from "./Utils/utils.js";

const _RENDER_PRODUCT_AMOUNT_ = 4;
const popularProduct = document.querySelector(".popular-product-nav-líst");
const mobilePopularProduct = document.querySelector(".mobile-popular-product-nav-left .popular-product-nav-list");
const products = await getProducts(`${_DATA_URL_}/products?_limit=${_RENDER_PRODUCT_AMOUNT_}`);
const productItem1Link = document.querySelectorAll(".product-nav-lists .product-item1 a")
const productNavItemLink = document.querySelectorAll(".product-nav-item a");

console.log(productNavItemLink)

productNavItemLink[0].setAttribute("href", `./product.html?search=Bộ sưu tập mới&user-id=${getParameterByName("user-id")}`);
productNavItemLink[1].setAttribute("href", `./product.html?search=Giày thời trang &user-id=${getParameterByName("user-id")}`);
productNavItemLink[2].setAttribute("href", `./product.html?search=Giày thời trang nữ&user-id=${getParameterByName("user-id")}`);
productNavItemLink[3].setAttribute("href", `./product.html?search=Giày mùa &user-id=${getParameterByName("user-id")}`);
productNavItemLink[4].setAttribute("href", `./product.html?search=Giày công sở&user-id=${getParameterByName("user-id")}`);
productNavItemLink[5].setAttribute("href", `./product.html?search=Giày thể thao&user-id=${getParameterByName("user-id")}`);

productItem1Link[0].setAttribute("href", `./product.html?search=Giày da&user-id=${getParameterByName("user-id")}`)
productItem1Link[1].setAttribute("href", `./product.html?search=Giày vải&user-id=${getParameterByName("user-id")}`)
productItem1Link[2].setAttribute("href", `./product.html?search=Giày converse&user-id=${getParameterByName("user-id")}`)

await renderItem(popularProduct, products, `
    <li class="popular-product-nav-item product-nav-item">
        <a href="./productInfo.html?product-id=${undefined}&user-id=${getParameterByName("user-id")}" class="popular-product-nav-link product-nav-link">
            <div class="popular-product-nav_wrap">
                <img src="${undefined}">
                <div class="popular-product-nav_product_info">
                    <h4>${undefined}</h4>
                    <div class="popular-product-nav_product_info_price">
                        ${undefined}
                    </div>
                </div>
            </div>
        </a>
    </li>
`, "id", "image", "name", "price")

await renderItem(mobilePopularProduct, products, `
    <li class="popular-product-nav-item product-nav-item">
        <a href="./productInfo.html?product-id=${undefined}" class="popular-product-nav-link product-nav-link">
            <div class="popular-product-nav_wrap">
                <img src="${undefined}">
                <div class="popular-product-nav_product_info">
                    <h4>${undefined}</h4>
                    <div class="popular-product-nav_product_info_price">
                        ${undefined}
                    </div>
                </div>
            </div>
        </a>
    </li>
`, "id", "image", "name", "price")

// await renderItem()