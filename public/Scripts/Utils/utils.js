function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function setCharAt(str, index, length, chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index + length);
}


async function renderItem(itemField, elements, html,...rest) {
    elements.forEach(element => {
        let temp = html;
        for(let key of rest) {
            temp = setCharAt(temp, temp.indexOf("undefined"), 9, element[key]);
        }
        itemField.innerHTML += temp;
    });
}

const _DATA_URL_ = "http://localhost:3000";

export { getParameterByName, _DATA_URL_, renderItem };