import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: 'red',
    height: '800px',
    width: '100px',
  },
});

const Navigation = (props) => {
  const classes = useStyles(props);

  return (
    <>
      <div></div>
      <div className={classes.wrapper}>Navigation</div>
    </>
  );
};

export default Navigation;
