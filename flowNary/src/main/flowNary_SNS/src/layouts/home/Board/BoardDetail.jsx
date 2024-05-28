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
import { GetWithExpiry } from "api/LocalStorage";
import { UserContext } from "api/LocalStorage";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import * as timeago from 'timeago.js';
import ko from 'timeago.js/lib/lang/ko';



const BoardDetail = forwardRef(({ bid, uid, index, handleClose, nickname, handleButtonLike, handleButtonLikeReply, handleButtonLikeReReply }, ref) => {

  timeago.register('ko', ko);

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
  // 클릭 시 마이페이지 이동 이벤트
  const handleMyPage = (uid) => {
    navigate("/mypage", { state: { uid: uid } }); // state를 통해 navigate 위치에 파라메터 제공
  }
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
          <Card sx={{ padding: 3, display: 'flex', flexDirection: 'column', }}>
            <CardHeader
              avatar={
                <Avatar onClick={() => handleMyPage(board.uid)}
                  sx={{ bgcolor: 'red'[500], cursor: 'pointer' }}
                  aria-label="recipe"
                  src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${board.profile}`}
                />
              }
              title={<Typography variant="subtitle3" sx={{ fontSize: "15px", color: 'purple', cursor: 'pointer' }} onClick={() => handleMyPage(board.uid)}>{board.nickname}</Typography>}
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
              {<TimeAgo datetime={board.modTime} locale='ko' />}
            </Typography>
          </Card>

          {/* Reply 컴포넌트는 항상 렌더링 */}
          <Reply bid={bid} uid={uid} index={index} nickname={nickname} handleButtonLike={handleButtonLike} handleButtonLikeReReply={handleButtonLikeReReply} handleButtonLikeReply={handleButtonLikeReply} handleMyPage={handleMyPage} />
        </Stack>
      </Stack>
    </Box>
  );
});

BoardDetail.propTypes = {
  bid: PropTypes.number,
  uid: PropTypes.number,
  index: PropTypes.number,
  handleClose: PropTypes.func,
  nickname: PropTypes.string,
  handleButtonLike: PropTypes.func,
  handleButtonLikeReply: PropTypes.func,
  handleButtonLikeReReply: PropTypes.func,
};
export default BoardDetail;
