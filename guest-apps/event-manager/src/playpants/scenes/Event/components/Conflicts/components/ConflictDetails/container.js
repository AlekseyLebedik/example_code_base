import React, { Component } from 'react';
import { connect } from 'dw/core/helpers/component';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { timezoneOrDefaultSelector } from 'playpants/helpers/dateTime';

import { eventDataSelector } from 'playpants/scenes/Event/selectors';
import * as fileStorageActions from 'playpants/scenes/Event/components/Activities/components/ActivityDetails/components/FileStorage/actions';
import { activitySettingsSelector } from 'playpants/components/App/selectors';

import {
  conflictActivityDetailsSelector,
  conflictDetailsSelector,
} from '../../selectors';

import ConflictDetailsPresentational from './presentational';

export class ConflictDetailsBase extends Component {
  static propTypes = {
    activitySettings: PropTypes.arrayOf(PropTypes.object).isRequired,
    conflictActivityDetails: PropTypes.object,
    conflictDetails: PropTypes.object,
    eventData: PropTypes.object,
    fileDetailsFetch: PropTypes.func.isRequired,
    selectedItemId: PropTypes.string,
    userTimezone: PropTypes.string.isRequired,
  };

  static defaultProps = {
    conflictActivityDetails: {},
    conflictDetails: {},
    eventData: {},
    selectedItemId: undefined,
  };

  constructor(props) {
    super(props);

    this.getFileUploadDetails();
  }

  componentDidUpdate(prevProps) {
    const { selectedItemId } = this.props;
    if (prevProps.selectedItemId !== selectedItemId) {
      this.getFileUploadDetails();
    }
  }

  getFileUploadDetails() {
    const { conflictActivityDetails, fileDetailsFetch } = this.props;

    if (
      conflictActivityDetails &&
      conflictActivityDetails?.event_activity?.type === 'pubstorage' &&
      conflictActivityDetails?.overlapping_event_activity?.type === 'pubstorage'
    ) {
      fileDetailsFetch({
        activity: {
          files: [
            ...JSON.parse(conflictActivityDetails.event_activity.activity)
              .files,
            ...JSON.parse(
              conflictActivityDetails.overlapping_event_activity.activity
            ).files,
          ],
        },
      });
    }
  }

  render() {
    return <ConflictDetailsPresentational {...this.props} />;
  }
}

const mapStateToProps = (state, { match }) => ({
  activitySettings: activitySettingsSelector(state),
  conflictActivityDetails: conflictActivityDetailsSelector(state, match),
  conflictDetails: conflictDetailsSelector(state, match),
  eventData: eventDataSelector(state),
  userTimezone: timezoneOrDefaultSelector(state),
});

const mapDispatchToProps = dispatch => ({
  fileDetailsFetch: bindActionCreators(
    fileStorageActions.fileDetailsFetch,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  ConflictDetailsBase
);
