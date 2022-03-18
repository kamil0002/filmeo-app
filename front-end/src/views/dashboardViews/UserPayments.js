import Typography from 'components/Typography/Typography';
import React from 'react';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const UserPayments = () => {
  return (
    <Wrapper>
      <Typography fontSize={24} fontWeight={700} marginBottom={4}>
        Wydatki
      </Typography>

      <ExpansesBoxes>
        <StyledPaper elevation={6} rounded>
          <Typography fontSize={18} align="center">
            Wydatki
          </Typography>
          <Typography
            marginTop={2}
            fontSize={20}
            variant="body1"
            color="text.secondary"
          >
            Łącznie wydałeś
          </Typography>
          <TotalExpenses>
            <AttachMoneyIcon
              sx={{
                color: '#cccccc',
                position: 'relative',
                transform: 'translateY(-10%)',
              }}
            />
            <Typography fontWeight={700} fontSize={24} color="#454C65">
              232
            </Typography>
            .00zł
          </TotalExpenses>
        </StyledPaper>
      </ExpansesBoxes>
    </Wrapper>
  );
};

export default UserPayments;

const Wrapper = styled.div`
  height: 900px;
  padding: 0.7rem 0;
`;

const StyledPaper = styled(Paper)`
  && {
    width: max-content;
    padding: 1rem 2rem;
    font-size: ${({ theme }) => theme.fontSize.m};
  }
`;

const TotalExpenses = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.2rem;
  color: #e0dfe2;
`;
