import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import AutoComplete from 'dw/core/components/AutocompleteGeneral';

import { PlatformIcon } from 'dw/core/components/Icons';
import { CONTEXT_TYPE_TITLE } from '../../constants';
import styles from './presentational.module.css';

const Option = props => {
  const { getStyles, data } = props;
  const { label, platform, type } = data;
  return (
    <MenuItem
      disableGutters
      style={getStyles('option', props)}
      {...props.innerProps}
    >
      <div className={styles.itemContainer}>
        <>
          <div className={styles.contextName}>{label}</div>
          {(type === CONTEXT_TYPE_TITLE && (
            <span className={styles.helperText}>&nbsp;(Title context)</span>
          )) ||
            (platform && (
              <div className={styles.contextDetails}>
                <div
                  className={classNames(
                    styles.platform,
                    platform.toLowerCase(),
                    'items-center',
                    'flex'
                  )}
                >
                  <PlatformIcon className={styles.icon} platform={platform} />
                </div>
              </div>
            ))}
        </>
      </div>
    </MenuItem>
  );
};

Option.propTypes = {
  innerProps: PropTypes.object.isRequired,
  getStyles: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const SingleValue = props => {
  const {
    getStyles,
    data,
    selectProps: { classes, ...selectProps },
  } = props;
  const { label, platform, type } = data;
  const { variant, fontSize } = selectProps;
  return (
    <>
      <div
        style={getStyles('singleValue', props)}
        className={classNames({
          [styles.colorContrast]: variant === 'contrast',
        })}
      >
        <div
          className={classNames(styles.selectedContext, classes.selectedLabel, {
            [styles.fontSizeSmall]: fontSize === 'slim',
            [styles.fontSizeNormal]: fontSize === 'normal',
            [styles.fontSizeBig]: fontSize === 'big',
          })}
        >
          {label}
        </div>
        {(type === CONTEXT_TYPE_TITLE && (
          <span
            className={classNames(
              styles.helperText,
              styles.selectedHelperText,
              {
                [styles.fontSizeSmall]: fontSize === 'slim',
                [styles.fontSizeNormal]: fontSize === 'normal',
                [styles.fontSizeBig]: fontSize === 'big',
              }
            )}
          >
            &nbsp;(Title context)
          </span>
        )) ||
          (platform && (
            <PlatformIcon
              className={classNames(styles.icon, styles.selectedIcon)}
              platform={platform}
              size={22}
            />
          ))}
      </div>
    </>
  );
};

SingleValue.propTypes = {
  getStyles: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  selectProps: PropTypes.object,
};

SingleValue.defaultProps = {
  selectProps: {},
};

const ContextSelector = ({
  classes: { autocompleteRoot, ...classes },
  contexts,
  user,
  serviceDependsOnUser,
  onChange,
  value,
  theme,
  variant,
  size,
  fontSize,
  textFieldProps,
  autoCompleteStyles,
}) => {
  const longest = contexts.reduce(
    (curMax, item) => Math.max(curMax, item.label.length),
    0
  );
  const width = longest * 10;
  const customStyles = {
    singleValue: provided => ({
      ...provided,
      display: 'flex',
      width: '100%',
      alignItems: 'baseline',
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : provided.color,
      backgroundColor: state.isSelected
        ? theme.palette.primary.main
        : provided.backgroundColor,
      display: 'flex',
      height: 36,
      paddingTop: 0,
      paddingBottom: 0,
      minWidth: '380px',
      width: `${width}px`,
    }),
    ...autoCompleteStyles,
  };

  const newTheme = oldTheme =>
    createMuiTheme({
      ...oldTheme,
      zIndex: { modal: 1500 },
    });

  return contexts.length ? (
    <div
      className={classNames(
        styles.contextSelectorContainer,
        'row-flex',
        classes.root
      )}
    >
      <MuiThemeProvider theme={newTheme}>
        <AutoComplete
          options={contexts}
          onChange={onChange}
          variant={variant || 'contrast'}
          size={size || 'normal'}
          fontSize={fontSize || 'slim'}
          placeholder="Select context..."
          defaultValue={value}
          components={{
            Option,
            SingleValue,
          }}
          className={classNames(styles.contextSelector, {
            [styles.colorContrast]: variant === 'contrast',
          })}
          isClearable={false}
          valuesOnly={false}
          styles={customStyles}
          textFieldProps={textFieldProps}
          isDisabled={serviceDependsOnUser && !user.userId}
          isRerenderOnDefaultChange
          classes={{ ...classes, root: autocompleteRoot }}
        />
      </MuiThemeProvider>
    </div>
  ) : null;
};

ContextSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  contexts: PropTypes.arrayOf(PropTypes.object),
  theme: PropTypes.object.isRequired,
  value: PropTypes.object,
  user: PropTypes.object,
  serviceDependsOnUser: PropTypes.bool,
  variant: PropTypes.string,
  size: PropTypes.string,
  fontSize: PropTypes.string,
  textFieldProps: PropTypes.object,
  autoCompleteStyles: PropTypes.object,
  classes: PropTypes.object,
};

ContextSelector.defaultProps = {
  contexts: [],
  value: undefined,
  user: {},
  serviceDependsOnUser: false,
  variant: undefined,
  size: undefined,
  fontSize: undefined,
  textFieldProps: undefined,
  autoCompleteStyles: {},
  classes: {},
};

export default withStyles(
  { root: {}, selectedLabel: {}, autocompleteRoot: {} },
  { withTheme: true }
)(ContextSelector);
