// 기본
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Avatar, Box, Button, Chip, Divider, Grid, Paper, Stack, Typography } from "@mui/material";

// 아이콘
import ImageIcon from '@mui/icons-material/Image';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

// css 연결
import './search.css';
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function MySearchList() {
  
  const query = sessionStorage.getItem("search");
  const location = useLocation();
  
  const [isLoading, setIsLoading] = useState(false);
  const [field, setField] = useState('title');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');
  const [type, setType] = useState(1);
  const [count, setCount] = useState(12);
  const [page, setPage] = useState(0);
  const [research, setResearch] = useState(false);
  const [boardList, setBoardList] = useState([{
    bid: -1,
    uid: -1,
    title: '',
    bContents: '',
    modTime: null,
    viewCount: 0,
    likeCount: 0,
    replyCount: 0,
    image: '',
    shareUrl: '',
    nickname: '',
    hashTag: '',
    isDeleted: 0
  }]);
  const [is, setIs] = useState(false);

  useEffect(() => {
    if (query != null)
    {
      axios.get('http://localhost:8090/board/list', {
        params: {
          c: count,
          f: field,
          f2: field2,
          f3: field3,
          q: query,
          type: type,
        }
      }).then(res => {
        setBoardList(res.data);
        setResearch(true);
        if (res.data.length > 0)
        {
          setIs(true);
        }
        else
        {
          setIs(false);
        }
      })
      .catch(error => console.log(error));
    }
    else
    {
      setIs(false);
    }
  }, [query, page, research]);

  // 무한 스크롤

  const callback = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading)
    {
      setPage((prevpage) => prevpage + 1);
      setCount((prevcount) => prevcount + 3);
    }
  };

  useEffect(() => {
    const observer =new IntersectionObserver(callback, {
      rootMargin: '0px 0px 0px 0px',
      threshold: 0,
    })
    const observerTarget = document.getElementById("observe");

    if (observerTarget) {
      observer.observe(observerTarget);
    }
  }, []);

  const handleSearch = (i) => {
    if (i === 1)
    {
      setField('title');
      setField2('');
      setField3('');
      setType(1);
      setCount(12);
      setResearch(false);
    }
    else if (i === 2)
    {
      setField('bContents');
      setField2('');
      setField3('');
      setType(1);
      setCount(12);
      setResearch(false);
    }
    else if (i === 3)
    {
      setField('title');
      setField2('bContents');
      setField3('');
      setType(2);
      setCount(12);
      setResearch(false);
    }
    else if (i === 4)
    {
      setField('nickname');
      setField2('');
      setField3('');
      setType(1);
      setCount(12);
      setResearch(false);
    }
    else if (i === 5)
    {
      setField('title');
      setField2('bContents');
      setField3('nickname');
      setType(3);
      setCount(12);
      setResearch(false);
    }
  }
  
  return (
    <div>
      <Box sx={{ width: '100%', minHeight: '1000px' }}>
        <Grid container sx={{ padding: '20px' }}>
          <Grid item xs={0} lg={2}>
          </Grid>
          <Grid item xs={12} lg={8}>
            {/* 헤드라인 */}
            <Stack>
              <Stack sx={{ padding: '20px' }} fontWeight={'bold'}>
                <Typography variant="h4" fontWeight={'bold'}>
                  검색어: {query}
                </Typography>
              </Stack>
              <Stack direction={'row'}>
                <Button variant="outlined" sx={{marginRight: '10px'}} onClick={() => handleSearch(1)}>제목</Button>
                <Button variant="outlined" sx={{marginRight: '10px'}} onClick={() => handleSearch(2)}>내용</Button>
                <Button variant="outlined" sx={{marginRight: '10px'}} onClick={() => handleSearch(3)}>제목+내용</Button>
                <Button variant="outlined" sx={{marginRight: '10px'}} onClick={() => handleSearch(4)}>아이디</Button>
                <Button variant="outlined" onClick={() => handleSearch(5)}>제목+내용+아이디</Button>
              </Stack>
            </Stack>
            <Divider sx={{ marginTop: '20px', marginBottom: '10px' }}><Chip label="검색 결과"></Chip></Divider>

            {/* 버튼 */}
            <Stack direction="row" justifyContent="center" alignItems='center' spacing={5}>
              <Stack direction="row" sx={{ cursor: 'pointer' }}>
                <ImageIcon sx={{ fontSize: '15px' }} />
                <Typography sx={{ fontSize: '12px' }}>사진</Typography>
              </Stack>
              <Stack direction="row" sx={{ cursor: 'pointer' }}>
                <PlayCircleIcon sx={{ fontSize: '15px' }} />
                <Typography sx={{ fontSize: '12px' }}>동영상</Typography>
              </Stack>
            </Stack>
            
            {/* 목록 */}
            <Grid container>
              {is && 
                boardList.map((board, idx) => {
                  return <Grid item xs={6} md={4} key={idx}>
                      <Paper elevation={2} className="uploadlist">
                        <Box className="uploaditem">
                          bid: {board.bid} <br />
                          title: {board.title} <br />
                          bContents: {board.bContents} <br />
                          nickname: {board.nickname}
                        </Box>
                      </Paper>
                    </Grid>
                })
              }
              {!is && 
                <div>
                  검색 결과가 없습니다!
                </div>
              }
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/* 무한스크롤 인식을 위한 빈 div 태그, 위에가 flex로 된 요소라 이것도 flex 필수로 붙여야 제대로 작동 */}
      <div id="observe" style={{display: 'flex', height: '10px'}}></div>
    </div>
  )
}