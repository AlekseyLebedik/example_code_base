import React from 'react';
import PropTypes from 'prop-types';

import ModalForm from 'dw/core/components/ModalForm';
import EditScheduleConfirmation from 'playpants/components/EditScheduleConfirmation';
import CreateEventForm from './components/CreateEventForm';
import FormTitle from './components/FormTitle';

const CreateEventDialogStateless = props => {
  const {
    defaultToInfo,
    displayInfoEvents,
    formName,
    globalChecked,
    globalLocked,
    handleFormSubmit,
    initialValues,
    onCancel,
    scheduleWarningOpen,
    setGlobalCheckbox,
    setToggleTypeOn,
    submitCreateEvent,
    title,
    toggleScheduleWarningOpen,
    toggleTypeOn,
  } = props;

  return (
    <>
      <ModalForm
        {...props}
        displayInfoEvents={displayInfoEvents}
        FormComponent={CreateEventForm}
        formName={formName}
        maxWidth={700}
        onCancel={onCancel}
        onFormSubmit={handleFormSubmit}
        submitText="Create"
        submittingText="Submitting"
        title={
          <FormTitle
            defaultToInfo={defaultToInfo}
            displayInfoEvents={displayInfoEvents}
            globalChecked={globalChecked}
            setGlobalCheckbox={setGlobalCheckbox}
            setToggleTypeOn={setToggleTypeOn}
            disabled={globalLocked}
            title={title}
            toggleTypeOn={toggleTypeOn}
          />
        }
        toggleTypeOn={toggleTypeOn}
        disableEnforceFocus
      />
      <EditScheduleConfirmation
        closeConfirm={toggleScheduleWarningOpen}
        form={formName}
        handleConfirm={submitCreateEvent}
        isOpen={scheduleWarningOpen}
        story={initialValues.story}
      />
    </>
  );
};

CreateEventDialogStateless.propTypes = {
  defaultToInfo: PropTypes.bool.isRequired,
  displayInfoEvents: PropTypes.bool.isRequired,
  formName: PropTypes.string.isRequired,
  globalChecked: PropTypes.bool.isRequired,
  globalLocked: PropTypes.bool.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  scheduleWarningOpen: PropTypes.bool.isRequired,
  setGlobalCheckbox: PropTypes.func.isRequired,
  setToggleAdvancedOn: PropTypes.func.isRequired,
  setToggleTypeOn: PropTypes.func.isRequired,
  submitCreateEvent: PropTypes.func.isRequired,
  title: PropTypes.string,
  toggleAdvancedOn: PropTypes.bool.isRequired,
  toggleScheduleWarningOpen: PropTypes.func.isRequired,
  toggleTypeOn: PropTypes.bool.isRequired,
};

CreateEventDialogStateless.defaultProps = {
  title: 'Create',
};

export default CreateEventDialogStateless;
