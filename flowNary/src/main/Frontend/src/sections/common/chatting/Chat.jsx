import React, { useState, useRef, useEffect } from 'react';
import { Avatar, Box, Stack, TextField, InputAdornment } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import EastIcon from '@mui/icons-material/East';
import { GetWithExpiry } from '../../../api/LocalStorage';
import './chat.css';

export default function Chat() {
  const [messages, setMessages] = useState([
    { text: "안녕하세요, 반갑습니다!", sender: 'other' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messageEndRef = useRef(null);
  const inputFieldHeight = 65; // 입력 필드의 높이를 고정값

  const profile = GetWithExpiry("profile");
  const email = GetWithExpiry("email");

  const handleMessageSend = () => {
    if (inputMessage.trim() !== '') {
      // 메시지 전송 코드 작성
      sendMessageToServer(inputMessage);
      // 기존 로직 유지
      const newMessage = { text: inputMessage, sender: 'user' };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInputMessage('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleMessageSend();
    }
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  // WebSocket 연결 및 메시지 수신을 처리하는 함수
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/chat'); // 웹소켓 서버 주소
    socket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      setMessages(prevMessages => [...prevMessages, receivedMessage]);
    };

    // 컴포넌트 언마운트 시 웹소켓 연결 종료
    return () => {
      socket.close();
    };
  }, []);

  // 서버로 메시지 전송하는 함수
  const sendMessageToServer = (message) => {
    const socket = new WebSocket('ws://localhost:8080/chat');
    socket.onopen = () => {
      socket.send(JSON.stringify({ text: message, sender: 'user' }));
    };
  };

  return (
    <Box
      sx={{
        top: '10%',
        margin: '20px',
        padding: '20px',
        minHeight: '400px',
        height: 'calc(100vh - 200px)',
        width: '80%',
        mx: 'auto',
        overflowY: 'auto',                
      }}
    >
      <Stack sx={{ fontSize: 'xx-large', fontWeight: 'bold', mx: 'auto' }}>
        <div style={{ color: 'rgb(88, 67, 135)' }}>
          <Avatar alt="User" src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${profile}`} />
           {email}
          <hr style={{ opacity: '0.4', marginTop: 20 }} />
        </div>
      </Stack>
      {/* maxHeight를 사용 스크롤 활성 */}
      <div style={{ maxHeight: `calc(100vh - ${inputFieldHeight + 385}px)`, overflowY: 'auto' }}> {/* 메시지 영역의 최대 높이를 조정 */}
        {messages.map((message, index) => (
          <Stack
            key={index}
            direction='row'
            justifyContent={message.sender === 'user' ? 'flex-end' : 'flex-start'}
          >
            {message.sender !== 'user' && 
            <Avatar sx={{ width: 50, height: 50 }}

            >R</Avatar>}
            <div className={message.sender === 'user' ? "message" : "othermessage"}>{message.text}</div>
            {message.sender === 'user' && 
            <Avatar 
            sx={{ width: 50, height: 50, marginRight:'.75rem' }}
            src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${profile}`}

            >U</Avatar>}
          </Stack>
        ))}
        <div ref={messageEndRef} />
      </div>
      <Stack
        sx={{
          position: 'fixed',
          bottom: '5px',
          width: { xs: '60%', sm: '70%', md: '80%' },
        }}
      >
        <TextField
          sx={{
            marginBottom: '1.5em',
            height: `${inputFieldHeight}px`, // 입력 필드의 높이 설정
            width: { xs: '60%', sm: '80%', md: '85%', lg: '88%', xl: '90%', },
          }}
          fullWidth
          placeholder="메시지를 입력하세요..."
          variant="outlined"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" >
                <IconButton onClick={handleMessageSend}>
                  <EastIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </Box>
  );
}