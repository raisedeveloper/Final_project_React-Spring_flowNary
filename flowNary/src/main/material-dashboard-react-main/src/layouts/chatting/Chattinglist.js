import React, { useState, useRef, useEffect, useContext } from 'react';
import { Avatar, Box, Stack, TextField, InputAdornment, Icon, ListItem, List, ListItemAvatar, Grid, Typography, IconButton } from "@mui/material";
import EastIcon from '@mui/icons-material/East';
import { GetWithExpiry, UserContext } from 'api/LocalStorage';
import { getChatList, getDmList, getChat } from 'api/axiosGet';
import { useWebSocket } from 'api/webSocketContext';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { useNavigate } from 'react-router-dom';
import TouchRipple from '@mui/material/ButtonBase/TouchRipple';
import './components/chat.css';

export default function ChatList() {
  const { activeUser } = useContext(UserContext);
  const [list, setList] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [count, setCount] = useState(20);
  const messageEndRef = useRef(null);
  const inputFieldHeight = 65;
  const profile = GetWithExpiry("profile");
  const { stompClient } = useWebSocket();
  const navigate = useNavigate();

  useEffect(() => {
    if (activeUser.uid !== -1) {
      const fetchChatList = async () => {
        const chatlist = await getChatList(activeUser.uid, count, 0);
        setList(chatlist);
      };

      fetchChatList();

      if (stompClient && stompClient.connected) {
        const subscription = stompClient.subscribe(`/topic/chatlist`, (message) => {
          const data = JSON.parse(message.body);
          setList(prevList => {
            const indexcid = prevList.findIndex(item => item.cid === data.cid);
            if (indexcid !== -1) {
              const chat = prevList[indexcid];
              const newList = [...prevList];
              newList[indexcid] = { ...chat, lastMessage: data.lastMessage };
              return newList;
            }
            return prevList;
          });
        });

        return () => {
          if (subscription) subscription.unsubscribe();
        };
      }
    }
  }, [activeUser.uid, count, stompClient]);

  useEffect(() => {
    if (selectedChat) {
      const fetchMList = async () => {
        const mlist = await getDmList(selectedChat.cid, count);
        setMessages(mlist);
        const chatr = await getChat(selectedChat.cid, activeUser.uid);
        setSelectedChat(chatr);
      }

      fetchMList();

      let chatconnect;
      if (stompClient && stompClient.connected) {
        stompClient.publish({
          destination: '/app/page',
          body: JSON.stringify({ userId: activeUser.uid, page: 'chatroom' + selectedChat.cid, action: 'enter' }),
        });

        chatconnect = stompClient.subscribe(`/user/chat/` + selectedChat.cid, (message) => {
          const data = JSON.parse(message.body);
          setMessages(prevMessages => {
            const messageExists = prevMessages.some(msg => msg.did === data.did);
            if (!messageExists) {
              return [data, ...prevMessages];
            }
            return prevMessages;
          });
        });
      }

      return () => {
        if (stompClient && stompClient.connected) {
          stompClient.publish({
            destination: '/app/page',
            body: JSON.stringify({ userId: activeUser.uid, page: 'chatroom' + selectedChat.cid, action: 'leave' }),
          });
        }
      }
    }
  }, [selectedChat, activeUser.uid, stompClient]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  }

  const handleMessageSend = () => {
    if (inputMessage.trim() !== '' && stompClient && stompClient.connected) {
      stompClient.publish({
        destination: '/app/chatroom',
        body: JSON.stringify({
          cid: selectedChat.cid,
          uid: activeUser.uid,
          dContents: inputMessage,
          dFile: null,
          nickname: activeUser.nickname,
          profile: profile,
          status: selectedChat.status,
        }),
      });
      setInputMessage('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleMessageSend();
    }
  };

  const rippleRef = useRef(null);
  const handleMouseDown = (event) => {
    rippleRef.current.start(event);
  };
  const handleMouseUp = () => {
    rippleRef.current.stop();
  };
  const handleBack = () => {
    navigate(-1);
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Stack direction="row" spacing={0} sx={{ height: '100vh' }}>
        <Grid item xs={3} sx={{ borderRight: '1px solid #ddd', overflowY: 'auto' }}>
          <List sx={{ p: 0, cursor: 'pointer' }}>
            {list.map((data) => (
              <ListItem key={data.cid} onClick={() => handleChatClick(data)} sx={{ borderBottom: '1px solid #ddd' }}>
                <ListItemAvatar>
                  <Avatar
                    sx={{ bgcolor: 'red'[500] }}
                    aria-label="recipe"
                  >
                    <div
                      style={{
                        width: '4rem',
                        height: '4rem',
                        borderRadius: '50%',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: `url(https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${activeUser.profile})`
                      }}
                    />
                  </Avatar>
                </ListItemAvatar>
                <Box>
                  <Typography variant="subtitle1">{data.name}</Typography>
                  <Typography variant="body2" color="textSecondary">{data.lastMessage}</Typography>
                  <Typography variant="body2" color="textSecondary">{formatDate(data.statusTime)}</Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={9} sx={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
          {selectedChat ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderBottom: '1px solid #ddd' }}>
                {/* <IconButton sx={{ fontSize: '2rem', cursor: 'pointer' }} onClick={handleBack}>
                  <Icon>arrow_back</Icon>
                  <TouchRipple ref={rippleRef} center />
                </IconButton> */}
                <Avatar
                  sx={{ ml: 2, width: 56, height: 56 }}
                  src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${profile}`}
                />
                <Typography variant="h6" sx={{ ml: 2 }}>{selectedChat.name}</Typography>
              </Box>
              <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
                {messages.map((message, index) => (
                  <Stack
                    key={index}
                    direction='row'
                    justifyContent={message.uid === activeUser.uid ? 'flex-end' : 'flex-start'}
                    sx={{ mb: 1 }}
                  >
                    {message.uid !== activeUser.uid &&
                      <Avatar sx={{ width: 40, height: 40, mr: 1 }} src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${message.profile}`}>R</Avatar>}
                    <Box
                      className={message.uid === activeUser.uid ? "message" : "othermessage"}
                      sx={{ maxWidth: '60%', p: 1, borderRadius: 1, bgcolor: message.uid === activeUser.uid ? '#d1e7dd' : '#f8d7da' }}
                    >
                      <Typography>{message.dContents}</Typography>
                    </Box>
                    {message.uid === activeUser.uid &&
                      <Avatar sx={{ width: 40, height: 40, ml: 1 }} src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${message.profile}`}>U</Avatar>}
                  </Stack>
                ))}
                <div ref={messageEndRef} />
              </Box>
              <Box sx={{ p: 2, borderTop: '1px solid #ddd', position: 'sticky', bottom: 0, bgcolor: 'white' }}>
                <TextField
                  fullWidth
                  placeholder="메시지를 보내세요!"
                  variant="outlined"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleMessageSend}>
                          <EastIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </>
          ) : (
            <Box sx={{ p: 2 }}>
              <Typography>채팅 내용을 선택하세요</Typography>
            </Box>
          )}
        </Grid>
      </Stack>
    </DashboardLayout>
  );
}
