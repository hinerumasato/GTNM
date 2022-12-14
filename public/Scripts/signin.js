import { pushUsers, getUsers } from './userData.js';
import { _DATA_URL_ } from './Utils/utils.js';


const signinBtn = document.querySelector('.signin-btn');

signinBtn.onclick = async () => {
    let users = await getUsers(`${_DATA_URL_}/users`)
    let isUsed = false;
    const email         = document.querySelector('.email').value;
    const password      = document.querySelector('.password').value;
    const firstName     = document.querySelector('.first-name').value;
    const name          = document.querySelector('.name').value;
    const phoneNumber   = document.querySelector('.phone-number').value;

    console.log({email, password, firstName, name, phoneNumber})

    if(!email || !password || !firstName || !name || !phoneNumber) {
        alert("Chưa nhập đủ dữ liệu");
    }

    else {
        users.forEach(user => {
            if(user.username == email) {
                alert("Email đã có người sử dụng");
                isUsed = true;
                return;
            }
        })
        if(!isUsed) {
            let newUser = {};
            newUser.email = email;
            newUser.password = password;
            newUser.firstName = firstName;
            newUser.name = name;
            newUser.phoneNumber = phoneNumber;
            pushUsers(newUser);
            alert("Đăng ký thành công");
            window.location.replace("./login.html");
        }
    }
}
