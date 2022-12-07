import { getProducts } from "./productData.js";
import { _DATA_URL_, renderItem, getParameterByName } from "./Utils/utils.js";

const _RENDER_PRODUCT_AMOUNT_ = 4;
const popularProduct = document.querySelector(".popular-product-nav-líst");
const mobilePopularProduct = document.querySelector(".mobile-popular-product-nav-left .popular-product-nav-list");
const products = await getProducts(`${_DATA_URL_}/products?_limit=${_RENDER_PRODUCT_AMOUNT_}`);

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

await renderItem()