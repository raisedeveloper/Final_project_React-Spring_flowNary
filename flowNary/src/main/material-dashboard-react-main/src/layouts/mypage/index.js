import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Avatar, Box, Button, Divider, Grid, Paper, Stack, Typography
} from "@mui/material";
import {
  Subject as SubjectIcon, Bookmark as BookmarkIcon, ChatBubbleOutline as ChatBubbleOutlineIcon,
  Favorite as FavoriteIcon, Share as ShareIcon
} from '@mui/icons-material';
import { GetWithExpiry } from "api/LocalStorage";
import { getBoard, getBoardList } from "api/axiosGet";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import "./mypage.css";

function Notifications() {
  const nickname = GetWithExpiry('nickname');
  const profile = GetWithExpiry('profile');
  const uid = GetWithExpiry("uid");

  // 게시글 목록을 가져오는 쿼리
  const { data: boardList, isLoading: isListLoading, isError, error } = useQuery({
    queryKey: ['boardList', uid],
    queryFn: () => getBoardList(10, uid), // 여기서 10은 한 번에 가져올 게시글 수입니다.
  });

  // 개별 게시글의 상세 정보를 저장할 상태
  const [boardDetails, setBoardDetails] = useState([]);

  useEffect(() => {
    if (boardList && boardList.data) {
      // 모든 게시글의 상세 정보를 비동기적으로 가져오기
      Promise.all(boardList.data.map(async (board) => {
        try {
          const detail = await getBoard(board.bid, uid);
          return { ...board, ...detail };
        } catch (err) {
          console.error(`게시글 ${board.bid}의 상세 정보를 가져오는 중 에러 발생:`, err);
          return board; // 에러 발생 시 기본 정보만 반환
        }
      })).then(details => {
        setBoardDetails(details);
      }).catch(err => {
        console.error("게시글 상세 정보를 가져오는 중 에러 발생:", err);
      });
    }
  }, [boardList, uid]);

  useEffect(() => {
    console.log("boardDetails 상태 업데이트:", boardDetails);
  }, [boardDetails]);

  const handleButtonLike = (bid, uid2) => {
    // 좋아요 버튼 클릭 시 처리할 로직
  };

  if (isListLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    console.error("데이터 로드 중 에러 발생:", error);
    return <div>데이터 로드 중 에러가 발생했습니다.</div>;
  }

  console.log("받은 데이터:", boardList);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Stack direction={'row'} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
        <Avatar
          src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${profile}`}
          sx={{
            width: '9rem',
            height: '9rem',
            margin: '20px',
            fontSize: '60px',
            border: '2px solid primary.main'
          }}
        />
        <Stack sx={{ padding: '20px' }} fontWeight={'bold'}>
          <Stack direction={'row'} spacing={2} sx={{ marginTop: '10px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h4" fontWeight={'bold'}>
              {nickname}
            </Typography>
          </Stack>
          <Stack direction={'row'} spacing={2} sx={{ marginTop: '10px', marginBottom: '15px' }}>
            <Box sx={{ cursor: 'pointer' }}>
              게시물 수
            </Box>
            <Box sx={{ cursor: 'pointer' }}>
              팔로워 수
            </Box>
            <Box sx={{ cursor: 'pointer' }}>
              팔로잉 수
            </Box>
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <Button color="secondary" className='msg_button' style={{ border: "3px solid #BA99D1" }} sx={{ color: 'dark', width: '50%' }}>팔로우</Button>
            <Button color="primary" className='msg_button' style={{ border: "3px solid #BA99D1" }} sx={{ width: '70%' }}>메시지 보내기</Button>
          </Stack>
        </Stack>
      </Stack>
      <Stack sx={{ paddingLeft: '30px', paddingRight: '30px' }}>
      </Stack>
      <Divider sx={{ marginTop: '20px', marginBottom: '10px' }}></Divider>
      <Stack direction="row" justifyContent="center" alignItems='center' spacing={5} sx={{ mt: 2 }}>
        <Stack direction="row" sx={{ cursor: 'pointer' }}>
          <SubjectIcon sx={{ fontSize: 'large' }} />
          <Typography sx={{ fontSize: 'large' }}>게시물</Typography>
        </Stack>
        <Stack direction="row" sx={{ cursor: 'pointer' }}>
          <BookmarkIcon sx={{ fontSize: 'large' }} />
          <Typography sx={{ fontSize: 'large' }}>책갈피</Typography>
        </Stack>
      </Stack>
      <br />
      <Grid container spacing={3}>
        {boardList.map((data) => (
          <Grid item xs={3} key={data.bid}> {/* 1/3 만큼 가로를 차지하고 3개가 넘어가면 다음 줄에 생성 */}
            <Paper elevation={3} className='uploadlist'>
              <Box className='uploaditem'>
                <Typography variant="body1">게시글 ID: {data.bid}</Typography>
                {data.image && <img src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${data.image.split(',')[0]}`} alt={data.title} style={{ width: '100%', height: 'auto' }} />}
                <Typography variant="h6">{data.title}</Typography>
                <Typography variant="body2" color="textSecondary">{data.bContents}</Typography>
              </Box>
              <Stack direction="row" justifyContent="space-between" sx={{ p: 1 }}>
                <Button onClick={() => handleButtonLike(data.bid, data.uid)}>
                  <FavoriteIcon sx={data.liked ? { color: 'red' } : { color: 'blue' }} />{data.likeCount}
                </Button>
                <Button>
                  <ChatBubbleOutlineIcon />{data.replyCount}
                </Button>
                <Button>
                  <ShareIcon />
                </Button>
                <Button>
                  <BookmarkIcon />
                </Button>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Footer />
    </DashboardLayout>
  );
}

export default Notifications;
