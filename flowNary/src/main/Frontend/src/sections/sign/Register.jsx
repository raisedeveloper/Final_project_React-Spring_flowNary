// 기본
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import axios from 'axios';
import { SetWithExpiry } from "../../api/LocalStorage";

// firebase 연결
import { initializeApp, } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';

// css 연결
import './theme.css';

// alert 창
import Swal from "sweetalert2";

export default function Register() {
    // 테마설정
    const [theme, setTheme] = useState('light'); // 초기 테마를 설정
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light'); // 테마 전환 함수
    };

    // 그림 추가
    const backgroundImage = theme === 'light' ? '/img/flowLight.png' : '/img/flowNight.png';
    const logoImage = theme === 'light' ? '/img/LightLogo.png' : '/img/DarkLogo.png';
    const HelloLogo = theme === 'light' ? '/img/HelloLight.png' : '/img/HelloBlack.png';

    // 회원가입 초기값 설정
    const [userInfo, setUserInfo] = useState({ email: '', password: '', confirmPassword: '' });
    const navigate = useNavigate();

    // Firebase 초기화
    useEffect(() => {
        const firebaseConfig = {
            apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
            authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        };
        initializeApp(firebaseConfig);
    }, []);
    const auth = getAuth();

    // 구글로 회원가입
    const RegisterWithGoogle = async () => {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const data = await signInWithPopup(auth, provider);

            // 이메일로 사용자 조회
            const response = await axios.get('http://localhost:8090/user/getUserByEmail', {
                params: {
                    email: data.user.email
                }
            });

            // 사용자가 존재하지 않으면 회원가입 진행
            if (Object.keys(response.data).length === 0) {
                await axios.get("http://localhost:8090/user/register", {
                    params: {
                        email: data.user.email,
                        pwd: 'nn',
                        hashuid: data.user.uid,
                        provider: 1,
                    }
                });
                // 회원가입 성공 시 로컬 스토리지 설정 및 리다이렉트
                SetWithExpiry("email", data.user.email, 180);
                SetWithExpiry("profile", response.data.profile, 180);
                Swal.fire({
                    icon: 'success',
                    title: "구글 회원가입에 성공했습니다.",
                    showClass: {
                        popup: `
                                animate__animated
                                animate__fadeInUp
                                animate__faster
                            `
                    },
                    hideClass: {
                        popup: `
                                animate__animated
                                animate__fadeOutDown
                                animate__faster
                            `
                    }
                });
                console.log("구글 회원가입 성공!" + response.data);
            } else {
                SetWithExpiry("email", data.user.email, 180);
                SetWithExpiry("profile", response.data.profile, 180);
                Swal.fire({
                    icon: 'success',
                    title: "구글 로그인에 성공했습니다.",
                    showClass: {
                        popup: `
                                animate__animated
                                animate__fadeInUp
                                animate__faster
                            `
                    },
                    hideClass: {
                        popup: `
                                animate__animated
                                animate__fadeOutDown
                                animate__faster
                            `
                    }
                });
                console.log("구글 로그인 성공!" + response.data);
            }
            navigate('/');
        } catch (error) {
            console.error("구글 로그인 오류:", error);
        }
    };
    



    // 회원가입 항목 입력시 값 변경
    const handleChange = e => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }

    // 가입하기 버튼 눌렀을 때 일어나는 기능
    const handleSubmit = async e => {
        e.preventDefault();

        // 정규식으로 이메일 형식 확인
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+(com|net)$/;
        if (!emailRegex.test(userInfo.email)) {
            Swal.fire({
                text: "올바른 이메일 형식이 아닙니다.",
                icon: "warning"
            });
            return;
        }
        // 비밀번호 확인 - 일치여부, 형식
        if (userInfo.password !== userInfo.confirmPassword) {
            Swal.fire({
                title: "비밀번호가 일치하지 않습니다.",
                text: "다시 입력해주세요",
                icon: "warning"
            });
            return;
        }
        if (userInfo.password.length < 6) { // 파이어베이스 비밀번호 길이 제한
            Swal.fire({
                text: "비밀번호는 6자리 이상이어야 합니다.",
                icon: "warning"
            });
            return;
        }

        if (!/[0-9]/.test(userInfo.password) || !/[!@#$%^&*?]/.test(userInfo.password)) { // 정규식으로 비밀번호 확인
            Swal.fire({
                width: '50%',
                title: '유효성 검사 경고',
                html: `비밀번호는 숫자와 특수문자(!@#$%^&amp;*?)를 포함해야합니다.`,
                icon: 'warning'
            });
            return;
        }

        await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
            .then(() => {
                console.log("회원가입 성공");
                Swal.fire({
                    title: "가입에 성공하셨습니다!",
                    text: "OK 버튼을 눌러주세요!",
                    icon: "success"
                });
                axios.get("http://localhost:8090/user/register", {
                    params: {
                        email: userInfo.email,
                        pwd: userInfo.password,
                        hashuid: 'nonGoogle',
                        provider: 0,
                    }
                }).catch((error) => {
                    console.log(error)
                });
                setTimeout(() => {
                    navigate('/login');
                }, 1000); // 1000 밀리초 = 1초 딜레이
            })
            .catch(error => {
                // 이미 사용 중인 이메일일 경우 또는 다른 오류가 발생한 경우
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
        <div className={`background ${theme}`} style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <Card id='cardMain' className="cardMain">
                <div id='login-box' className="loginBox">
                    <div className={`welcome-message`}>
                        <img src={HelloLogo} alt='Hello' style={{ maxWidth: '10%' }} />
                    </div>
                    <img src={logoImage} alt='LOGO' style={{ maxWidth: '20%' }} />
                    <br />
                    <input type="email" name='email' placeholder="이메일" className="commonInputStyle" onChange={handleChange} />
                    <br />
                    <input type="password" name='password' placeholder="비밀번호" className="commonInputStyle" onChange={handleChange} />
                    <br />
                    <input type="password" name='confirmPassword' placeholder="비밀번호 확인" className="commonInputStyle" onChange={handleChange} />
                    <br /><br />
                    <Link className={`custom-button ${theme}`} onClick={handleSubmit}>가입하기</Link>
                    {/* 다음줄 넘기는 br */}
                    <br />
                    <p style={{
                        marginTop: '10px', marginBottom: '10px',
                        color: theme === 'light' ? '#dca3e7' : '#ffffff'
                    }}>혹은</p>
                    <Link to="#" onClick={RegisterWithGoogle} className={`custom-button ${theme}`}>
                        <img style={{ paddingRight: '10px', margin: '-6px', width: '35px' }} src="/img/icon/Google.png" alt="Google" />
                        <span>로그인</span>
                    </Link>
                    <p style={{ marginBottom: '1px' }}>&nbsp;</p>
                    <hr style={{ border: '1px solid rgba(255, 255, 255, 0.4)' }} />
                    <p style={{ color: theme === 'light' ? '#dca3e7' : '#ffffff' }}>계정이 이미 있으신가요?</p>
                    <Link to="/login" className={`custom-button ${theme}`}>FlowNary<br />로그인</Link>
                    <br />
                    <div className="container">
                        <button onClick={toggleTheme} className="fill">테마변경</button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
