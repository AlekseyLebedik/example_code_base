import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import styles from './index.module.css';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultipleSelect = ({
  avatarRenderer,
  classes,
  disabled,
  error,
  helperText,
  label: selectLabel,
  multiple,
  onBlur,
  onChange,
  options,
  value: selected,
  ...props
}) => {
  const handleMultiChange = item => {
    let values;
    if (selected.includes(item)) {
      values = selected.filter(i => i !== item);
    } else {
      values = [...selected, item];
    }
    onChange(values);
  };

  const handleRadioSelection = item => {
    if (item === selected) onChange('');
    else onChange(item);
  };

  const handleChange = item => {
    if (multiple) handleMultiChange(item);
    else handleRadioSelection(item);
  };

  return (
    <div>
      <FormControl fullWidth error={error}>
        {selectLabel && <InputLabel>{selectLabel}</InputLabel>}
        <Select
          classes={{ icon: styles.icon, ...classes }}
          disabled={disabled}
          label={selectLabel}
          multiple={multiple}
          open={false}
          MenuProps={MenuProps}
          renderValue={values => (
            <div className={styles.chips}>
              {values.map(
                ({ value, label, disabled: optionDisabled = false }) => (
                  <Chip
                    {...(avatarRenderer && {
                      avatar: (
                        <Avatar className={styles.avatar}>
                          {avatarRenderer(value)}
                        </Avatar>
                      ),
                    })}
                    {...(disabled && {
                      style: {
                        cursor: 'default',
                        backgroundColor: '##616161',
                        opacity: 0.6,
                      },
                    })}
                    className={classNames(styles.chip, {
                      [styles.selectedChip]: selected.includes(value),
                    })}
                    disabled={optionDisabled}
                    key={value}
                    label={label}
                    onClick={() => {
                      if (!disabled) handleChange(value);
                    }}
                  />
                )
              )}
            </div>
          )}
          value={options}
          {...props}
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </div>
  );
};

MultipleSelect.propTypes = {
  avatarRenderer: PropTypes.func,
  classes: PropTypes.object,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

MultipleSelect.defaultProps = {
  avatarRenderer: null,
  classes: {},
  disabled: false,
  error: false,
  helperText: '',
  label: null,
  multiple: false,
  onBlur: null,
  value: '',
};

export default MultipleSelect;
