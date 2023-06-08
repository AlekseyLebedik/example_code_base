import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import filter from 'lodash/filter';
import map from 'lodash/map';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import SlackSendButton from './SlackSendButton';
import Typeahead from '../../../components/Typeahead';

import {
  sendApproval,
  fetchSlackUsers,
  updateActiveTestApprovers,
} from './helpers';
import { fetchAllTests } from '../../Table/helpers';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 0,
    marginBottom: theme.spacing(2),
  },
  error: {
    color: theme.palette.error.main,
    marginTop: '5px',
    fontWeight: '700',
    fontSize: '11px',
  },
}));

const SlackApproval = () => {
  const classes = useStyles();
  const { testId } = useParams();

  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState([]);
  const [buttonStatus, setButtonStatus] = useState('intitial');

  const dispatch = useDispatch();

  const getOptions = async () => {
    try {
      const response = await fetchSlackUsers();
      setOptions(response);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Fetch Slack Users error: ', err);
    }
  };

  useEffect(() => {
    getOptions();
  }, []);

  const onSubmit = async () => {
    setError([]);
    setButtonStatus('sending');

    const results = await sendApproval({ options, selected, testId });
    const hasErrors = filter(results, { status: 'error' });
    // Maybe set error message with users that it failed on
    if (hasErrors.length !== 0) {
      const errorDetails = map(results, r => {
        if (!r.user) return 'Error. Please try again.';
        return `${r.user} - ${r.details.data.response_metadata.messages[0]}`;
      });
      setError(errorDetails);
      setButtonStatus('initial');
    } else {
      setButtonStatus('success');
      setTimeout(() => {
        setButtonStatus('intial');
        setSelected([]);
      }, 1250);

      dispatch(updateActiveTestApprovers({ testId }));
      dispatch(fetchAllTests());
    }
  };

  const handleSelectChange = newSelection => {
    if (error) {
      setButtonStatus('intitial');
      setError([]);
    }
    setSelected(newSelection);
  };

  return (
    <div className={classes.root}>
      <Grid style={{ alignItems: 'center' }} container spacing={1}>
        <Grid item xs={9} sm={8} lg={8}>
          <Typeahead
            placeholder={
              options.length !== 0
                ? 'Select a slack user for approval'
                : 'Loading slack users...'
            }
            options={options.filter(o => o.type === 'user')}
            selected={selected}
            setSelected={handleSelectChange}
          />
        </Grid>
        <Grid item xs={3} sm={4} lg={4}>
          <SlackSendButton
            buttonStatus={buttonStatus}
            onClick={onSubmit}
            disabled={selected.length === 0}
          >
            Request
          </SlackSendButton>
        </Grid>
      </Grid>
      {error.length !== 0 &&
        map(error, (e, key) => (
          <div key={key} className={classes.error}>
            {e}
          </div>
        ))}
    </div>
  );
};

export default SlackApproval;
