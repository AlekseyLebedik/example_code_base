import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import { titleNameSelector } from 'dw/player-tooling/scenes/GameData/selectors';

export const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.primary.main,
  },
}));

const TitleLink = ({ onClick, titleId }) => {
  const classes = useStyles();
  const titleName = useSelector(titleNameSelector)(titleId);
  return (
    <Tooltip title={`Go to ${titleName} Player Activity`}>
      <a className={classes.link} onClick={() => onClick('titles', titleId)}>
        {titleName}
      </a>
    </Tooltip>
  );
};

TitleLink.propTypes = {
  onClick: PropTypes.func.isRequired,
  titleId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default TitleLink;
