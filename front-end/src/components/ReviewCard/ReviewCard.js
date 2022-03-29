import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Paper, Rating } from '@mui/material';
import Typography from 'components/Typography/Typography';

const ReviewCard = ({
  profile,
  title,
  description,
  createdAt,
  rating,
  author,
  // eslint-disable-next-line no-unused-vars
  verified,
}) => {
  return (
    <Paper
      sx={{
        paddingTop: 2,
        height: '100%',
        position: 'relative',
      }}
      elevation={4}
    >
      <ReviewContent>
        <Typography fontWeight={700} align={'center'}>
          {title}
        </Typography>
        <Typography
          fontSize={14}
          marginTop={1}
          marginBottom={10}
          align={'center'}
        >
          {description}
        </Typography>
      </ReviewContent>
      <ReviewDetails>
        <Rating
          name="read-only"
          value={rating}
          precision={0.1}
          defaultValue={0.0}
          size={'small'}
          readOnly
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
        />
        {profile && <Button variant="text">Usuń</Button>}
        {!profile && (
          <Typography fontSize={12}>
            {new Intl.DateTimeFormat('pl-PL', {
              dateStyle: 'medium',
            }).format(new Date(createdAt))}
          </Typography>
        )}
      </ReviewDetails>
      <ReviewCardFooter>{profile ? 'Uncharted' : author}</ReviewCardFooter>
    </Paper>
  );
};

export default ReviewCard;

const ReviewContent = styled.div`
  padding: 0 0.5rem;
`;

const ReviewDetails = styled.div`
  margin: 0.4rem auto;
  padding: 0 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 45px;
`;

const ReviewCardFooter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  font-weight: 500;
  color: ${({ theme }) => theme.darkBlue};
  background: ${({ theme }) => theme.primaryLight};
  padding: 0.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 4px 4px;
`;

ReviewCard.propTypes = {
  profile: PropTypes.bool,
  author: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  verified: PropTypes.any,
};

ReviewCard.defaultProps = {
  profile: true,
};
