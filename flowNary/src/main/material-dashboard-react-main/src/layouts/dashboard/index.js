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
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { Box, Card, Divider, Icon } from "@mui/material";
import { Bar } from "react-chartjs-2";
import MDTypography from "components/MDTypography";

export default function Home() {
  const { sales, tasks } = reportsLineChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mt={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <Card sx={{
                  height: "100%",
                  transition: 'box-shadow 0.3s', // 추가: 호버 시 그림자 효과를 부드럽게 만들기 위한 트랜지션
                  '&:hover': {
                    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // 추가: 호버 시 그림자 효과
                  }
                }}>
                  <MDBox padding="1rem">
                    <MDBox
                      variant="gradient"
                      borderRadius="lg"
                      py={2}
                      pr={0.5}
                      sx={{
                        height: "12.5rem",
                        transition: 'box-shadow 0.3s', // 추가: 호버 시 그림자 효과를 부드럽게 만들기 위한 트랜지션
                        '&:hover': {
                          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // 추가: 호버 시 그림자 효과
                        }
                      }}
                    >
                      사진
                    </MDBox>
                    <MDBox pt={3} pb={1} px={1}>
                      <MDTypography variant="h6" textTransform="capitalize">
                        제목
                      </MDTypography>
                      <MDTypography component="div" variant="button" color="text" fontWeight="light">
                        설명
                      </MDTypography>
                      <Divider />
                      <MDBox display="flex" alignItems="center">
                        <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
                          <Icon>schedule</Icon>
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="light">
                          시간
                        </MDTypography>
                      </MDBox>
                    </MDBox>
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <MDBox sx={{ backgroundColor: 'silver' }}>
                  날씨 위젯 부분
                </MDBox>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox >
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox >
      <Footer />
    </DashboardLayout >
  );
}