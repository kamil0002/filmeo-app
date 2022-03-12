/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import { Paper, TextField } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';
import ChatIcon from '@mui/icons-material/Chat';
import responsive from 'theme/responsive';

const Chat = () => {
  return (
    <ChatWrapper elevation={8}>
      <ChatHeading fontWeight={700} fontFamily="Poppins">
        Chat - podziel się opinią
      </ChatHeading>
      <Messages></Messages>
      <Actions>
        <ChatInput
          hiddenLabel
          id="filled-hidden-label-small"
          placeholder="Message"
          variant="standard"
          size="medium"
          color="primary"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ChatIcon />
              </InputAdornment>
            ),
          }}
        />
        <SendButton variant="contained" endIcon={<SendIcon />}>
          Wyślij
        </SendButton>
      </Actions>
    </ChatWrapper>
  );
};

export default Chat;

const ChatWrapper = styled(Paper)`
  && {
    width: 90vw;
    margin: 4rem auto 4rem auto;
    height: 500px;
    border-radius: 20px;
    background: ${({ theme }) => theme.primaryLight};

    @media ${responsive.tablet} {
      width: 60vw;
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
  height: 70%;
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

  @media ${responsive.tablet} {
    width: 80%;
  }
`;

const ChatInput = styled(TextField)`
  && {
    margin: 0 1.1rem 0 0.8rem;
    width: 55%;
    @media ${responsive.mobileM} {
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
// const MessageContent = styled.div`
//   && {
//     width: 60%;
//     position: absolute;
//     bottom: 10px;
//     left: 20px;
//   }
// `;
