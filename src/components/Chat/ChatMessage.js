import React from 'react';

const ChatMessage = () => {
  return (
    <Message variant="body1" as="div" fontSize={14}>
      <Typography fontSize={10} fontWeight={700}>
        Kamil, 17:37
      </Typography>
      Cześć! To jest test wiadomości dłuższej wiadomości.Cześć! To jest test
      wiadomości dłuższej wiadomości.Cześć! To jest test wiadomości dłuższej
      wiadomości.
    </Message>
  );
};

export default ChatMessage;
