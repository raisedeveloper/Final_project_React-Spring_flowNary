import { Avatar, Box, Button, Card, CardContent, CardHeader, CardMedia, Stack, Typography } from "@mui/material";
import React, { forwardRef, useState } from "react";
import PropTypes from 'prop-types';

// 아이콘
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Reply from "./Reply";
import { getBoard } from "api/axiosGet";
import { useQuery } from "@tanstack/react-query";
import Carousel from "react-material-ui-carousel";
import { red } from '@mui/material/colors';
import MDBox from "components/MDBox";
import './board.css'


const BoardDetail = forwardRef(({ bid, uid, handleClose, nickname, handleButtonLike}, ref) => {
  const board = useQuery({
    queryKey: ['board', bid, uid],
    queryFn: () => getBoard(bid, uid),
  });
  console.log(board.data);
  if (board.isLoading) {
    return <div>로딩 중...</div>;
  }

  const image = board.data.image != null ? board.data.image.split(',') : null;
  console.log("이미지" + image);

  return (
    <Box className="board_modal">
      <Stack direction="row" justifyContent="space-between" sx={{ height: '100%' }}>
        <Stack direction="column" sx={{ flex: 1, height: '100%' }}>
          {/* 게시글 내용 */}
          {/* 선택사항 1. 게시물 왼쪽위에 달것인가
                       2.  카로셀로 그냥 가득 채울것인가*/}
          {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, paddingLeft:1,paddingTop:1 }}>
            <Avatar
              sx={{ bgcolor: 'red' }}
              aria-label="recipe"
              src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${board.data.profile}`}
            />
            <Typography>{board.data.nickname}</Typography>
            <Button variant="contained" size="small">팔로우</Button>
            </Box>
            <Box sx={{paddingLeft:6}}>
            <Typography>{board.data.title}</Typography>
            <Typography variant="body2">{board.data.modTime}</Typography>
          </Box> */}
          <Carousel>
              {image &&
                image.map((images, index) => (
                  <Box
                    key={index}
                    component="img"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'fill',
                      '@media (min-width: 500px)': {
                        height: '400px',
                      },
                      '@media (min-width: 768px)': {
                        height: '400px',
                      },
                      '@media (min-width: 1024px)': {
                        height: '600px',
                      },
                    }}
                    src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${images}`}
                    alt={`Image ${index + 1}`}
                  />
                ))}
            {/* <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '62%', overflowY: 'auto' }}>
              <Stack direction="row" spacing={1} padding={'10px 0 25px 0'}>
              <Button sx={{ padding: 0, width: 0 }} onClick={() => handleButtonLike(board.data.bid, board.data.uid)}>
              <FavoriteIcon sx={board.data.liked ? { color: 'red' } : { color: 'blue' }} />
              {board.data.likeCount}
              </Button>
              <Button sx={{ padding: 0, width: 0 }}>
              <ShareIcon />
              </Button>
              <Button sx={{ padding: 0, width: 0 }}>
              <BookmarkIcon />
              </Button>
              </Stack>
              <Stack direction="row" spacing={1}>
              <Typography component={'div'} variant="body2" color="text.secondary">
              {board.data.bContents}
                </Typography>
              </Stack>
            </CardContent> */}
          
          
      </Carousel>
        </Stack>
{/* 
        {/* Reply 컴포넌트 추가 */}
        <Reply bid={bid} uid={uid} nickname={nickname} handleButtonLike={handleButtonLike}/>

        {/* 닫기 버튼 */}
      </Stack>
    </Box>
  );
});

BoardDetail.propTypes = {
  bid: PropTypes.number.isRequired,
  uid: PropTypes.number.isRequired,
  handleClose: PropTypes.func.isRequired,
  nickname: PropTypes.string.isRequired,
  handleButtonLike: PropTypes.func.isRequired,
};

export default BoardDetail;
