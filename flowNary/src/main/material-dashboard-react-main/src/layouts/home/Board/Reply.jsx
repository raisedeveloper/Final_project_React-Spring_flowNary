// 기본
import React, { useEffect, useMemo, useState } from 'react'
import {
  Card, CardHeader, CardMedia, CardActions, CardContent, Avatar, Typography,
  ListItemAvatar, ListItem, List, Button, Box, Modal, Paper,
  ListItemText,
  Grid
} from '@mui/material';
import { red } from '@mui/material/colors';
import { Stack } from '@mui/system';
import PropTypes from 'prop-types';
import TimeAgo from 'timeago-react';


// 이모티콘
// 아이콘
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ClearIcon from '@mui/icons-material/Clear';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import { GetWithExpiry, SetWithExpiry } from "api/LocalStorage";
import axios from 'axios';

import ReReply from "./ReReply";

import Carousel from 'react-material-ui-carousel'
import { useLocation, useNavigate } from "react-router-dom";
import { useAddReply, useGetUserNicknameLS, useAddReReply } from 'api/customHook.jsx';
import { useGetBoard, useGetBoardByUrl, useGetBoardList, useGetReplyList } from './BoardJS.js';
import { useQuery } from '@tanstack/react-query';
import { getBoard, getBoardList, getBoardUrl, getReplyList } from 'api/axiosGet.js';
import BoardDetail from './BoardDetail.jsx';
import MDBox from 'components/MDBox/index.js';
import './board.css';
import MDTypography from 'components/MDTypography/index.js';
import { getUser } from 'api/axiosGet';
import { updateBookmark } from 'api/axiosPost';
import { useGetUser } from 'api/customHook';

export default function Reply(props) {
  const bid = props.bid;
  const nickname = props.nickname;
  const [text, setText] = useState('');
  const uid = parseInt(GetWithExpiry('uid'));
  const handleButtonLike = props.handleButtonLike;
  const [expandedContents, setExpandedContents] = useState({});
  // 입력폼,댓글폼 전환
  const [formChange, setFormChange] = useState({});
  // 대댓글 보여주기
  const [showReReply, setShowReReply] = useState({});
  // 대댓글에 대한 rid
  const [ridtext, setRidtext] = useState(0);

  const board = useQuery({
    queryKey: ['board', bid, uid],
    queryFn: () => getBoard(bid, uid),
  });

  const replyList = useQuery({
    queryKey: ['board', props.bid],
    queryFn: () => getReplyList(props.bid, 0, 20),
  });

  const user = useQuery({
    queryKey: ['user', uid],
    queryFn: () => useGetUser(uid),
  });

  const addReply = useAddReply();
  const addReplyForm = (sendData) => {
    addReply(sendData);
  }

  const addReReply = useAddReReply();
  const addReReplyForm = (sendData) => {
    addReReply(sendData);
  }

  if (replyList.isLoading) {
    return (
      <div>로딩 중...</div>
    )
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    var sendData = JSON.stringify({
      bid: props.bid,
      uid: props.uid,
      rContents: text,
      nickname: props.nickname,
    })

    addReply(sendData);

    setText('');
    setFormChange(false);
  };

  const handleFormSubmit2 = (e) => {
    e.preventDefault();

    var sendData = JSON.stringify({
      rid: ridtext,
      uid: props.uid,
      rrContents: formInputs[ridtext],
      nickname: props.nickname,
    })
    console.log(ridtext)

    addReReply(sendData);

    setFormInputs((prev) => ({
      ...prev,
      [ridtext]: '',
    }));
  };


  const handleOnEnter = (text) => {
    console.log('enter', text);
  }

  const toggleExpand = (index) => {
    setExpandedContents((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // 버튼 클릭 시 ReReply 컴포넌트의 가시성 토글
  const handleButtonClick = (rid) => {
    console.log(rid);
    setShowReReply((prev) => ({
      ...prev,
      [rid]: !prev[rid],
    }));
    setFormChange(true);
    setRidtext(rid);
  };

  
  return (
    <>
      {/* 댓글 내용 List */}
      <MDBox sx={{ display: { xs: 'none', lg: 'flex' }, flexDirection: 'column', height: '100%' }}>
        <Stack direction="column" sx={{ padding: 1, overflowY: 'auto' }}>
        </Stack>
        <MDBox>

          <MDBox>
            <Button sx={{ padding: 0, width: 0 }} onClick={() => handleButtonLike(board.data.bid, board.data.uid)}>
              <FavoriteIcon sx={board.data.liked ? { color: 'red' } : { color: 'blue' }} />
              {board.data.likeCount}
            </Button>
            <Button sx={{ padding: 0, width: 0 }}>
              <ShareIcon />
            </Button>
          </MDBox>

          {formChange ? (
            <MDBox className='board_div_style_1' sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', border: '1px solid skyblue' }}>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="댓글입력.."
                style={{
                  padding: '10px 15px',
                  fontSize: '0.85rem',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  width: '80%',
                  boxSizing: 'border-box',
                }}
              />
              <Button onClick={handleFormSubmit2} sx={{ padding: 0 }}>게시</Button>
            </MDBox>
          ) : (

            <MDBox className='board_div_style_1' sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', border: '1px solid skyblue' }}>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="입력..."
                style={{
                  padding: '10px 15px',
                  fontSize: '0.85rem',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              />
              <Button onClick={handleFormSubmit} sx={{ padding: 0 }}>게시</Button>
            </MDBox>

          )}
        </MDBox>

        {/* 댓글표시 영역 */}
        <Stack direction="column" sx={{ width: "100%", overflowX: 'hidden' }}>
          {replyList.data && replyList.data.map((data, index) => (
            <List key={index} sx={{ width: '100%', bgcolor: 'background.paper', paddingRight: 0 }}>
              {/* List랑 paper 영역 비슷함 */}
              <Paper sx={{ border: 'none', }}>
                <ListItem alignItems="flex-start" sx={{ marginTop: 0.15, marginLeft: 0.5 }}>
                  <Avatar
                    src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${data.profile}`}
                  />
                  <ListItemText
                    sx={{
                      paddingLeft: 1,
                      margin: "0px",

                    }}
                    primary={data.nickname}
                    secondary={
                      <Typography variant="body2" color="text.secondary" sx={{ overflowWrap: 'break-word', }}>
                        {data.rContents != null && (expandedContents[index] ? data.rContents : data.rContents.slice(0, 28))}
                        {data.rContents != null && data.rContents.length > 30 && !expandedContents[index] && (
                          <button className='replyOpen' onClick={() => toggleExpand(index)}>...더보기</button>
                        )}
                        {expandedContents[index] && (
                          <button className='replyClose' onClick={() => toggleExpand(index)}>접기</button>
                        )}
                      </Typography>
                    }
                  >
                  </ListItemText>

                  <Button sx={{ color: 'grey', alignSelf: 'center', marginLeft: 'auto', paddingTop: 4 }}>
                    <FavoriteBorderIcon />
                  </Button>

                  {/* <Button sx={{ color: 'grey', display: 'flex', alignItems: 'center' }}><FavoriteBorderIcon /></Button> */}
                </ListItem>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: 'grey', fontSize: '12px', paddingLeft: 50, }} >
                    <TimeAgo datetime={data.modTime} locale='ko' trim />ㆍ</span>
                  <Button sx={{ color: 'grey', padding: 0 }}>좋아요 0개</Button>
                  <Button onClick={() => handleButtonClick(data.rid)}>답글 쓰기</Button>

                </div>
                {showReReply[data.rid] && (
                  <ReReply rid={data.rid} uid={uid} nickname={nickname} handleButtonLike={handleButtonLike} />
                )}
              </Paper>
            </List>
          ))}
        </Stack>
      </MDBox>
    </>
  );

}

Reply.propTypes = {
  bid: PropTypes.number.isRequired,
  nickname: PropTypes.string.isRequired,
  uid: PropTypes.number.isRequired,
  handleButtonLike: PropTypes.func.isRequired,
};