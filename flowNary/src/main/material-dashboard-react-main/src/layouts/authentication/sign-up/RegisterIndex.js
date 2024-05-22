import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { SetWithExpiry } from "../../../api/LocalStorage";
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import '../theme.css';
import Swal from "sweetalert2";
import PropTypes from 'prop-types';

export default function Register({ closeModal }) {
    const [theme, setTheme] = useState('light');
    const [userInfo, setUserInfo] = useState({ email: '', password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const firebaseConfig = {
            apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
            authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        };
        initializeApp(firebaseConfig);
    }, []);
    const auth = getAuth();

    const RegisterWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const data = await signInWithPopup(auth, provider);

            const response = await axios.get('/user/getUserByEmail', {
                params: { email: data.user.email }
            });

            if (Object.keys(response.data).length === 0) {
                await axios.post("/user/register", {
                    email: data.user.email,
                    pwd: 'nn',
                    hashuid: data.user.uid,
                    provider: 1,
                });
                SetWithExpiry("email", data.user.email, 180);
                SetWithExpiry("profile", response.data.profile, 180);
                SetWithExpiry("nickname", response.data.nickname, 180);
                SetWithExpiry("statusMessage", response.data.statusMessage, 180);
                Swal.fire({
                    icon: 'success',
                    title: "구글 회원가입에 성공했습니다.",
                    showClass: {
                        popup: `animate__animated animate__fadeInUp animate__faster`
                    },
                    hideClass: {
                        popup: `animate__animated animate__fadeOutDown animate__faster`
                    }
                });
                console.log("구글 회원가입 성공!" + response.data);
            } else {
                SetWithExpiry("email", data.user.email, 180);
                SetWithExpiry("profile", response.data.profile, 180);
                SetWithExpiry("nickname", response.data.nickname, 180);
                SetWithExpiry("statusMessage", response.data.statusMessage, 180);
                Swal.fire({
                    icon: 'success',
                    title: "구글 로그인에 성공했습니다.",
                    showClass: {
                        popup: `animate__animated animate__fadeInUp animate__faster`
                    },
                    hideClass: {
                        popup: `animate__animated animate__fadeOutDown animate__faster`
                    }
                });
                console.log("구글 로그인 성공!" + response.data);
            }
            setTimeout(() => navigate('/'), 150);
        } catch (error) {
            console.error("구글 로그인 오류:", error);
        }
    };

    function handleKeyPress(event) {
        if (event && event.key === 'Enter') {
            event.preventDefault();
            handleSubmit();
        }
    }

    const handleChange = e => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }

    const handleSubmit = async () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+(com|net)$/;
        if (!emailRegex.test(userInfo.email)) {
            Swal.fire({ text: "올바른 이메일 형식이 아닙니다.", icon: "warning" });
            return;
        }
        if (userInfo.password !== userInfo.confirmPassword) {
            Swal.fire({ title: "비밀번호가 일치하지 않습니다.", text: "다시 입력해주세요", icon: "warning" });
            return;
        }
        if (userInfo.password.length < 6) {
            Swal.fire({ text: "비밀번호는 6자리 이상이어야 합니다.", icon: "warning" });
            return;
        }

        if (!/[0-9]/.test(userInfo.password) || !/[!@#$%^&*?]/.test(userInfo.password)) {
            Swal.fire({
                width: '50%',
                title: '유효성 검사 경고',
                html: `비밀번호는 숫자와 특수문자(!@#$%^&amp;*?)를 포함해야합니다.`,
                icon: 'warning'
            });
            return;
        }

        await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
            .then(async () => {
                console.log("회원가입 성공");
                Swal.fire({
                    title: "가입에 성공하셨습니다!",
                    text: "OK 버튼을 눌러주세요!",
                    icon: "success"
                }).then(() => {
                    closeModal(); // 모달 닫기
                });

                try {
                    await axios.post("/user/register", {
                        email: userInfo.email,
                        pwd: userInfo.password,
                        birth: userInfo.birth,
                        gender: userInfo.gender,
                        uname: userInfo.uname,
                        nickname: userInfo.nickname,                        
                        hashuid: 'nonGoogle',
                        provider: 0,
                    });
                } catch (error) {
                    console.log(error);
                }
                setTimeout(() => {
                    navigate('/authentication/sign-in');
                }, 1000);
            })
            .catch(error => {
                console.error("회원가입 에러:", error.message);
                if (error.code === "auth/email-already-in-use") {
                    Swal.fire({
                        title: '이미 사용중인 이메일입니다.',
                        text: "다른 이메일을 입력해주세요.",
                        icon: "warning"
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "가입에 실패하셨습니다.",
                        text: "회원가입 도중 오류 발생",
                    });
                }
            });
    }

    return (
        <div className="register-container">
            <input type="email" name='email' placeholder="이메일을 입력하세요"
                className="commonInputStyle_Modal" onKeyUp={handleKeyPress} onChange={handleChange} />

            <div className="input-container">
                <input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    placeholder="비밀번호 입력"
                    className="commonInputStyle_Modal"
                    onKeyUp={handleKeyPress}
                    onChange={handleChange}
                />
                <i
                    className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle-icon`}
                    onClick={() => setShowPassword(!showPassword)}
                />
            </div>

            <div className="input-container">
                <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name='confirmPassword'
                    placeholder="비밀번호 입력 확인"
                    className="commonInputStyle_Modal"
                    onKeyUp={handleKeyPress}
                    onChange={handleChange}
                />
                <i
                    className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle-icon`}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
            </div>

            <button className="fill_Modal" onClick={handleSubmit}>가입하기</button>
            <p>또는</p>
            <button onClick={RegisterWithGoogle} className="google-login-button">
                <img src="/images/icons/Google.png" alt="Google" />
                Sign Up with Google
            </button>
        </div>
    );
}

Register.propTypes = {
    closeModal: PropTypes.func.isRequired,
};
