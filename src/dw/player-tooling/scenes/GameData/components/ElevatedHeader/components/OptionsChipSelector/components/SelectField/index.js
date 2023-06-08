import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import MuiSelect from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import styles from './index.module.css';

export const getRenderChipFunc =
  ({
    itemProps: {
      groupBy,
      highlightedOption,
      setHighlightedOption,
      ...itemProps
    },
    onDelete,
  }) =>
  (groupLabel, value, label) => {
    const clickable = groupLabel === 'globals' || groupLabel === groupBy;
    return (
      <Chip
        classes={{
          root: cn(styles.chip, { [styles.chipHover]: clickable }),
          colorPrimary: styles.colorPrimary,
          ...(!clickable && { outlined: styles.outlinedDisabled }),
          outlinedPrimary: styles.outlinedPrimary,
          deleteIcon: styles.chipDeleteIcon,
          label: styles.chipLabel,
        }}
        clickable={clickable}
        color={clickable ? 'primary' : 'default'}
        key={value}
        label={label}
        onClick={e => {
          e.stopPropagation();
          if (clickable) {
            setHighlightedOption(value);
            const anchor = document.getElementById(value);
            if (anchor)
              anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
        onDelete={() => onDelete(groupLabel, value)}
        variant={value === highlightedOption ? 'default' : 'outlined'}
        {...itemProps}
      />
    );
  };

export const renderGroupedValues = ({ options, renderChip, selected }) => {
  if (!Array.isArray(selected) || selected.length === 0) return null;
  const filteredOptions = options
    .filter(option => option.options.some(opt => selected.includes(opt.value)))
    .map(option => ({
      ...option,
      options: option.options.filter(opt => selected.includes(opt.value)),
    }));
  return (
    <div className={styles.chips}>
      {filteredOptions.map(({ groupLabel, options: items }, i) => (
        <Fragment key={groupLabel}>
          {items.map(item => renderChip(groupLabel, item.value, item.label))}
          <span className={styles.divider}>
            {i !== filteredOptions.length - 1 && '|'}
          </span>
        </Fragment>
      ))}
    </div>
  );
};

renderGroupedValues.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  renderChip: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(PropTypes.string),
};

renderGroupedValues.defaultProps = {
  options: undefined,
  selected: undefined,
};

const IconComponent = () => (
  <Tooltip title="More Services and Titles" className={styles.selectIcon}>
    <Icon>more_vert</Icon>
  </Tooltip>
);

const SelectField = ({ itemProps, onClick, onDelete, options, value }) => (
  <MuiSelect
    InputProps={{ disableUnderline: true }}
    onChange={e => e.preventDefault()}
    onClick={onClick}
    onDrop={e => e.preventDefault()}
    select
    value={value}
    SelectProps={{
      classes: { select: styles.select },
      IconComponent,
      multiple: true,
      onOpen: () => {},
      open: false,
      renderValue: selected => {
        const renderChip = getRenderChipFunc({
          onDelete,
          itemProps,
        });
        return renderGroupedValues({
          options,
          renderChip,
          selected,
        });
      },
    }}
  >
    {/* Material-UI: `children` must be passed when using the `TextField` component with `select` */}
    []
  </MuiSelect>
);

SelectField.propTypes = {
  itemProps: PropTypes.object,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
};

SelectField.defaultProps = {
  itemProps: {},
  onClick: () => {},
  onDelete: () => {},
  value: [],
};

export default SelectField;
