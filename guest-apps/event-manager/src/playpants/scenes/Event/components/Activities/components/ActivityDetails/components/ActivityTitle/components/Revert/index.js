import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'dw/core/helpers/component';

import IconButton from 'dw/core/components/IconButton';
import { revertActivity } from 'playpants/scenes/Event/components/Activities/actions';

export const RevertBase = ({
  eventUrl,
  history,
  onRevertActivity,
  RevertDialog,
  selectedActivity,
}) => {
  const [open, toggleRevertDialog] = useState(false);
  const revertCallback = id => history.push(`${eventUrl}/activities/${id}`);
  const onRevert = currentActivity =>
    onRevertActivity(currentActivity, revertCallback);

  return (
    selectedActivity.publish_on === 'on_start' && (
      <>
        <IconButton
          icon="undo"
          tooltip="Revert activity on end"
          iconProps={{ color: 'secondary' }}
          onClick={() => {
            if (RevertDialog) toggleRevertDialog(true);
            else onRevert(selectedActivity);
          }}
        />
        {RevertDialog && (
          <RevertDialog
            open={open}
            revertCallback={revertCallback}
            selectedActivity={selectedActivity}
            toggleRevertDialog={toggleRevertDialog}
          />
        )}
      </>
    )
  );
};

const mapStateToProps = (state, props) => ({
  history: props.history,
});

const mapDispatchToProps = dispatch => ({
  onRevertActivity: bindActionCreators(revertActivity, dispatch),
});

RevertBase.propTypes = {
  eventUrl: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  onRevertActivity: PropTypes.func.isRequired,
  RevertDialog: PropTypes.elementType,
  selectedActivity: PropTypes.object.isRequired,
};

RevertBase.defaultProps = { RevertDialog: null };

export default connect(mapStateToProps, mapDispatchToProps, RevertBase);
