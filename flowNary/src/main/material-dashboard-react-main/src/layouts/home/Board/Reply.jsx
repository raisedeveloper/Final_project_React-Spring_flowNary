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
import { useAddReply, useGetUserNicknameLS } from 'api/customHook.jsx';
import { useGetBoard, useGetBoardByUrl, useGetBoardList, useGetReplyList } from './BoardJS.js';
import { useQuery } from '@tanstack/react-query';
import { getBoard, getBoardList, getBoardUrl, getReplyList } from 'api/axiosGet.js';
import BoardDetail from './BoardDetail.jsx';
import MDBox from 'components/MDBox/index.js';
import './board.css';


export default function Reply(props) {
  const bid = props.bid;
  const nickname = props.nickname;
  const [text, setText] = useState('');
  const uid = props.uid;
  const handleButtonLike = props.handleButtonLike;
  const [expandedContents, setExpandedContents] = useState({});

  const replyList = useQuery({
    queryKey: ['board', props.bid],
    queryFn: () => getReplyList(props.bid, 0, 20),
  });

  const addReply = useAddReply();
  const addReplyForm = (sendData) => {
    addReply(sendData);
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

  return (
    <>
      {/* 댓글 내용 List */}
      <MDBox sx={{ display: { xs: 'none', lg: 'flex' }, flexDirection: 'column', height: '100%' }}>
        <Stack direction="column" sx={{ padding: 1, overflowY: 'auto' }}>
          <Stack direction="column" alignItems="center" sx={{ width: "100%", overflowX: 'hidden' }}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', border: 0, paddingRight: 0 }}>
              <Paper>
                <ListItem alignItems="flex-start" sx={{ marginTop: 0.5, marginLeft: 0.5 }}>
                  <Avatar
                    src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/`}
                  />

                  <ListItemText sx={{ paddingLeft: 1 }}
                    primary="닉네임"
                    secondary={
                      <React.Fragment sx={{ overflowWrap: 'break-word', }}>
                        {/* {data.rContents != null && (expandedContents[index] ? data.rContents : data.rContents.slice(0, 28))}
                      {data.rContents != null && data.rContents.length > 30 && !expandedContents[index] && (
                        <button className='replyOpen' onClick={() => toggleExpand(index)}>...더보기</button>
                      )}
                      {expandedContents[index] && (
                        <button className='replyClose' onClick={() => toggleExpand(index)}>접기</button>
                      )} */}
                        이곳은 글쓴이 bContents 영역입니다
                      </React.Fragment>
                    }
                  >
                  </ListItemText>
                  <Button size="small" sx={{ position: 'absolute', marginLeft: 13 }}>팔로우</Button>
                  <Button sx={{ color: 'grey', alignSelf: 'center', marginLeft: 'auto', paddingTop: 4 }}>
                    <FavoriteBorderIcon />
                  </Button>

                  {/* <Button sx={{ color: 'grey', display: 'flex', alignItems: 'center' }}><FavoriteBorderIcon /></Button> */}
                </ListItem>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: 'grey', fontSize: '14px', paddingLeft: 50, }} >방금 전ㆍ</span>
                  <Button sx={{ color: 'grey', padding: 0 }}>좋아요 0개</Button>
                  <Button sx={{ color: 'grey', padding: 0 }}>답글 달기</Button>
                </div>
                {/* <ReReplyList params={data.rid}/> */}
              </Paper>
            </List>
            {replyList.data && replyList.data.map((data, index) => (
              <List key={index} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', paddingRight: 0 }}>
                <Paper sx={{ border: 'none' }}>
                  <ListItem alignItems="flex-start" sx={{ marginTop: 0.5, marginLeft: 0.5 }}>
                    <Avatar
                      src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${data.profile}`}
                    />

                    <ListItemText sx={{ paddingLeft: 1 }}
                      primary={data.nickname}
                      secondary={
                        <React.Fragment sx={{ overflowWrap: 'break-word', }}>
                          {data.rContents != null && (expandedContents[index] ? data.rContents : data.rContents.slice(0, 28))}
                          {data.rContents != null && data.rContents.length > 30 && !expandedContents[index] && (
                            <button className='replyOpen' onClick={() => toggleExpand(index)}>...더보기</button>
                          )}
                          {expandedContents[index] && (
                            <button className='replyClose' onClick={() => toggleExpand(index)}>접기</button>
                          )}
                        </React.Fragment>
                      }
                    >
                    </ListItemText>

                    <Button sx={{ color: 'grey', alignSelf: 'center', marginLeft: 'auto', paddingTop: 4 }}>
                      <FavoriteBorderIcon />
                    </Button>

                    {/* <Button sx={{ color: 'grey', display: 'flex', alignItems: 'center' }}><FavoriteBorderIcon /></Button> */}
                  </ListItem>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: 'grey', fontSize: '14px', paddingLeft: 50, }} ><TimeAgo datetime={timestamp} /></span>
                    <Button sx={{ color: 'grey', padding: 0 }}>좋아요 0개</Button>
                    <Button sx={{ color: 'grey', padding: 0 }}>답글 달기</Button>
                  </div>
                  {/* <ReReplyList params={data.rid}/> */}
                </Paper>
              </List>
            ))}
          </Stack>
        </Stack>
        <MDBox>
          <Button sx={{ padding: 0, width: 0 }} onClick={() => handleButtonLike(board.data.bid, board.data.uid)}>
            <FavoriteIcon />
          </Button>
          <Button sx={{ padding: 0, width: 0 }}>
            <ShareIcon />
          </Button>
          <Button sx={{ padding: 0, width: 0 }}>
            <BookmarkIcon />
          </Button>
          <MDBox className='board_div_style_1' sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <input
              value={text}
              onChange={setText}
              // onEnter={handleOnEnter}
              placeholder="입력.."
              // shouldReturn
              //fontSize={15}
              language='kr'
              style={{
                padding: '10px 15px',
                fontSize: '1rem',
                borderRadius: '5px',
                border: '1px solid #ccc',
                width: '80%',
                boxSizing: 'border-box',
              }}
            />
            <Button onClick={handleFormSubmit} sx={{ padding: 0 }}>게시</Button>
          </MDBox>
        </MDBox>
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