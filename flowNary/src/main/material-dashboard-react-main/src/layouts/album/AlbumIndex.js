// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Dashboard components
import ShowAlbumList from "./components/showAlbumList";
import { Box, Card, CardContent, Icon, Typography } from "@mui/material";
import { GetWithExpiry } from "api/LocalStorage";
import { useNavigate } from "react-router-dom";
import UserLoginService from "ut/userLogin-Service";

function Album() {
  // 유저정보 불러오기
  const uid = parseInt(GetWithExpiry("uid"));
  const navigate = useNavigate();
  const goLogin = () => navigate('/authentication/sign-in');

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {uid > 0 ? (
        <ShowAlbumList />
      ) : (
        <UserLoginService goLogin={goLogin}/>
      )}
      <Footer />
    </DashboardLayout>
  );
}

export default Album;
