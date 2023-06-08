import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import DateTypeField from '../DateTypeField';
import ActivityTypeField from '../ActivityTypeField';

const ActivityForm = props => {
  const { activitySettings, detachedEvent, hasEndDate, onSubmit } = props;
  return (
    <Form onSubmit={onSubmit}>
      <Grid container direction="row" alignItems="center" spacing={2}>
        <Grid item xs={3} classes={{ root: 'flex' }}>
          <DateTypeField disabled={!hasEndDate} detachedEvent={detachedEvent} />
        </Grid>
        <Grid item xs={9}>
          <ActivityTypeField
            activitySettings={activitySettings}
            detachedEvent={detachedEvent}
          />
        </Grid>
      </Grid>
    </Form>
  );
};

ActivityForm.propTypes = {
  activitySettings: PropTypes.arrayOf(PropTypes.object).isRequired,
  detachedEvent: PropTypes.bool.isRequired,
  hasEndDate: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ActivityForm;
