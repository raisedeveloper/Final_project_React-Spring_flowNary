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

// Dashboard components
import Projects from "layouts/home/components/Projects";
import OrdersOverview from "layouts/home/components/OrdersOverview";
import { Avatar, Box, Card, CardHeader, CardMedia, Divider, Icon, IconButton, Stack, Typography, } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Bar } from "react-chartjs-2";
import MDTypography from "components/MDTypography";
import { position } from "stylis";

export default function Home() {

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mt={3}>
          <Stack direction="row" spacing={0}>
            <Stack direction="column" sx={{ flex: 1, mr: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={6}>
                  <MDBox mb={3}>
                    <Card sx={{
                      height: "100%",
                      transition: 'box-shadow 0.3s', // 추가: 호버 시 그림자 효과를 부드럽게 만들기 위한 트랜지션
                      '&:hover': {
                        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // 추가: 호버 시 그림자 효과
                        marginBottom: 3
                      }
                    }}>
                      <CardHeader sx={{ padding: 1 }}
                        avatar={
                          <Avatar aria-label="recipe" sx={{ width: 33, height: 33 }}>
                            R
                          </Avatar>
                        }
                        action={
                          <IconButton aria-label="settings">
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title={<Typography variant="subtitle3" sx={{ fontSize: "15px", color: 'purple' }}>Shrimp and Chorizo Paella</Typography>}
                      />

                      <MDBox padding="1rem">
                        <MDBox
                          variant="gradient"
                          borderRadius="lg"
                          py={2}
                          pr={0.5}
                          sx={{
                            position: "relative", // 이미지를 부모 요소에 상대적으로 위치하도록 설정합니다.
                            height: "12.5rem",
                            overflow: "hidden", // 이미지가 부모 요소를 넘어가지 않도록 설정합니다.
                            transition: 'box-shadow 0.3s', // 호버 시 그림자 효과를 부드럽게 만들기 위한 트랜지션을 설정합니다.
                            '&:hover img': { // 이미지가 호버될 때의 스타일을 지정합니다.
                              transform: 'scale(1.1)', // 이미지를 확대합니다.
                              transition: 'transform 0.3s ease-in-out', // 확대 효과를 부드럽게 만들기 위한 트랜지션을 설정합니다.
                            },
                            '&:hover': { // MDBox가 호버될 때의 스타일을 지정합니다.
                              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // 그림자 효과를 추가합니다.
                            }
                          }}
                        >
                          <img
                            src="https://picsum.photos/200/300"
                            alt="Paella dish"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, borderRadius: 'inherit' }} // 이미지를 부모 요소와 동일한 크기와 모양으로 설정하고, 부모 요소에 상대적으로 위치합니다.
                          />



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
                            {/* <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
                        <Icon>schedule</Icon>
                      </MDTypography>
                      <MDTypography variant="button" color="text" fontWeight="light">
                        시간
                      </MDTypography> */}
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    </Card>


                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <MDBox mb={3}>
                    <Card sx={{
                      height: "100%",
                      transition: 'box-shadow 0.3s', // 추가: 호버 시 그림자 효과를 부드럽게 만들기 위한 트랜지션
                      '&:hover': {
                        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // 추가: 호버 시 그림자 효과
                      }
                    }}>
                      <CardHeader sx={{ padding: 1 }}
                        avatar={
                          <Avatar aria-label="recipe">
                            R
                          </Avatar>
                        }
                        action={
                          <IconButton aria-label="settings">
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title="Shrimp and Chorizo Paella"
                      // subheader="September 14, 2016"
                      />

                      <MDBox padding="1rem">
                        <MDBox
                          variant="gradient"
                          borderRadius="lg"
                          py={2}
                          pr={0.5}
                          sx={{
                            position: "relative", // 이미지를 부모 요소에 상대적으로 위치하도록 설정합니다.
                            height: "12.5rem",
                            overflow: "visible", // 이미지가 부모 요소를 넘어가지 않도록 설정합니다.
                            transition: 'box-shadow 0.3s', // 호버 시 그림자 효과를 부드럽게 만들기 위한 트랜지션을 설정합니다.
                            '&:hover img': { // 이미지가 호버될 때의 스타일을 지정합니다.
                              transform: 'scale(1.1)', // 이미지를 확대합니다.
                              transition: 'transform 0.3s ease-in-out', // 확대 효과를 부드럽게 만들기 위한 트랜지션을 설정합니다.
                            },
                            '&:hover': { // MDBox가 호버될 때의 스타일을 지정합니다.
                              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // 그림자 효과를 추가합니다.
                            }
                          }}
                        >
                          <img
                            src="https://picsum.photos/200/300"
                            alt="Paella dish"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, borderRadius: 'inherit' }} // 이미지를 부모 요소와 동일한 크기와 모양으로 설정하고, 부모 요소에 상대적으로 위치합니다.
                          />
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
                              September 14, 2016
                            </MDTypography>
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    </Card>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <MDBox mb={3}>
                    <Card sx={{
                      height: "100%",
                      transition: 'box-shadow 0.3s', // 추가: 호버 시 그림자 효과를 부드럽게 만들기 위한 트랜지션
                      '&:hover': {
                        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // 추가: 호버 시 그림자 효과
                      }
                    }}>
                      <CardHeader sx={{ padding: 1 }}
                        avatar={
                          <Avatar aria-label="recipe">
                            R
                          </Avatar>
                        }
                        action={
                          <IconButton aria-label="settings">
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title="Shrimp and Chorizo Paella"
                      // subheader="September 14, 2016"
                      />

                      <MDBox padding="1rem">
                        <MDBox
                          variant="gradient"
                          borderRadius="lg"
                          py={2}
                          pr={0.5}
                          sx={{
                            position: "relative", // 이미지를 부모 요소에 상대적으로 위치하도록 설정합니다.
                            height: "12.5rem",
                            overflow: "visible", // 이미지가 부모 요소를 넘어가지 않도록 설정합니다.
                            transition: 'box-shadow 0.3s', // 호버 시 그림자 효과를 부드럽게 만들기 위한 트랜지션을 설정합니다.
                            '&:hover img': { // 이미지가 호버될 때의 스타일을 지정합니다.
                              transform: 'scale(1.1)', // 이미지를 확대합니다.
                              transition: 'transform 0.3s ease-in-out', // 확대 효과를 부드럽게 만들기 위한 트랜지션을 설정합니다.
                            },
                            '&:hover': { // MDBox가 호버될 때의 스타일을 지정합니다.
                              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // 그림자 효과를 추가합니다.
                            }
                          }}
                        >
                          <img
                            src="https://picsum.photos/200/300"
                            alt="Paella dish"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, borderRadius: 'inherit' }} // 이미지를 부모 요소와 동일한 크기와 모양으로 설정하고, 부모 요소에 상대적으로 위치합니다.
                          />
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
                              September 14, 2016
                            </MDTypography>
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    </Card>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <MDBox mb={3}>
                    <Card sx={{
                      height: "100%",
                      transition: 'box-shadow 0.3s', // 추가: 호버 시 그림자 효과를 부드럽게 만들기 위한 트랜지션
                      '&:hover': {
                        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // 추가: 호버 시 그림자 효과
                        marginBottom: 3
                      }
                    }}>
                      <CardHeader sx={{ padding: 1 }}
                        avatar={
                          <Avatar aria-label="recipe" sx={{ width: 33, height: 33 }}>
                            R
                          </Avatar>
                        }
                        action={
                          <IconButton aria-label="settings">
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title={<Typography variant="subtitle3" sx={{ fontSize: "15px", color: 'purple' }}>Shrimp and Chorizo Paella</Typography>}
                      />

                      <MDBox padding="1rem">
                        <MDBox
                          variant="gradient"
                          borderRadius="lg"
                          py={2}
                          pr={0.5}
                          sx={{
                            position: "relative", // 이미지를 부모 요소에 상대적으로 위치하도록 설정합니다.
                            height: "12.5rem",
                            overflow: "hidden", // 이미지가 부모 요소를 넘어가지 않도록 설정합니다.
                            transition: 'box-shadow 0.3s', // 호버 시 그림자 효과를 부드럽게 만들기 위한 트랜지션을 설정합니다.
                            '&:hover img': { // 이미지가 호버될 때의 스타일을 지정합니다.
                              transform: 'scale(1.1)', // 이미지를 확대합니다.
                              transition: 'transform 0.3s ease-in-out', // 확대 효과를 부드럽게 만들기 위한 트랜지션을 설정합니다.
                            },
                            '&:hover': { // MDBox가 호버될 때의 스타일을 지정합니다.
                              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // 그림자 효과를 추가합니다.
                            }
                          }}
                        >
                          <img
                            src="https://picsum.photos/200/300"
                            alt="Paella dish"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, borderRadius: 'inherit' }} // 이미지를 부모 요소와 동일한 크기와 모양으로 설정하고, 부모 요소에 상대적으로 위치합니다.
                          />



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
                            {/* <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
                        <Icon>schedule</Icon>
                      </MDTypography>
                      <MDTypography variant="button" color="text" fontWeight="light">
                        시간
                      </MDTypography> */}
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    </Card>


                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <MDBox mb={3}>
                    <Card sx={{
                      height: "100%",
                      transition: 'box-shadow 0.3s', // 추가: 호버 시 그림자 효과를 부드럽게 만들기 위한 트랜지션
                      '&:hover': {
                        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // 추가: 호버 시 그림자 효과
                      }
                    }}>
                      <CardHeader sx={{ padding: 1 }}
                        avatar={
                          <Avatar aria-label="recipe">
                            R
                          </Avatar>
                        }
                        action={
                          <IconButton aria-label="settings">
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title="Shrimp and Chorizo Paella"
                      // subheader="September 14, 2016"
                      />

                      <MDBox padding="1rem">
                        <MDBox
                          variant="gradient"
                          borderRadius="lg"
                          py={2}
                          pr={0.5}
                          sx={{
                            position: "relative", // 이미지를 부모 요소에 상대적으로 위치하도록 설정합니다.
                            height: "12.5rem",
                            overflow: "visible", // 이미지가 부모 요소를 넘어가지 않도록 설정합니다.
                            transition: 'box-shadow 0.3s', // 호버 시 그림자 효과를 부드럽게 만들기 위한 트랜지션을 설정합니다.
                            '&:hover img': { // 이미지가 호버될 때의 스타일을 지정합니다.
                              transform: 'scale(1.1)', // 이미지를 확대합니다.
                              transition: 'transform 0.3s ease-in-out', // 확대 효과를 부드럽게 만들기 위한 트랜지션을 설정합니다.
                            },
                            '&:hover': { // MDBox가 호버될 때의 스타일을 지정합니다.
                              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // 그림자 효과를 추가합니다.
                            }
                          }}
                        >
                          <img
                            src="https://picsum.photos/200/300"
                            alt="Paella dish"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, borderRadius: 'inherit' }} // 이미지를 부모 요소와 동일한 크기와 모양으로 설정하고, 부모 요소에 상대적으로 위치합니다.
                          />
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
                              September 14, 2016
                            </MDTypography>
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    </Card>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <MDBox mb={3}>
                    <Card sx={{
                      height: "100%",
                      transition: 'box-shadow 0.3s', // 추가: 호버 시 그림자 효과를 부드럽게 만들기 위한 트랜지션
                      '&:hover': {
                        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // 추가: 호버 시 그림자 효과
                      }
                    }}>
                      <CardHeader sx={{ padding: 1 }}
                        avatar={
                          <Avatar aria-label="recipe">
                            R
                          </Avatar>
                        }
                        action={
                          <IconButton aria-label="settings">
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title="Shrimp and Chorizo Paella"
                      // subheader="September 14, 2016"
                      />

                      <MDBox padding="1rem">
                        <MDBox
                          variant="gradient"
                          borderRadius="lg"
                          py={2}
                          pr={0.5}
                          sx={{
                            position: "relative", // 이미지를 부모 요소에 상대적으로 위치하도록 설정합니다.
                            height: "12.5rem",
                            overflow: "visible", // 이미지가 부모 요소를 넘어가지 않도록 설정합니다.
                            transition: 'box-shadow 0.3s', // 호버 시 그림자 효과를 부드럽게 만들기 위한 트랜지션을 설정합니다.
                            '&:hover img': { // 이미지가 호버될 때의 스타일을 지정합니다.
                              transform: 'scale(1.1)', // 이미지를 확대합니다.
                              transition: 'transform 0.3s ease-in-out', // 확대 효과를 부드럽게 만들기 위한 트랜지션을 설정합니다.
                            },
                            '&:hover': { // MDBox가 호버될 때의 스타일을 지정합니다.
                              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // 그림자 효과를 추가합니다.
                            }
                          }}
                        >
                          <img
                            src="https://picsum.photos/200/300"
                            alt="Paella dish"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, borderRadius: 'inherit' }} // 이미지를 부모 요소와 동일한 크기와 모양으로 설정하고, 부모 요소에 상대적으로 위치합니다.
                          />
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
                              September 14, 2016
                            </MDTypography>
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    </Card>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <MDBox mb={3}>
                    <Card sx={{
                      height: "100%",
                      transition: 'box-shadow 0.3s', // 추가: 호버 시 그림자 효과를 부드럽게 만들기 위한 트랜지션
                      '&:hover': {
                        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // 추가: 호버 시 그림자 효과
                        marginBottom: 3
                      }
                    }}>
                      <CardHeader sx={{ padding: 1 }}
                        avatar={
                          <Avatar aria-label="recipe" sx={{ width: 33, height: 33 }}>
                            R
                          </Avatar>
                        }
                        action={
                          <IconButton aria-label="settings">
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title={<Typography variant="subtitle3" sx={{ fontSize: "15px", color: 'purple' }}>Shrimp and Chorizo Paella</Typography>}
                      />

                      <MDBox padding="1rem">
                        <MDBox
                          variant="gradient"
                          borderRadius="lg"
                          py={2}
                          pr={0.5}
                          sx={{
                            position: "relative", // 이미지를 부모 요소에 상대적으로 위치하도록 설정합니다.
                            height: "12.5rem",
                            overflow: "hidden", // 이미지가 부모 요소를 넘어가지 않도록 설정합니다.
                            transition: 'box-shadow 0.3s', // 호버 시 그림자 효과를 부드럽게 만들기 위한 트랜지션을 설정합니다.
                            '&:hover img': { // 이미지가 호버될 때의 스타일을 지정합니다.
                              transform: 'scale(1.1)', // 이미지를 확대합니다.
                              transition: 'transform 0.3s ease-in-out', // 확대 효과를 부드럽게 만들기 위한 트랜지션을 설정합니다.
                            },
                            '&:hover': { // MDBox가 호버될 때의 스타일을 지정합니다.
                              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // 그림자 효과를 추가합니다.
                            }
                          }}
                        >
                          <img
                            src="https://picsum.photos/200/300"
                            alt="Paella dish"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, borderRadius: 'inherit' }} // 이미지를 부모 요소와 동일한 크기와 모양으로 설정하고, 부모 요소에 상대적으로 위치합니다.
                          />



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
                            {/* <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
                        <Icon>schedule</Icon>
                      </MDTypography>
                      <MDTypography variant="button" color="text" fontWeight="light">
                        시간
                      </MDTypography> */}
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    </Card>


                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <MDBox mb={3}>
                    <Card sx={{
                      height: "100%",
                      transition: 'box-shadow 0.3s', // 추가: 호버 시 그림자 효과를 부드럽게 만들기 위한 트랜지션
                      '&:hover': {
                        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // 추가: 호버 시 그림자 효과
                      }
                    }}>
                      <CardHeader sx={{ padding: 1 }}
                        avatar={
                          <Avatar aria-label="recipe">
                            R
                          </Avatar>
                        }
                        action={
                          <IconButton aria-label="settings">
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title="Shrimp and Chorizo Paella"
                      // subheader="September 14, 2016"
                      />

                      <MDBox padding="1rem">
                        <MDBox
                          variant="gradient"
                          borderRadius="lg"
                          py={2}
                          pr={0.5}
                          sx={{
                            position: "relative", // 이미지를 부모 요소에 상대적으로 위치하도록 설정합니다.
                            height: "12.5rem",
                            overflow: "visible", // 이미지가 부모 요소를 넘어가지 않도록 설정합니다.
                            transition: 'box-shadow 0.3s', // 호버 시 그림자 효과를 부드럽게 만들기 위한 트랜지션을 설정합니다.
                            '&:hover img': { // 이미지가 호버될 때의 스타일을 지정합니다.
                              transform: 'scale(1.1)', // 이미지를 확대합니다.
                              transition: 'transform 0.3s ease-in-out', // 확대 효과를 부드럽게 만들기 위한 트랜지션을 설정합니다.
                            },
                            '&:hover': { // MDBox가 호버될 때의 스타일을 지정합니다.
                              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // 그림자 효과를 추가합니다.
                            }
                          }}
                        >
                          <img
                            src="https://picsum.photos/200/300"
                            alt="Paella dish"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, borderRadius: 'inherit' }} // 이미지를 부모 요소와 동일한 크기와 모양으로 설정하고, 부모 요소에 상대적으로 위치합니다.
                          />
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
                              September 14, 2016
                            </MDTypography>
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    </Card>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <MDBox mb={3}>
                    <Card sx={{
                      height: "100%",
                      transition: 'box-shadow 0.3s', // 추가: 호버 시 그림자 효과를 부드럽게 만들기 위한 트랜지션
                      '&:hover': {
                        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // 추가: 호버 시 그림자 효과
                      }
                    }}>
                      <CardHeader sx={{ padding: 1 }}
                        avatar={
                          <Avatar aria-label="recipe">
                            R
                          </Avatar>
                        }
                        action={
                          <IconButton aria-label="settings">
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title="Shrimp and Chorizo Paella"
                      // subheader="September 14, 2016"
                      />

                      <MDBox padding="1rem">
                        <MDBox
                          variant="gradient"
                          borderRadius="lg"
                          py={2}
                          pr={0.5}
                          sx={{
                            position: "relative", // 이미지를 부모 요소에 상대적으로 위치하도록 설정합니다.
                            height: "12.5rem",
                            overflow: "visible", // 이미지가 부모 요소를 넘어가지 않도록 설정합니다.
                            transition: 'box-shadow 0.3s', // 호버 시 그림자 효과를 부드럽게 만들기 위한 트랜지션을 설정합니다.
                            '&:hover img': { // 이미지가 호버될 때의 스타일을 지정합니다.
                              transform: 'scale(1.1)', // 이미지를 확대합니다.
                              transition: 'transform 0.3s ease-in-out', // 확대 효과를 부드럽게 만들기 위한 트랜지션을 설정합니다.
                            },
                            '&:hover': { // MDBox가 호버될 때의 스타일을 지정합니다.
                              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // 그림자 효과를 추가합니다.
                            }
                          }}
                        >
                          <img
                            src="https://picsum.photos/200/300"
                            alt="Paella dish"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, borderRadius: 'inherit' }} // 이미지를 부모 요소와 동일한 크기와 모양으로 설정하고, 부모 요소에 상대적으로 위치합니다.
                          />
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
                              September 14, 2016
                            </MDTypography>
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    </Card>
                  </MDBox>
                </Grid>
              </Grid>
            </Stack>
            <Stack direction="column" sx={{ flex: 0.5 }}>
              <MDBox mb={3} sx={{ position: 'sticky', top: "5%" }}>
                <MDBox sx={{ backgroundColor: 'silver' }}>
                  날씨 위젯 부분
                </MDBox>
                <MDBox>
                  <img src="https://picsum.photos/200/300" style={{height: "50%", objectFit: "cover" }} />
                </MDBox>
                <OrdersOverview />
              </MDBox>
            </Stack>
          </Stack>
        </MDBox >
        {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox >
      <Footer />
    </DashboardLayout >
  );
}