import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@mui/material";

import '../css/theme.css';
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import axios from "axios";

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

    // 구글 회원가입 진행
    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider)
            .then((result) => {
                // 로그인이 성공한 후에 페이지를 이동합니다.
                console.log("구글 로그인 성공", result.user.email);
                // Firebase에서 회원가입 여부를 확인하고 로그인 또는 회원가입 완료 메시지를 출력합니다.
                checkIfRegistered(result.user.email).then((isRegistered) => {
                    if (!isRegistered) {
                        // 회원가입된 정보가 없으면 구글 회원가입 완료 메시지 출력
                        alert('구글 회원가입 완료');
                    } else {
                        // 이미 회원가입된 정보가 있으면 구글 로그인 완료 메시지 출력
                        alert('구글 로그인 완료');
                    }
                    navigate('/');
                }).catch((error) => {
                    console.error("회원가입 여부 확인 오류:", error);
                });
            })
            .catch((error) => {
                // 로그인에 실패한 경우 에러를 콘솔에 출력합니다.
                console.error("로그인 오류:", error);
            });
    }


    // Firebase에서 이메일을 기준으로 회원가입 여부를 확인하는 함수
    const checkIfRegistered = async (email) => {
        try {
            // 이메일을 통해 로그인 방법을 가져옵니다.
            const signInMethods = await fetchSignInMethodsForEmail(auth, email);

            // 로그인 방법이 존재한다면 이미 등록된 사용자이므로 true 반환
            return signInMethods.length > 0;
        } catch (error) {
            // 에러 발생 시 false 반환
            console.error('Error fetching user data:', error);
            return false;
        }
    }



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
            alert("올바른 이메일 형식이 아닙니다.");
            return;
        }
        // 비밀번호 확인 - 일치여부, 형식
        if (userInfo.password !== userInfo.confirmPassword) {
            alert("비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
            return;
        }
        if (userInfo.password.length < 6) { // 파이어베이스 비밀번호 길이 제한
            alert("비밀번호는 6자리 이상이어야 합니다.");
            return;
        }
        if (!/[0-9]/.test(userInfo.password) || !/[!@#$%^&*?]/.test(userInfo.password)) { // 정규식으로 비밀번호 확인
            alert("비밀번호는 숫자와 특수문자(!@#$%^&*?)를 포함해야 합니다.");
            return;
        }

        await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
            .then(() => {
                console.log("회원가입 성공");

                //////////////////////////// 4.25 추가된 부분 ////////////////////////////////
                alert('회원가입 성공. 환영합니다.');
                axios.get("/user/register", {
                    params: {
                        email: userInfo.email,
                        pwd: userInfo.password,
                    }
                }).catch((error) => {
                    console.log(error)
                })
                /////////////////////////////////////////////////////////////////////////////
                
                setTimeout(() => {
                    navigate('/login');
                }, 1000); // 1000 밀리초 = 1초 딜레이
            })
            .catch(error => {
                // 이미 사용 중인 이메일일 경우 또는 다른 오류가 발생한 경우
                console.error("회원가입 에러:", error.message);
                if (error.code === "auth/email-already-in-use") {
                    alert("이미 사용 중인 이메일입니다. 다른 이메일을 입력해주세요.");
                } else {
                    alert("회원가입 중 에러가 발생했습니다. 다시 시도해주세요.");
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

                    <hr style={{ border: '1px solid rgba(255, 255, 255, 0.4)' }} />
                    <p style={{ color: theme === 'light' ? '#dca3e7' : '#ffffff' }}>계정이 이미 있으신가요?</p>
                    <Link onClick={loginWithGoogle} className={`custom-button ${theme}`}>Google <br /> 로그인</Link>
                    <Link to="/login" className={`custom-button ${theme}`}>FlowNary <br />로그인</Link>
                    <br />
                    <div className="container">
                        <button onClick={toggleTheme} className="fill">테마변경</button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
