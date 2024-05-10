// 기본
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

// 아이콘
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';

// Components/css 연결 
import AlertModal from '../NoticeModal';
import ChattingModal from '../chatting/ChattingModal';
import PostingModal from '../PostingModal';
import '../notice.css';

export default function Aside() {
  const logoImageLarge = '/img/LightLogo.png';
  const logoImageXs = '/img/LightLogoXs.png';
  const navigate = useNavigate();

  const SettingButton = () => { navigate('/setting'); };
  const ProfileButton = () => { navigate('/profile'); };
  const HomeButton = () => { navigate('/'); };
  const BookmarkButton = () => { navigate('/profile/mypage'); };

  return (
    <div style={{ position: 'fixed', top: 0, width: '20%', height: '10000px',borderRight: '1px solid rgb(0, 0, 0, 0.3)'}}>
      <Grid item lg={1.4} sx={{ placeItems: 'center', display: { xs: 'none', lg: 'flex' }, mb: '20px' }}>
        <img src={logoImageLarge} alt='LOGO' style={{ width: '125px', marginLeft: '12%', alignItems: 'center', cursor: 'pointer' }} onClick={HomeButton} />
      </Grid>
      <Grid item xs={1.4} sx={{ placeItems: 'center', display: { xs: 'flex', lg: 'none' }, mb: '20px' }} >
        <img src={logoImageXs} alt='LOGO' style={{ width: '20px', marginLeft: '35%', alignItems: 'center', cursor: 'pointer' }} onClick={HomeButton} />
      </Grid>
      {/* 홈 */}
      <button className='asideStyle' onClick={HomeButton}>
        <Grid container>
          <Grid item xs={12} lg={6} sx={{ display: { xs: 'flex', lg: 'flex' }, pl: 3 }}>
            <HomeIcon className='iconStyle' />
          </Grid>
          <Grid item xs={0} lg={6} sx={{ color:'rgb(58, 0, 85)', display: { xs: 'none', lg: 'flex' }, pr: 3, justifyContent: 'flex-end' }}>
            홈
          </Grid>
        </Grid>
      </button>

      {/* 알림 모달 */}
      <AlertModal />

      {/* 북마크 */}
      <button className='asideStyle' onClick={BookmarkButton}>
        <Grid container>
          <Grid item xs={12} lg={6} sx={{ display: { xs: 'flex', lg: 'flex' }, pl: 3 }}>
            <PhotoLibraryIcon className='iconStyle' />
          </Grid>
          <Grid item xs={0} lg={6} sx={{ color:'rgb(58, 0, 85)', display: { xs: 'none', lg: 'flex' }, pr: 3, justifyContent: 'flex-end' }}>
            앨범
          </Grid>
        </Grid>
      </button>

      {/* 글쓰기 모달 */}
      <PostingModal />

      {/* 메시지 모달*/}
      <ChattingModal />

      {/* 설정 */}
      <button className='asideStyle' onClick={SettingButton}>
        <Grid container>
          <Grid item xs={12} lg={6} sx={{ display: { xs: 'flex', lg: 'flex' }, pl: 3 }}>
            <SettingsIcon className='iconStyle' />
          </Grid>
          <Grid item xs={0} lg={6} sx={{ color:'rgb(58, 0, 85)', display: { xs: 'none', lg: 'flex' }, pr: 3, justifyContent: 'flex-end' }}>
            설정
          </Grid>
        </Grid>
      </button>

      {/* 마이 프로필 */}
      <button className='asideStyle' onClick={ProfileButton}>
        <Grid container>
          <Grid item xs={12} lg={6} sx={{ display: { xs: 'flex', lg: 'flex' }, pl: 3 }}>
            <AccountCircleIcon className='iconStyle' />
          </Grid>
          <Grid item xs={0} lg={6} sx={{ color:'rgb(58, 0, 85)', display: { xs: 'none', lg: 'flex' }, pr: 3, justifyContent: 'flex-end' }}>
            프로필
          </Grid>
        </Grid>
      </button>
    </div>
  );
}