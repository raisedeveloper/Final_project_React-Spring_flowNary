import { Box, Button, Grid, Icon, IconButton, InputAdornment, Modal, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { GetWithExpiry } from "api/LocalStorage";
import { useGetUser } from "api/customHook";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function SettingModal() {
  const uid = parseInt(GetWithExpiry("uid"));
  const email = GetWithExpiry("email");

  const navigate = useNavigate();
  const [veriPwd, setVeriPwd] = useState('');

  useEffect(() => {
    if (uid == null) {
      navigate('/authentication/login');
    }
  }, [uid, navigate]);

  // 비밀번호 숨기기/보이기
  const [showPassword, setShowPassword] = useState(false);
  // 비밀번호 숨기기/보이기 토글
  const togglePasswordVisibility = () => { setShowPassword(!showPassword); };

  const handlePwd = (e) => { setVeriPwd(e.target.value); };

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', uid],
    queryFn: () => useGetUser(uid),
  });

  const auth = getAuth();
  const handleClose = () => { navigate(-1); }
  const confirmPWd = async e => {
    e.preventDefault();

    // Firebase Authentication을 통해 사용자를 인증합니다.
    try {
      await signInWithEmailAndPassword(auth, email, veriPwd);
      Swal.fire({
        icon: 'success',
        title: "비밀번호가 일치합니다.",
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
      navigate('/settings');
    } catch (error) {
      // 비밀번호가 일치하지 않을 때
      Swal.fire({
        title: "비밀번호가 일치하지 않습니다.",
        text: "다시 입력해주세요",
        icon: "warning"
      });
    }
  }

  const loginWithGoogle = async () => {
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
        Swal.fire({
          title: "등록된 사용자가 아닙니다.",
          text: "다시 입력해주세요",
          icon: "warning"
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: "구글 인증에 성공했습니다.",
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
      }
      navigate('/setting');
    } catch (error) {
      console.error("구글 로그인 오류:", error);
    }
  };

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        {user && user.provider === 0 ?
          <Box sx={{ mx: '19rem', mt: '15rem' }}>
            <h5> 비밀번호 입력 </h5>
            {/* 비밀번호 입력 */}
            <TextField
              fullWidth
              variant="standard"
              type={showPassword ? 'text' : 'password'}
              sx={{ width: '100%' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      onMouseDown={(event) => event.preventDefault()}
                    >
                      {showPassword ? <Icon>visibility_off</Icon> : <Icon> visibility </Icon>}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              onChange={handlePwd}
            />

            {/* 하단 버튼 영역 */}
            <Grid container sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <Grid item xs={8} lg={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  onClick={confirmPWd}
                  style={{ margin: '1em', width: '35%', backgroundColor: 'rgb(54, 11, 92)', color: 'white', fontSize: 'small' }}
                >
                  완료
                </Button>

                <Button
                  variant="contained"
                  onClick={handleClose}
                  style={{ margin: '1em', width: '35%', backgroundColor: '#bbbbbb', color: 'white', fontSize: 'small' }}
                >
                  취소
                </Button>
              </Grid>
            </Grid>
          </Box>
          :
          <Box sx={{ marginTop: '10px' }}>
            <Link to="#" onClick={loginWithGoogle} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <img
                style={{ paddingRight: '5px', margin: '-5px', width: '1.55em' }}
                src="/img/icon/Google.png"
                alt="Google"
              />
              <span style={{ fontSize: '0.8em' }}>로그인</span>
            </Link>
          </Box>
        }
      </DashboardLayout>
    </>
  );

}
