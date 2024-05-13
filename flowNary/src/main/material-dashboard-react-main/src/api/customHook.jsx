import axios from "axios";
import { useEffect, useState } from "react";
import { GetWithExpiry } from "./LocalStorage";

// uid로 user 정보 받아오기
export function useGetUser(uid) {
    const [user, setUser] = useState({ 
        id: uid,
        email: '',
        profile: '',
        uname: '',
        nickname: '',
        statusMessage: '',
        snsDomain: '',
        status: 0,
        regDate: null,
        gender: -1,
        provider: 0,
        birth: null,
        tel: '',
        hashUid: '',
    });

    useEffect(() => {
        if (uid) {
            axios.get('http://localhost:8090/user/getUser', {
                params: {
                    uid: uid
                }
            }).then(res => {
                setUser(res.data);
            }).catch(error => console.log(error));
        }
    }, [uid]);

    return user;
}

// LocalStorage에서 uid 이용해서 nickname 받기
export function useGetUserNicknameLS() {
    const uid = GetWithExpiry("uid");
    const [nickname, setNickname] = useState('');

    useEffect(() => {
        if (uid != null && !isNaN(uid))
        {
            axios.get('http://localhost:8090/user/getUser', {
                params: {
                  uid: uid,
                }
            }).then(res => {
                if (res.data.nickname != null && res.data.nickname != '') {
                  setNickname(res.data.nickname);
                }
                else {
                  setNickname(res.data.email);
                }
            }).catch(error => console.log(error));
        }
    }, [uid])

    return nickname;
}

// 보드 리스트 받기
export function useGetBoardList(query, count, field) {

}