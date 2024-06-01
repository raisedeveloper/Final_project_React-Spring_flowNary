import React, { useState, useRef, useEffect, useContext } from 'react';
import { Avatar, Box, Stack, TextField, InputAdornment, Icon, IconButton, Paper, Typography } from "@mui/material";
import EastIcon from '@mui/icons-material/East';
import { GetWithExpiry } from 'api/LocalStorage';
import './components/chat.css';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { UserContext } from 'api/LocalStorage';
import { useLocation, useNavigate } from 'react-router-dom';
import { useWebSocket } from 'api/webSocketContext';
import { getDmList, getChat } from 'api/axiosGet';
import TouchRipple from '@mui/material/ButtonBase/TouchRipple';

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const messageEndRef = useRef(null);
    const inputFieldHeight = 70; // 입력 필드의 높이를 고정값
    const { activeUser } = useContext(UserContext);
    const { state } = useLocation() || null;
    const { cid } = state != null ? state : { cid: -1 };
    const { stompClient } = useWebSocket();
    const [count, setCount] = useState(20);
    const [chatroom, setChatroom] = useState(null);
    const profile = GetWithExpiry("profile");
    const navigate = useNavigate();

    const handleMessageSend = () => {
        if (inputMessage.trim() !== '' && stompClient && stompClient.connected) {
            console.log('Sending message:', inputMessage); // 메시지 전송 확인
            const newMessage = { text: inputMessage, sender: 'user', uid: activeUser.uid, dContents: inputMessage };
            setMessages(prevMessages => [newMessage, ...prevMessages]); // 새로운 메시지를 바로 추가
            setInputMessage('');

            stompClient.publish({
                destination: '/app/chatroom',
                body: JSON.stringify({
                    cid: cid,
                    uid: activeUser.uid,
                    dContents: inputMessage,
                    dFile: null,
                    nickname: activeUser.nickname,
                    profile: profile,
                    status: chatroom.status,
                }),
            });
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleMessageSend(); // 메시지 전송 함수 호출
        }
    };

    useEffect(() => {
        if (activeUser.uid !== -1 && cid !== -1) {
            const fetchMList = async () => {
                const mlist = await getDmList(cid, count);
                setMessages(mlist);
                const chatr = await getChat(cid, activeUser.uid);
                setChatroom(chatr);
            }

            fetchMList();
            let chatconnect;

            if (stompClient && stompClient.connected) {
                console.log('chatting room connected');
                stompClient.publish({
                    destination: '/app/page',
                    body: JSON.stringify({ userId: activeUser.uid, page: 'chatroom' + cid, action: 'enter' }),
                });

                chatconnect = stompClient.subscribe(`/user/chat/` + cid, (message) => {
                    const data = JSON.parse(message.body);
                    console.log('Received message:', data); // 받은 메시지 확인
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
                        body: JSON.stringify({ userId: activeUser.uid, page: 'chatroom' + cid, action: 'leave' }),
                    });
                    console.log('chatting room disconnected');
                }
            }
        }
    }, [activeUser.uid, stompClient, cid]);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [messages]);

    const rippleRef = useRef(null);

    const handleMouseDown = (event) => {
        rippleRef.current.start(event);
    };

    const handleMouseUp = () => {
        rippleRef.current.stop();
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (cid === -1) {
        return (
            <div>채팅방 정보가 없습니다.</div>
        );
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fafafa',
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        width: '100%',
                        maxWidth: '1500px',
                        minHeight: '80vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        borderRadius: '15px',
                        overflow: 'hidden',
                        backgroundColor: '#fff',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', padding: '16px', borderBottom: '1px solid #ddd', backgroundColor: '#f8f8f8' }}>
                        <IconButton
                            sx={{ fontSize: '2rem', color: 'lightcoral' }}
                            onClick={handleBack}
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                        >
                            <Icon>arrow_back</Icon>
                            <TouchRipple ref={rippleRef} center />
                        </IconButton>
                        <Typography variant="h3" sx={{ flexGrow: 1, color: 'lightcoral', fontWeight: 'bold', textAlign: 'center' }}>
                            {chatroom && chatroom.name}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            padding: '16px',
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'column-reverse',
                            backgroundColor: '#fafafa',
                        }}
                    >
                        <div ref={messageEndRef} />
                        {messages && messages.map((message, index) => (
                            <Stack
                                key={index}
                                direction='row'
                                justifyContent={message.uid === activeUser.uid ? 'flex-end' : 'flex-start'}
                                sx={{ mb: 1 }}
                            >
                                {message.uid !== activeUser.uid && <Avatar sx={{ width: 50, height: 50, mr: 1 }}>R</Avatar>}
                                <Box
                                    sx={{
                                        borderRadius: '20px',
                                        padding: '12px 18px',
                                        backgroundColor: message.uid === activeUser.uid ? 'lightcoral ' : '#fff',
                                        color: message.uid === activeUser.uid ? '#ffffff' : '#000000',
                                        boxShadow: '0px 1px 1px rgba(0,0,0,0.1)',
                                        maxWidth: '70%',
                                    }}
                                >
                                    {message.dContents}
                                </Box>
                                {message.uid === activeUser.uid && (
                                    <Avatar
                                        sx={{ width: 50, height: 50, ml: 1 }}
                                        src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${profile}`}
                                    >U</Avatar>
                                )}
                            </Stack>
                        ))}
                    </Box>
                    <Box
                        sx={{
                            padding: '16px',
                            borderTop: '1px solid #ddd',
                            backgroundColor: '#f8f8f8',
                        }}
                    >
                        <TextField
                            fullWidth
                            placeholder="메시지를 보내세요!"
                            variant="outlined"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleMessageSend} sx={{ color: '#E1306C' }}>
                                            <EastIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                sx: {
                                    borderRadius: '30px',
                                    backgroundColor: '#fff',
                                    boxShadow: '0px 1px 1px rgba(0,0,0,0.1)',
                                    padding: '10px',
                                },
                            }}
                            sx={{
                                height: `${inputFieldHeight}px`,
                                fontSize: '1rem',
                            }}
                        />
                    </Box>
                </Paper>
            </Box>
        </DashboardLayout>
    );
}
