import axios from "axios"
import { UploadImage } from "./image";

/** 유저 등록
 * @param {*} hashuid google 로그인에서만 만들어지는 hash형태의 uid
 * @param {*} provider google 로그인이면 1, 일반 로그인이면 0
 * @param {*} email 입력한 이메일
 * @param {*} pwd 비밀번호
 * @returns 
 */
export const userRegister = async (hashuid: string, provider: number, email: string, pwd: string) => {

    return axios.get('http://localhost:8090/user/register', {
        params: {
            hashuid: hashuid,
            provider: provider,
            email: email,
            pwd: pwd,
        }
    }).catch(error => {
        console.log('axiosget.js: userRegister error!');
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

    const result = await axios.get('http://localhost:8090/user/updatepwd', {
        params: {
            uid: uid,
            pwd1: pwd1,
            pwd2: pwd2,
        }
    }).then((response) => response.data)
    .catch(error => {
        console.log('axiosget.js: userUpdatePwd error!');
        console.log(error);
    });

    return result;
}

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
export const getBoard = async (bid, uid) => {
    try {
      const response = await axios.get('http://localhost:8090/board/getBoard', {
        params: {
          bid: bid,
          uid: uid,
        }
      });
      return response.data;
    } catch (error) {
      console.log('axiosget.js: getBoard error!');
      console.error(error);
      throw error; // 오류를 다시 throw하여 상위에서 처리할 수 있도록 합니다.
    }
  };

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
    
    const result = await axios.get('http://localhost:8090/board/replyList', {
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

    const result = await axios.get('http://localhost:8090/board/re_ReplyList', {
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

/** 글 삭제
 * @param {*} bid 글 번호
 * @returns 
 */
export const deleteBoard = async (bid: number) => {

    return axios.get('http://localhost:8090/board/re_ReplyList', {
        params: {
            bid: bid,
        }
    }).then((response) => response.data)
    .catch(error => {
        console.log('axiosget.js: getReplyList error!');
        console.log(error);
    });
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