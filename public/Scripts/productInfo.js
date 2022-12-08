import { getProducts } from "./productData.js";
import { getParameterByName, _DATA_URL_ } from "./Utils/utils.js"
import { getUsers, updateUser } from "./userData.js"

let selectedProduct = await getProducts(`${_DATA_URL_}/products?id=${getParameterByName('product-id')}`);
selectedProduct = selectedProduct[0];

const productContainerWrap = document.querySelector('.product_container_wrap');
let html = `
            <div class="product_container_left c-4 m-12">
                <img src="${selectedProduct.image}" alt="" class="product_container_left-img">
            </div>
            <div class="product_container_mid c-6 m-12" >
                <div class="product_container_mid-infor">
                    <h2>
                        ${selectedProduct.name}
                    </h2>
                    <div class="product_container_mid-brand-and-type">
                        Thương hiệu: <span>Converse</span> | Loại: <span>${selectedProduct.type}</span>
                    </div>
                    <div class="product_container_mid-price">
                        ${selectedProduct.price}
                    </div>
                </div>

                <div class="product_container_mid-description">
                    <h4>Mô tả:</h4>
                    <p>- Mắt xỏ dây âm với dây cột nylon</p>
                    <p>- Lót trong bằng da thoáng khí tự nhiên</p>
                    <p>- Đệm lót giày bằng da bọc thoải mái và hỗ trợ chân</p>
                </div>

                <div class="product_container_mid-buy-option">
                    <div class="option color-option">
                        <div class="option-wrap">
                            <div class="option-left">
                                <span>Màu sắc</span>
                            </div>
                            <div class="option-right">
                                <select name="color">
                                    <option value="Đen">Đen</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="option quantity-option">
                        <div class="option-wrap">
                            <div class="option-left">
                                <span>Số lượng</span>
                            </div>
                            <div class="option-right">                                
                                <button class="btn minus-btn">-</button>
                                <input type="text" value="1">
                                <button class="btn add-btn">+</button>
                            </div>
                        </div>
                    </div>

                    <div class="add-to-store">
                        <button class="add-to-store-btn">
                            <i class="fa-solid fa-cart-shopping"></i>
                            Thêm vào giỏ hàng
                        </button>
                    </div>

                </div>

            </div> 
`

productContainerWrap.innerHTML = html + productContainerWrap.innerHTML;

const addStoreBtn = document.querySelector('.add-to-store-btn');
addStoreBtn.onclick = async () => {
    const userId = getParameterByName("user-id");
    const productId = getParameterByName("product-id");
    const userUrl = `${_DATA_URL_}/users?id=${userId}`;
    const productUrl = `${_DATA_URL_}/products?id=${productId}`;
    const user = await getUsers(userUrl);
    const boughtProduct = await getProducts(productUrl);
    let userBuyProducts = user[0]["buy-products"];

    if(userBuyProducts != undefined) {
        userBuyProducts = userBuyProducts.concat(boughtProduct);
        let newUser = user[0];
        newUser["buy-products"] = userBuyProducts;
        await updateUser(userId, newUser);
    }
    else {
        let newUser = user[0];
        newUser["buy-products"] = boughtProduct;
        await updateUser(userId, newUser);
    }

    window.location.replace(`./productInfo.html?product-id=${productId}&user-id=${userId}`)
}