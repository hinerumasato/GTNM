import { getUsers } from "./userData.js";
import { _DATA_URL_ } from "./Utils/utils.js";

const loginBtn = document.querySelector('.login-btn');
loginBtn.onclick = async () => {
    let countFailedUsers = 0;
    const users = await getUsers(`${_DATA_URL_}/users`);
    const email = document.querySelector('.email-input').value;
    const password = document.querySelector('.password').value;

    if(!email || !password) {
        alert("Chưa nhập đủ thông tin");
    }

    else {
        users.forEach(user => {
            if(user.email == email && user.password == password) {
                alert("Đăng nhập thành công");
                window.location.replace(`./index.html?user-id=${user.id}`);
            }
            else countFailedUsers++;
        });
        
        if(countFailedUsers == users.length) {
            alert("Đăng nhập thất bại");
            window.location.replace("./login.html");
        } 
    }

}
