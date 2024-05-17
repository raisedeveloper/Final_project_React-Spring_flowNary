
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
import routes from "routes";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import brandDark from "assets/images/LightLogo.png";
import brandWhite from "assets/images/DarkLogo.png";
import Login from "layouts/authentication/sign-in";
import Register from "layouts/authentication/sign-up";

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
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 확인용 변수

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

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  // 항목 숨기기 혹은 보이기
  const visibleRoutes = routes.filter(route => route.visible && (isLoggedIn || route.key !== 'sign-in'));

  return (
    <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
      <CssBaseline />
      {/* 로그인 이랑 가입페이지는 사이드바 가리기 */}
      {!isLoginPage && !isRegisterPage && layout === "dashboard" && (
        <>
          <Sidenav
            color={'primary'}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="flownary"
            routes={visibleRoutes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        <Route path="/authentication/sign-in" element={<Login />} />
        <Route path="/authentication/sign-up" element={<Register />} />
        {getRoutes(routes)}        
        <Route path="*" element={<Navigate to="/home" />} />
        <Route path="/authentication/sign-in" element={<Navigate to="/authentication/sign-in" />} />
        <Route path="/authentication/sign-up" element={<Navigate to="/authentication/sign-up" />} />
      </Routes>
    </ThemeProvider>
  );
}
