// app.js
import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";
import createRoutes from "./routes";  // 동적 라우트 생성 함수
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import brandDark from "assets/images/LightLogo.png";
import brandWhite from "assets/images/DarkLogo.png";
import { useAuthState } from "react-firebase-hooks/auth";  // Firebase 인증 훅 사용
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";


import Login from "layouts/authentication/sign-in/LoginIndex.js";
import Register from "layouts/authentication/sign-up/RegisterIndex.js";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;

  const auth = getAuth();
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [user, loading, error] = useAuthState(auth);  // 로그인 상태 훅
  const { pathname } = useLocation();

  // 로그인 및 회원가입 사이드바
  const isLoginPage = pathname === "/authentication/sign-in";
  const isRegisterPage = pathname === "/authentication/sign-up";

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  // 서버 종료 시 처리 (beforeunload 이벤트 리스너 추가)
  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     // 파이어베이스 로그아웃
  //     auth.signOut().then(() => {
  //       console.log('User signed out.');
  //     }).catch((error) => {
  //       console.error('Sign out error:', error);
  //     });
      
  //     // localStorage.clear();

  //     // 기본 동작 방지
  //     event.preventDefault();
  //     event.returnValue = ''; // Chrome에서는 이 설정이 필요합니다.
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);




  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const dynamicRoutes = createRoutes(!!user);  // 로그인 상태에 따라 라우트 동적 생성

  return (
    <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
      <CssBaseline />
      {!isLoginPage && !isRegisterPage && layout === "dashboard" && (
        <>
          <Sidenav
            color={'primary'}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="flownary"
            routes={dynamicRoutes.filter(route => route.visible)}  // 동적 라우트 필터링
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        {dynamicRoutes.map((route) => (
          <Route path={route.route} element={route.component} key={route.key} />
        ))}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </ThemeProvider>
  );
}
