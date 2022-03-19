import Typography from 'components/Typography/Typography';
import React from 'react';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DoughnutChart from 'components/DoughnutChart/DoughnutChart';
import responsive from 'theme/responsive';
import LineChart from 'components/LineChart/LineChart';

const UserPayments = () => {
  return (
    <Wrapper>
      <Typography fontSize={24} fontWeight={700} marginBottom={4}>
        Wydatki
      </Typography>
      <TopRow>
        <StyledPaper elevation={6} rounded>
          <StyledTypography align="center">Wydatki</StyledTypography>
          <Typography
            marginTop={2}
            fontSize={16}
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
            <StyledTypography fontWeight={700} fontSize={24} color="#454C65">
              232
            </StyledTypography>
            .00zł
          </TotalExpenses>
        </StyledPaper>

        <DoughnutChartWrapper>
          <DoughnutChart />
        </DoughnutChartWrapper>
        <LineChartWrapper>
          <LineChart />
        </LineChartWrapper>
      </TopRow>
      <BottomRow></BottomRow>
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
    font-size: ${({ theme }) => theme.fontSize.s};
    align-self: center;
  }
`;

const StyledTypography = styled(Typography)`
  && {
    font-size: ${({ theme }) => theme.fontSize.s};
  }
`;

const TotalExpenses = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.2rem;
  color: #e0dfe2;
`;

const TopRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: auto;

  @media ${responsive.laptop} {
    justify-content: space-around;
  }
`;

const DoughnutChartWrapper = styled.div`
  margin-top: 3rem;
  width: 100%;
  height: 300px;

  @media ${responsive.laptop} {
    width: 30%;
    height: 400px;
  }
`;

const LineChartWrapper = styled.div`
  margin-top: 5rem;
  width: 100%;
  height: 300px;
`;

const BottomRow = styled.div``;
