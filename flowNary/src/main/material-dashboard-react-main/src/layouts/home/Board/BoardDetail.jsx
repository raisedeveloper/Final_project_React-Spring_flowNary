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


export default function BoardDetail(props) {
const BoardDetail = forwardRef(({ bid, uid, handleClose, nickname, handleButtonLike}, ref) => {
  const board = useQuery({
    queryKey: ['board', bid, uid],
    queryFn: () => getBoard(1, 1),
  });

  if (board.isLoading) {
    return <div>로딩 중...</div>;
  }

  const image = board.data.image != null ? board.data.image.split(',') : null;
  console.log("이미지" + image);

  return (
    <Box className="board_modal">
      <Stack direction="row" justifyContent="space-between" sx={{ height: '100%' }}>
        <Stack direction="column" sx={{ flex: 1, height: '100%' }}>
          <Carousel>
              {image &&
                image.map((image, index) => (
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
                    src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${image}`}
                    alt={`Image ${index + 1}`}
                  />
                ))}
      </Carousel>
        </Stack>

        {/* Reply 컴포넌트 추가 */}
        <Reply bid={49} uid={1} nickname={"james"} />

        {/* 닫기 버튼 */}
      </Stack>
    </Box>
  );
};

BoardDetail.propTypes = {
  bid: PropTypes.number.isRequired,
  uid: PropTypes.number.isRequired,
  handleClose: PropTypes.func.isRequired,
  nickname: PropTypes.string.isRequired,
  handleButtonLike: PropTypes.func.isRequired,
};

