import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const BulkUpload = ({ actionMode, onToggle, isUploadBulk, toolTipClass }) => (
  <Tooltip
    key="tooltip"
    placement="left"
    title={`Bulk ${actionMode === 'add' ? 'Add' : 'Remove'}`}
    classes={{ tooltip: toolTipClass }}
  >
    <IconButton onClick={onToggle} id="bulkAdd">
      <Icon style={{ color: isUploadBulk ? '#8bc34a' : 'rgba(0, 0, 0, 0.54)' }}>
        {isUploadBulk ? 'toggle_on' : 'toggle_off'}
      </Icon>
    </IconButton>
  </Tooltip>
);

BulkUpload.propTypes = {
  actionMode: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  isUploadBulk: PropTypes.bool.isRequired,
  toolTipClass: PropTypes.string,
};

BulkUpload.defaultProps = {
  toolTipClass: '',
};

export default BulkUpload;
