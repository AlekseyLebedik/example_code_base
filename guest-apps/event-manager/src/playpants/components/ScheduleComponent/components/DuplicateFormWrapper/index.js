import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import history from 'dw/core/helpers/history';

import ModalForm from 'dw/core/components/ModalForm';
import DuplicateEventForm from 'playpants/components/DuplicateEventForm';
import { duplicateEvent } from 'playpants/scenes/Event/components/Details/components/EventActions/components/DuplicateEvent/actions';
import {
  allProjectTitlesEnvsTypesSelector,
  platformSettingsSelector,
} from 'playpants/components/App/selectors';
import { dateToDefaultTimestampWithIntCheck } from 'playpants/helpers/dateTime';
import { prettyPrint } from 'playpants/helpers/json';
import {
  DUPLICATE_EVENT_FORM_NAME,
  DUPLICATE_EVENT_FORM_TITLE,
} from 'playpants/components/DuplicateEventForm/constants';

const DuplicateFormWrapper = ({
  _availableEnvs,
  _availablePlatforms,
  _handleDuplicateEvent,
  baseUrl,
  duplicateEventData,
  onCloseForm,
}) => {
  const { end, event, start } = duplicateEventData;
  const { end_at: endAt, platforms } = event || {};

  const handleFormSubmit = values => {
    const { formDateTime, formEnvironment, formPlatforms } = values;
    const modifications = {
      end_at:
        formDateTime.endDate &&
        dateToDefaultTimestampWithIntCheck(formDateTime.endDate),
      env_type: formEnvironment,
      platforms: prettyPrint(formPlatforms),
      publish_at: dateToDefaultTimestampWithIntCheck(formDateTime.startDate),
    };
    _handleDuplicateEvent(baseUrl, event.id, modifications, history);
    onCloseForm();
  };

  return (
    <ModalForm
      availableEnvs={_availableEnvs}
      availablePlatforms={_availablePlatforms}
      cancelOnBackdropClick
      currentPlatforms={platforms}
      endAt={endAt && end}
      eventData={event || {}}
      FormComponent={DuplicateEventForm}
      formName={DUPLICATE_EVENT_FORM_NAME}
      onCancel={onCloseForm}
      onFormSubmit={handleFormSubmit}
      pristine={false}
      publishAt={start}
      submitText="Duplicate"
      submittingText="Duplicating..."
      title={DUPLICATE_EVENT_FORM_TITLE}
      visible={!!event}
    />
  );
};

DuplicateFormWrapper.propTypes = {
  _handleDuplicateEvent: PropTypes.func.isRequired,
  _availableEnvs: PropTypes.arrayOf(PropTypes.string).isRequired,
  _availablePlatforms: PropTypes.arrayOf(PropTypes.string).isRequired,
  baseUrl: PropTypes.string.isRequired,
  duplicateEventData: PropTypes.shape({
    end: PropTypes.number,
    event: PropTypes.object,
    start: PropTypes.number,
  }),
  onCloseForm: PropTypes.func.isRequired,
};
DuplicateFormWrapper.defaultProps = {
  duplicateEventData: { end: null, event: null, start: null },
};

const mapStateToProps = state => ({
  _availableEnvs: allProjectTitlesEnvsTypesSelector(state),
  _availablePlatforms: platformSettingsSelector(state),
});

const mapDispatchToProps = dispatch => ({
  _handleDuplicateEvent: bindActionCreators(duplicateEvent, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DuplicateFormWrapper);
