import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  Card, CardHeader, CardMedia, CardActions, CardContent, Avatar, Typography,
  ListItemAvatar, ListItem, List, Button, Box, Modal, Paper,
  ListItemText,
  Grid,
  IconButton,
  Link
} from '@mui/material';
import { red } from '@mui/material/colors';
import { Stack } from '@mui/system';
import PropTypes from 'prop-types';
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import ko from 'timeago.js/lib/lang/ko';
import { GetWithExpiry, SetWithExpiry } from "api/LocalStorage";
import axios from 'axios';
import ReReply from "./ReReply";
import Carousel from 'react-material-ui-carousel'
import { useLocation, useNavigate } from "react-router-dom";
import { useAddReply, useGetUserNicknameLS, useAddReReply } from 'api/customHook.jsx';
import { useGetBoard, useGetBoardByUrl, useGetBoardList, useGetReplyList } from './BoardJS.js';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBoard, getBoardList, getBoardUrl, getReplyList } from 'api/axiosGet.js';
import BoardDetail from './BoardDetail.jsx';
import MDBox from 'components/MDBox/index.js';
import './board.css';
import MDTypography from 'components/MDTypography/index.js';
import typography from 'assets/theme/base/typography';
import { UserContext } from 'api/LocalStorage';
import { useAddLike } from 'api/customHook';
import { wrong } from 'api/alert';
import { deleteConfirm } from 'api/alert';
import { deleteReply } from 'api/axiosPost';
import { getUser } from 'api/axiosGet';

// 아이콘
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

timeago.register('ko', ko);

export default function Reply(props) {
  const bid = props.bid;
  const nickname = props.nickname;
  const [text, setText] = useState('');
  const uid = props.uid;
  const index = props.index;
  const { activeUser } = useContext(UserContext);
  const handleButtonLike = props.handleButtonLike;
  const handleButtonLikeReply = props.handleButtonLikeReply;
  const handleButtonLikeReReply = props.handleButtonLikeReReply;
  const handleMyPage = props.handleMyPage;
  const queryClient = useQueryClient();

  const [expandedContents, setExpandedContents] = useState({});
  const [formChange, setFormChange] = useState({});
  const [showReReply, setShowReReply] = useState({});
  const [ridtext, setRidtext] = useState('');
  const [replyText, setReplyText] = useState('');
  const [formInputs, setFormInputs] = useState({});

  const user = useQuery({
    queryKey: ['boarduser', activeUser.uid],
    queryFn: () => getUser(activeUser.uid),
  });

  const board = useQuery({
    queryKey: ['board', bid, uid],
    queryFn: () => getBoard(bid, uid),
  });

  const replyList = useQuery({
    queryKey: ['reply', props.bid],
    queryFn: () => getReplyList(props.bid, 0, 20, activeUser.uid),
  });

  const addReply = useAddReply();
  const addReReply = useAddReReply();

  useEffect(() => {
    if (replyList.isLoading) {
      return () => { };
    }
  }, [replyList.isLoading]);

  const navigate = useNavigate();

  const handleFormSubmit = (e, text) => {
    e.preventDefault();
    if (text === '') {
      wrong('내용을 입력하세요');
      return;
    }
    const sendData = JSON.stringify({
      bid: props.bid,
      uid: props.uid,
      rContents: text,
      nickname: props.nickname,
    });

    addReply(sendData);

    setText('');
    setFormChange(false);
  };

  const handleFormSubmit2 = (e, text2) => {
    e.preventDefault();
    if (text2 === '') {
      wrong('내용을 입력하세요');
      return;
    }
    const sendData = JSON.stringify({
      rid: ridtext,
      uid: props.uid,
      rrContents: formInputs[ridtext],
      nickname: props.nickname,
    });

    addReReply(sendData);

    setFormInputs((prev) => ({
      ...prev,
      [ridtext]: '',
    }));
  };

  const handleOnEnter = (text) => {
    console.log('enter', text);
  };

  const toggleExpand = (index) => {
    setExpandedContents((prev) => ({
      ...prev,
      [index]: !
        prev[index],
    }));
  };

  const handleButtonClick = (rid) => {
    setRidtext(rid);
    setFormChange((prev) => ({
      ...prev,
      [rid]: !prev[rid],
    }));
    setFormInputs((prev) => ({
      ...prev,
      [rid]: '',
    }));
    setShowReReply((prev) => ({
      ...prev,
      [rid]: prev[rid],
    }));
  };

  const handleMoreReply = (rid) => {
    setShowReReply((prev) => ({
      ...prev,
      [rid]: !prev[rid],
    }));
  };

  const handleDelete = async (rid) => {
    const confirm = await deleteConfirm();
    if (confirm) {
      await deleteReply(rid);
      queryClient.invalidateQueries(['reply', uid]);
    }
  };

  const handleSearchs = (tag) => {
    sessionStorage.setItem("search", tag);
    sessionStorage.setItem("tag", tag);
    if (location.pathname !== 'search') {
      navigate('/search');
    }
  };

  return (
    <>
      {/* 댓글 내용 List */}
      <MDBox sx={{ display: { xs: 'none', lg: 'flex' }, flexDirection: 'column', height: '100%' }}>
        <Stack direction="column" sx={{ padding: 1, overflowY: 'auto' }}>
        </Stack>
        <MDBox>
          <MDBox sx={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between' }}>
            <IconButton sx={{ ml: 5, width: 0, fontSize: '2rem' }} onClick={() => handleButtonLike(board.data.bid, board.data.uid)}>
              {board.data.liked ?
                <FavoriteIcon sx={{ color: 'lightcoral' }} /> : <FavoriteBorderIcon sx={{ color: 'lightcoral' }} />}
              {board.data.likeCount}
            </IconButton>
            {board ? (
              board.data.hashTag && board.data.hashTag.includes(",") ? (
                board.data.hashTag.split(",").map((tag, index) => {
                  const trimmedTag = tag.trim(); // 좌우 공백 제거
                  return (
                    <span key={index}>
                      {index > 0 && null}
                      <Button
                        key={index}
                        variant="outlined"
                        style={{ color: 'lightcoral' }}
                        color='warning'
                        onClick={() => handleSearchs(trimmedTag)}
                      >
                        #{trimmedTag}
                      </Button>
                    </span>
                  );
                })
              ) : (
                <Button
                  variant="outlined"
                  style={{ color: 'lightcoral' }}
                  color='warning'
                  onClick={() =>
                    handleSearch(board.data.hashTag)
                  }
                >
                  #{board.data.hashTag}
                </Button>
              )
            ) : null}
            <Typography sx={{ fontSize: 'small', mr: 2, color: 'coral' }}>
              {replyList && replyList.data && replyList.data[index] ? '댓글 수 ' + replyList.data[index].replyCount + '개' : ''}
            </Typography>
          </MDBox>
          <MDBox sx={{ p: 2, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            {user && user.data && <Avatar
              sx={{ bgcolor: 'red'[500] }}
              aria-label="recipe"
              src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${user.data.profile}`}
            />}
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="입력..."
              className="custom-input"
            />
            <Button onClick={(e) => handleFormSubmit(e, text)} sx={{ padding: 0 }} style={{ color: 'coral' }}>게시</Button>
          </MDBox>
        </MDBox>

        {/* 댓글표시 영역 */}
        <Stack direction="column" sx={{ width: "100%", overflowX: 'hidden', p: 3 }}>
          {replyList && replyList.data && replyList.data.map((data, index) => (
            <List key={index} sx={{ width: '100%', bgcolor: 'background.paper', paddingRight: 0 }}>
              {/* List랑 paper 영역 비슷함 */}
              <Paper sx={{ border: 'none', }}>
                <ListItem alignItems="flex-start" sx={{ marginTop: 0.5, marginLeft: 0.5 }}>
                  <Avatar onClick={() => handleMyPage(data.uid)} sx={{ cursor: 'pointer' }}
                    src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${data.profile}`}
                  />
                  <ListItemText sx={{ paddingLeft: 1 }}
                    primary={<Typography variant="subtitle3" sx={{ fontSize: "15px", color: 'purple', cursor: 'pointer' }} onClick={() => handleMyPage(data.uid)}>{data.nickname}</Typography>}
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


                </ListItem>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: 'grey', fontSize: '14px', paddingLeft: 50, }} >  <TimeAgo datetime={data.modTime} locale='ko' />ㆍ</span>
                  <Button sx={{ color: 'lightcoral', padding: 0 }} onClick={() => handleButtonLikeReply(data.rid, data.uid)}>좋아요 {data.likeCount}개  {data.liked ?
                    <FavoriteIcon sx={{ color: 'lightcoral' }} /> : <FavoriteBorderIcon sx={{ color: 'lightcoral' }} />}</Button>

                  {formChange[data.rid] ?
                    <MDBox className='board_div_style_1' sx={{ display: 'flex', justifyContent: 'space-between', width: '50%' }}>
                      <input
                        value={formInputs[data.rid] || ''}
                        onChange={(e) => {
                          setFormInputs((prev) => ({
                            ...prev,
                            [data.rid]: e.target.value,
                          }));
                        }}
                        placeholder="댓글입력.."
                        className="custom-input"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <Button onClick={(e) => { handleFormSubmit2(e, formInputs[data.rid]); formChange[data.rid] = false; }} sx={{ color: 'lightcoral', padding: 0 }}>게시</Button>
                      <Button onClick={() => handleButtonClick(data.rid)} sx={{ color: 'lightcoral', padding: 0 }}>취소</Button>
                    </MDBox>
                    :
                    <>
                      <Button onClick={() => handleButtonClick(data.rid)} sx={{ color: 'lightcoral', padding: 0 }}>답글</Button>
                      {data.uid === activeUser.uid && <Button onClick={() => handleDelete(data.rid)} sx={{ color: 'lightcoral', padding: 0 }}>삭제</Button>}
                    </>
                  }

                </div>
                <Button onClick={() => handleMoreReply(data.rid)} sx={{ marginLeft: 3, paddingTop: 0 }} style={{ color: 'lightcoral' }}>
                  {data.ReReplyCount > 0 && (
                    <>
                      <KeyboardArrowDownIcon />
                      {`${data.ReReplyCount}개의 댓글 보기`}
                    </>
                  )}
                </Button>
                {showReReply[data.rid] && (
                  <ReReply rid={data.rid} uid={uid} nickname={nickname} handleButtonLikeReReply={handleButtonLikeReReply} handleMyPage={handleMyPage} />
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
  bid: PropTypes.number,
  nickname: PropTypes.string,
  uid: PropTypes.number,
  index: PropTypes.number,
  handleButtonLike: PropTypes.func,
  handleButtonLikeReply: PropTypes.func,
  handleButtonLikeReReply: PropTypes.func,
  handleMyPage: PropTypes.func,
};