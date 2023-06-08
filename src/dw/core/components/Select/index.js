import React, { Fragment } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import MuiSelect from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import isArray from 'lodash/isArray';

import styles from './index.module.css';

const getRenderChipFunc =
  ({
    onDelete,
    ItemComponent,
    disabled,
    itemProps: { callback, ...itemProps },
  }) =>
  (value, label) => {
    const newItemProps = callback
      ? { ...itemProps, ...callback(value, label) }
      : itemProps;
    return (
      <ItemComponent
        key={value}
        classes={{
          root: styles.chip,
          deleteIcon: styles.chipDeleteIcon,
        }}
        label={label}
        onDelete={
          disabled !== undefined && disabled ? () => {} : () => onDelete(value)
        }
        onMouseDown={event => {
          if (disabled !== undefined && !disabled) event.stopPropagation();
        }}
        {...newItemProps}
      />
    );
  };

const renderValueDefault = ({ valueMapping, renderChip, selected }) => (
  <div className={styles.groups}>
    {isArray(selected)
      ? selected.map(val => renderChip(val, valueMapping[val]))
      : null}
  </div>
);

renderValueDefault.propTypes = {
  valueMapping: PropTypes.arrayOf(PropTypes.string).isRequired,
  renderChip: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(PropTypes.string),
};

renderValueDefault.defaultProps = {
  selected: undefined,
};

const renderGroupedValues = ({ renderChip, selected, options }) => {
  if (!Array.isArray(selected) || selected.length === 0) return null;
  const filteredOptions = options
    .filter(option =>
      option.options
        ? option.options.some(opt => selected.includes(opt.value))
        : selected.includes(option.value)
    )
    .map(option =>
      option.options
        ? {
            ...option,
            options: option.options.filter(opt => selected.includes(opt.value)),
          }
        : option
    );
  const standaloneOptions = filteredOptions.filter(opt => !opt.options);
  return (
    <div className={styles.chips}>
      <div className={classNames(styles.groups, styles.standalone)}>
        {standaloneOptions.map(({ label, value }) => renderChip(value, label))}
      </div>
      {filteredOptions
        .filter(opt => opt.options)
        .map(({ label, value, options: items }) => (
          <Fragment key={`${label}-${value}`}>
            <Typography
              className={styles.group}
              component="legend"
              variant="subtitle2"
            >
              {label}
            </Typography>
            <div className={styles.groups}>
              {items.map(item => renderChip(item.value, item.label))}
            </div>
          </Fragment>
        ))}
    </div>
  );
};

renderGroupedValues.propTypes = {
  renderChip: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.arrayOf(PropTypes.object),
};

renderGroupedValues.defaultProps = {
  selected: undefined,
  options: undefined,
};

const SelectField = ({
  multiple,
  value,
  SelectProps,
  options,
  children,
  onChange,
  ItemComponent,
  itemProps,
  renderValueFunc,
  _reduxForm,
  ...props
}) => {
  let selectedValue = value;
  if (!value || value.length === 0) {
    selectedValue = multiple ? [] : '';
  }
  let selectItems = [];
  const valueMapping = {};
  if (options) {
    options.forEach(option => {
      const items = option.options || [option];
      if (option.options) {
        selectItems.push(
          <MenuItem key={option.label} disabled>
            {option.label}
          </MenuItem>
        );
      }
      items.forEach(item => {
        valueMapping[item.value] = item.label;
        selectItems.push(
          <MenuItem
            value={item.value}
            key={item.value}
            className={option.options && styles.childOption}
          >
            {item.label}
          </MenuItem>
        );
      });
    });
  } else {
    selectItems =
      typeof children === 'function' ? children(selectedValue) : children;
    React.Children.forEach(selectItems, child => {
      // Ignore the first child
      // Skip if child is null
      if (child) {
        valueMapping[child.props.value] = child.props.children;
      }
    });
  }
  return (
    <MuiSelect
      select
      value={selectedValue}
      onChange={e => onChange(e)}
      onDrop={e => {
        e.preventDefault();
      }}
      SelectProps={{
        ...SelectProps,
        classes: {
          select: styles.select,
          ...props.classes,
          ...SelectProps.classes,
        },
        MenuProps: {
          ...SelectProps.MenuProps,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
          PaperProps: {
            style: {
              maxHeight: 256,
            },
          },
        },
        multiple,
        renderValue: multiple
          ? selected => {
              const renderChip = getRenderChipFunc({
                onDelete: v => onChange(selected.filter(val => val !== v)),
                ItemComponent,
                disabled: props.disabled,
                itemProps,
              });
              return options
                ? renderGroupedValues({
                    options,
                    renderChip,
                    selected,
                  })
                : renderValueFunc({
                    valueMapping,
                    renderChip,
                    selected,
                  });
            }
          : undefined,
      }}
      {...props}
    >
      {selectItems}
    </MuiSelect>
  );
};

SelectField.propTypes = {
  // eslint-disable-next-line
  value: PropTypes.any,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  multiple: PropTypes.bool,
  SelectProps: PropTypes.object,
  onChange: PropTypes.func,
  classes: PropTypes.object,
  ItemComponent: PropTypes.oneOfType([PropTypes.elementType, PropTypes.func]),
  itemProps: PropTypes.object,
  renderValueFunc: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  disabled: PropTypes.bool,
  _reduxForm: PropTypes.object,
};

SelectField.defaultProps = {
  multiple: false,
  value: '',
  SelectProps: {},
  children: undefined,
  onChange: () => {},
  classes: {},
  ItemComponent: Chip,
  itemProps: {},
  renderValueFunc: renderValueDefault,
  options: undefined,
  disabled: false,
  _reduxForm: {},
};

export default SelectField;
