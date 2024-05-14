// @mui material components
import Grid from "@mui/material/Grid";
import axios from "axios";
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
import { Avatar, Box, Button, Card, CardHeader, CardMedia, Divider, Icon, IconButton, Stack, Typography, } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Bar } from "react-chartjs-2";
import MDTypography from "components/MDTypography";
// import { position } from "stylis";
import { useEffect, useState } from "react";

export default function Home() {
  const [weather, setWeather] = useState('');
  // 위치 뽑아내기
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      getWeatherByCurrentLocation(lat, lon)
    })
  }
  //api 가져오기
  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
    let response = await fetch(url)
    let data = await response.json();
    setWeather(data);
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);


  // const getWeather = async (lat, lon) => {
  //   try {
  //     const res = await axios.get(
  //       `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&}&units=metric&lang=kr`
  //     );

  //     // id 찾아서 매칭 후 description 한글 번역된 거 가져오기
  //     const weatherId = res.data.weather[0].id;
  //     const weatherKo = weatherDescKo[weatherId];
  //     // 날씨 아이콘 가져오기
  //     const weatherIcon = res.data.weather[0].icon;
  //     const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
  //     // 소수점 버리기
  //     const temp = Math.round(res.data.main.temp);

  //     console.log("umi" + weatherIcon);
  //     setWeather({
  //       description: weatherKo,
  //       name: cityName,
  //       temp: temp,
  //       icon: weatherIconAdrs,
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mt={3}>
          <Stack direction="row" spacing={0}>
            <Stack direction="column" sx={{ flex: 1, mr: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={6}>

                  {/* 카드1 - 시간x */}
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
                        {/* 카드2 - 시간*/}
                        <MDBox
                          variant="gradient"
                          borderRadius="lg"
                          py={2}
                          pr={0.5}
                          sx={{
                            position: "relative", // 이미지를 부모 요소에 상대적으로 위치하도록 설정합니다.
                            height: "14rem",
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
                              transform: 'scale(1.05)', // 이미지를 확대합니다.
                              transition: 'transform 0.35s ease-in-out', // 확대 효과를 부드럽게 만들기 위한 트랜지션을 설정합니다.
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
                  <div className="weather-box">
                    <div>{weather?.name}</div>
                    <h2>
                      {weather?.main.temp}℃ / {weather?.main.temp * 1.8 + 32}℉
                    </h2>
                    <h3>{weather?.weather[0].description}</h3>
                  </div>
                  <div className="weather-btn">
                    <Button variant="warning" className="btn">
                      Current Location
                    </Button>
                    <Button variant="warning" className="btn">
                      Paris
                    </Button>
                    <Button variant="warning" className="btn">
                      New York
                    </Button>
                    <Button variant="warning" className="btn">
                      London
                    </Button>
                    <Button variant="warning" className="btn">
                      Busan
                    </Button>
                  </div>
                </MDBox>
                <MDBox>
                  <img src="https://picsum.photos/200/300" style={{ height: "50%", objectFit: "cover" }} />
                </MDBox>
                <OrdersOverview />
              </MDBox>
            </Stack>
          </Stack>
        </MDBox >
      </MDBox >
      <Footer />
    </DashboardLayout >
  );
}