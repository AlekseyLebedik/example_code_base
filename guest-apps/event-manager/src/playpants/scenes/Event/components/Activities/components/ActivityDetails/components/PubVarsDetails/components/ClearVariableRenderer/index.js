import React from 'react';
import PropTypes from 'prop-types';

import IconButton from 'dw/core/components/IconButton';

const ClearVariableRenderer = ({ data, clearVariable }) => {
  return (
    data.newValue !== undefined && (
      <IconButton
        color="secondary"
        icon="delete"
        onClick={() => clearVariable(data)}
        tooltip="Clear Variable"
      />
    )
  );
};

ClearVariableRenderer.propTypes = {
  clearVariable: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default ClearVariableRenderer;
