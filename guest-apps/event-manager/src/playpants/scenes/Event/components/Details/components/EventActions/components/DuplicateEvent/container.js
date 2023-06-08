import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'dw/core/helpers/component';

import { prettyPrint } from 'playpants/helpers/json';
import {
  getBaseURL,
  allProjectTitlesEnvsTypesSelector,
  platformSettingsSelector,
} from 'playpants/components/App/selectors';
import { DUPLICATE_EVENT_FORM_NAME } from 'playpants/components/DuplicateEventForm/constants';
import * as actions from './actions';
import DuplicateEventPresentational from './presentational';

export const DuplicateEvent = props => {
  const {
    availablePlatforms,
    baseUrl,
    availableEnvs,
    disabled,
    eventData,
    handleDuplicateEvent,
    history,
  } = props;
  const { id, platforms, publish_at: publishAt, end_at: endAt } = eventData;
  const duplicateOnSubmit = values => {
    const { formDateTime, formEnvironment, formPlatforms } = values;
    const modifications = {
      end_at: formDateTime.endDate || null,
      env_type: formEnvironment,
      platforms: prettyPrint(formPlatforms),
      publish_at: formDateTime.startDate,
    };
    return handleDuplicateEvent(
      baseUrl,
      id,
      modifications,
      history,
      DUPLICATE_EVENT_FORM_NAME
    );
  };

  return (
    !disabled && (
      <DuplicateEventPresentational
        availableEnvs={availableEnvs}
        availablePlatforms={availablePlatforms}
        currentPlatforms={platforms}
        endAt={endAt}
        eventData={eventData}
        publishAt={publishAt}
        handleFormSubmit={duplicateOnSubmit}
      />
    )
  );
};

const mapStateToProps = state => ({
  baseUrl: getBaseURL(state),
  availableEnvs: allProjectTitlesEnvsTypesSelector(state),
  availablePlatforms: platformSettingsSelector(state),
});

const mapDispatchToProps = dispatch => ({
  handleDuplicateEvent: bindActionCreators(actions.duplicateEvent, dispatch),
});

DuplicateEvent.propTypes = {
  availableEnvs: PropTypes.arrayOf(PropTypes.string).isRequired,
  availablePlatforms: PropTypes.arrayOf(PropTypes.string).isRequired,
  baseUrl: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  eventData: PropTypes.object.isRequired,
  handleDuplicateEvent: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps, DuplicateEvent);
