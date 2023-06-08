import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NoResultsIcon from '../../../../icons/NoResultsIcon';
import Svg from '../../../Svg';

const useStyles = makeStyles(theme => ({
  noResults: {
    backgroundColor: '#FFF',
    borderRadius: '4px',
    padding: theme.spacing(2),
    paddingBottom: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
}));

const NoResults = () => {
  const classes = useStyles();

  return (
    <div className={classes.noResults}>
      <Svg size="xlarge" color="approved" icon={<NoResultsIcon />} />{' '}
      <p>Check back later to view performance results.</p>
    </div>
  );
};

export default NoResults;
