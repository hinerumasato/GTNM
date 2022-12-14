import { postProducts } from "./productData.js";
const addBtn = document.querySelector('.add-product-btn');

addBtn.onclick = async () => {
    const name = document.querySelector('.name').value;
    const price = document.querySelector('.price').value;
    const image = document.querySelector('.image').value;
    const type = document.querySelector('.type').value; 
    const description = document.querySelector('#area').value;
    const colors = document.querySelector(".color").value.split(",");
    await postProducts({name, price, image, type, description, colors});
    console.log({name, price, image, type, description, colors});
    alert("Thêm sản phẩm mới thành công");
    window.location.replace('./admin.html');
    
}
