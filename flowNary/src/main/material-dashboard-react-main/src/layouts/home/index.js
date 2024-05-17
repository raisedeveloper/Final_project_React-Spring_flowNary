// @mui material components
import Grid from "@mui/material/Grid";
import axios from "axios";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

import TimeAgo from 'timeago-react';


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Dashboard components
import TodoList from "layouts/home/components/todoList";
import { Avatar, Box, Button, Card, CardContent, CardHeader, CardMedia, Divider, Icon, IconButton, Modal, Stack, Typography, } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Bar } from "react-chartjs-2";
import MDTypography from "components/MDTypography";
import { useEffect, useState } from "react";
import BoardDetail from './Board/BoardDetail';


import { useLocation, useNavigate } from "react-router-dom";
import { GetWithExpiry } from "api/LocalStorage";
import { useAddLike, useGetUserNicknameLS } from "api/customHook";
import { useQuery } from "@tanstack/react-query";
import { getBoardList } from "api/axiosGet";
import { getBoard } from "api/axiosGet";

export default function Home() {


  const weatherDescKo = {
    201: '가벼운 비를 동반한 천둥구름',
    200: '비를 동반한 천둥구름',
    202: '폭우를 동반한 천둥구름',
    210: '약한 천둥구름',
    211: '천둥구름',
    212: '강한 천둥구름',
    221: '불규칙적 천둥구름',
    230: '약한 연무를 동반한 천둥구름',
    231: '연무를 동반한 천둥구름',
    232: '강한 안개비를 동반한 천둥구름',
    300: '가벼운 안개비',
    301: '안개비',
    302: '강한 안개비',
    310: '가벼운 적은비',
    311: '적은비',
    312: '강한 적은비',
    313: '소나기와 안개비',
    314: '강한 소나기와 안개비',
    321: '소나기',
    500: '악한 비',
    501: '중간 비',
    502: '강한 비',
    503: '매우 강한 비',
    504: '극심한 비',
    511: '우박',
    520: '약한 소나기 비',
    521: '소나기 비',
    522: '강한 소나기 비',
    531: '불규칙적 소나기 비',
    600: '가벼운 눈',
    601: '눈',
    602: '강한 눈',
    611: '진눈깨비',
    612: '소나기 진눈깨비',
    615: '약한 비와 눈',
    616: '비와 눈',
    620: '약한 소나기 눈',
    621: '소나기 눈',
    622: '강한 소나기 눈',
    701: '박무',
    711: '연기',
    721: '연무',
    731: '모래 먼지',
    741: '안개',
    751: '모래',
    761: '먼지',
    762: '화산재',
    771: '돌풍',
    781: '토네이도',
    800: '구름 한 점 없는 맑은 하늘',
    801: '약간의 구름이 낀 하늘',
    802: '드문드문 구름이 낀 하늘',
    803: '구름이 거의 없는 하늘',
    804: '구름으로 뒤덮인 흐린 하늘',
    900: '토네이도',
    901: '태풍',
    902: '허리케인',
    903: '한랭',
    904: '고온',
    905: '바람부는',
    906: '우박',
    951: '바람이 거의 없는',
    952: '약한 바람',
    953: '부드러운 바람',
    954: '중간 세기 바람',
    955: '신선한 바람',
    956: '센 바람',
    957: '돌풍에 가까운 센 바람',
    958: '돌풍',
    959: '심각한 돌풍',
    960: '폭풍',
    961: '강한 폭풍',
    962: '허리케인'
  };
  
  const [weather, setWeather] = useState('');

  // 위치 뽑아내기
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(37.30101111, 127.0122222);
    });
  };

  // API 가져오기
  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lang=kr&lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      );
      console.log(res);
      // id 찾아서 매칭 후 description 한글 번역된 거 가져오기
      const weatherId = res.data.weather[0].id;
      const weatherKo = weatherDescKo[weatherId];
      // 날씨 아이콘 가져오기
      const weatherIcon = res.data.weather[0].icon;
      const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
      // 소수점 버리기
      const temp = Math.round(res.data.main.temp);
      const cityName = res.data.name;
      setWeather({
        description: weatherKo,
        name: cityName,
        temp: temp,
        links: weatherIconAdrs,
      });
      console.log(weather);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  /////////////////////////////////////////////////////////////////////
  // 유저 정보 받아오기

  const navigate = useNavigate();

  const uid = GetWithExpiry("uid");
  const email = GetWithExpiry("email");
  const profile = GetWithExpiry("profile");

  const [bid, setBid] = useState(0);
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);

  // if (uid == -1) {
  //   navigate("/login");
  // }
  const nickname = useGetUserNicknameLS();

  // 창 열고 닫기
  const handleOpen = (e) => {
    setOpen(true);
    setBid(e);
  }
  const handleClose = () => {
    setOpen(false);
    setBid(-1);
  };

  const location = useLocation();
  const path = location.pathname.split('/');
  const path2 = path[path.length - 1];

  /////////////////// useQuery로 BoardList 받기 ///////////////////
  const dataList = useQuery({
    queryKey: ['boardList', uid],
    queryFn: () => getBoardList(10, uid),
  });

  const addLike = useAddLike();
  const addLikeForm = (sendData) => {
    addLike(sendData);
  }

  // 좋아요 버튼 누를 때 넘기기
  function handleButtonLike(bid, uid2) {
    // var sendData = JSON.stringify({
    //   uid: uid,
    //   fuid: uid2,
    //   oid: bid,
    //   type: 1
    // })
    const sendData = {
      uid: uid,
      fuid: uid2,
      oid: bid,
      type: 1,
    }

    addLikeForm(sendData);
  }



  if (dataList.isLoading) {
    return (<div>로딩 중...</div>)
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mt={3}>
          <Stack direction="row" spacing={0}>
            <Stack direction="column" sx={{ flex: 1, mr: 3 }}>
              {/* 게시물 */}
              <Grid container spacing={3}>
                {/* {dataList.data && dataList.data.map((data) => ( */}
                  <Grid item xs={12} md={6} lg={6}>
                    <MDBox mb={3}>
                      <Card sx={{
                        height: "100%",
                        transition: 'box-shadow 0.3s', // 추가: 호버 시 그림자 효과를 부드럽게 만들기 위한 트랜지션
                        '&:hover': {
                          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // 추가: 호버 시 그림자 효과
                        }
                      }}>
                        <CardHeader
                          sx={{ padding: 1 }}
                          avatar={
                            <Avatar
                              aria-label="recipe"
                              src={"https://picsum.photos/200/200?q=1"}
                            />
                          }


                          action={
                            <IconButton aria-label="settings">
                              <MoreVertIcon />
                            </IconButton>
                          }
                          title={<Typography variant="subtitle3" sx={{ fontSize: "15px", color: 'purple' }}>james</Typography>}
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
                            <button onClick={handleOpen.bind(null, 1)}>
                              <img
                                src={"https://picsum.photos/200/200?q=2"}
                                alt="Paella dish"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, borderRadius: 'inherit' }}
                              />
                            </button>
                          </MDBox>
                          <MDBox pt={3} pb={1} px={1}>
                            <MDTypography variant="h6" textTransform="capitalize">
                              제목
                            </MDTypography>
                            <MDTypography component="div" variant="button" color="text" fontWeight="light">
                              내용
                            </MDTypography>
                            <Divider />
                            <MDBox display="flex" alignItems="center">
                              <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
                                <Icon>schedule</Icon>
                              </MDTypography>
                              <MDTypography variant="button" color="text" fontWeight="light">
                                
                              {/* <TimeAgo datetime={data.modTime} trim /> */}
                              2024-05-17
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
                        <CardHeader
                          sx={{ padding: 1 }}
                          avatar={
                            <Avatar
                              aria-label="recipe"
                              src={"https://picsum.photos/200/200?q=3"}
                            />
                          }


                          action={
                            <IconButton aria-label="settings">
                              <MoreVertIcon />
                            </IconButton>
                          }
                          title={<Typography variant="subtitle3" sx={{ fontSize: "15px", color: 'purple' }}>james</Typography>}
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
                            <button onClick={handleOpen.bind(null, 1)}>
                              <img
                                src={"https://picsum.photos/200/200?q=4"}
                                alt="Paella dish"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, borderRadius: 'inherit' }}
                              />
                            </button>
                          </MDBox>
                          <MDBox pt={3} pb={1} px={1}>
                            <MDTypography variant="h6" textTransform="capitalize">
                              제목
                            </MDTypography>
                            <MDTypography component="div" variant="button" color="text" fontWeight="light">
                              내용
                            </MDTypography>
                            <Divider />
                            <MDBox display="flex" alignItems="center">
                              <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
                                <Icon>schedule</Icon>
                              </MDTypography>
                              <MDTypography variant="button" color="text" fontWeight="light">
                                
                              {/* <TimeAgo datetime={data.modTime} trim /> */}
                              2024-05-17
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
                        <CardHeader
                          sx={{ padding: 1 }}
                          avatar={
                            <Avatar
                              aria-label="recipe"
                              src={"https://picsum.photos/200/200?q=5"}
                            />
                          }


                          action={
                            <IconButton aria-label="settings">
                              <MoreVertIcon />
                            </IconButton>
                          }
                          title={<Typography variant="subtitle3" sx={{ fontSize: "15px", color: 'purple' }}>james</Typography>}
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
                            <button onClick={handleOpen.bind(null, 1)}>
                              <img
                                src={"https://picsum.photos/200/200?q=6"}
                                alt="Paella dish"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, borderRadius: 'inherit' }}
                              />
                            </button>
                          </MDBox>
                          <MDBox pt={3} pb={1} px={1}>
                            <MDTypography variant="h6" textTransform="capitalize">
                              제목
                            </MDTypography>
                            <MDTypography component="div" variant="button" color="text" fontWeight="light">
                              내용
                            </MDTypography>
                            <Divider />
                            <MDBox display="flex" alignItems="center">
                              <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
                                <Icon>schedule</Icon>
                              </MDTypography>
                              <MDTypography variant="button" color="text" fontWeight="light">
                                
                              {/* <TimeAgo datetime={data.modTime} trim /> */}
                              2024-05-17
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
                        <CardHeader
                          sx={{ padding: 1 }}
                          avatar={
                            <Avatar
                              aria-label="recipe"
                              src={"https://picsum.photos/200/200?q=7"}
                            />
                          }


                          action={
                            <IconButton aria-label="settings">
                              <MoreVertIcon />
                            </IconButton>
                          }
                          title={<Typography variant="subtitle3" sx={{ fontSize: "15px", color: 'purple' }}>james</Typography>}
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
                            <button onClick={handleOpen.bind(null, 1)}>
                              <img
                                src={"https://picsum.photos/200/200?q=8"}
                                alt="Paella dish"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, borderRadius: 'inherit' }}
                              />
                            </button>
                          </MDBox>
                          <MDBox pt={3} pb={1} px={1}>
                            <MDTypography variant="h6" textTransform="capitalize">
                              제목
                            </MDTypography>
                            <MDTypography component="div" variant="button" color="text" fontWeight="light">
                              내용
                            </MDTypography>
                            <Divider />
                            <MDBox display="flex" alignItems="center">
                              <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
                                <Icon>schedule</Icon>
                              </MDTypography>
                              <MDTypography variant="button" color="text" fontWeight="light">
                                
                              {/* <TimeAgo datetime={data.modTime} trim /> */}
                              2024-05-17
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
                        <CardHeader
                          sx={{ padding: 1 }}
                          avatar={
                            <Avatar
                              aria-label="recipe"
                              src={"https://picsum.photos/200/200?q=9"}
                            />
                          }


                          action={
                            <IconButton aria-label="settings">
                              <MoreVertIcon />
                            </IconButton>
                          }
                          title={<Typography variant="subtitle3" sx={{ fontSize: "15px", color: 'purple' }}>james</Typography>}
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
                            <button onClick={handleOpen.bind(null, 1)}>
                              <img
                                src={"https://picsum.photos/200/200?q=10"}
                                alt="Paella dish"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, borderRadius: 'inherit' }}
                              />
                            </button>
                          </MDBox>
                          <MDBox pt={3} pb={1} px={1}>
                            <MDTypography variant="h6" textTransform="capitalize">
                              제목
                            </MDTypography>
                            <MDTypography component="div" variant="button" color="text" fontWeight="light">
                              내용
                            </MDTypography>
                            <Divider />
                            <MDBox display="flex" alignItems="center">
                              <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
                                <Icon>schedule</Icon>
                              </MDTypography>
                              <MDTypography variant="button" color="text" fontWeight="light">
                                
                              {/* <TimeAgo datetime={data.modTime} trim /> */}
                              2024-05-17
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
                        <CardHeader
                          sx={{ padding: 1 }}
                          avatar={
                            <Avatar
                              aria-label="recipe"
                              src={"https://picsum.photos/200/200?q=11"}
                            />
                          }


                          action={
                            <IconButton aria-label="settings">
                              <MoreVertIcon />
                            </IconButton>
                          }
                          title={<Typography variant="subtitle3" sx={{ fontSize: "15px", color: 'purple' }}>james</Typography>}
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
                            <button onClick={handleOpen.bind(null, 1)}>
                              <img
                                src={"https://picsum.photos/200/200?q=12"}
                                alt="Paella dish"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, borderRadius: 'inherit' }}
                              />
                            </button>
                          </MDBox>
                          <MDBox pt={3} pb={1} px={1}>
                            <MDTypography variant="h6" textTransform="capitalize">
                              제목
                            </MDTypography>
                            <MDTypography component="div" variant="button" color="text" fontWeight="light">
                              내용
                            </MDTypography>
                            <Divider />
                            <MDBox display="flex" alignItems="center">
                              <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
                                <Icon>schedule</Icon>
                              </MDTypography>
                              <MDTypography variant="button" color="text" fontWeight="light">
                                
                              {/* <TimeAgo datetime={data.modTime} trim /> */}
                              2024-05-17
                              </MDTypography>
                            </MDBox>
                          </MDBox>
                        </MDBox>
                      </Card>
                    </MDBox>
                  </Grid>
                {/* ))} */}
              </Grid>
              
            </Stack>

            {/* 날씨 정보 */}
            <Stack direction="column" sx={{ flex: 0.5 }}>
              <MDBox mb={3} sx={{ position: 'sticky', top: "5%" }}>
                <MDBox>
                  <Card sx={{ height: "100%" }}>
                    <MDBox pt={3} px={3}>
                      <MDTypography variant="h6" fontWeight="medium">
                        Weather 정보
                      </MDTypography>
                      <Avatar sx={{ width: 200, height: 200 }} src="weather.png" alt="날씨 아이콘" />
                      <CardContent sx={{ fontSize: 'large', fontWeight: 'bolder' }}>
                        {/* {weather.name}:  {weather.temp}℃ */}
                        <br />
                        {/* {weather.description} */}
                      </CardContent>
                    </MDBox>
                  </Card>
                </MDBox>
                <br />
                <TodoList />
              </MDBox>
            </Stack>
          </Stack>
        </MDBox >
      </MDBox >
      {/* 게시글 모달 */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <BoardDetail bid={bid} uid={uid} handleClose={handleClose} nickname={nickname} handleButtonLike={handleButtonLike} />
        {/* <BoardDetail handleClose={handleClose}
          nickname={nickname} handleButtonLike={handleButtonLike} /> */}
        {/* <div>
          <ClearIcon onClick={handleClose} sx={{ cursor: 'pointer', fontSize: '26px', backgroundColor: 'rgb(162, 152, 182)', borderRadius: '100%', margin: '3px' }} />
        </div> */}
      </Modal>
      <Footer />
    </DashboardLayout >
  );
}