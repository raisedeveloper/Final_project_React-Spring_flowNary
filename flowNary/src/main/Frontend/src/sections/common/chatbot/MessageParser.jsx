import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.includes('안녕') || message.includes('ㅎㅇ') || message.includes('안녕하세요')) {
      actions.handleHello();
      return;
    }

    if (message.includes('팀원')) {
      actions.handleEasterEgg();
      return;
    }

    actions.handleUnknownMessage();
  };

  return React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      parse: parse,
      actions: actions,
    });
  });
};

export default MessageParser;
