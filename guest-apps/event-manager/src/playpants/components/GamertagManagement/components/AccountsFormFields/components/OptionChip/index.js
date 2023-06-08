import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';

const OptionChip = ({ children, isFocused, removeProps, selectProps }) => {
  const { label } = children.props;
  const unoAccount = label.find(acc => acc.startsWith('UNO'));
  return (
    <Chip
      tabIndex={-1}
      label={unoAccount}
      className={classNames(selectProps.classes.chip, {
        [selectProps.classes.chipFocused]: isFocused,
      })}
      onDelete={removeProps.onClick}
      deleteIcon={<Icon {...removeProps}>delete</Icon>}
    />
  );
};

OptionChip.propTypes = {
  children: PropTypes.node.isRequired,
  isFocused: PropTypes.bool,
  removeProps: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired,
};

OptionChip.defaultProps = { isFocused: false };

export default OptionChip;
