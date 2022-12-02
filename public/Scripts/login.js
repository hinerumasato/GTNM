import { getUsers } from "./userData.js";
import { _DATA_URL_ } from "./Utils/utils.js";

const loginBtn = document.querySelector('.login-btn');
loginBtn.onclick = async () => {
    let count = 0;
    const users = await getUsers(`${_DATA_URL_}/users`);
    const username = document.querySelector('.username').value;
    const password = document.querySelector('.password').value;
    users.forEach(user => {
        if(user.username == username && user.password == password) {
            window.location.replace(`./index.html?user-id=${user.id}`);
        }
        else count++;
    });
    if(count == users.length) {
        alert("Đăng nhập thất bại");
        window.location.replace("./login.html");
    } 
}
