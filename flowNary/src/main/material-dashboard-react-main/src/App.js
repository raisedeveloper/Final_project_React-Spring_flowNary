import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import themeDark from "assets/theme-dark";
import createRoutes from "./routes";  // 동적 라우트 생성 함수
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import { useAuthState } from "react-firebase-hooks/auth";  // Firebase 인증 훅 사용
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

import Login from "layouts/authentication/sign-in/LoginIndex.js";
import Register from "layouts/authentication/sign-up/RegisterIndex.js";
import { ContextProvider } from "api/LocalStorage";
import { getUserEmail } from "api/axiosGet";
import { GetWithExpiry } from "api/LocalStorage";

export default function App() {
  const brandDark = "../public/images/LightLogo.png";
  const brandWhite = "../public/images/DarkLogo.png";

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
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useLocation();

  // 로그인 및 회원가입 사이드바 확인
  const isLoginPage = pathname === "/authentication/sign-in";
  const isRegisterPage = pathname === "/authentication/sign-up";

  // 미니 사이드바에 마우스가 들어올 때 사이드바 열기
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // 미니 사이드바에서 마우스가 나갈 때 사이드바 닫기
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // 설정창 열기 상태 변경
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // body 요소의 dir 속성 설정
  useEffect(() => {
    document.body.setAttribute("dir", "ltr");  // 'ltr'로 고정
  }, []);

  // 라우트 변경 시 페이지 스크롤을 0으로 설정
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const dynamicRoutes = createRoutes(!!user, (GetWithExpiry('role') && GetWithExpiry('role')===1) ? true : false);  // 로그인 상태와 어드민 여부에 따라 라우트 동적 생성

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {isLoading && <div>로딩 중 </div>}
      {!isLoading && !isLoginPage && !isRegisterPage && layout === "dashboard" && (
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
