import React, { useEffect, useState } from "react";
import { Box, Grid, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

// css 연결
import './components/setting.css';

// components 연결
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import { GetWithExpiry, SetWithExpiry } from "../../api/LocalStorage.js";
import { UploadImage } from "../../api/image.js";
import { useGetUser } from "../../api/customHook.jsx";
import { correct, wrong } from "../../api/alert.jsx";

// ProfileCard, ProfileEdit 컴포넌트 임포트
import ProfileCard from "./components/ProfileCard";
import ProfileEdit from "./components/ProfileEdit";

export default function Settings() {
  const navigate = useNavigate();

  // localStorage를 이용해서 user 받아오기
  const uid = parseInt(GetWithExpiry("uid"));
  const email = GetWithExpiry("email");
  const user = useGetUser(uid);

  const [uname, setUname] = useState('');
  const [nickname, setNickname] = useState('');
  const [statusMessage, setStat] = useState('');
  const [snsDomain, setSnsDomain] = useState('');
  const [birth, setBirth] = useState('');
  const [tel, setTel] = useState('');
  const [gender, setGender] = useState(2);
  const [profile, setProfile] = useState('');
  // 활성화/비활성화
  // const [status, setStatus] = useState('0');

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

  const handleCheckingBirth = (e) => { setCheckingBirth(e) };
  const handleCheckingTel = (e) => { setCheckingTel(e) };
  const handleCheckingNickname = (e) => { setCheckingNickname(e) };
  useEffect(() => {
    if (user.id) {
      setUname(user.uname);
      setNickname(user.nickname);
      setStat(user.statusMessage);
      setSnsDomain(user.snsDomain);
      setBirth(user.birth);
      setTel(user.tel);
      setGender(user.gender);
      setProfile(user.profile);
      // setStatus(user.status);
    }
  }, [user]);

  const handleProfileChange = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  const submitProfile = async (formData) => {
    if (checkingBirth === 0) { wrong("생년월일 확인을 해주세요."); return; }
    if (uname === '') { wrong("이름을 입력하세요"); return; }
    if (checkingNickname === 0) { wrong("닉네임 중복 확인을 해주세요"); return; }
    if (checkingTel === 0) { wrong("전화번호 중복 확인을 해주세요"); return; }

    const url = await UploadImage(formData.image); // 이 줄이 비동기 작업을 기다리고 URL을 반환합니다.
    const updatedProfile = url ? { ...formData, profile: url.public_id } : formData;

    if (url) {
      SetWithExpiry("profile", url.public_id, 180); // 세션에 바로 추가
    }

    await axios.post('http://localhost:8090/user/update', {
      uid: uid,
      uname: updatedProfile.uname,
      nickname: updatedProfile.nickname,
      profile: updatedProfile.profile,
      statusMessage: updatedProfile.statusMessage,
      birth: updatedProfile.birth,
      snsDomain: updatedProfile.snsDomain,
      gender: updatedProfile.gender,
      tel: updatedProfile.tel,
    }).catch(error => console.log(error));

    correct("설정 변경에 성공했습니다.");
    navigate(-1);
  };

  const goBack = () => { navigate(-1); }


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ flexGrow: 1, padding: '20px' }}>

        <Grid container spacing={1}>
          {/* 프로필 카드 */}
          <Grid item xs={12} md={6}>
            <ProfileCard profile={user} onChangePicture={handlePicture} />
          </Grid>

          {/* 프로필 메인 */}
          <Grid item xs={12} md={11}>
            <ProfileEdit
              handleProfileChange={handleProfileChange}
              handleSubmit={submitProfile}
              
            />
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}
