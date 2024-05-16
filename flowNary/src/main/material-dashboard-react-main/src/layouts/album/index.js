/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Dashboard components
import ShowAlbumList from "layouts/album/components/showAlbumList";
import { Box, Card, CardMedia, Divider, Icon } from "@mui/material";
import { Bar } from "react-chartjs-2";
import MDTypography from "components/MDTypography";

function album() {

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ShowAlbumList />
      <Footer />
    </DashboardLayout >
  );
}

export default album;
