import React, { useState, useRef, useEffect, useContext } from 'react';
import { Avatar, Box, Stack, TextField, InputAdornment, Icon, IconButton, Paper, Typography } from "@mui/material";
import EastIcon from '@mui/icons-material/East';
import { GetWithExpiry } from 'api/LocalStorage';
import { UserContext } from 'api/LocalStorage';
import { useLocation, useNavigate } from 'react-router-dom';
import { useWebSocket } from 'api/webSocketContext';
import { getDmList, getChat } from 'api/axiosGet';
import TouchRipple from '@mui/material/ButtonBase/TouchRipple';
import PropTypes from 'prop-types';
import Iconify from 'components/iconify/iconify';

export default function Chat({ cid, setCid }) {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const messageEndRef = useRef(null);
    const inputFieldHeight = 70;
    const { activeUser } = useContext(UserContext);
    const { stompClient } = useWebSocket();
    const [count, setCount] = useState(20);
    const [chatroom, setChatroom] = useState(null);
    const profile = GetWithExpiry("profile");
    const navigate = useNavigate();

    const handleMessageSend = () => {
        if (inputMessage.trim() !== '' && stompClient && stompClient.connected) {
            console.log('Sending message:', inputMessage);
            const newMessage = { text: inputMessage, sender: 'user', uid: activeUser.uid, dContents: inputMessage };
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
                    body: JSON.stringify({ userId: activeUser.uid, page: 'chatroom' + cid, action: 'enter' }),
                });

                chatconnect = stompClient.subscribe(`/user/chat/` + cid, (message) => {
                    const data = JSON.parse(message.body);
                    console.log('Received message:', data);
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

                if (chatconnect) {
                    chatconnect.unsubscribe();
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
        setCid(-1);
    };

    if (cid === -1) {
        return (
            <>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 25 }}>
                    <Icon fontSize='10rem' style={{ color: 'lightcoral' }} > assistant </Icon>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography>
                        플로우들에게 메시지를 보내보세요!
                    </Typography>
                </Box>
            </>
        );
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fafafa',
            }}
        >
            <Box
                elevation={3}
                sx={{
                    width: '100%',
                    height: '85vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    backgroundColor: '#fff',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', padding: '0.3em', borderBottom: '1px solid #ddd', backgroundColor: '#f8f8f8' }}>
                    <IconButton
                        sx={{ fontSize: '2rem', color: 'lightcoral' }}
                        onClick={handleBack}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                    >
                        <Icon>arrow_back</Icon>
                        <TouchRipple ref={rippleRef} center />
                    </IconButton>
                    <Typography variant="h5" sx={{ flexGrow: 1, color: 'lightcoral', fontWeight: 'bold', textAlign: 'center' }}>
                        {chatroom && chatroom.name}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        flexGrow: 1,
                        padding: '1rem',
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
                            {message.uid !== activeUser.uid && <>
                                <Avatar sx={{ width: 25, height: 25, mr: 1 }}>R</Avatar>

                                <Box
                                    sx={{
                                        borderRadius: '20px',
                                        padding: '0.5rem 0.75em',
                                        backgroundColor: message.uid === activeUser.uid ? 'lightcoral ' : '#fff',
                                        color: message.uid === activeUser.uid ? '#ffffff' : '#000000',
                                        boxShadow: '0px 1px 1px rgba(0,0,0,0.1)',
                                        maxWidth: '70%',
                                        fontSize: 'medium'
                                    }}
                                >
                                    {message.dContents}
                                </Box>
                                <Typography sx={{ fontSize: 'xx-small', display: 'flex', justifyContent: 'flex-end' }}>{message.dTime.split('T')[1].substring(0, 5)}</Typography>
                            </>}
                            {message.uid === activeUser.uid && (
                                <>
                                    <Typography sx={{ fontSize: 'xx-small', display: 'flex', justifyContent: 'flex-end' }}>{message.dTime.split('T')[1].substring(0, 5)}</Typography>
                                    <Box
                                        sx={{
                                            borderRadius: '20px',
                                            padding: '0.5rem 0.75em',
                                            backgroundColor: message.uid === activeUser.uid ? 'lightcoral ' : '#fff',
                                            color: message.uid === activeUser.uid ? '#ffffff' : '#000000',
                                            boxShadow: '0px 1px 1px rgba(0,0,0,0.1)',
                                            maxWidth: '70%',
                                            fontSize: 'medium'
                                        }}
                                    >
                                        {message.dContents}
                                    </Box>
                                    <Avatar
                                        sx={{ width: 25, height: 25, ml: 1 }}
                                        src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${profile}`}
                                    >U</Avatar>
                                </>
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
                                padding: '0.3rem',
                            },
                        }}
                        sx={{
                            height: `${inputFieldHeight}px`,
                            fontSize: '1rem',
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}

Chat.propTypes = {
    cid: PropTypes.number.isRequired,
    setCid: PropTypes.func.isRequired,
};
