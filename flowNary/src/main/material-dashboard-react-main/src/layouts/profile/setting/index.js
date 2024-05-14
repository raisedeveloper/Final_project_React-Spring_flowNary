import React, { useEffect, useState } from "react";
import { Box, Grid, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

// css 연결
import './components/setting.css';

// components 연결
import SettingPicture from "./components/SettingPicture.jsx";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import { GetWithExpiry, SetWithExpiry } from "../../../api/LocalStorage.js";
import { UploadImage } from "../../../api/image.js";
import { useGetUser } from "../../../api/customHook.jsx";
import { correct, wrong } from "../../../api/alert.jsx";

// ProfileCard, ProfileEdit 컴포넌트 임포트
import ProfileCard from "./components/ProfileCard";
import ProfileEdit from "./components/ProfileEdit";

export default function SettingDetail() {
  const navigate = useNavigate();

  // localStorage를 이용해서 user 받아오기
  const uid = parseInt(GetWithExpiry("uid"));
  const email = GetWithExpiry("email");
  const user = useGetUser(uid);

  const [profile, setProfile] = useState({
    company: "Company (disabled)",
    username: '',
    email: '',
    city: '',
    country: '',
    postalCode: '',
    aboutMe: '',
    uname: '',
    nickname: '',
    statusMessage: '',
    snsDomain: '',
    birth: '',
    tel: '',
    gender: 2,
    profile: '',
  });

  useEffect(() => {
    if (user.id) {
      setProfile({
        company: "Company (disabled)",
        username: user.uname,
        email: user.email,    
        aboutMe: user.statusMessage,
        uname: user.uname,
        nickname: user.nickname,
        statusMessage: user.statusMessage,
        snsDomain: user.snsDomain,
        birth: user.birth,
        tel: user.tel,
        gender: user.gender,
        profile: user.profile,
      });
    }
  }, [user]);

  const handleProfileChange = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  const submitProfile = async (formData) => {
    if (formData.checkingBirth === 0) { wrong("생년월일 확인을 해주세요."); return; }
    if (formData.uname === '') { wrong("이름을 입력하세요"); return; }
    if (formData.checkingNickname === 0) { wrong("닉네임 중복 확인을 해주세요"); return; }
    if (formData.checkingTel === 0) { wrong("전화번호 중복 확인을 해주세요"); return; }

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

  const userProfile = {
    name: profile.username,
    age: 25,
    location: profile.city || "대한민국",
    followers: "80K",
    likes: "803K",
    photos: "1.4K",
    image: profile.profile, // 사용자 프로필 이미지 URL
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ flexGrow: 1, padding: '20px' }}>

        {/* 프로필 카드 */}
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <ProfileCard profile={userProfile} />
          </Grid>

          {/* 프로필 수정 */}
          <Grid item xs={12} md={11}>
            <ProfileEdit 
              profile={profile} 
              handleProfileChange={handleProfileChange} 
              handleSubmit={submitProfile}
            />
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}
