// 기본
import React, { useEffect, useState } from 'react'
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

// css 연결
import './board.css';

import Carousel from 'react-material-ui-carousel'
import { useLocation, useNavigate } from "react-router-dom";
import { useGetUserNicknameLS } from '../../api/customHook.jsx';
import { useGetBoard, useGetBoardByUrl, useGetBoardList, useGetReplyList } from './BoardJS.js';

export default function Board() {
  const navigate = useNavigate();

  const uid = parseInt(GetWithExpiry("uid"));
  const email = GetWithExpiry("email");
  const profile = GetWithExpiry("profile");

  const uid2 = (uid == null || isNaN(uid)) ? -1 : uid;
  const [bid, setBid] = useState(0);
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);

  const board = useGetBoard(bid, open, update, uid2);

  // uid가 로컬스토리지에 없으면 로그인 창으로 이동
  if (uid == null || isNaN(uid)) {
    console.log("email" + email);
    axios.get('http://localhost:8090/user/getUserByEmail', {
      params: {
        email: email
      }
    }).then(res => {
      const uidFromResponse = res.data.id; // 응답 객체에서 uid를 가져옵니다.
      SetWithExpiry("uid", uidFromResponse, 180);
      console.log(res.data);
    }).catch(error => {
      console.error("사용자 조회 중 오류 발생:", error);
    });

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
  const urlBoard = useGetBoardByUrl(path2, uid2);

  const replyList = useGetReplyList(bid, open, update, 10);
  const dataList = useGetBoardList(10, update, uid2);

  useEffect(() => {
    setUpdate(false);
  }, [open, update]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    var sendData = JSON.stringify({
      bid: bid,
      uid: uid,
      rContents: text,
      nickname: nickname,
    })

    axios({
      method: "POST",
      url: 'http://localhost:8090/board/reply',
      data: sendData,
      headers: { 'Content-Type': 'application/json' }
    }).catch(error => console.log(error));

    setText('');
    setUpdate(true);
  };

  const ReReplyFormSubmit = (e) => {
    e.preventDefault();
    var sendData = JSON.stringify({
      rid: replyList.rid,
      uid: uid,
      rrContents: text,
      nickname: nickname,
    })

    axios({
      method: "POST",
      url: 'http://localhost:8090/board/re_Reply',
      data: sendData,
      headers: { 'Content-Type': 'application/json' }
    }).catch(error => console.log(error));

    setText('');
    setUpdate(true);
  }

  // 댓글 입력창 구현 - 이모티콘
  function handleOnEnter(text) { console.log('enter', text); }

  function handleButtonLike(bid, uid2) {

    var sendData = JSON.stringify({
      uid: uid,
      fuid: uid2,
      oid: bid,
    })

    axios({
      method: "POST",
      url: 'http://localhost:8090/board/like',
      data: sendData,
      headers: { 'Content-Type': 'application/json' }
    })
      .catch(error => console.log(error));
    setUpdate(true);

  }
  //더보기 구현
  const [expandedContents, setExpandedContents] = useState({});
  const toggleExpand = (index) => {
    setExpandedContents((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  
  return (
    <>
      {!urlBoard.image && path2 && <div>
        url에 해당하는 글이 없습니다!
      </div>}
      {urlBoard.image && path2 &&
        <Card sx={{ width: "70%", marginTop: '30px', border: '1px solid lightgrey' }}>
          {/* Home 부분에서 게시글이 보이는 모습 */}
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"
                src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${urlBoard.profile}`}
              />
            }
            title={urlBoard.title}
            subheader={urlBoard.modTime}
          />
          <CardMedia component="img" height="194" image={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${urlBoard.image[0]}`} alt="Paella dish" />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {urlBoard.bContents}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            {/* 게시글 하단 버튼 - 좋아요 / 게시글 */}
            <Button >
              <FavoriteIcon className="customHeartBtn" sx={urlBoard.liked ? {color: 'red'} : {color: 'blue'} }/>{urlBoard.likeCount}
            </Button>
            <Button onClick={() => handleOpen(urlBoard.bid)}>
              <ChatBubbleOutlineIcon />{urlBoard.replyCount}
            </Button>
            <Button >
              <ShareIcon />
            </Button>
            <Button>
              <BookmarkIcon />
            </Button>
          </CardActions>
        </Card>
      }
      {/* boardList */}
      {dataList.map((data) => (
        <Card key={data.bid} sx={{ width: "70%", marginTop: '30px', border: '1px solid lightgrey' }}>
          {/* Home 부분에서 게시글이 보이는 모습 */}
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"
                src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${data.profile}`}/>
            }
            title={data.nickname}
            subheader={data.modTime}
          />
           {/* <Typography variant="body1" color="text.secondary">
              {data.title}
            </Typography> */}
          <CardMedia component="img" sx={{ height: '280px', width: '100%', objectFit: 'contain' }}
          image={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${data.image[0]}`} />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
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
        <Box className='board_modal'>
          <Stack direction="row" justifyContent="space-between" sx={{ height: "100%" }}>
            <Stack direction="column" sx={{ flex: 1.3, height: "100%", }} >
              {/* 게시글 내용 */}
              <Card sx={{ height: "100vh", padding: 3 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"
                      src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${board.profile}`}
                    />
                  }
                  title={board.title}
                  subheader={board.modTime}
                />
                <Carousel>
                  {board.image && board.image.map((image, index) => (
                    <CardMedia
                      key={index}
                      component="img"
                      sx={{
                        width: '100%',
                        '@media (min-width: 500px)': { // 화면이 768px 이상인 경우
                          maxHeight: '100px',
                          objectFit: 'contain', // 이미지 높이를 300px로 고정
                        },
                        '@media (min-width: 768px)': { // 화면이 768px 이상인 경우
                          maxHeight: '100px',
                          objectFit: 'contain', // 이미지 높이를 300px로 고정
                        },
                        '@media (min-width: 1024px)': { // 화면이 1024px 이상인 경우
                          maxHeight: '250px',
                          objectFit: 'contain', // 이미지 높이를 400px로 고정
                        },

                        // 필요한 만큼 다른 미디어 쿼리를 추가할 수 있습니다.
                      }}

                      image={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${image}`}
                      alt={`Image ${index + 1}`}
                    />
                  ))}
                </Carousel>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '62%', overflowY: 'auto' }}>
                  <Stack direction="row" spacing={1} padding={'10px 0 25px 0'}>
                    <Button sx={{ padding: 0, width: 0 }} onClick={() => handleButtonLike(board.bid, board.uid)}>
                      <FavoriteIcon sx={board.liked ? {color: 'red'} : {color: 'blue'}} />{board.likeCount}
                    </Button>
                    <Button sx={{ padding: 0, width: 0 }}>
                      <ShareIcon />
                    </Button>
                    <Button sx={{ padding: 0, width: 0 }}>
                      <BookmarkIcon />
                    </Button>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <Typography variant="body2" color="text.secondary" >
                      {board.bContents}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>

            {/* 댓글 내용 List */}
            <Box sx={{ width: '40%', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Stack direction="column" sx={{ flex: '1.4', padding: 1, overflowY: 'auto' }}>
                <Stack direction="column" alignItems="center" sx={{ width: "100%", overflowX: 'hidden' }}>
                  {replyList.map((data, index) => (
                    <List key={index} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', paddingRight: 3 }}>
                      <Paper>
                      <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
                        <ListItemAvatar>
                          <Avatar
                            src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${data.profile}`}
                          />
                        </ListItemAvatar>
                        <Typography>
                          {data.nickname}
                        </Typography>
                      </ListItem>
                      <Typography variant="body2" color="text.secondary" sx={{ padding: 2, overflowWrap: 'break-word', }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                              {expandedContents[index] ? data.rContents : data.rContents.slice(0, 28)}
                              {data.rContents.length > 30 && !expandedContents[index] && (

                                <button className='replyOpen' onClick={() => toggleExpand(index)}>...더보기</button>

                              )}
                              {expandedContents[index] && (
                                <button className='replyClose' onClick={() => toggleExpand(index)}>접기</button>
                              )}
                            </div>
                            <div>
                              <Button sx={{ color: 'grey' }}><FavoriteBorderIcon /></Button>
                            </div>
                          </div>
                          <br />
                          {/* <ReReplyList params={data.rid}/> */}
                          <Button sx={{ color: 'grey' }}>좋아요 0개</Button>
                          <Button sx={{ color: 'grey' }}>답글 달기</Button>
                      </Typography>
                      </Paper>
                    </List>
                  ))}
                </Stack>
              </Stack>

              <Box className='board_div_style_1' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <InputEmoji
                    value={text}
                    onChange={setText}
                    onEnter={handleOnEnter}
                    placeholder="입력.."
                    shouldReturn
                    fontSize={15}
                    language='kr'
                    sx={{ flex: 1 }} // InputEmoji의 크기를 조절
                  />
                  <Button onClick={handleFormSubmit}>게시</Button>
                </Box>
              </Box>
            </Box>


            {/* 닫기 버튼 */}
            <div className='board_div_style_2'>
              <ClearIcon onClick={handleClose} sx={{ cursor: 'pointer', fontSize: '26px', backgroundColor: 'rgb(162, 152, 182)', borderRadius: '100%', margin: '3px' }} />
            </div>
          </Stack>
        </Box>
      </Modal >

    </>
  );

}