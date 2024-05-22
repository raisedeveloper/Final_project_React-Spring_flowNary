import { initializeApp } from "firebase/app";
import {
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from "firebase/auth";
import { useState } from "react";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

const getPhoneNumberFromUserInput = () => {
    return "+82 본인번호"; 
    //  +821012345679 ( 010-1234-5678을 왼쪽과 같이, +82를 붙이고 010에서 0 하나 빼기)
};

const auth = getAuth();	// 인증객체

export default function Login() {
    const [value, Setvalue] = useState("");

    const onClickHandle = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
            size: "invisible",
            callback: (response) => {
                // reCAPTCHA 보안인증
            },
        });
        auth.languageCode = "ko";		// 한국어 설정
        const phoneNumber = getPhoneNumberFromUserInput(); // 위에서 받아온 번호
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;	// window
            })
            .catch((error) => {
                console.log("인증에 실패하였습니다.");
            });
    };

    const getCodeFromUserInput = () => {
        return value;
    };

    const onClickHandle2 = () => {
        const code = getCodeFromUserInput();
        window.confirmationResult
            .confirm(code)
            .then((result) => {
                // User signed in successfully.
                const user = result.user;
                console.log("인증에 성공하셨습니다");
                // ...
            })
            .catch((error) => {
                // 인증번호가 올바르지 않은경우
                console.log("인증번호가 올바르지 않습니다.");
            });
    };

    return (
        <>
            <div id="sign-in-button"></div>
            <button onClick={onClickHandle}>문자보내기</button>
            <input onChange={(e) => Setvalue(e.target.value)} type="text" />
            <button onClick={onClickHandle2}>인증번호 확인하기</button>
        </>
    );
}