// @mui material components
import Grid from "@mui/material/Grid";
import axios from "axios";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Dashboard components
import TodoList from "layouts/todoList/TodoListIndex";
import { Avatar, Box, Button, Card, CardContent, CardHeader, CardMedia, Divider, Icon, IconButton, Modal, Stack, Popover, Dialog, Typography, } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Bar } from "react-chartjs-2";
import MDTypography from "components/MDTypography";
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import BoardDetail from "./Board/BoardDetail";
import Write from './write';
import CloseIcon from '@mui/icons-material/Close';

import { useLocation, useNavigate } from "react-router-dom";
import { GetWithExpiry } from "api/LocalStorage";
import { useAddLike, useGetUserNicknameLS } from "api/customHook";
import { useQuery, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getBoardList, getBoardListCount } from "api/axiosGet";
import { getBoard } from "api/axiosGet";
import TimeAgo from "timeago-react";
import koreanStrings from './Board/ko'; // 한글 로케일 파일 경로
import AppTasks from '../admin/statistics/app-tasks';
import { UserContext } from "api/LocalStorage";

export default function Home() {
  const queryClient = useQueryClient()
  const [expanded, setExpanded] = useState({});

  // const Transition = React.forwardRef(function Transition(props, ref) {
  //   return <Slide direction="right" ref={ref} {...props} />;
  // });

  const handleToggle = (bid) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [bid]: !prevExpanded[bid]
    }));
  };

  /////////////////////////////////////////////////////////////////////
  // 유저 정보 받아오기

  const navigate = useNavigate();

  const uid = GetWithExpiry("uid");
  const email = GetWithExpiry("email");
  const profile = GetWithExpiry("profile");

  const [bid, setBid] = useState(0);
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);


  // if (uid == -1) {
  //   navigate("/login");
  // }
  const nickname = useGetUserNicknameLS();


  //수정 페이지 이동
  const handleUpdate = () => {
    navigate("../home/Update")
    sessionStorage.setItem("bid", bid);
  }

  const { activeUser } = useContext(UserContext);


  // 창 열고 닫기
  const handleOpen = (e) => {

    setOpen(true);
    setBid(e);

  }
  const handleClose = () => {
    setOpen(false);
  };



  const location = useLocation();
  const [path2, setPath2] = useState('');

  useEffect(() => {
    if (location.pathname) {
      const getPath = async () => {
        const path = location.pathname.split('/');
        if (path) {
          const lastPath = path.slice(-1)[0];
          setPath2(lastPath);
        }
        getPath();
      }
    };
  }, [location]);

  const [count, setCount] = useState(10);
  const [page, setPage] = useState(1);
  const [pageLoading, setPageLoading] = useState(true);
  const observerRef = useRef(null);

  /////////////////// useQuery로 BoardList 받기 ///////////////////

  const { data: boardList, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['boardList', uid],
    queryFn: ({ pageParam = 1 }) => getBoardList(pageParam * count, uid),
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.nextCursor !== undefined) {
        return lastPage.nextCursor;
      }
      return undefined;
    },
  });


  const { data: allcount } = useQuery({
    queryKey: ['BoardCount'],
    queryFn: () => getBoardListCount(),
    placeholderData: (p) => p,
  })

  useEffect(() => {
    if (count >= allcount && allcount !== undefined)
      setPageLoading(false);
    else if (count < allcount && allcount !== undefined)
      setPageLoading(true);
  }, [count, allcount])

  const callback = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && pageLoading) // 타겟 요소가 화면에 들어오면 실행
    {
      setPage((prevpage) => prevpage + 1);
      setCount((prevcount) => prevcount + 4);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const observer = new IntersectionObserver(callback, {
        rootMargin: '0px 0px 0px 0px',
        threshold: 0,
      })

      const observerTarget = document.getElementById("observe"); // id가 observe인 태그를 사용
      queryClient.refetchQueries(['boardList']);
      if (observerTarget) {
        observer.observe(observerTarget);
      }
      return () => { // 페이지 종료 시 타겟 해제
        if (observer && observerTarget) {
          observer.unobserve(observerTarget);
        }
      };
    }, 1000)
  }, [page]);



  const addLike = useAddLike();
  const addLikeForm = (sendData) => {
    addLike(sendData);
  }

  // 좋아요 버튼 누를 때 넘기기
  function handleButtonLike(bid, uid2) {
    if (uid == -1)
      return;

    const sendData = {
      uid: uid,
      fuid: uid2,
      oid: bid,
      type: 1,
    }

    addLikeForm(sendData);
  }
  // 댓글 좋아요 버튼 누를 때 넘기기
  function handleButtonLikeReply(rid, uid2) {
    if (uid == -1)
      return;

    const sendData = {
      uid: activeUser.uid,
      fuid: uid2,
      oid: rid,
      type: 2,
    }

    addLikeForm(sendData);
  }
  // 대댓글 좋아요 버튼 누를 때 넘기기
  function handleButtonLikeReReply(rrid, uid2) {
    if (uid === -1) return;

    const sendData = {
      uid: activeUser.uid,
      fuid: uid2,
      oid: rrid,
      type: 3,
    }

    addLikeForm(sendData);
  }
  if (isLoading) {
    <div>로딩중...</div>
  }


  //popover
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? 'simple-popover' : undefined;

  // 클릭 시 마이페이지 이동 이벤트
  const handleMyPage = (uid) => {
    navigate("/mypage", { state: { uid: uid } }); // state를 통해 navigate 위치에 파라메터 제공
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mt={3}>
          <Stack direction="row" spacing={0}>
            <Stack direction="column" sx={{ flex: 1, mr: 3 }}>
              <Write />
              <Grid container spacing={3}>
                {(boardList && allcount && !isLoading) ? (boardList.pages.map((page, index) => (
                  <React.Fragment key={index}>
                    {page && page.map((data, idx) => (
                      <Grid key={idx} item xs={12} md={6} lg={6} >
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
                                  src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${data.profile}`}
                                />
                              }
                              action={
                                <div>
                                  <IconButton aria-label="settings" onClick={handleClick}>
                                    <MoreVertIcon />
                                  </IconButton>
                                  <Popover
                                    id={id}
                                    open={openPopover}
                                    anchorEl={anchorEl}
                                    onClose={handleClosePopover}
                                    anchorOrigin={{
                                      vertical: 'bottom',
                                      horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                      vertical: 'top',
                                      horizontal: 'right',
                                    }}
                                    PaperProps={{
                                      style: {
                                        marginLeft: 90, // 이 값을 조정하여 팝오버의 가로 위치를 미세하게 조정
                                      },
                                    }}
                                  >
                                    {data.uid === activeUser.uid && (
                                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                                        <Button onClick={handleUpdate}>수정</Button>
                                        <Button sx={{ padding: 0 }}>공유 하기</Button>
                                        <Button sx={{ padding: 0, color: 'red' }}>신고 하기</Button>
                                        <Button sx={{ padding: 0 }}>삭제 하기</Button>

                                      </Box>
                                    )}
                                  </Popover>
                                </div>
                              }
                              title={<Typography variant="subtitle3" sx={{ fontSize: "15px", color: 'purple' }}>{data.nickname}</Typography>}
                              onClick={() => handleMyPage(data.uid)}
                            />

                            <MDBox padding="1rem">
                              {data.image ?
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
                                  <button onClick={handleOpen.bind(null, data.bid)}>
                                    <img
                                      src={data.image ? `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${data.image.split(',')[0]}` : ''}
                                      alt="Paella dish"
                                      style={{ cursor: 'pointer', width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, borderRadius: 'inherit' }}
                                    />
                                  </button>
                                </MDBox>
                                :
                                <MDBox>
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
                                    <button onClick={handleOpen.bind(null, data.bid)}>
                                      <img
                                        src="images/LightLogo.png"
                                        alt="Paella dish"
                                        style={{ cursor: 'pointer', width: '100%', height: '100%', objectFit: 'fill', position: 'absolute', top: 0, left: 0, borderRadius: 'inherit' }}
                                      />
                                    </button>
                                  </MDBox>
                                </MDBox>
                              }
                              <MDBox pt={3} pb={1} px={1}>
                                <button onClick={handleOpen.bind(null, data.bid)} style={{ border: 'none', backgroundColor: 'transparent', padding: 0, margin: 0 }}>
                                  <MDTypography variant="h6" textTransform="capitalize">
                                    {data.title}
                                  </MDTypography>
                                  {expanded[data.bid] ? (
                                    <MDTypography component="div" variant="button" color="text" fontWeight="light">
                                      {data.bContents}
                                    </MDTypography>
                                  ) : (
                                    <MDTypography component="div" variant="button" color="text" fontWeight="light" sx={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                      {data.bContents}
                                    </MDTypography>
                                  )}
                                </button>
                                <Button onClick={() => handleToggle(data.bid)}>{expanded[data.bid] ? '...' : '...'}</Button>
                                <Divider />
                                <MDBox display="flex" alignItems="center">
                                  <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
                                    <Icon>schedule</Icon>
                                  </MDTypography>
                                  <MDTypography variant="button" color="text" fontWeight="light">
                                    <TimeAgo datetime={data.modTime} locale={koreanStrings} />
                                  </MDTypography>
                                </MDBox>
                              </MDBox>
                            </MDBox>
                          </Card>
                        </MDBox>
                      </Grid>
                    ))}
                  </React.Fragment>
                ))) : <></>}
              </Grid>

            </Stack>


            <Stack direction="column" sx={{ flex: 0.5 }}>
              <MDBox mb={3} sx={{ position: 'sticky', top: "5%" }}>
                <TodoList />
              </MDBox>
            </Stack>
          </Stack>
        </MDBox >
      </MDBox >
      {/* <div ref={observerRef}></div> */}
      <div id="observe" ref={observerRef} style={{ display: 'flex', height: '1rem' }}></div>

      {/* 게시글 모달 */}
      <Dialog
        open={open}
        onClose={handleClose}
        // TransitionComponent={Transition}
        aria-labelledby="customized-dialog-title"
        keepMounted
        PaperProps={{
          sx: {
            width: '60%', // 원하는 너비 퍼센트로 설정
            height: '80vh', // 원하는 높이 뷰포트 기준으로 설정
            maxWidth: 'none', // 최대 너비 제한 제거
          },
        }}
      >
        <IconButton aria-label="close" onClick={handleClose}
          sx={{
            position: 'absolute', right: 8, top: 8,
            color: (theme) => theme.palette.grey[500],
            zIndex: 2
          }} >
          <CloseIcon />
        </IconButton>
        <BoardDetail bid={bid} uid={uid} index={index} handleClose={handleClose} nickname={nickname} handleButtonLikeReply={handleButtonLikeReply} handleButtonLikeReReply={handleButtonLikeReReply} handleButtonLike={handleButtonLike} />
      </Dialog>

      <Footer />
    </DashboardLayout >
  );
}