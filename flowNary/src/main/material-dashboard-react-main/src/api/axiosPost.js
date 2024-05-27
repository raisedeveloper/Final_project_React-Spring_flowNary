import axios from "axios"
const API_BASE_URL = "/";

/** 유저 등록
 * @param {*} hashuid google 로그인에서만 만들어지는 hash형태의 uid
 * @param {*} provider google 로그인이면 1, 일반 로그인이면 0
 * @param {*} email 입력한 이메일
 * @param {*} pwd 비밀번호
 * @returns 
 */
export const userRegister = async (sendData: {
    hashuid: string,
    provider: number,
    email: string,
    pwd: string,
    birth: string,
    uname: string,
    nickname: string,
    tel: string
}) => {

    console.log("데이터" + sendData.uname + sendData.nickname + sendData.email);
    return axios({
        method: "POST",
        url: '/user/register',
        data: sendData,
        headers: { 'Content-Type': 'application/json' }
    }).catch(error => {
        console.log("axiospost.js: insertBoard error!");
        console.log(error);
    });
}

/** 비밀번호만 바꾸는 유저정보 수정
 * @param {*} uid 유저번호
 * @param {*} pwd1 입력된 비밀번호 
 * @param {*} pwd2 비밀번호 확인
 * @returns 
 */
export const userUpdatePwd = async (uid: number, pwd1: string, pwd2: string) => {

    return axios.post('/user/updatepwd', {
        uid: uid,
        pwd1: pwd1,
        pwd2: pwd2,
    }).then((response) => response.data)
        .catch(error => {
            console.log('axiosget.js: userUpdatePwd error!');
            console.log(error);
        });
}

/** 사용자 정보 업데이트
 * @param {*} sendData 보내줄 정보의 Json String 데이터, 이하는 sendData에 넣어야 할 정보
 * @param {*} uid 유저번호
 * @param {*} uname 유저이름
 * @param {*} nickname 닉네임
 * @param {*} profile 프로필 사진의 string url
 * @param {*} statusMessage 상태메세지 (=자기소개)
 * @param {*} snsDomain 외부 sns 링크
 * @param {*} tel 전화번호
 * @returns 
 */
export const userUpdate = async (sendData: {
    uid: number,
    uname: string,
    nickname: string,
    profile: string,
    statusMessage: string,
    snsDomain: string,
    tel: string,
}) => {

    return axios.post('/user/update',
        sendData
    ).catch(error => {
        console.log("axiospost.js: userUpdate error!");
        console.log(error);
    });
}

/** 글 작성 후 서버에 전송
 * @param {*} sendData 보내줄 정보의 Json String 데이터, 이하는 sendData에 넣어야 할 정보
 * @param {*} uid 작성한 사람의 유저번호
 * @param {*} title 글 제목
 * @param {*} bContents 글 내용
 * @param {*} image 글에 저장된 이미지의 string url
 * @param {*} nickname 작성한 사람의 닉네임
 * @param {*} hashTag 해시태그
 * @returns 
 */
export const insertBoard = async (sendData: string) => {
    return axios({
        method: "POST",
        url: '/board/insert',
        data: sendData,
        headers: { 'Content-Type': 'application/json' }
    }).catch(error => {
        console.log("axiospost.js: insertBoard error!");
        console.log(error);
    });
}

/** 글 수정
 * @param {*} sendData 보내줄 정보의 Json String 데이터, 이하는 sendData에 넣어야 할 정보
 * @param {*} bid 글 번호
 * @param {*} title 글 제목
 * @param {*} bContents 글 내용
 * @param {*} image 글에 저장된 이미지의 string url
 * @param {*} hashTag 해시태그
 * @returns 
 */
export const updateBoard = async (sendData: string) => {
    console.log('보드' + sendData);
    return axios({
        method: "POST",
        url: '/board/update',
        data: sendData,
        headers: { 'Content-Type': 'application/json' }
    }).catch(error => {
        console.log("axiospost.js: updateBoard error!");
        console.log(error);
    });
}

/** 댓글 작성
 * @param {*} sendData 보내줄 정보의 Json String 데이터, 이하는 sendData에 넣어야 할 정보
 * @param {*} bid 글 번호
 * @param {*} uid 작성한 사람의 유저번호
 * @param {*} rContents 댓글 번호
 * @param {*} nickname 작성한 사람의 닉네임
 * @returns 
 */
export const insertReply = async (sendData: string) => {

    return axios({
        method: "POST",
        url: '/reply/insert',
        data: sendData,
        headers: { 'Content-Type': 'application/json' }
    }).catch(error => {
        console.log("axiospost.js: insertReply error!");
        console.log(error);
    });
}

/** 대댓글 작성
 * @param {*} sendData 보내줄 정보의 Json String 데이터, 이하는 sendData에 넣어야 할 정보
 * @param {*} rid 대댓글이 달린 댓글 번호
 * @param {*} uid 작성한 사람의 유저번호
 * @param {*} rrContents 대댓글 내용
 * @param {*} nickname 작성한 사람의 닉네임
 * @returns  
 */
export const insertReReply = async (sendData: string) => {

    return axios({
        method: "POST",
        url: '/reply/re_insert',
        data: sendData,
        headers: { 'Content-Type': 'application/json' }
    }).catch(error => {
        console.log("axiospost.js: insertReReply error!");
        console.log(error);
    });
}

/** 좋아요 / 좋아요 해제
 * @param {*} sendData 보내줄 정보의 Json String 데이터, 이하는 sendData에 넣어야 할 정보
 * @param {*} uid 좋아요를 한 사람의 유저번호
 * @param {*} type 좋아요를 한 대상물의 유형 (1: 게시글, 2: 댓글, 3: 대댓글)
 * @param {*} oid 대상물의 번호(글이면 bid, 댓글이면 rid 등)
 * @param {*} fuid 좋아요를 한 대상이 되는 유저번호
 * @returns 
 */
export const like = async (sendData: string) => {
    return axios({
        method: "POST",
        url: '/like/update',
        data: sendData,
        headers: { 'Content-Type': 'application/json' }
    }).catch(error => {
        console.log("axiospost.js: like error!");
        console.log(error);
    });
}

/** 좋아요 / 좋아요 해제
 * @param {*} sendData 보내줄 정보의 Json String 데이터, 이하는 sendData에 넣어야 할 정보
 * @param {*} uid 좋아요를 한 사람의 유저번호
 * @param {*} type 좋아요를 한 대상물의 유형 (1: 게시글, 2: 댓글, 3: 대댓글)
 * @param {*} oid 대상물의 번호(글이면 bid, 댓글이면 rid 등)
 * @param {*} fuid 좋아요를 한 대상이 되는 유저번호
 * @returns 
 */
export const like2 = async (sendData: {
    uid: number,
    type: Number,
    oid: Number,
    fuid: Number,
}) => {
    return axios.post('/like/update',
        sendData
    ).catch(error => {
        console.log("axiospost.js: like error!");
        console.log(error);
    });
}

/** 글 삭제
 * @param {*} bid 글 번호
 * @returns 
 */
export const deleteBoard = async (bid: number) => {

    return axios.post('/board/delete', {
        bid: bid,
    }).catch(error => {
        console.log('axiospost.js: deleteBoard error!');
        console.log(error);
    });
}

/** 댓글 삭제
 * @param {*} rid 댓글 번호 
 * @returns 
 */
export const deleteReply = async (rid: number) => {

    return axios.post('/reply/re_delete', {
        rid: rid,
    }).catch(error => {
        console.log('axiospost.js: deleteReply error!');
        console.log(error);
    });
}

/** 댓글 삭제
 * @param {*} rid 댓글 번호 
 * @returns 
 */
export const deleteReReply = async (rrid: number) => {

    return axios.post('/reply/delete', {
        rrid: rrid,
    }).catch(error => {
        console.log('axiospost.js: deleteReReply error!');
        console.log(error);
    });
}

export const insertChat = async (uid1: number, uid2: number) => {

    return axios.post('/chat/insert', {
        uid1: uid1,
        uid2: uid2,
    }).catch(error => {
        console.log('axiospost.js: insertChat error!');
        console.log(error);
    });
}

export const updateChat = async (cid: number, uid: number) => {

    return axios.post('/chat/update', {
        cid: cid,
        uid: uid,
    }).catch(error => {
        console.log('axiospost.js: updateChat error!');
        console.log(error);
    });
}

export const exitChat = async (cid: number, uid: number) => {

    return axios.post('/chat/exit', {
        cid: cid,
        uid: uid,
    }).catch(error => {
        console.log('axiospost.js: exitChat error!');
        console.log(error);
    });
}

export const deleteChat = async (cid: number) => {

    return axios.post('/chat/delete', {
        cid: cid,
    }).catch(error => {
        console.log('axiospost.js: deleteChat error!');
        console.log(error);
    });
}

export const deleteDm = async (did: number) => {

    return axios.post('/chat/delete', {
        did: did,
    }).catch(error => {
        console.log('axiospost.js: deleteChat error!');
        console.log(error);
    });
}

/// todo List
export const updateTodo = async (sendData: { tid: number, contents: string }) => {
    return axios.post('/todo/update', {
        sendData
    }).catch(error => {
        console.log('axiospost.js: updateTodo error!');
        console.log(error);
    });
}

export const insertTodo = async (sendData: { uid: number, contents: string }) => {
    return axios.post('/todo/insert', {
        sendData
    }).catch(error => {
        console.log('axiospost.js: insertTodo error!');
        console.log(error);
    });
}

export const deleteTodo = async (tid: number) => {
    return axios.post('/todo/delete', {
        tid: tid,
    }).catch(error => {
        console.log('axiospost.js: deleteTodo error!');
        console.log(error);
    });
}

 // bookmark
 export const updateBookmark = async (bookmarks) => {
    return axios.post('/user/bookmark', {
        bookmarks
    }).catch(error => {
        console.log('axiospost.js: updatebookmark error!');
        console.log(error);
    });
}
