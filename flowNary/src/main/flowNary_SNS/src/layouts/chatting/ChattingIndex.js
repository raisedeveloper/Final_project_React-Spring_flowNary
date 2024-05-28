import React, { useState, useRef, useEffect, useContext } from 'react';
import { Avatar, Box, Stack, TextField, InputAdornment } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import EastIcon from '@mui/icons-material/East';
import { GetWithExpiry } from 'api/LocalStorage';
import './components/chat.css';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { UserContext } from 'api/LocalStorage';
import { useLocation } from 'react-router-dom';
import { useWebSocket } from 'api/webSocketContext';
import { getDmList } from 'api/axiosGet';
import { getChat } from 'api/axiosGet';

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const messageEndRef = useRef(null);
    const inputFieldHeight = 65; // 입력 필드의 높이를 고정값
    const { activeUser } = useContext(UserContext);
    const { state } = useLocation() || null;
    const { cid } = state != null ? state : { cid: -1 };
    const { stompClient } = useWebSocket();
    const [count, setCount] = useState(20);
    const [list, setList] = useState([]);
    const [chatroom, setChatroom] = useState(null);
    const profile = GetWithExpiry("profile");

    const handleMessageSend = () => {
        if (inputMessage.trim() !== '' && stompClient && stompClient.connected) {
            const newMessage = { text: inputMessage, sender: 'user' };
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
            })
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleMessageSend();
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
                    body: JSON.stringify({userId: activeUser.uid, page: 'chatroom' + cid, action: 'enter'}),
                });

                chatconnect = stompClient.subscribe(`/user/chat/` + cid, (message) => {
                    const data = JSON.parse(message.body);
                    // console.log(data);
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
                        body: JSON.stringify({userId: activeUser.uid, page: 'chatroom' + cid, action: 'leave'}),
                    });
                    console.log('chatting room disconnected');
                }
            }
        }
    }, [activeUser.uid, stompClient]);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [messages]);

    if (cid === -1) {
        return (
            <div>채팅방 정보가 없습니다.</div>
        )
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
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
                        {/* <Avatar alt="User" src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${profile}`} />
                        {email} */}
                        {chatroom && chatroom.name}
                        <hr style={{ opacity: '0.4', marginTop: 20 }} />
                    </div>
                </Stack>
                {/* maxHeight를 사용 스크롤 활성 */}
                <Stack sx={{ maxHeight: `calc(100vh - ${inputFieldHeight + 385}px)`, overflowY: 'auto', flexDirection: 'column-reverse' }}> {/* 메시지 영역의 최대 높이를 조정 */}
                    <br />
                    <div ref={messageEndRef} />
                    {messages && messages.map((message, index) => (
                        <Stack
                            key={index}
                            direction='row'
                            justifyContent={message.uid === activeUser.uid ? 'flex-end' : 'flex-start'}
                        >
                            {message.uid !== activeUser.uid &&
                                <Avatar sx={{ width: 50, height: 50 }}

                                >R</Avatar>}
                            <div className={message.uid === activeUser.uid ? "message" : "othermessage"}>{message.dContents}</div>
                            {message.uid === activeUser.uid &&
                                <Avatar
                                    sx={{ width: 50, height: 50, marginRight: '.75rem' }}
                                    src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${message.profile}`}

                                >U</Avatar>}
                        </Stack>
                    ))}
                </Stack>
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
                            width: '70.5%',
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
        </DashboardLayout>
    );
}