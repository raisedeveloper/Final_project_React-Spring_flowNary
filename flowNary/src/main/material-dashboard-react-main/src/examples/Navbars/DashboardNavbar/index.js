import { useState, useEffect } from "react";

// react-router 컴포넌트들
import { useLocation, Link, useNavigate } from "react-router-dom";

// prop-types는 props의 타입체크를 위한 라이브러리입니다.
import PropTypes from "prop-types";

// @material-ui core 컴포넌트
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React 컴포넌트
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";

// Material Dashboard 2 React 예제 컴포넌트
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

// DashboardNavbar의 사용자 정의 스타일
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 React 컨텍스트
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";
import { Avatar, Box, Button, Grid, MenuItem, Modal, TextField } from "@mui/material";
import FilterVintageTwoToneIcon from '@mui/icons-material/FilterVintageTwoTone';

// api 컴포넌트
import { GetWithExpiry } from "api/LocalStorage";
import { getUser } from "api/axiosGet";
import { wrong } from "api/alert";

// 헤더 부분
function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const navigate = useNavigate();
  const [profileMenu, setProfileMenu] = useState(null); // 프로필 메뉴 상태 추가
  const goSetting = () => navigate('/profile/settings');
  const goMypage = () => navigate('/mypage')

  // 유저 불러오기
  const uid = parseInt(GetWithExpiry("uid"));
  const email = GetWithExpiry("email");
  const nickname = GetWithExpiry("nickname");
  const uname = GetWithExpiry("uname");
  const profile = GetWithExpiry("profile");


  useEffect(() => {
    // 네비바 타입 설정
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // 네비바의 투명 상태 설정하는 함수
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    // 스크롤 시 handleTransparentNavbar 함수 호출 이벤트 리스너
    window.addEventListener("scroll", handleTransparentNavbar);

    // 초기 값으로 상태 설정
    handleTransparentNavbar();

    // 이벤트 리스너 정리
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);


  // 프로필 관련 함수
  const handleProfileMenuOpen = (event) => setProfileMenu(event.currentTarget); // 프로필 메뉴 열기 핸들러 추가
  const handleProfileMenuClose = () => setProfileMenu(null); // 프로필 메뉴 닫기 핸들러 추가

  // 프로필 버튼 클릭 후 상세 메뉴
  const renderProfileMenu = () => (
    <Menu
      anchorEl={profileMenu}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      open={Boolean(profileMenu)}
      onClose={handleProfileMenuClose}
      sx={{ mt: 2 }}
    >
      <MenuItem
        style={{ backgroundColor: "rgba(226, 223, 226, 0.625)", height: '4rem' }}
        onClick={goMypage}>
        <MDBox
          display="flex"
          alignItems="center"
          px={0.5} py={1}
        >
          {/* 프로필 사진*/}
          <Avatar
            alt="profile picture"
            sx={{
              width: '3rem',
              height: '3rem',
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          >
            <div
              style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url('https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${profile}')`
              }}
            >
            </div>

          </Avatar>
          <MDBox ml={1.75}>
            <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{nickname}</div>
            <div style={{ marginLeft: '.125rem', fontSize: '12px' }}>{email}</div>
          </MDBox>
        </MDBox>
      </MenuItem>

      <MenuItem
        onClick={goMypage}
        style={{ width: '15rem', height: '3rem' }}
      >
        <Icon sx={{ marginRight: '.5rem', }}>account_circle</Icon>
        <p style={{ fontWeight: 'bold' }}>프로필</p>
      </MenuItem>

      <MenuItem
        onClick={goSetting}
        style={{ width: '15rem', height: '3rem' }}
      >
        <Icon sx={{ marginRight: '.5rem' }}>settings</Icon>
        <p style={{ fontWeight: 'bold' }}>설정</p>
      </MenuItem>
    </Menu>
  );
  const [searchtext, setSearchtext] = useState('');


  const handleSearch = () => {
    if (searchtext === '' || searchtext === null) {
      wrong('검색어를 입력하십시오');
    }
    else {
      sessionStorage.setItem("search", searchtext);
      if (location.pathname !== 'search') {
        navigate('/search');
      }
      else {
        window.location.replace('/search');
      }
    }
  }

  const handleSearchText = (e) => {
    setSearchtext(e.target.value);
  }

  // 알림 메뉴 렌더링
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>send_outlined</Icon>} title="새로운 메시지가 있습니다" />
      <NotificationItem icon={<Icon>reply_all</Icon>} title="새로운 댓글이 있습니다" />
      <NotificationItem icon={<Icon>playlist_add_check</Icon>} title="오늘의 할 일이 있습니다" />
      <NotificationItem icon={<Icon>event_available</Icon>} title="오늘의 일정이 있습니다" />
      <NotificationItem icon={<Icon>favorite</Icon>} title="User가 좋아요를 눌렀습니다" />
      <NotificationItem icon={<Icon>warning</Icon>} title="보안상의 문제가 있습니다" />
      <NotificationItem icon={<Icon>diversity_1</Icon>} title="새로운 패밀리를 찾아보세요" />
      <NotificationItem icon={<Icon>history_edu</Icon>} title="패밀리User의 새로운 게시물이 있습니다" />
    </Menu>
  );

  // 네비바 아이콘 스타일
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  function handleKeyPress(event) {
    if (event && event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  }

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="yard" title={route[route.length - 1]} route={route} light={light} />
        </MDBox>
        {/* 헤더 박스 및 계정, 설정, 알림 아이콘 모양 */}
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox color={light ? "white" : "inherit"} sx={{ display: { lg: 'flex', xs: 'none' } }}>
              <TextField
                id="outlined-multiline-flexible"
                variant="standard"
                placeholder="검색어를 입력하세요!"
                onChange={handleSearchText}
                value={searchtext}
                onKeyUp={handleKeyPress}
              />
              <IconButton
                size="small"
                color="inherit"
                disableRipple
                sx={{ cursor: 'pointer', mx: 2 }}
                onClick={handleSearch} // 프로필 메뉴 열기 핸들러 연결
              >
                <Icon sx={iconsStyle}>search</Icon>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={handleProfileMenuOpen} // 프로필 메뉴 열기 핸들러 연결
              >
                <Icon sx={iconsStyle}>account_circle</Icon>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <Icon sx={iconsStyle}>notifications</Icon>
              </IconButton>
              {renderMenu()}
              {renderProfileMenu()}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// DashboardNavbar의 props 기본값 설정
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// DashboardNavbar의 props 타입체크
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
