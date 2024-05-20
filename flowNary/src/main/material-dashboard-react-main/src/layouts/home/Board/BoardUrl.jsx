// 기본
import React, { useEffect, useMemo, useState } from 'react'
import {
  Card, CardHeader, CardMedia, CardActions, CardContent, Avatar, Typography,
  ListItemAvatar, ListItem, List, Button, Box, Modal, Paper
} from '@mui/material';
import { red } from '@mui/material/colors';
import { Stack } from '@mui/system';

// 이모티콘
import InputEmoji from 'react-input-emoji'

// 아이콘
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ClearIcon from '@mui/icons-material/Clear';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import { GetWithExpiry, SetWithExpiry } from "../../api/LocalStorage.js";
import axios from 'axios';



import Carousel from 'react-material-ui-carousel'
import { useLocation, useNavigate } from "react-router-dom";
import { useGetUserNicknameLS } from 'api/customHook.jsx';
import { useGetBoard, useGetBoardByUrl, useGetBoardList, useGetReplyList } from './BoardJS.js';
import { useQuery } from '@tanstack/react-query';
import { getBoard, getBoardList, getBoardUrl, getReplyList } from '../../api/axiosGet.js';
import BoardDetail from './BoardDetail.jsx';

export default function BoardUrl(props) {
  const url = props.boardpath;

  const urlBoard = useQuery({
    queryKey: ['board', url],
    queryFn: () => getBoardUrl(url, props.uid),
  });

  if (urlBoard.isLoading) {
    return (
      <div>로딩 중...</div>
    )
  }
  console.log(urlBoard.data.image);

  const images = urlBoard.data.image != null ? urlBoard.data.image.split(',') : null;

  return (
    <>
      {urlBoard.data.image ? (
        <Card sx={{ width: "70%", marginTop: '30px', border: '1px solid lightgrey' }}>

          {/* Home 부분에서 게시글이 보이는 모습 */}
          <CardHeader
            avatar={
              <Avatar
                sx={{ 
                  bgcolor: red[500], 
                  width:'100px',

                }}
                aria-label="recipe"
                src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${urlBoard.profile}`}
              />
            }
            title={urlBoard.data.title}
            subheader={urlBoard.data.modTime}
          />
          <CardMedia component="img" height="194" image={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${images[0]}`} alt="Paella dish" />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {urlBoard.data.bContents}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            {/* 게시글 하단 버튼 - 좋아요 / 게시글 */}
            <Button >
              <FavoriteIcon className="customHeartBtn" sx={urlBoard.data.liked ? { color: 'red' } : { color: 'blue' }} />{urlBoard.data.likeCount}
            </Button>
            <Button onClick={() => props.handleOpen(urlBoard.data.bid)}>
              <ChatBubbleOutlineIcon />{urlBoard.data.replyCount}
            </Button>
            <Button >
              <ShareIcon />
            </Button>
            <Button>
              <BookmarkIcon />
            </Button>
          </CardActions>
        </Card>) : <div>
        url에 해당하는 글이 없습니다!
      </div>}
    </>
  );

}