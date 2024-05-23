import React, { forwardRef, useEffect } from "react";
import PropTypes from 'prop-types';
import { Box, Stack } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Reply from "./Reply";
import { getBoard } from "api/axiosGet";
import { useQuery } from "@tanstack/react-query";
import './board.css';

const BoardDetail = forwardRef(({ bid, uid, handleClose, nickname, handleButtonLike }, ref) => {
  // useQuery는 항상 실행되어야 합니다.
  const { data: board, isLoading, isError, refetch } = useQuery({
    queryKey: ['board', bid, uid],
    queryFn: () => getBoard(bid, uid),
  });

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }

  // board 데이터가 있을 때만 image를 설정합니다.
  const image = board?.image ? board.image.split(',') : null;
  console.log("이미지", image);

  return (
    <Box className="board_modal" ref={ref}>
      <Stack direction="row" justifyContent="space-between" sx={{ height: '100%' }}>
        <Stack direction="column" sx={{ flex: 1, height: '100%' }}>
          <Carousel>
            {image && image.map((image, index) => (
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

        {/* Reply 컴포넌트는 항상 렌더링 */}
        <Reply bid={bid} uid={uid} nickname={nickname} handleButtonLike={handleButtonLike} />
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
