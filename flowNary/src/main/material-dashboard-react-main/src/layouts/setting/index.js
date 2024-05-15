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

// api - axios

import axiosGet from '../../api/axiosGet';

// ProfileCard, ProfileEdit 컴포넌트 임포트
// import ProfileCard from "./components/ProfileCard";
import ProfileEdit from "./components/ProfileEdit";

export default function Settings() {
  const navigate = useNavigate();

  // localStorage를 이용해서 user 받아오기
  const uid = parseInt(GetWithExpiry("uid"));
  const email = GetWithExpiry("email");
  const user = useGetUser(uid);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ flexGrow: 1, padding: '20px' }}>

        <Grid container spacing={1}>
          {/* 프로필 메인 */}
          <Grid item xs={12} md={11}>
            <ProfileEdit
              email={email}
              user={user}
            />
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}
