import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { UserContext } from 'api/LocalStorage';
import { getChatList } from 'api/axiosGet';
import { useWebSocket } from 'api/webSocketContext';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChatList() {
  const { activeUser } = useContext(UserContext);
  const [list, setList] = useState([]);
  const { stompClient } = useWebSocket();
  const [count, setCount] = useState(20);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeUser.uid !== -1) {
      const fetchChatList = async () => {
        const chatlist = await getChatList(activeUser.uid, count, 0);
        console.log(chatlist);
        setList(chatlist);
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
          const data = message;
          console.log(data);
          const indexcid = list.findIndex(item => item.cid === data.cid);
          const chat = list[indexcid];
          if (indexcid !== -1) {
            const newlist = [{
              cid: data.cid,
              status: chat.status,
              statusTime: chat.statusTime,
              userCount: chat.userCount,
              name: chat.name,
              lastMessage: data.lastMessage,
            }
              , ...list.slice(0, indexcid), ...list.slice(indexcid + 1)];
            console.log(newlist);

            setList(newlist);
          }
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
    navigate("/chatting", { state: { cid: cid } });
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ border: '1px solid black' }}>
        {list && list.map((data, idx) => (
          <Box sx={{ border: '1px solid black' }} key={idx} onClick={() => handleChatClick(data.cid)}>
            {data.cid} <br />
            {data.name} <br />
            {data.statusTime} <br />
            {data.lastMessage}
          </Box>
        ))}
      </Box>
    </DashboardLayout>
  )
}
