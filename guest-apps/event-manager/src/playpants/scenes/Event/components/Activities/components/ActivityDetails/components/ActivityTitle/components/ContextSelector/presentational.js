import React from 'react';
import PropTypes from 'prop-types';

import Select from 'dw/core/components/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

const ContextSelectorComponent = React.forwardRef(
  ({ value, onContextChange, disabled, contextList }, ref) => (
    <span ref={ref}>
      <Select
        data-cy="activityContextSelector"
        value={value}
        onChange={onContextChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">Context</InputAdornment>
          ),
        }}
        disabled={disabled}
      >
        <MenuItem value="" disabled>
          Select a Context
        </MenuItem>
        {contextList &&
          contextList.map(({ id, name }) => (
            <MenuItem key={id} value={id} data-cy="activityContextOption">
              {name}
            </MenuItem>
          ))}
      </Select>
    </span>
  )
);

ContextSelectorComponent.propTypes = {
  contextList: PropTypes.arrayOf(PropTypes.object).isRequired,
  disabled: PropTypes.bool.isRequired,
  onContextChange: PropTypes.func.isRequired,
  value: PropTypes.number,
};
ContextSelectorComponent.defaultProps = {
  value: null,
};

const StatelessContextSelector = ({
  contextList,
  disabled,
  onContextChange,
  value,
  tooltipProps,
}) =>
  tooltipProps.enabled ? (
    <Tooltip title={tooltipProps.msg} TransitionComponent={Zoom}>
      <ContextSelectorComponent
        value={value}
        onContextChange={onContextChange}
        disabled={disabled}
        contextList={contextList}
      />
    </Tooltip>
  ) : (
    <ContextSelectorComponent
      value={value}
      onContextChange={onContextChange}
      disabled={disabled}
      contextList={contextList}
    />
  );

StatelessContextSelector.propTypes = {
  tooltipProps: PropTypes.shape({
    enabled: PropTypes.bool,
    msg: PropTypes.string,
  }).isRequired,
  contextList: PropTypes.arrayOf(PropTypes.object).isRequired,
  disabled: PropTypes.bool.isRequired,
  onContextChange: PropTypes.func.isRequired,
  value: PropTypes.number,
};
StatelessContextSelector.defaultProps = {
  value: null,
};

export default StatelessContextSelector;
