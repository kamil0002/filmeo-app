/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Pusher from 'pusher-js';
import { darken, Paper, TextField } from '@mui/material';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';
import ChatIcon from '@mui/icons-material/Chat';
import FormControl from '@mui/material/FormControl';
import Typography from 'components/Typography/Typography';
import responsive from 'theme/responsive';
import ChatMessage from './ChatMessage';
import axios from 'utils/axios';

const username = 'Kamil';
const allMessages = [];

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();

  useEffect(() => {
    Pusher.logToConsole = false;

    const pusher = new Pusher('8fb8f8eb332cab7a0878', {
      cluster: 'eu',
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', function (data) {
      allMessages.push(data);
      setMessages(allMessages);
      console.log(allMessages, messages);
      const messagesContainer = document.querySelector('.messages-container');
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        '/messages',
        JSON.stringify({
          username,
          message,
        })
      );
    } catch (err) {
      console.error(err);
    }

    e.target.parentNode.previousSibling.scrollTo(
      0,
      e.target.parentNode.previousSibling.scrollHeight
    );

    setMessage('');
    setMessage('');
  };

  return (
    <ChatWrapper elevation={8}>
      <ChatHeading fontWeight={700} color={'#fff'}>
        Chat - podziel się opinią
      </ChatHeading>
      <Messages className="messages-container">
        {messages.map((message, i) => {
          return (
            <ChatMessage
              key={i}
              userName={message.username}
              text={message.message}
              date={new Date().toLocaleDateString('pl-PL', {
                weekday: 'long',
                hour: '2-digit',
                minute: '2-digit',
              })}
            />
          );
        })}
      </Messages>
      <Actions>
        <Form onSubmit={(e) => sendMessage(e)}>
          <FormControl
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <ChatInput
              hiddenLabel
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              value={message || ''}
              placeholder="Message"
              variant="standard"
              size="medium"
              color="primary"
              autoComplete="off"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ChatIcon />
                  </InputAdornment>
                ),
              }}
            />
            <SendButton
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
            >
              Wyślij
            </SendButton>
          </FormControl>
        </Form>
      </Actions>
    </ChatWrapper>
  );
};

export default Chat;

const ChatWrapper = styled(Paper)`
  && {
    width: 90vw;
    margin: 4rem auto 4rem auto;
    height: 600px;
    border-radius: 20px;
    background: ${({ theme }) => theme.primaryLight};

    @media ${responsive.tablet} {
      width: 70vw;
    }

    @media ${responsive.desktop} {
      width: 55vw;
    }
  }
`;

const ChatHeading = styled(Typography)`
  background: ${({ theme }) => theme.primaryBlue};
  border-radius: 15px 15px 0 0;
  text-align: center;
  padding: 1rem 0;
  color: ${({ theme }) => theme.primaryLight};
`;

const Messages = styled.div`
  overflow-y: scroll;
  height: 72%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.lightGray};

  &::-webkit-scrollbar {
    width: 13px;
    border: 1px solid ${({ theme }) => theme.lightGray};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => darken(theme.lightBlue, 0.25)};
    cursor: pointer;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => darken(theme.lightBlue, 0.2)};
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.lightGray};
  }
`;

const Form = styled.form`
  display: block;
  width: 100%;
`;

const Actions = styled.div`
  position: relative;
  height: 65px;
  margin: 0 auto;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.secondaryLight};
  display: flex;
  align-items: center;
  width: 95%;
  transform: translateY(35%);

  @media ${responsive.tablet} {
    width: 80%;
  }
`;

const ChatInput = styled(TextField)`
  && {
    margin: 0 1.1rem 0 0.8rem;
    display: flex;
    align-items: center;
    width: 55%;

    @media ${responsive.mobileM} {
      align-items: stretch;
      width: 64%;
    }

    @media ${responsive.tablet} {
      width: 60%;
      margin: 0 1.4rem;
    }

    @media ${responsive.laptop} {
      width: 65%;
      margin: 0 1.8rem;
    }
    @media ${responsive.desktop} {
      width: 73%;
    }
  }
`;

const SendButton = styled(Button)`
  && {
    width: 95px;
    height: 35px;
    display: flex;
    align-items: center;
    @media ${responsive.tablet} {
      width: 110px;
      height: 37px;
    }
  }
`;
