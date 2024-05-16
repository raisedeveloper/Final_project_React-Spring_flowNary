// 기본
import React, { useEffect, useState } from 'react'
import {
  Card, CardHeader, CardMedia, CardActions, CardContent, Avatar, Typography,
  ListItemAvatar, ListItem, List, Button, Box, Modal, Paper
} from '@mui/material';
import { red } from '@mui/material/colors';
import { Stack } from '@mui/system';

// 이모티콘

// 아이콘
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ClearIcon from '@mui/icons-material/Clear';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import { GetWithExpiry, SetWithExpiry } from "api/LocalStorage.js";
import axios from 'axios';

// css 연결

import Carousel from 'react-material-ui-carousel'
import { useLocation, useNavigate } from "react-router-dom";
import { useAddLike, useGetUserNicknameLS } from 'api/customHook.jsx';
import { useGetBoard, useGetBoardByUrl, useGetBoardList, useGetReplyList } from './BoardJS.js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getBoard, getBoardList, getBoardUrl, getReplyList } from 'api/axiosGet.js';
import BoardDetail from './BoardDetail.jsx';
import BoardUrl from './BoardUrl.jsx';
import { like } from 'api/axiosPost.js';

export default function Board() {
  const navigate = useNavigate();

  const uid = GetWithExpiry("uid");
  const email = GetWithExpiry("email");
  const profile = GetWithExpiry("profile");

  const [bid, setBid] = useState(0);
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);

  if (uid == -1) {
    navigate("/login");
  }
  const nickname = useGetUserNicknameLS();

  // 창 열고 닫기
  const handleOpen = (bid) => {
    setOpen(true);
    setBid(bid);
  }
  const handleClose = () => {
    setOpen(false);
    setBid(-1);
  };

  const location = useLocation();
  const path = location.pathname.split('/');
  const path2 = path[path.length - 1];

  /////////////////// useQuery로 BoardList 받기 ///////////////////
  const dataList = useQuery({y
    queryKey: ['boardList', uid],
    queryFn: () => getBoardList(10, uid),
  });

  const addLike = useAddLike();
  const addLikeForm = (sendData: string) => {
    addLike(sendData);
  }

  // 좋아요 버튼 누를 때 넘기기
  function handleButtonLike(bid, uid2) {
    var sendData = JSON.stringify({
      uid: uid,
      fuid: uid2,
      oid: bid,
    })

    addLikeForm(sendData);
  }

  if (dataList.isLoading) {
    return (<div>로딩 중...</div>)
  }
  
  return (
    <>
      {path2 && <BoardUrl boardpath={path2} uid={uid} nickname={nickname} handleOpen={handleOpen} />}
      {/* boardList */}
      {dataList.data && dataList.data.map((data) => (
        <Card key={data.bid} sx={{ width: "70%", marginTop: '30px', border: '1px solid lightgrey' }}>
          {/* Home 부분에서 게시글이 보이는 모습 */}
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${data.profile}`}
              </Avatar>
            }
            title={data.title}
            subheader={data.modTime}
          />
          <CardMedia component="img" height="194" image={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${data.image.split(',')[0]}`} alt="Paella dish" />
          <CardContent>
            <Typography component={'div'} variant="body2" color="text.secondary">
              {data.bContents}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            {/* 게시글 하단 버튼 - 좋아요 / 게시글 */}
            <Button onClick={() => handleButtonLike(data.bid, data.uid)}>
              <FavoriteIcon sx={data.liked ? {color: 'red'} : {color: 'blue'}} />{data.likeCount}
            </Button>
            <Button onClick={() => handleOpen(data.bid)}>
              <ChatBubbleOutlineIcon />{data.replyCount}
            </Button>
            <Button >
              <ShareIcon />
            </Button>
            <Button>
              <BookmarkIcon />
            </Button>
          </CardActions>
        </Card>
      ))}

      {/* 게시글 모달 */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <BoardDetail handleClose={handleClose} bid={bid} uid={uid}
        nickname={nickname} handleButtonLike={handleButtonLike} />
      </Modal>
    </>
  );

}