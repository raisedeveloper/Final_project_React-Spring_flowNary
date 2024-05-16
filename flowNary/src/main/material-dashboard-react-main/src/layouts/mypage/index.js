import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

import {
  Avatar, Box, Button, Chip, Divider, List, ListItem, ListItemAvatar,
  ListItemText, Modal, Paper, Stack, TextField, Typography, InputAdornment,
  IconButton, Link,
} from "@mui/material";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SubjectIcon from '@mui/icons-material/Subject';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import SettingsIcon from '@mui/icons-material/Settings';
import BookmarkIcon from '@mui/icons-material/Bookmark';

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import PostingModal from "../home/Board/PostingModal"

import './mypage.css';


function Notifications() {
  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const openWarningSB = () => setWarningSB(true);
  const closeWarningSB = () => setWarningSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* 상단 정보 넣는 Stack 태그 */}
      <Stack direction={'row'} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}> {/* 방향을 row로 지정하면 가로 방향으로 배치됨 */}
        {/* Avatar 태그 : 유튜브 프사처럼 동그란 이미지 넣을 수 있는 것 */}
        <Avatar
          // src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${user.profile}`}
          sx={{
            width: '10rem',
            height: '10rem',
            margin: '20px',
            fontSize: '60px',
            border: '2px solid primary.main', // 외곽선 색과 굵기 지정
            cursor: 'pointer',
          }}
        />
        {/* 프사 옆 정보와 팔로우 버튼 만드는 Stack 공간 */}
        <Stack sx={{ padding: '20px' }} fontWeight={'bold'}>
          <Stack direction={'row'} spacing={2} sx={{ marginTop: '10px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h4" fontWeight={'bold'}>
              {/* {user.nickname} */}JAMES
            </Typography>
            {/* <Button onClick={handleCheckingPwd}><SettingsIcon sx={{ fontSize: '50px', color: 'darkgray' }} /></Button> */}
          </Stack>
          <Stack direction={'row'} spacing={2} sx={{ marginTop: '10px', marginBottom: '15px' }}>
            <Box sx={{ cursor: 'pointer' }} >
              게시물 수
            </Box>
            <Box sx={{ cursor: 'pointer' }} onClick={() => handleOpen('팔로워', '여기에 팔로워 수에 대한 정보를 표시')}>
              팔로워 수
            </Box>
            <Box sx={{ cursor: 'pointer' }} onClick={() => handleOpen('팔로잉', '여기에 팔로잉 수에 대한 정보를 표시')}>
              팔로잉 수
            </Box>
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <Button variant="outlined" color="secondary" className='msg_button' style={{ border: "3px solid #BA99D1"}} sx={{ color: 'dark', width: '100px' }}>팔로우</Button>
            <Button variant="outlined" color="primary" className='msg_button' style={{ border: "3px solid #BA99D1"}} sx={{ width: '130px' }}>메시지 보내기</Button>
            <Button>
              <PostingModal/>
            </Button>
            {/* <Button variant="outlined" color="secondary" className='msg_button' sx={{ width: '130px' }} onClick={handlePwd}>비밀번호 변경</Button> */}
          </Stack>
        </Stack>
        <Stack direction={'column'} spacing={2} sx={{ marginTop: '10px', marginBottom: '15px' }}>
        </Stack>
      </Stack >
      {/* <FollowerModal open={followerModalOpen} handleClose={handleClose} content={modalContent} />
      <SettingModal open={SettingModalOpen} handleClose={handleClose} /> */}

      {/* 소개문 넣는 Stack */}
      <Stack sx={{ paddingLeft: '30px', paddingRight: '30px' }}>
        {/* <Link href={user.snsDomain}>{user.snsDomain}</Link> */}
        {/* {user.statusMessage} */}
      </Stack>
      <Divider sx={{ marginTop: '20px', marginBottom: '10px', border:'2px' }} />
      {/* 게시물과 태그 넣는 거 생성 */}
      <Stack direction="row" justifyContent="center" alignItems='center' spacing={5}>
        <Stack direction="row" sx={{ cursor: 'pointer' }}>
          <BookmarkIcon sx={{ fontSize: '15px' }} />
          <Typography sx={{ fontSize: '12px' }}>책갈피</Typography>
        </Stack>
        <Stack direction="row" sx={{ cursor: 'pointer' }}>
          <SubjectIcon sx={{ fontSize: '15px' }} />
          <Typography sx={{ fontSize: '12px' }}>통계</Typography>
        </Stack>
      </Stack>


      <Footer />
    </DashboardLayout>
  );
}

export default Notifications;