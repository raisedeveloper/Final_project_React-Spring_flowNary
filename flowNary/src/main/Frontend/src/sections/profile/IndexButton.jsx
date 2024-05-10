// 기본
import React, { useState } from "react";
import {
  Box, Button, ButtonGroup, Grid, Stack, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Toolbar, Typography
} from "@mui/material";

// 통계 그래프
// eslint-disable-next-line
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { Line } from "react-chartjs-2";

// 아이콘
import FmdBadIcon from '@mui/icons-material/FmdBad';
import GroupsIcon from '@mui/icons-material/Groups';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import DeleteIcon from '@mui/icons-material/Delete';

// css/componets 연결
import './profile.css'
import ProfileMenu from './ProfileMenu';

export default function IndexButton() {
  // eslint-disable-next-line
  const [data, setData] = useState([{ x: '2024-01-01', y: '1' }, { x: '2024-01-02', y: '2' }, { x: '2024-01-03', y: '3' }]);

  // 통계 기본 범례
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: '제목 1'
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day'
        }
      }
    }
  };

  let labels = [];
  if (data.length > 0) {
    labels = data.map((d) => d.x);
  }

  const datas = {
    labels,
    datasets: [
      {
        label: '레이블1',
        data: data.map(d => d.y),
        borderrColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  };
  const [showStatistics, setShowStatistics] = useState(true); // 통계를 보여줄지 여부
  const [showBookmarks, setShowBookmarks] = useState(false); // 책갈피를 보여줄지 여부

  // 통계 버튼을 눌렀을 때 전환
  const toggleStatistics = () => {
    if (!showStatistics) {
      setShowStatistics(true);
      setShowBookmarks(false);
    }
  };
  // 책갈피 버튼을 눌렀을 때 전환
  const toggleBookmarks = () => {
    if (!showBookmarks) {
      setShowBookmarks(true);
      setShowStatistics(false);
    }
  };
  return (
    <>
      <Stack direction="row" justifyContent="center">
        <button className='msg_button' onClick={toggleStatistics} style={{
          backgroundColor: showStatistics ? 'rgb(115, 97, 188)' : 'rgb(88, 67, 135)'
        }}>통계</button>
        <button className='msg_button' onClick={toggleBookmarks} style={{
          backgroundColor: showBookmarks ? 'rgb(115, 97, 188)' : 'rgb(88, 67, 135)'
        }}>책갈피</button>
      </Stack>
      {/* 통계 Stack */}
      <br /><br /><br />
      {showStatistics && (
        <Grid container>
          <Grid item xs={0} lg={2}>
          </Grid>
          <Grid item xs={12} lg={8}>
            <Stack>
              {data.length > 0 && <Line options={options} data={datas} />}
            </Stack>
            <Stack direction="row" justifyContent={'center'} spacing={3}>
              <Button variant="outlined" startIcon={<FmdBadIcon />}>조회수 통계</Button>
              <Button variant="outlined" startIcon={<MarkChatReadIcon />}>게시물 통계</Button>
              <Button variant="outlined" startIcon={<GroupsIcon />}>팔로워 통계</Button>
            </Stack>
            <Grid container sx={{ marginTop: '10px' }}>
              <Grid item xs={12} lg={6}>
                <Box className='tableContainer'>
                  <TableContainer >
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>날짜</TableCell>
                          <TableCell>조회수 총합</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          data.map((d) => (
                            <TableRow>
                              <TableCell>{d.x}</TableCell>
                              <TableCell>{d.y}</TableCell>
                            </TableRow>
                          ))
                        }
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Box className='tableContainer'>
                  <TableContainer>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>날짜</TableCell>
                          <TableCell>게시물 총합</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          data.map((d) => (
                            <TableRow>
                              <TableCell>{d.x}</TableCell>
                              <TableCell>{d.y}</TableCell>
                            </TableRow>
                          ))
                        }
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={0} lg={2}>
          </Grid>
        </Grid>
      )}
      {/* 책갈피 Stack */}
      {showBookmarks && (
        <Stack>
          <Box className='bookmarkContainer'>
            <TableContainer>
              <Toolbar>
                <Typography variant="h6">
                  책갈피
                </Typography>
              </Toolbar>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>업로더</TableCell>
                    <TableCell>제목</TableCell>
                    <TableCell>날짜</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <ProfileMenu />
                    </TableCell>
                    <TableCell>제목 1</TableCell>
                    <TableCell>OOOO-OO-OO</TableCell>
                    <TableCell><DeleteIcon /></TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <ProfileMenu />
                    </TableCell>
                    <TableCell>제목 2</TableCell>
                    <TableCell>OOOO-OO-OO</TableCell>
                    <TableCell><DeleteIcon /></TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <ProfileMenu />
                    </TableCell>
                    <TableCell>제목 3</TableCell>
                    <TableCell>OOOO-OO-OO</TableCell>
                    <TableCell><DeleteIcon /></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Stack sx={{ marginTop: '10px' }} direction={'row'} justifyContent={'center'}>
            <ButtonGroup variant="outlined" size="small">
              <Button sx={{ width: 'auto' }}>1</Button>
              <Button sx={{ width: 'auto' }}>2</Button>
              <Button sx={{ width: 'auto' }}>3</Button>
            </ButtonGroup>
          </Stack>
        </Stack>
      )}
    </>
  )
}

