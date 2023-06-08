import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ConfirmDialog from 'dw/core/components/Confirm';
import { patchScheduleStory } from 'playpants/scenes/Timewarp/components/ScheduleStories/components/ScheduleStoriesDetail/components/Details/components/Fields/actions';

function EditScheduleConfirmation({
  cancelOnBackdropClick,
  closeConfirm,
  confirm,
  form,
  handleConfirm,
  isOpen,
  onPatchScheduleStory,
  story,
}) {
  const onConfirm = () => {
    handleConfirm();
    onPatchScheduleStory(
      { name: 'ScheduleStory', schedule: null, storyId: story },
      form
    );
  };
  const confirmMsg = [<div key="confirmMsg">{confirm.confirmMsg}</div>];
  return (
    <ConfirmDialog
      cancelOnBackdropClick={cancelOnBackdropClick}
      content={confirmMsg}
      destructive={confirm.destructive}
      key="confirm-dialog"
      mainButtonLabel={confirm.mainButtonLabel}
      onConfirm={onConfirm}
      onHide={closeConfirm}
      open={isOpen}
      title={confirm.title}
    />
  );
}

EditScheduleConfirmation.propTypes = {
  cancelOnBackdropClick: PropTypes.bool,
  closeConfirm: PropTypes.func.isRequired,
  confirm: PropTypes.shape({
    title: PropTypes.string,
    confirmMsg: PropTypes.node,
    destructive: PropTypes.bool,
    mainButtonLabel: PropTypes.string,
  }),
  form: PropTypes.string,
  handleConfirm: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onPatchScheduleStory: PropTypes.func.isRequired,
  story: PropTypes.number,
};

EditScheduleConfirmation.defaultProps = {
  cancelOnBackdropClick: false,
  confirm: {
    title: 'Confirm Edit Time Warp Schedule',
    confirmMsg:
      'Any manual edits done to a story that was created from a schedule will unlink the schedule, leaving all events in place.',
    destructive: true,
    mainButtonLabel: 'Confirm',
  },
  form: 'CONFIRM_EDIT_TIME_WARP_SCHEDULE',
  story: null,
};

const mapDispatchToProps = (dispatch, { form }) => ({
  onPatchScheduleStory: values => dispatch(patchScheduleStory(values, form)),
});

export default connect(null, mapDispatchToProps)(EditScheduleConfirmation);
