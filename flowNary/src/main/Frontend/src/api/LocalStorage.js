import { useNavigate } from "react-router-dom";

/** localStorage에 key 값을 만료시간을 두고 저장하기
 * @param {*} key 저장할 키 이름
 * @param {*} value 저장할 값
 * @param {*} ttl 만료시간 (1당 1분)
 */
export function SetWithExpiry(key, value, ttl) {
    const now = new Date();

    const item = {
        value: value,
        expiry: now.getTime() + ttl * 1000 * 60,
    }

    localStorage.setItem(key, JSON.stringify(item));
}

/** 만료시간이 있는 localstorage 데이터를 받아오기
 * @param {*} key 저장한 키
 * @returns 
 */
export function GetWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    const navigate = useNavigate();

    if (!itemStr) {
        if (key == "uid")
            return -1;

        return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > parseInt(item.expiry)) {
        localStorage.removeItem(key);
        if (key === 'uid')
        {
            alert('세션이 만료되었습니다. 로그인이 필요합니다')
            localStorage.removeItem("email");
            localStorage.removeItem("profile");
            navigate('/login')
            return -1;
        }
        return null;
    }

    return item.value;
}