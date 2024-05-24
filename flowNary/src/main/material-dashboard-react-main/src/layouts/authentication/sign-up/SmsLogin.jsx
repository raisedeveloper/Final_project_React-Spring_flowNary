import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useState } from "react";
import PropTypes from 'prop-types';
import { Button } from "@mui/material";
import { correct } from "api/alert";
import { getApp, getApps, initializeApp } from "firebase/app";
import { wrong } from "api/alert";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SEMDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Firebase 앱 초기화 (이미 초기화된 경우 재사용)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export default function SmsLogin({ handleKeyPress, tel, setCheckingTel }) {
    const [value, setValue] = useState("");
    const [verify, setVerify] = useState('');

    const formatPhoneNumber = (phoneNumber) => {
        if (phoneNumber.startsWith("010")) {
            const restOfNumber = phoneNumber.slice(1).replace(/-/g, "");
            return "+82" + restOfNumber;
        }
        return phoneNumber;
    };

    const handleVerify = e => {
        setVerify(e.target.value);
    };

    const onClickHandle = () => {
        const phoneNumber = formatPhoneNumber(tel); // 전화번호 형식 변환
        const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            size: 'invisible',
            callback: () => {
                console.log('recaptcha resolved..')
            }
        });

        signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult; // 확인 결과 저장
                correct("문자를 성공적으로 전송하였습니다!");
            })
            .catch((error) => {
                wrong("문자를 전송하지 못했습니다. 번호를 확인해주세요.");
            });
    };

    const getCodeFromUserInput = () => {
        return value;
    };

    const onClickHandle2 = () => {
        const code = verify;
        window.confirmationResult
            .confirm(code)
            .then((result) => {
                const user = result.user;
                correct("인증에 성공하셨습니다");
                setCheckingTel(1);
            })
            .catch((error) => {
                wrong("인증번호가 올바르지 않습니다.");
            });
    };

    return (
        <>
            <div id="recaptcha-container"></div> {/* reCAPTCHA 컨테이너 추가 */}
            <input
                name="confirmPassword"
                placeholder="인증번호를 입력하세요"
                className="commonInputStyle_Modal"
                onKeyUp={handleKeyPress}
                onChange={handleVerify}
            />
            <Button
                onClick={onClickHandle}
                variant="contained"
                sx={{
                    backgroundColor: 'rgb(54, 11, 92)',
                    p: 0,
                    mt: 1.2,
                    '&:hover': { backgroundColor: 'rgb(54, 30, 150)' },
                }}
                style={{ color: 'white' }}
            >
                문자보내기
            </Button>
            <Button
                onClick={onClickHandle2}
                variant="contained"
                sx={{
                    backgroundColor: 'rgb(54, 11, 92)',
                    p: 0,
                    mt: 1.2,
                    '&:hover': { backgroundColor: 'rgb(54, 30, 150)' },
                }}
                style={{ color: 'white' }}
            >
                인증번호 확인하기
            </Button>
        </>
    );
}

SmsLogin.propTypes = {
    handleKeyPress: PropTypes.func.isRequired,
    tel: PropTypes.string.isRequired,
    setCheckingTel: PropTypes.func.isRequired
};
