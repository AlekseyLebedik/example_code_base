import React from 'react';
import PropTypes from 'prop-types';
import { COREVIZ_HOST } from '@demonware/devzone-core/config';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { makeStyles } from '@material-ui/core/styles';
import {
  COREVIZ_ACTIVE_DASHBOARD_ID,
  COREVIZ_COMPLETE_DASHBOARD_ID,
  COREVIZ_MATCHMAKING_DASHBOARD_ID,
} from '../../../constants';

const useStyles = makeStyles(() => ({
  button: {
    '&:hover': {
      color: '#000',
    },
  },
}));

const DashboardButton = ({ name, status, type, children }) => {
  const classes = useStyles();

  const getDashboardId = () => {
    if (type === 'matchmaking') return COREVIZ_MATCHMAKING_DASHBOARD_ID;
    if (status === 'Done') return COREVIZ_COMPLETE_DASHBOARD_ID;
    return COREVIZ_ACTIVE_DASHBOARD_ID;
  };

  return (
    <Button
      className={classes.button}
      variant="outlined"
      size="small"
      target="_blank"
      href={`${COREVIZ_HOST}/dashboards/${getDashboardId()}?experiment=${encodeURI(
        name
      )}`}
      endIcon={<ArrowForwardIosIcon style={{ fontSize: 11 }} />}
      fullWidth
    >
      {children}
    </Button>
  );
};

DashboardButton.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default DashboardButton;
