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
import { CardMedia, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";
import Transaction from "layouts/billing/components/Transaction";
import YearSelect from '../yearSelect';
import { useState } from "react";

function OrdersOverview() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };
  return (
    <MDBox py={3}>
      <MDBox mt={4.5}>
        <YearSelect selectedYear={selectedYear} onChange={handleYearChange} />
        <p>선택 연도: {selectedYear}</p>
        <br />
        <Grid container spacing={3} sx={{ border: '2px solid white', }}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox >
              <Card sx={{
                height: "100%",
              }}>
                <MDBox>
                  <MDBox
                    variant="gradient"
                    borderRadius="lg"
                    sx={{
                      height: "12.5rem",
                      transition: 'box-shadow 0.3s', // 추가: 호버 시 그림자 효과를 부드럽게 만들기 위한 트랜지션
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      '&:hover': {
                        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // 추가: 호버 시 그림자 효과
                      }
                    }}
                  >
                    <CardMedia component="img" sx={{ width: '100%', height: '100%', objectFit: 'cover', p: 0, m: 0 }} image='https://picsum.photos/200/300' alt="Paella dish" />
                  </MDBox>
                </MDBox>
              </Card>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1}>
              <Card sx={{
                height: "100%",
              }}>
                <MDBox>
                  <MDBox
                    variant="gradient"
                    borderRadius="lg"
                    sx={{
                      height: "12.5rem",
                      transition: 'box-shadow 0.3s', // 추가: 호버 시 그림자 효과를 부드럽게 만들기 위한 트랜지션
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      '&:hover': {
                        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // 추가: 호버 시 그림자 효과
                      }
                    }}
                  >
                    <CardMedia component="img" sx={{ width: '100%', height: '100%', objectFit: 'cover', p: 0, m: 0 }} image='https://picsum.photos/200/300' alt="Paella dish" />
                  </MDBox>
                </MDBox>
              </Card>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1}>
              <Card sx={{
                height: "100%",
              }}>
                <MDBox>
                  <MDBox
                    variant="gradient"
                    borderRadius="lg"
                    sx={{
                      height: "12.5rem",
                      transition: 'box-shadow 0.3s', // 추가: 호버 시 그림자 효과를 부드럽게 만들기 위한 트랜지션
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      '&:hover': {
                        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // 추가: 호버 시 그림자 효과
                      }
                    }}
                  >
                    <CardMedia component="img" sx={{ width: '100%', height: '100%', objectFit: 'cover', p: 0, m: 0 }} image='https://picsum.photos/200/300' alt="Paella dish" />
                  </MDBox>
                </MDBox>
              </Card>
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1}>
              <Card sx={{ height: "100%" }}>
                <MDBox>
                  <MDBox
                    variant="gradient"
                    borderRadius="lg"
                    sx={{
                      height: "12.5rem",
                      transition: 'box-shadow 0.3s', // 추가: 호버 시 그림자 효과를 부드럽게 만들기 위한 트랜지션
                      backgroundColor: 'rgba(0, 0, 0, 0)',

                      '&:hover': {
                        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // 추가: 호버 시 그림자 효과
                      }
                    }}
                  >
                    <CardMedia component="img" sx={{ width: '100%', height: '100%', objectFit: 'cover', p: 0, m: 0 }} image='https://picsum.photos/200/300' alt="Paella dish" />
                  </MDBox>
                </MDBox>
              </Card>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1}>
              <Card sx={{
                height: "100%",
              }}>
                <MDBox>
                  <MDBox
                    variant="gradient"
                    borderRadius="lg"
                    sx={{
                      height: "12.5rem",
                      transition: 'box-shadow 0.3s', // 추가: 호버 시 그림자 효과를 부드럽게 만들기 위한 트랜지션
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      '&:hover': {
                        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // 추가: 호버 시 그림자 효과
                      }
                    }}
                  >
                    <CardMedia component="img" sx={{ width: '100%', height: '100%', objectFit: 'cover', p: 0, m: 0 }} image='https://picsum.photos/200/300' alt="Paella dish" />
                  </MDBox>
                </MDBox>
              </Card>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1}>
              <Card sx={{
                height: "100%",
              }}>
                <MDBox>
                  <MDBox
                    variant="gradient"
                    borderRadius="lg"
                    sx={{
                      height: "12.5rem",
                      transition: 'box-shadow 0.3s', // 추가: 호버 시 그림자 효과를 부드럽게 만들기 위한 트랜지션
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      '&:hover': {
                        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // 추가: 호버 시 그림자 효과
                      }
                    }}
                  >
                    <CardMedia component="img" sx={{ width: '100%', height: '100%', objectFit: 'cover', p: 0, m: 0 }} image='https://picsum.photos/200/300' alt="Paella dish" />
                  </MDBox>
                </MDBox>
              </Card>
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1}>
              <Card sx={{
                height: "100%",
              }}>
                <MDBox>
                  <MDBox
                    variant="gradient"
                    borderRadius="lg"
                    sx={{
                      height: "12.5rem",
                      transition: 'box-shadow 0.3s', // 추가: 호버 시 그림자 효과를 부드럽게 만들기 위한 트랜지션
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      '&:hover': {
                        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // 추가: 호버 시 그림자 효과
                      }
                    }}
                  >
                    <CardMedia component="img" sx={{ width: '100%', height: '100%', objectFit: 'cover', p: 0, m: 0 }} image='https://picsum.photos/200/300' alt="Paella dish" />
                  </MDBox>
                </MDBox>
              </Card>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1}>
              <Card sx={{
                height: "100%",
              }}>
                <MDBox>
                  <MDBox
                    variant="gradient"
                    borderRadius="lg"
                    sx={{
                      height: "12.5rem",
                      transition: 'box-shadow 0.3s', // 추가: 호버 시 그림자 효과를 부드럽게 만들기 위한 트랜지션
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      '&:hover': {
                        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // 추가: 호버 시 그림자 효과
                      }
                    }}
                  >
                    <CardMedia component="img" sx={{ width: '100%', height: '100%', objectFit: 'cover', p: 0, m: 0 }} image='https://picsum.photos/200/300' alt="Paella dish" />
                  </MDBox>
                </MDBox>
              </Card>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1}>
              <Card sx={{
                height: "100%",
              }}>
                <MDBox>
                  <MDBox
                    variant="gradient"
                    borderRadius="lg"
                    sx={{
                      height: "12.5rem",
                      transition: 'box-shadow 0.3s', // 추가: 호버 시 그림자 효과를 부드럽게 만들기 위한 트랜지션
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      '&:hover': {
                        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // 추가: 호버 시 그림자 효과
                      }
                    }}
                  >
                    <CardMedia component="img" sx={{ width: '100%', height: '100%', objectFit: 'cover', p: 0, m: 0 }} image='https://picsum.photos/200/300' alt="Paella dish" />
                  </MDBox>
                </MDBox>
              </Card>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox >
    </MDBox >
  );
}

export default OrdersOverview;
