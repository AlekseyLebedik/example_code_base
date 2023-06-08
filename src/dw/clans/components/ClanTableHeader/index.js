import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  clanTableHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  extraMargin: { marginBottom: 8 },
  headerTitle: { color: '#616161', fontSize: 18, margin: 'auto 0' },
  actionButtons: {
    float: 'right',
    color: '#bfbbbb',
    '& button': { padding: 6 },
  },
});

const ClanTableHeader = ({ title, actionButtons }) => {
  const classes = useStyles();
  return (
    <div
      className={classNames(classes.clanTableHeader, {
        [classes.extraMargin]: !actionButtons,
      })}
    >
      <Typography variant="h6" className={classes.headerTitle}>
        {title}
      </Typography>
      <div className={classes.actionButtons}>{actionButtons}</div>
    </div>
  );
};

ClanTableHeader.propTypes = {
  actionButtons: PropTypes.element,
  title: PropTypes.string.isRequired,
};
ClanTableHeader.defaultProps = {
  actionButtons: undefined,
};

export default ClanTableHeader;
