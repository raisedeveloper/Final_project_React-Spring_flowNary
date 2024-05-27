import React, { forwardRef, useContext, useEffect } from "react";
import PropTypes from 'prop-types';
import { Box, Stack } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Reply from "./Reply";
import { getBoard } from "api/axiosGet";
import { useQuery } from "@tanstack/react-query";
import './board.css';
import {
  Card, CardHeader, CardMedia, CardActions, CardContent, Avatar, Typography,
  ListItemAvatar, ListItem, List, Button, Modal, Paper
} from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ClearIcon from '@mui/icons-material/Clear';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import TimeAgo from "timeago-react";
import koreanStrings from './ko';
import { GetWithExpiry } from "api/LocalStorage";
import { UserContext } from "api/LocalStorage";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';



const BoardDetail = forwardRef(({ bid, uid, index, handleClose, nickname, handleButtonLike,handleButtonLikeReply,handleButtonLikeReReply }, ref) => {

  // useQuery는 항상 실행되어야 합니다.
  const { data: board, isLoading, isError, refetch } = useQuery({
    queryKey: ['board', bid, uid],
    queryFn: () => getBoard(bid, uid),
  });
  const navigate = useNavigate();

  const handleCloseDialog = () => {
    // handleClose 함수를 호출하여 다이얼로그를 닫습니다.
    handleClose();
  };

  const handleUpdate = () => {
    navigate("/home/Update")
    sessionStorage.setItem("bid", bid);
  }

  const { activeUser } = useContext(UserContext);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }
  // board 데이터가 있을 때만 image를 설정합니다.
  const image = board?.image ? board.image.split(',') : null;

  return (
    <Box ref={ref}>
      <Stack direction="row" justifyContent="space-between" sx={{ height: '100%' }}>
        <Stack direction="column" sx={{ flex: 1, height: '100%' }}>
          {/* 컨텐츠 부분 */}
          <Card sx={{ padding: 3, display: 'flex', flexDirection: 'column',}}>
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: 'red'[500] }}
                  aria-label="recipe"
                  src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${board.profile}`}
                />
              }
              title={board.nickname}
              subheader={board.title}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Carousel
                indicators={false}
                animation="slide"
                autoPlay={false}
                sx={{
                  maxWidth: '100vw',
                }}
              >
                {image && image.map((image, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      width: '100%',
                      height: '100%',
                      '@media (min-width: 500px)': {
                        height: '200px',
                      },
                      '@media (min-width: 768px)': {
                        height: '200px',
                      },
                      '@media (min-width: 1024px)': {
                        height: '400px',
                      },
                    }}
                  >
                    <div
                      style={{ width: '100vw', height: '100%' }}
                    >
                      <img
                        style={{ width: '100%', height: '100%', objectFit: 'fill' }}
                        src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${image}`}
                        alt={`Image ${index + 1}`}
                      />
                    </div>
                  </Box>
                ))}
              </Carousel>
            </Box>
            <Box sx={{ marginTop: 2 }}> {/* 텍스트 영역 아래로 확장 */}
              <Typography variant="body2" color="text.secondary">
                {board.bContents}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.primary" sx={{ marginTop: 5 }}>
              {<TimeAgo datetime={board.modTime} locale={koreanStrings} />}
            </Typography>
          </Card>
          {/* 이미지 없을때
          {image == null ? (
            <Card sx={{ height: "100vh", padding: 3, border: '3px solid purple' }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: 'red'[500] }} aria-label="recipe"
                    src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${board.profile}`}
                  />
                }
                title={board.nickname}
                subheader={board.title}
              />
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '62%', overflowY: 'auto' }}>
                <Stack direction="row" spacing={1} padding={'10px 0 25px 0'}>
                  <Button sx={{ padding: 0, width: 0 }} onClick={() => handleButtonLike(board.bid, board.uid)}>
                    <FavoriteIcon sx={board.liked ? { color: 'red' } : { color: 'blue' }} />{board.likeCount}
                  </Button>
                  <Button sx={{ padding: 0, width: 0 }}>
                    <ShareIcon />
                  </Button>
                  <Button sx={{ padding: 0, width: 0 }}>
                    <BookmarkIcon />
                  </Button>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Typography variant="body2" color="text.secondary" >
                    {board.bContents}
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.fisrt" sx={{ marginTop: 5 }} >
                  {<TimeAgo datetime={board.modTime} locale={koreanStrings} />}
                </Typography>
              </CardContent>
            </Card>
          ) : null} */}

          {/* Reply 컴포넌트는 항상 렌더링 */}
          <Reply bid={bid} uid={uid} index={index} nickname={nickname} handleButtonLike={handleButtonLike} handleButtonLikeReReply={handleButtonLikeReReply} handleButtonLikeReply={handleButtonLikeReply}/>
        </Stack>
      </Stack>
    </Box>
  );
});

BoardDetail.propTypes = {
  bid: PropTypes.number.isRequired,
  uid: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  handleClose: PropTypes.func.isRequired,
  nickname: PropTypes.string.isRequired,
  handleButtonLike: PropTypes.func.isRequired,
  handleButtonLikeReply: PropTypes.func.isRequired,
  handleButtonLikeReReply: PropTypes.func.isRequired,
};
export default BoardDetail;
