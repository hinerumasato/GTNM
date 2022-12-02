import { pushUsers, getUsers } from './userData.js';
import { _DATA_URL_ } from './Utils/utils.js';


const signinBtn = document.querySelector('.signin-btn');

signinBtn.onclick = async () => {
    let users = await getUsers(`${_DATA_URL_}/users`)
    console.log(users);
    let isUsed = false;
    const username = document.querySelector('.username').value;
    const password = document.querySelector('.password').value;

    users.forEach(user => {
        if(user.username == username) {
            alert("Tên đăng nhập đã có người sử dụng");
            isUsed = true;
            return;
        }
    })
    if(!isUsed) {
        let newUser = {};
        newUser.username = username;
        newUser.password = password;
        pushUsers(newUser);
        alert("Đăng ký thành công");
        window.location.replace("./login.html");
    }
}
