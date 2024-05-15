import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import { Box, Button, Card, CardContent, TextField, Typography, InputLabel, Grid, MenuItem, FormControl, Select, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

// css 연결
import './setting.css';
import axios from "axios";

// alert 창
import Swal from "sweetalert2";

// components 연결
import SettingBirth from "./SettingBirth.jsx";
import SettingTel from "./SettingTel.jsx";
import SettingNickname from "./SettingNickname.jsx";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import { GetWithExpiry, SetWithExpiry } from "../../../api/LocalStorage.js";
import { UploadImage } from "../../../api/image.js";
import { useGetUser } from "../../../api/customHook.jsx";
import { correct, wrong } from "../../../api/alert.jsx";
import { userUpdate } from '../../../api/axiosPost';

// 생일 표현 
import dayjs from 'dayjs';

const Header = styled(Box)({
  background: '#BA99D1',
  borderRadius: '8px 8px 0 0', // 상단만 라운드 처리
  color: 'white',
  textAlign: 'center',
  marginBottom: '1rem',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // 그림자 효과 추가
});

const Background = styled(Box)({
  background: "url('/images/flowLight.png')", // 배경 이미지 URL
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "150px",
  borderTopLeftRadius: "16px",
  borderTopRightRadius: "16px",
});

function ProfileEdit({ email, user }) {
  const navigate = useNavigate();

  const [uname, setUname] = useState(user.uname);
  const [nickname, setNickname] = useState(user.nickname);
  const [statusMessage, setStat] = useState(user.statusMessage);
  const [snsDomain, setSnsDomain] = useState(user.snsDomain);
  const [birth, setBirth] = useState(dayjs(user.birth).format('YYYY-MM-DD'));
  const [tel, setTel] = useState(user.tel);
  const [gender, setGender] = useState(user.gender);
  const [profile, setProfile] = useState(user.profile);

  // useEffect(() => {
  //   setUname(user.uname);
  //   setNickname(user.nickname);
  //   setStat(user.statusMessage);
  //   setSnsDomain(user.snsDomain);
  //   setBirth(user.birth);
  //   setTel(user.tel);
  //   setGender(user.gender);
  //   setProfile(user.profile);
  // }, []);

  // 이미지 업로드
  const [preview, setPreview] = useState('');
  const [image, setImage] = useState('');

  // 설정 변경 조건 확인
  const [checkingBirth, setCheckingBirth] = useState(1);
  const [checkingNickname, setCheckingNickname] = useState(1);
  const [checkingTel, setCheckingTel] = useState(1);

  // 설정창에서 값이 바뀔 때마다 저장하는 함수
  const handleUname = (e) => { setUname(e.target.value); };
  const handleNickname = (e) => { setNickname(e.target.value); };
  const handleStat = (e) => { setStat(e.target.value); };
  const handleGender = (e) => { setGender(e.target.value === 'man' ? 0 : (e.target.value === 'woman' ? 1 : 2)); };
  const handleSnsDomain = (e) => { setSnsDomain(e.target.value); };
  const handleTel = (e) => { setTel(e) };
  const handleBirthChange = (e) => { const formattedDate = dayjs(e).format('YYYY-MM-DD'); setBirth(formattedDate); }
  const handlePicture = (e) => { setImage(e); }
  const handleProfileChange = (e) => { setProfile(e); };

  const handleCheckingBirth = (e) => { setCheckingBirth(e) };
  const handleCheckingTel = (e) => { setCheckingTel(e) };
  const handleCheckingNickname = (e) => { setCheckingNickname(e) };

  const goBack = () => { navigate(-1); }
  const handleImageEdit = () => {
    document.getElementById('hidden-input').click();
  };


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    } else {
      setImage(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreview(reader.result);
        handlePicture(file); // 파일 객체 대신 데이터 URL을 전달
      };
    }
  };

  const handleImageDelete = () => {
    setPreview('');
    handleProfileChange(null); // 파일 삭제 시 null 전달
  };

  const handleSubmit = async (formData) => {
    if (checkingBirth === 0) { wrong("생년월일 확인을 해주세요."); return; }
    if (uname === '') { wrong("이름을 입력하세요"); return; }
    if (checkingNickname === 0) { wrong("닉네임 중복 확인을 해주세요"); return; }
    if (checkingTel === 0) { wrong("전화번호 중복 확인을 해주세요"); return; }

    const url = await UploadImage(formData.image); // 이 줄이 비동기 작업을 기다리고 URL을 반환합니다.
    const updatedProfile = url ? { ...formData, profile: url.public_id } : formData;

    if (url) {
      SetWithExpiry("profile", url.public_id, 180); // 세션에 바로 추가
    }

    const updatedUser = {
      uid: user.id,
      uname: uname,
      nickname: nickname,
      profile: profile,
      statusMessage: statusMessage,
      birth: birth,
      snsDomain: snsDomain,
      gender: gender,
      tel: tel,
    };
    await userUpdate(updatedUser);

    correct("설정 변경에 성공했습니다.");
    navigate(-1);
  };

  return (
    <>
      <Card sx={{ width: { xs: '100%', sm: 500, md: 600, lg: 700, xl: 820 }, borderRadius: "16px", boxShadow: 3, margin: 'auto' }}>
        <Background />
        <CardContent sx={{ textAlign: "center", mt: -8 }}>
          <Avatar
            alt="+"
            src={preview || `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${user.profile}`}
            sx={{ width: 100, height: 100, margin: "0 auto", cursor: 'pointer' }}
            onClick={handleImageEdit}
          />
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            hidden
            id="hidden-input"
          />
          <span>닉네임: {user.nickname}</span><br />
          <span>상태메시지: {statusMessage}</span>

          <br />
          <Button
            variant='contained'
            onClick={handleImageEdit}
            style={{
              marginRight: '2.5em',
              backgroundColor: 'rgb(54, 11, 92)',
              color: 'white'
            }}>사진수정 </Button>
          <Button
            variant='contained'
            onClick={handleImageDelete}
            style={{
              marginLeft: '2.5em',
              backgroundColor: 'rgb(99, 11, 92)',
              color: 'white'
            }}>사진삭제</Button>
        </CardContent>
      </Card>
      <Card>
        <Header style={{ height: '2.05rem' }}>
          <Typography variant="subtitle1" sx={{ opacity: 0.825 }}>상세 정보</Typography>
        </Header>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <MDBox fullWidth id="gender_select" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Select
                  id="gender_select"
                  value={(user.gender === 0 ? 'man' : (user.gender === 1 ? 'woman' : 'none'))}
                  onChange={handleGender}
                  sx={{
                    width: '100%', height: '70%',
                    textAlign: 'center', border: '0'
                  }}
                >
                  <MenuItem value={"man"}>남자</MenuItem>
                  <MenuItem value={"woman"}>여자</MenuItem>
                  <MenuItem value={"none"}>성별 설정 안함</MenuItem>
                </Select>
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={6}>
              <SettingBirth birth={user.birth} checkingBirth={checkingBirth}
                onBirthChange={handleBirthChange} changeCheckingBirth={handleCheckingBirth} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth placeholder="이메일" variant="standard" value={email} disabled sx={{ mt: 2, width: '100%' }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth placeholder="이름 *" variant="standard"
                value={uname} onChange={handleUname} sx={{ mt: 2, width: '100%' }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth placeholder="상태 메시지" variant="standard" value={statusMessage}
                onChange={handleStat} sx={{ mt: 2, width: '100%' }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth placeholder="도메인 주소" variant="standard"
                defaultValue={user.snsDomain} value={snsDomain} onChange={handleSnsDomain} sx={{ mt: 2, width: '100%', }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SettingNickname nickname={user.nickname} email={email} checkingNickname={checkingNickname}
                onNicknameChange={handleNickname} changeCheckingNickname={handleCheckingNickname} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SettingTel tel={user.tel} email={email} checkingTel={checkingTel}
                onTelChange={handleTel} changeCheckingTel={handleCheckingTel} />
            </Grid>
            <Grid item xs={15}>

            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="contained" onClick={() => handleSubmit({ image })} style={{ color: 'white' }}
              sx={{ m: '1em', width: '20%', p: 0, backgroundColor: 'rgb(54, 11, 92)', '&:hover, &:visited': { backgroundColor: 'rgb(54, 30, 150)' } }}>
              완료
            </Button>

            <Button variant="contained" onClick={goBack}
              style={{ color: 'white' }}
              sx={{ m: '1em', width: '20%', p: 0, backgroundColor: '#bbbbbb', '&:hover': { backgroundColor: 'rgb(20, 20, 20)' } }}>
              취소
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

ProfileEdit.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    profile: PropTypes.string.isRequired,
    uname: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    statusMessage: PropTypes.string.isRequired,
    snsDomain: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    regDate: PropTypes.instanceOf(Date).isRequired,
    gender: PropTypes.number.isRequired,
    provider: PropTypes.number.isRequired,
    birth: PropTypes.instanceOf(Date).isRequired,
    tel: PropTypes.string.isRequired,
    hashUid: PropTypes.string.isRequired
  }).isRequired,
  email: PropTypes.string.isRequired,
  updateUser: PropTypes.func.isRequired,
  statusMessage: PropTypes.string.isRequired,
  uname: PropTypes.string.isRequired,
  snsDomain: PropTypes.string.isRequired,
  onChangePicture: PropTypes.func.isRequired,
  handlePicture: PropTypes.func.isRequired,
};

export default ProfileEdit;
