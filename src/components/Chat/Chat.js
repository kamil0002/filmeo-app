/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import { darken, lighten, Paper, TextField } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';
import ChatIcon from '@mui/icons-material/Chat';
import responsive from 'theme/responsive';
import { css } from 'styled-components';

const Chat = () => {
  return (
    <ChatWrapper elevation={8}>
      <ChatHeading fontWeight={700} fontFamily="Poppins">
        Chat - podziel się opinią
      </ChatHeading>
      <Messages>
        <Message variant="body1" as="div" fontSize={14}>
          <Typography fontSize={10} fontWeight={700}>
            Kamil, 17:37
          </Typography>
          Cześć! To jest test wiadomości
        </Message>
        <Message variant="body1" as="div" fontSize={14}>
          <Typography fontSize={10} fontWeight={700}>
            Kamil, 17:37
          </Typography>
          Cześć! To jest test wiadomości dłuższej wiadomości.Cześć! To jest test
          wiadomości dłuższej wiadomości.Cześć! To jest test wiadomości dłuższej
          wiadomości.
        </Message>
        <Message self="true" variant="body1" as="div" fontSize={14}>
          <Typography fontSize={10} fontWeight={700}>
            Kamil, 17:37
          </Typography>
          Cześć! To jest test wiadomości
        </Message>
        <Message variant="body1" as="div" fontSize={14}>
          <Typography fontSize={10} fontWeight={700}>
            Kamil, 17:37
          </Typography>
          Cześć! To jest test wiadomości
        </Message>
        <Message variant="body1" as="div" fontSize={14}>
          <Typography fontSize={10} fontWeight={700}>
            Kamil, 17:37
          </Typography>
          Cześć! To jest test wiadomości dłuższej wiadomości.Cześć! To jest test
          wiadomości dłuższej wiadomości.Cześć! To jest test wiadomości dłuższej
          wiadomości.
        </Message>
        <Message self="true" variant="body1" as="div" fontSize={14}>
          <Typography fontSize={10} fontWeight={700}>
            Kamil, 17:37
          </Typography>
          Cześć! To jest test wiadomości
        </Message>
      </Messages>
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

const Message = styled(Typography)`
  && {
    background-color: ${({ theme }) => theme.secondaryLight};
    width: 70%;
    font-size: ${({ theme }) => theme.fontSize.xs};
    margin: ${({ self }) =>
      self ? '1.2rem 1rem 1.2rem auto' : '1.2rem 3rem 1.2rem 1rem'};
    padding: 0.6rem 1.2rem;
    border-radius: 5px;
    -webkit-box-shadow: 8px 8px 20px 0px rgba(0, 0, 0, 0.17);
    -moz-box-shadow: 8px 8px 20px 0px rgba(0, 0, 0, 0.17);
    box-shadow: 8px 8px 20px 0px rgba(0, 0, 0, 0.17);

    @media ${responsive.tablet} {
      padding: 0.8rem 2rem;
      margin: ${({ self }) =>
        self ? '1.3rem 1.5rem 1.3rem auto' : '1.3rem auto 1.3rem 1.5rem'};
      font-size: ${({ theme }) => theme.fontSize.s};
    }
  }
`;
