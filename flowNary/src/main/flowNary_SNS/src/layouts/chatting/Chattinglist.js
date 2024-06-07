import { ListItem, List, ListItemAvatar, Avatar, ListItemText, Typography, Badge, Box, Divider, Paper, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { UserContext } from 'api/LocalStorage';
import { getChatList } from 'api/axiosGet';
import { useWebSocket } from 'api/webSocketContext';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ChattingIndex from './ChattingIndex';
import TimeAgo from 'timeago-react';
import UserAvatar from 'api/userAvatar';
import { getChatUserList } from 'api/axiosGet';
import UserLoginService from 'ut/userLogin-Service';
import { isEmpty } from 'api/emptyCheck';

export default function ChatList() {
    const { activeUser } = useContext(UserContext);
    const [list, setList] = useState([]);
    const [usernum, setUsernum] = useState('');
    const { stompClient } = useWebSocket();
    const [count, setCount] = useState(20);
    const navigate = useNavigate();
    const [cid, setCid] = useState(-1);
    const { state } = useLocation();

    useEffect(() => {
        if (activeUser.uid !== -1) {
          const fetchChatList = async () => {
            const chatlist = await getChatList(activeUser.uid, count, 0);
            if (!isEmpty(chatlist)) {
              setList(chatlist);
              if (state) {
                setCid(state.cid);
                setCid(chatlist[0].cid);
              }
    
              const cidList = list.map((chat) => chat.cid);
              const promises = cidList.map(async (cid) => {
                const usernumlist = await getChatUserList(cid);
                if (usernumlist) {
                  return usernumlist[1].uid; // 첫번째 사용자 UID만 추출
                } else {
                  console.error(`Failed to get user list for cid: ${cid}`);
                  return null;
                }
              });
    
              Promise.all(promises).then((usernumList) => {
                setUsernum(usernumList); // 추출된 UID 목록으로 usernum 설정
              });
            } else {
              console.error("Chat list is empty or not available");
            }
          }
    
          fetchChatList();
          let chatrefresh;
    
          if (stompClient && stompClient.connected) {
            console.log('chat websocket connected');
            stompClient.publish({
              destination: '/app/page',
              body: JSON.stringify({ userId: activeUser.uid, page: 'chat', action: 'enter' }),
            });
    
            chatrefresh = stompClient.subscribe(`/topic/chatlist`, (message) => {
              const data = JSON.parse(message.body);
    
              setList(prevList => {
                const indexcid = prevList.findIndex(item => item.cid === data.cid);
                if (indexcid !== -1) {
                  const chat = prevList[indexcid];
                  const newlist = [{
                    cid: data.cid,
                    status: chat.status,
                    statusTime: chat.statusTime,
                    userCount: chat.userCount,
                    name: chat.name,
                    lastMessage: data.lastMessage,
                  }, ...prevList.slice(0, indexcid), ...prevList.slice(indexcid + 1)];
                  return newlist;
                }
                return prevList;
              });
            });
          }
    
          return () => {
            if (stompClient && stompClient.connected) {
              stompClient.publish({
                destination: '/app/page',
                body: JSON.stringify({ userId: activeUser.uid, page: 'chat', action: 'leave' }),
              });
              console.log('chat websocket disconnected');
            }
    
            if (chatrefresh) {
              chatrefresh.unsubscribe();
            }
          }
        }
      }, [activeUser.uid, count, stompClient]);
    const handleChatClick = (cid) => {
        setCid(cid);
    }
    const goLogin = () => navigate('/authentication/sign-in');
    if (activeUser.uid === undefined || activeUser.uid < 0) {
        return <UserLoginService goLogin={goLogin} />;
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container>
                <Grid item xs={12} sm={4} sx={{ padding: 1 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            elevation={3}
                            sx={{
                                maxWidth: 1200,
                                width: '100%',
                                background: '#fff',
                                borderRadius: 4,
                                overflow: 'hidden',
                                px: 3,
                                py: 1,
                            }}
                        >
                            <Typography variant="h5" sx={{ my: 2, fontWeight: 'bold', color: 'lightcoral' }}>채팅 목록</Typography>
                            <List sx={{ cursor: 'pointer' }}>
                                {list && list.data ? (list && list.map((data, idx) => (
                                    <React.Fragment key={idx}>
                                        <ListItem
                                            onClick={() => handleChatClick(data.cid)}
                                            sx={{
                                                mb: 2,
                                                p: 2,
                                                borderRadius: 2,
                                                transition: '0.3s',
                                                '&:hover': {
                                                    backgroundColor: '#e1e8ed',
                                                    transform: 'scale(1.02)',
                                                }
                                            }}
                                        >
                                            <ListItemAvatar>
                                                <Badge
                                                    overlap="circular"
                                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                    badgeContent={
                                                        <div
                                                            style={{
                                                                width: '1rem',
                                                                height: '1rem',
                                                                borderRadius: '50%',
                                                                backgroundColor: 'lightcoral',
                                                                border: '2px solid white',
                                                            }}
                                                        ></div>
                                                    }
                                                >
                                                    <Avatar sx={{ width: 50, height: 50, mr: 1 }}>
                                                        <UserAvatar uid={usernum[idx]} />
                                                    </Avatar>
                                                </Badge>
                                            </ListItemAvatar>
                                            <ListItemText
                                                sx={{ ml: 3 }}
                                                primary={<Typography variant="h6" sx={{ fontWeight: 'bold' }}>{data.name}</Typography>}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                        >
                                                            {data.lastMessage}
                                                        </Typography>
                                                        <br />
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="text.secondary"
                                                        >
                                                            <TimeAgo datetime={data.statusTime} locale="ko" />
                                                        </Typography>
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                        {idx < list.length - 1 && <Divider variant="middle" />}
                                    </React.Fragment>
                                ))) : null}
                            </List>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={8} sx={{ padding: 1 }}>
                    {cid !== -1 ? <><ChattingIndex cid={cid} setCid={setCid} /></> : null}
                </Grid>
            </Grid>
        </DashboardLayout>
    );
}
