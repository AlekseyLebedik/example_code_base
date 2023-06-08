import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Svg from '../Svg';
import ImageIcon from '../../icons/ImageIcon';

import { useStyles } from './styles';

const LoadingImage = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.spinner}>
        <CircularProgress thickness={1.5} color="inherit" size={80} />
      </div>
      <div className={classes.image}>
        <Svg size="xlarge" color="placeholder" icon={<ImageIcon />} />
      </div>
      <p className={classes.text}>Loading...</p>
    </div>
  );
};

export default LoadingImage;
