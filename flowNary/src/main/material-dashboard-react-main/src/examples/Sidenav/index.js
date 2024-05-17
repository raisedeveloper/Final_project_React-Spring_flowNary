import { useEffect } from "react";

// react-router-dom 컴포넌트
import { NavLink, useLocation } from "react-router-dom";

// prop-types는 props의 타입체크를 위한 라이브러리입니다.
import PropTypes from "prop-types";

// @mui material 컴포넌트
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Material Dashboard 2 React 컴포넌트
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React 예제 컴포넌트
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";

// Sidenav의 사용자 정의 스타일
import SidenavRoot from "examples/Sidenav/SidenavRoot";

// Material Dashboard 2 React 컨텍스트
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "context";

// api 컴포넌트
import { GetWithExpiry } from "api/LocalStorage";
import { getUser } from "api/axiosGet";

function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
  const location = useLocation();
  const confirmLocation = location.pathname.split('/')[1];
  const collapseName = location.pathname.replace("/", "");

  let textColor = "white";

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  }

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    // Sidenav의 미니 상태를 설정하는 함수
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(dispatch, window.innerWidth < 1200 ? false : transparentSidenav);
      setWhiteSidenav(dispatch, window.innerWidth < 1200 ? false : whiteSidenav);
    }

    /* 창 크기 조정 시 handleMiniSidenav 함수를 호출하는 이벤트 리스너 */
    window.addEventListener("resize", handleMiniSidenav);

    // 초기 값으로 상태를 설정하기 위해 handleMiniSidenav 함수 호출
    handleMiniSidenav();

    // 정리 시 이벤트 리스너 제거
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  // 유저 불러오기
  const uid = parseInt(GetWithExpiry("uid"));
  const email = GetWithExpiry("email");
  const nickname = GetWithExpiry("nickname");
  const profile = GetWithExpiry("profile");

  // routes.js에서 모든 경로를 렌더링 (Sidenav에 보이는 모든 항목)
  const renderRoutes = routes.map(({ type, name, icon, title, noCollapse, key, href, route }) => {
    let returnValue;
    if (type === "collapse") {
      returnValue = href ? (
        <Link
          href={href}
          key={key}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none" }}
        >
          <SidenavCollapse
            name={name}
            icon={icon}
            active={key === collapseName}
            noCollapse={noCollapse}
          />
        </Link>
      ) : (
        <NavLink key={key} to={route}>
          <SidenavCollapse name={name} icon={icon} active={key === collapseName} />
        </NavLink>
      );
    } else if (type === "title") {
      returnValue = (
        // 타이틀
        <MDTypography
          key={key}
          color={textColor}
          display="block"
          variant="caption"
          fontWeight="bold"
          textTransform="uppercase"
          pl={1}
          mt={2}
          mb={1}
          ml={1}
        >
          {title}
        </MDTypography>
      );
    } else if (type === "divider") {
      returnValue = (
        <Divider
          key={key}
          light={
            (!darkMode && !whiteSidenav && !transparentSidenav) ||
            (darkMode && !transparentSidenav && whiteSidenav)
          }
        />
      );
    } else if (type === "bottom") {
      (
        <NavLink key={key} to={route}>
          <SidenavCollapse name={name} icon={icon} active={key === collapseName} />
        </NavLink>
      );
    }

    return returnValue;
  });

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={0.1} pb={0} px={5} textAlign="center">
        <MDBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <MDTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </MDTypography>
        </MDBox>

        <MDBox component={NavLink} to="/" display="flex" alignItems="center">
          {brand && <MDBox component="img" src={brand} alt="Brand" width="5rem" />}
        </MDBox>
        <Box
          sx={{
            width: '11rem',
            height: '2rem',
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Avatar src='https://picsum.photos/200/300?q=11' alt="profile picture" />
          <Box ml={1.5}>
            <Typography
              color={textColor}
              fontSize={'13.5px'}
              fontWeight={'bold'}
            >flowNary</Typography>
          </Box>
        </Box>
      </MDBox>
      <Divider style={{ opacity: 1, border: 2 }} />
      <List>{renderRoutes}</List>
    </SidenavRoot>
  );
}

// Sidenav의 props 기본값 설정
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Sidenav의 props 타입체크
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
