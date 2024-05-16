import axios from "axios"
import { UploadImage } from "./image";

/** 유저번호로 유저 조회
 * @param {*} uid 유저번호 
 * @returns 
 */
export const getUser = async (uid: number) => {

    const result = await axios.get('http://localhost:8090/user/getUser', {
        params: {
            uid: uid,
        }
    }).then((response) => response.data)
    .catch(error => {
        console.log('axiosget.js: getUser error!');
        console.log(error);
    });

    return result;
}

/** 이메일로 유저 조회
 * @param {*} email 이메일
 * @returns 
 */
export const getUserEmail = async (email: string) => {

    const result = await axios.get('http://localhost:8090/user/getUserByEmail', {
        params: {
            email: email,
        }
    }).then((response) => response.data)
    .catch(error => {
        console.log('axiosget.js: getUserEmail error!');
        console.log(error);
    });

    return result;
}

/** 글 조회
 * @param {*} bid 글 번호
 * @param {*} uid 현재 접속한 유저 번호 (기본값 -1)
 * @returns 
 */
export const getBoard = async (bid: Number, uid = -1) => {
    
    const result = await axios.get('http://localhost:8090/board/getBoard', {
        params: {
            bid: bid,
            uid: uid,
        }
    }).then((response) => response.data)
    .catch(error => {
        console.log('axiosget.js: getBoard error!');
        console.log(error);
    });

    return result;
}

/** shareUrl을 통해 글 조회
 * @param {*} url 글 공유 Url (10자리의 무작위 숫자+영대소문자로 구성됨)
 * @param {*} uid 현재 접속한 유저 번호 (기본값 -1)
 * @returns 
 */
export const getBoardUrl = async (url: string, uid = -1) => {
    console.log(url);

    const result = await axios.get('http://localhost:8090/board/getBoardUrl', {
        params: {
            url: url,
            uid: uid,
        }
    }).then((response) => response.data)
    .catch(error => {
        console.log('axiosget.js: getBoardUrl error!');
        console.log(error);
    });

    return result;
}

/** 글 리스트 받기
 * @param {*} count 보여줄 개수 (기본값 1)
 * @param {*} field 검색 분야 1 (기본값 'title')
 * @param {*} field2 분야 2 (기본값 '')
 * @param {*} field3 분야 3 (기본값 '')
 * @param {*} query 검색어 (기본값 '')
 * @param {*} type 검색 유형 (1: field 1개, 2: field 2개, 3: field 3개, 기본값 1)
 * @param {*} uid 현재 접속한 유저 번호 (기본값 -1)
 * @returns 
 */
export const getBoardList = async (count = 1, field='title', field2 = '', field3 = '', query = '', type = 1, uid = -1) => {

    const result = await axios.get('http://localhost:8090/board/list', {
        params: {
            c: count,
            f: field,
            f2: field2,
            f3: field3,
            q: query,
            type: type,
            uid: uid,
        }
    }).then((response) => response.data)
    .catch(error => {
        console.log('axiosget.js: getBoardList error!');
        console.log(error);
    });

    return result;
}

/** 댓글 리스트 받기
 * @param {*} bid 글 번호
 * @param {*} offset 맨 처음부터 보여주지 않을 개수 (ex: limit 20에 offset 10이면 11~20번째 글만 리턴)
 * @param {*} limit 개수 제한
 * @returns 
 */
export const getReplyList = async (bid: Number, offset: Number, limit: number) => {
    
    const result = await axios.get('http://localhost:8090/reply/list', {
        params: {
            bid: bid,
            offset: offset,
            limit: limit,
        }
    }).then((response) => response.data)
    .catch(error => {
        console.log('axiosget.js: getReplyList error!');
        console.log(error);
    });

    return result;
}

/** 대댓글 리스트
 * @param {*} rid 댓글번호
 * @returns 
 */
export const getReReplyList = async (rid: number) => {

    const result = await axios.get('http://localhost:8090/reply/re_list', {
        params: {
            rid: rid,
        }
    }).then((response) => response.data)
    .catch(error => {
        console.log('axiosget.js: getReplyList error!');
        console.log(error);
    });

    return result;
}

/** 검색어를 입력하여 받은 게시물의 총 개수 구하기
 * @param {*} field 검색 분야 1 (기본값 'title')
 * @param {*} field2 분야 2 (기본값 '')
 * @param {*} field3 분야 3 (기본값 '')
 * @param {*} query 검색어 (기본값 '')
 * @param {*} type 검색 유형 (1: field 1개, 2: field 2개, 3: field 3개, 기본값 1)
 * @param {*} uid 현재 접속한 유저 번호 (기본값 -1)
 * @returns 
 */
export const getBoardListCount = async (field='title', field2 = '', field3 = '', query = '', type = 1, uid = -1) => {

    const result = await axios.get('http://localhost:8090/board/listCount', {
        params: {
            f: field,
            f2: field2,
            f3: field3,
            q: query,
            type: type,
            uid: uid,
        }
    }).then((response) => response.data)
    .catch(error => {
        console.log('axiosget.js: getBoardListCount error!');
        console.log(error);
    });

    return result;
}