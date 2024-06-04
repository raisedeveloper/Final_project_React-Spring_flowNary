import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
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

// api - axios
import axiosGet from '../../api/axiosGet.js';

// ProfileCard, ProfileEdit 컴포넌트 임포트
// import ProfileCard from "./components/ProfileCard";
import ProfileEdit from "./components/ProfileEdit.jsx";
import Footer from "examples/Footer";
import { useNavigate } from "react-router-dom";
import UserLoginService from "ut/userLogin-Service";

export default function Settings() {
  // localStorage를 이용해서 user 받아오기
  const uid = parseInt(GetWithExpiry("uid"));
  const email = GetWithExpiry("email");
  const navigate = useNavigate();
  const goLogin = () => navigate('/authentication/sign-in');

  // 디버깅을 위해 콘솔 로그 추가
  console.log("User ID:", uid);
  console.log("Email:", email);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ flexGrow: 1, padding: '20px' }}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={11}>
            {uid > 0 ? (
              <ProfileEdit
                email={email}
                uid={uid}
              />
            ) : (
              <UserLoginService goLogin={goLogin} />
            )}
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </DashboardLayout>
  );
}
