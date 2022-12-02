import { getProducts, deleteProduct } from "./productData.js";
import { _DATA_URL_ } from "./Utils/utils.js";
let products = await getProducts(`${_DATA_URL_}/products`);
const col = document.querySelector('tbody');
const selectAll = document.querySelector('.select-all');
const deleteProductBtn = document.querySelector('.delete-product-btn');

document.querySelector(".admin-header-left span").textContent = " " + products.length;
products.forEach((product, index) => {
    col.innerHTML += `
    <tr>
    <td>${index + 1}</td>
    <td>${product.name}</td>
    <td>${product.type}</td>
    <td>${product.price}</td>
    <td><input type="checkbox" class="select-product" selectedProduct=${product.id}></td>
    <td><a class="edit" selectedProduct=${product.id}><i class="fa-solid fa-pen-to-square"></i></a></td>
    </tr>
    `
});

const editBtns = document.querySelectorAll('.edit')

editBtns.forEach(editBtn => {
    editBtn.onclick = () => {
        editBtn.setAttribute("href", `./update-product.html?id=${editBtn.getAttribute("selectedProduct")}`);
    }
})


selectAll.onchange = () => {
    const productCheckBoxs = document.querySelectorAll('.select-product');
    if(selectAll.checked) {
        productCheckBoxs.forEach(checkbox => checkbox.checked = true);
    }
    else {
        productCheckBoxs.forEach(checkbox => checkbox.checked = false);
    }
}

deleteProductBtn.onclick = async () => {
    const productCheckBoxs = document.querySelectorAll('.select-product');
    productCheckBoxs.forEach(async product => {
        if(product.checked) await deleteProduct(product.getAttribute("selectedProduct"));
    })
    alert("Delete");
    window.location.href = "./admin.html";
}
