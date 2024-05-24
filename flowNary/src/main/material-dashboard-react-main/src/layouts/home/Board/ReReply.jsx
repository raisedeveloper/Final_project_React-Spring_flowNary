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



import Carousel from 'react-material-ui-carousel'
import { useLocation, useNavigate } from "react-router-dom";
import { useAddReReply, useGetUserNicknameLS } from 'api/customHook.jsx';
import { useGetBoard, useGetBoardByUrl, useGetBoardList, useGetReplyList } from './BoardJS.js';
import { useQuery } from '@tanstack/react-query';
import { getBoard, getBoardList, getBoardUrl, getReplyList } from 'api/axiosGet.js';
import BoardDetail from './BoardDetail.jsx';
import MDBox from 'components/MDBox/index.js';
import './board.css';
import { position } from 'stylis';
import MDTypography from 'components/MDTypography/index.js';
import { getReReplyList } from 'api/axiosGet.js';
import { deleteReReply } from 'api/axiosPost.js';

export default function ReReply(props) {
  const rid = props.rid;
  const nickname = props.nickname;
  const [text, setText] = useState('');
  const uid = props.uid;
  const handleButtonLike = props.handleButtonLike;
  const [expandedContents, setExpandedContents] = useState({});

  const ReReplyList = useQuery({
    queryKey: ['reply', props.rid],
    queryFn: () => getReReplyList(props.rid),
  });

  const addReReply = useAddReReply();
  const addReReplyForm = (sendData) => {
    addReReply(sendData);
  }

  if (ReReplyList.isLoading) {
    return (
      <div>로딩 중...</div>
    )
  }

  const handleFormSubmit2 = (e) => {
    e.preventDefault();

    var sendData = JSON.stringify({
      rid: props.rid,
      uid: props.uid,
      rrContents: text,
      nickname: props.nickname,
    })

    addReReply(sendData);

    setText('');
  };

  const handleDeleteButton = (rrid) => {
    console.log(rrid);
    deleteReReply(rrid);
  }


  const handleOnEnter = (text) => {
    console.log('enter', text);
  }

  const toggleExpand = (index) => {
    setExpandedContents((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      {/* 댓글 내용 List */}
      <MDBox sx={{ display: { xs: 'none', lg: 'flex' }, flexDirection: 'column', height: '100%' }}>
        <Stack direction="column" sx={{ padding: 1, overflowY: 'auto' }}>
          <Stack direction="column" alignItems="center" sx={{ width: "100%", overflowX: 'hidden' }}>
            {ReReplyList.data && ReReplyList.data.map((data, index) => (
              <List key={index} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', paddingRight: 0, border: '1px solid black'}}>
               {/* List랑 paper 영역 비슷함 */}
                <Paper sx={{ border: 'none',}}>
                  <ListItem alignItems="flex-start" sx={{ marginTop: 0.5, marginLeft: 0.5 }}>
                    <Avatar
                      src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${data.profile}`}
                    />
                    <ListItemText sx={{ paddingLeft: 1 }}
                      primary={data.nickname}
                      secondary={
                        <Typography variant="body1" color="red" sx={{ overflowWrap: 'break-word', }}>
                          {data.rrContents != null && (expandedContents[index] ? data.rrContents : data.rrContents.slice(0, 28))}
                          {data.rrContents != null && data.rrContents.length > 30 && !expandedContents[index] && (
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
                    <span style={{ color: 'grey', fontSize: '14px', paddingLeft: 50, }} >  <TimeAgo datetime={data.modTime} locale='ko' trim />ㆍ</span>
                    <Button sx={{ color: 'grey', padding: 0 }}>좋아요 0개</Button>
                    <Button sx={{ color: 'grey', padding: 0 }}>답글 달기</Button>
                    <Button onClick={() => handleDeleteButton(data.rrid)}>삭제</Button>
                  </div>
                </Paper>
              </List>
            ))}
          </Stack>
        </Stack>
        {/* <MDBox>
          <MDBox className='board_div_style_1' sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' , border:'1px solid skyblue'}}>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="답글입력.."
              style={{
                padding: '10px 15px',
                fontSize: '1rem',
                borderRadius: '5px',
                border: '1px solid #ccc',
                width: '80%',
                boxSizing: 'border-box',
              }}
            />
            <Button onClick={handleFormSubmit2} sx={{ padding: 0 }}>게시</Button>
          </MDBox>
        </MDBox> */}
      </MDBox>
    </>
  );

}

ReReply.propTypes = {
  rid: PropTypes.number.isRequired,
  nickname: PropTypes.string.isRequired,
  uid: PropTypes.number.isRequired,
  handleButtonLike: PropTypes.func.isRequired,
};