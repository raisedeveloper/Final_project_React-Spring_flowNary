import React, { forwardRef, useContext, useState } from "react";
import PropTypes from 'prop-types';
import { Box, Stack, Modal, IconButton, Button, TextField, Divider } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Reply from "./Reply";
import { getBoard } from "api/axiosGet";
import { useQuery } from "@tanstack/react-query";
import './board.css';
import {
  Card, CardHeader, Typography, Avatar,
} from '@mui/material';
import TimeAgo from "timeago-react";
import { UserContext } from "api/LocalStorage";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import * as timeago from 'timeago.js';
import ko from 'timeago.js/lib/lang/ko';

const BoardDetail = forwardRef(({ bid, uid, index, handleClose, nickname, handleButtonLike, handleButtonLikeReply, handleButtonLikeReReply }, ref) => {

  timeago.register('ko', ko); // 한국어로 시간 표시 설정
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const { data: board, isLoading, isError } = useQuery({
    queryKey: ['board', bid, uid],
    queryFn: () => getBoard(bid, uid),
  });
  const navigate = useNavigate();

  const handleCloseDialog = () => {
    handleClose();
  };

  const handleUpdate = () => {
    navigate("/home/Update")
    sessionStorage.setItem("bid", bid);
  }

  const { activeUser } = useContext(UserContext);
  const handleMyPage = (uid) => {
    navigate("/mypage", { state: { uid: uid } });
  }
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }

  const image = board?.image ? board.image.split(',') : null;

  return (
    <Box ref={ref} sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
        <Carousel
          indicators={false}
          animation="slide"
          autoPlay={false}
          sx={{ maxWidth: '100%', height: '100%' }}
        >
          {image && image.map((image, index) => (
            <Box
              key={index}
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', }}
              onClick={handleOpen} // 클릭 시 모달 열기
            >
              <img
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
                src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${image}`}
                alt={`Image ${index + 1}`}
              />
            </Box>
          ))}
        </Carousel>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', paddingLeft: 2, maxHeight: '100vh', overflowY: 'auto' }}>
        <CardHeader
          avatar={
            <Avatar onClick={() => handleMyPage(board.uid)}
              sx={{ bgcolor: 'red'[500], cursor: 'pointer' }}
              aria-label="recipe"
            >
              <div
                style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '50%',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundImage: `url(https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${board.profile})`
                }} />
            </Avatar>
          }
          title={<Typography variant="subtitle3" sx={{ fontSize: "15px", color: 'purple', cursor: 'pointer' }} onClick={() => handleMyPage(board.uid)}>{board.nickname}</Typography>}
          subheader={board.title}
        />
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
          {board.bContents}
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ marginTop: 5 }}>
          {<TimeAgo datetime={board.modTime} locale='ko' />}
        </Typography>
        <Divider sx={{ marginY: 2 }} />
        <Box sx={{ flexGrow: 0, overflowY: 'auto', maxHeight: '47vh' }}> {/* 댓글 목록에 오버스크롤 적용 */}
          <Reply bid={bid} uid={uid} index={index} nickname={nickname} handleButtonLike={handleButtonLike} handleButtonLikeReReply={handleButtonLikeReReply} handleButtonLikeReply={handleButtonLikeReply} handleMyPage={handleMyPage} />
        </Box>
      </Box>

      {/* 모달 부분 */}
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70vw', // 모달 창의 너비 조정
            height: '70vh', // 모달 창의 높이 조정
            bgcolor: 'background.paper',
            boxShadow: 24,
            overflow: 'hidden', // 내부 여백을 줄이기 위해 overflow를 hidden으로 설정
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Carousel
            indicators={false}
            animation="slide"
            autoPlay={false}
            sx={{
              width: '100%',
              height: '100%',
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
                }}
              >
                <img
                  style={{
                    objectFit: 'cover', // 모달 창에서도 동일한 크기로 설정
                  }}
                  src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${image}`}
                  alt={`Image ${index + 1}`}
                />
              </Box>
            ))}
          </Carousel>
          <IconButton
            sx={{ position: 'absolute', top: 10, right: 10 }}
            onClick={handleCloseModal}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Modal>
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
