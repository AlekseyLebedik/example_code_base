import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import Grid from '@material-ui/core/Grid';

import {
  isConfiguredSelector,
  storiesDataSelector,
} from 'playpants/components/App/selectors';

import CreatedBy from './components/CreatedBy';
import Date from './components/Date';
import DateRange from './components/DateRange';
import Duration from './components/Duration';
import Environment from './components/Environment';
import EventProject from './components/EventProject';
import EventType from './components/EventType';
import Platforms from './components/Platforms';
import Story from './components/Story';
import EventName from './components/EventName';

export const FieldsBase = props => (
  <Grid container spacing={2}>
    {!props.eventData.project && (
      <Grid item xs={12}>
        <EventProject />
      </Grid>
    )}
    {!props.isEventManagerEvent && (
      <Grid item xs={12}>
        <EventType {...props} />
      </Grid>
    )}
    <Grid item xs={12}>
      <EventName {...props} />
    </Grid>
    {!props.isTemplateView &&
      props.isConfigured.stories &&
      !isEmpty(props.storiesData) && (
        <Grid item xs={12}>
          <Story {...props} />
        </Grid>
      )}

    <Grid item xs={12}>
      <Environment {...props} />
    </Grid>
    {!props.isTemplateView && (
      <Grid item xs={12}>
        <Platforms {...props} />
      </Grid>
    )}
    <Grid item xs={12}>
      <CreatedBy {...props} />
    </Grid>
    {props.isTemplateView && (
      <Grid item xs={12}>
        <Duration {...props} />
      </Grid>
    )}
    <Grid item xs={12}>
      <Date {...props} type="created_at" label="Created At" disabled />
    </Grid>
    {!props.isTemplateView && (
      <Grid item xs={12}>
        <DateRange {...props} />
      </Grid>
    )}
  </Grid>
);

FieldsBase.propTypes = {
  classes: PropTypes.object.isRequired,
  eventData: PropTypes.object.isRequired,
  isConfigured: PropTypes.object.isRequired,
  isEventManagerEvent: PropTypes.bool.isRequired,
  isTemplateView: PropTypes.bool,
  permissions: PropTypes.object.isRequired,
  storiesData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

FieldsBase.defaultProps = {
  isTemplateView: false,
};

const mapStateToProps = state => ({
  storiesData: storiesDataSelector(state),
  isConfigured: isConfiguredSelector(state),
});

export default connect(mapStateToProps)(FieldsBase);
