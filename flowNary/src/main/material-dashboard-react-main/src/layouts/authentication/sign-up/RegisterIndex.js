import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { SetWithExpiry } from "../../../api/LocalStorage";
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import '../theme.css';
import Swal from "sweetalert2";
import PropTypes from 'prop-types';
import { Button, Grid } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";


export default function Register({ closeModal }) {
    const [theme, setTheme] = useState('light');
    const [userInfo, setUserInfo] = useState({ email: '', password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (tel) {
            let telValue = tel.replace(/[^0-9]/g, '').toString(); // 숫자 이외의 문자 제거
            if (telValue.length > 11) { telValue = telValue.slice(0, 11); }
            if (telValue.length === 11) {
                telValue = telValue.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
            } else if (telValue.length === 13) {
                telValue = telValue.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
            }
            setTel(telValue);
            setCheckingTel(0);
        }
    }, [tel]);

    const checkTel = () => {
        axios.get('/user/tel', {
            params: {
                email: email
            }
        })
            .then(response => {
                const userList = response.data; // 응답 데이터 전체를 가져옵니다.
                if (!userList) {
                    console.error('User list is undefined or null');
                    return;
                }
                if (tel.length !== 13) {
                    wrong("전화번호가 잘못되었습니다.");
                    setCheckingTel(0);
                    return;
                }
                const tels = userList.map(user => user.tel);
                if (tels.includes(tel)) {
                    wrong("전화번호가 중복됩니다.");
                    setCheckingTel(0);
                    return;
                }
                correct("전화번호 인증 해주세요!");
                setCheckingTel(0);
                setVerify(1);
                return;

            }).catch(error => {
                console.error('Error fetching tels:', error);
            });
    }

    const auth = getAuth();

    const RegisterWithGoogle = async () => {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const data = await signInWithPopup(auth, provider);

            // 이메일로 사용자 조회
            const response = await axios.get('/user/getUserByEmail', {
                params: {
                    email: data.user.email
                }
            });

            // 사용자가 존재하지 않으면 회원가입 진행
            if (Object.keys(response.data).length === 0) {
                var sendData = {
                    email: data.user.email,
                    pwd: 'nn',
                    hashuid: data.user.uid,
                    provider: 1,
                    birth: null,
                    uname: null,
                    nickname: null,
                    tel: null
                }
                userRegister(sendData);

                // 회원가입 성공 시 로컬 스토리지 설정 및 리다이렉트
                SetWithExpiry("email", data.user.email, 180);
                SetWithExpiry("profile", response.data.profile, 180);
                SetWithExpiry("nickname", response.data.nickname, 180);
                SetWithExpiry("statusMessage", response.data.statusMessage, 180);
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
                navigate('/');
            } else {
                SetWithExpiry("email", data.user.email, 180);
                SetWithExpiry("profile", response.data.profile, 180);
                SetWithExpiry("nickname", response.data.nickname, 180);
                SetWithExpiry("statusMessage", response.data.statusMessage, 180);
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
                navigate('/');
            }
            setAnimationClass('fade-exit');
            setTimeout(() => navigate('/'), 500); // 애니메이션 시간을 고려한 딜레이
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

            <input type="uname" name='uname' placeholder="이름을 입력하세요"
                className="commonInputStyle_Modal" onKeyUp={handleKeyPress} onChange={handeluname} />

            <div className="input-container" >
                <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Grid item xs={9.5}>
                        <LightTooltip title="별명을 입력하세요." >
                            <input
                                label="닉네임"
                                className="commonInputStyle_Modal"
                                placeholder="닉네임을 입력하세요"
                                value={nickname || ''}
                                onChange={handleNickname}
                                onKeyUp={handleKeyPress}
                            />
                        </LightTooltip>
                    </Grid>
                    <Grid item xs={0.7}>
                        <Button onClick={checkNickname} variant="contained" sx={{
                            backgroundColor: 'rgb(54, 11, 92)', p: 0, mt: 1.2,
                            '&:hover': { backgroundColor: 'rgb(54, 30, 150)' }
                        }} style={{ color: 'white' }} >확인</Button>
                    </Grid>
                    <Grid item xs={1.8}><div></div></Grid>
                </Grid>
            </div>

            <div className="input-container" >
                <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Grid item xs={9.5}>
                        <LightTooltip title="' - ' 없이 숫자만 입력하세요."  >
                            <input
                                className="commonInputStyle_Modal"
                                placeholder="전화번호를 입력하세요"
                                name="tel"
                                value={tel || ''}
                                onChange={handleTel}
                                onKeyUp={handleKeyPress}
                                style={{ marginTop: 10, width: '100%' }}
                            />
                        </LightTooltip>
                    </Grid>
                    <Grid item xs={0.7}>
                        <Button onClick={checkTel} variant="contained" sx={{
                            backgroundColor: 'rgb(54, 11, 92)', p: 0, mt: 1.2,
                            '&:hover': { backgroundColor: 'rgb(54, 30, 150)' }
                        }} style={{ color: 'white' }} >확인</Button>
                    </Grid>
                    <Grid item xs={1.8}><div></div></Grid>
                </Grid>
                {verify === 1 ? <div className="input-container">
                    <SmsLogin handleKeyPress={handleKeyPress} tel={tel} setCheckingTel={setCheckingTel} />
                </div> : <></>}

            </div>

            <div style={{ marginTop: -2 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
                    <Grid container style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Grid item xs={9.3}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    onChange={handleBirth}
                                    slots={{ textField: TextField }}
                                    value={birth ? dayjs(birth) : null}
                                    formatDensity="spacious"
                                    format="YYYY/MM/DD"
                                    variant='outlined'
                                />
                            </DemoContainer>
                        </Grid>
                        <Grid item xs={0.7}>
                            <Button
                                onClick={checkBirth}
                                variant="contained" sx={{
                                    backgroundColor: 'rgb(54, 11, 92)', p: 0, mt: 1.2,
                                    '&:hover': { backgroundColor: 'rgb(54, 30, 150)' }
                                }} style={{ color: 'white' }} >확인</Button>
                        </Grid>
                        <Grid item xs={1}><div></div></Grid>
                    </Grid>
                </LocalizationProvider>
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
