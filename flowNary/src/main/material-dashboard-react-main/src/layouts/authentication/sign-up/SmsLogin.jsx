import { initializeApp } from "firebase/app";
import {
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from "firebase/auth";
import { useState } from "react";
import PropTypes from 'prop-types';
import { Button } from "@mui/material";
import { correct } from "api/alert";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};


const auth = getAuth();	// 인증객체

export default function SmsLogin({ handleKeyPress, tel }) {
    const [value, Setvalue] = useState("");
    const [verify, setVerify] = useState('');

    const getPhoneNumberFromUserInput = () => {
        if (tel.startsWith("010")) {
            // '010'을 제거하고 나머지 번호만 남깁니다.
            const restOfNumber = tel.slice(1);
            // 국가 코드를 추가합니다.
            return "+82" + restOfNumber.replace(/-/g, "");
        }
        // 번호가 '010'으로 시작하지 않으면, 변경하지 않습니다.
        return tel;
    };

    const handleVerify = e => {
        setVerify(e.target.value);
    }

    const onClickHandle = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
            size: "invisible",
            callback: (response) => {
                // reCAPTCHA 보안인증
            }, auth
        });
        auth.languageCode = "ko";		// 한국어 설정
        const phoneNumber = getPhoneNumberFromUserInput(); // props를 통한 번호
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;	// window
                correct("문자를 성공적으로 전송하였습니다!");
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
            <div id="recaptcha-container"></div> {/* reCAPTCHA 컨테이너 추가 */}
            <input
                name='confirmPassword'
                placeholder="인증번호를 입력하세요"
                className="commonInputStyle_Modal"
                onKeyUp={handleKeyPress}
                onChange={handleVerify}
            />
            <Button
                onClick={onClickHandle}
                variant="contained" sx={{
                    backgroundColor: 'rgb(54, 11, 92)', p: 0, mt: 1.2,
                    '&:hover': { backgroundColor: 'rgb(54, 30, 150)' }
                }} style={{ color: 'white' }} >문자보내기</Button>
            <Button
                onClick={onClickHandle2}
                variant="contained" sx={{
                    backgroundColor: 'rgb(54, 11, 92)', p: 0, mt: 1.2,
                    '&:hover': { backgroundColor: 'rgb(54, 30, 150)' }
                }} style={{ color: 'white' }} >인증번호 확인하기</Button>
        </>
    );
}

SmsLogin.propTypes = {
    handleKeyPress: PropTypes.func.isRequired,
    tel: PropTypes.string.isRequired
};
