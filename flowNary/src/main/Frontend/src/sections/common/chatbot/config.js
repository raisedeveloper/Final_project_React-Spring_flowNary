import { createChatBotMessage } from 'react-chatbot-kit';

const botName = 'FlowNary 챗봇';

const config = {
  botName: botName,
  initialMessages: [
    createChatBotMessage(
      `안녕하세요! ${botName}입니다. 도움이 필요하시면 위에 버튼을 눌러주세요!`
    ), 
    
  ]
};

export default config;