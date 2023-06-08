import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { components } from 'react-select';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';

import styles from '../index.module.css';

function NoOptionsMessage(props) {
  const {
    selectProps: { classes, isAsync, inputValue },
    children,
    innerProps,
  } = props;
  return (
    <Typography
      color="textSecondary"
      className={classes.noOptionsMessage}
      {...innerProps}
    >
      {isAsync && !inputValue ? 'Start typing ...' : children}
    </Typography>
  );
}

NoOptionsMessage.propTypes = {
  selectProps: PropTypes.object.isRequired,
  innerProps: PropTypes.object,
  children: PropTypes.node.isRequired,
};

NoOptionsMessage.defaultProps = {
  innerProps: {},
};

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

inputComponent.propTypes = {
  inputRef: PropTypes.func,
};

inputComponent.defaultProps = {
  inputRef: undefined,
};

function Control(props) {
  const {
    selectProps: { inputRef, classes, variant, size, textFieldProps, isMulti },
    children,
  } = props;
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: classNames(styles.textField, {
            [styles.bgWhite]: variant === 'box',
            [styles.slimSize]: size === 'slim',
            [styles.normalSize]: size === 'normal',
            [styles.bigSize]: size === 'big',
            [styles.textFieldMultiple]: isMulti,
          }),
          inputRef: ref => {
            props.innerRef(ref);
            inputRef(ref);
          },
          children,
          ...props.innerProps,
        },
        classes: {
          underline: classNames({
            [classes.underline]: variant === 'contrast',
          }),
        },
      }}
      {...textFieldProps}
    />
  );
}

Control.propTypes = {
  innerRef: PropTypes.func,
  selectProps: PropTypes.object.isRequired,
  innerProps: PropTypes.object,
  children: PropTypes.node.isRequired,
};

Control.defaultProps = {
  innerRef: undefined,
  innerProps: {},
};

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      disabled={props.isDisabled}
      component="div"
      style={{
        fontWeight: props.isSelected ? 600 : 400,
      }}
      data-cy="autocompleteOption"
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

Option.propTypes = {
  innerRef: PropTypes.func,
  isFocused: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isSelected: PropTypes.bool,
  innerProps: PropTypes.object,
  children: PropTypes.node.isRequired,
};

Option.defaultProps = {
  innerRef: undefined,
  isFocused: false,
  isDisabled: false,
  isSelected: false,
  innerProps: {},
};

function Placeholder(props) {
  const {
    selectProps: { classes, variant, fontSize },
  } = props;
  return (
    <Typography
      color="textSecondary"
      className={classNames(styles.placeholder, classes.placeholder, {
        [styles.white]: variant === 'contrast',
        [styles.withMargin]: variant === 'box',
        [styles.slimFontSize]: fontSize === 'slim',
        [styles.normalFontSize]: fontSize === 'normal',
        [styles.bigFontSize]: fontSize === 'big',
      })}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

Placeholder.propTypes = {
  selectProps: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  innerProps: PropTypes.object,
};

Placeholder.defaultProps = {
  innerProps: {},
};

function SingleValue(props) {
  const {
    selectProps: { variant, fontSize, autoEllipsis },
  } = props;
  return (
    <Typography
      component="span"
      variant="body1"
      className={classNames(styles.singleValue, {
        [styles.white]: variant === 'contrast',
        [styles.withMargin]: variant === 'box',
        [styles.slimFontSize]: fontSize === 'slim',
        [styles.normalFontSize]: fontSize === 'normal',
        [styles.bigFontSize]: fontSize === 'big',
        [styles.autoEllipsis]: autoEllipsis,
      })}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

SingleValue.propTypes = {
  selectProps: PropTypes.object.isRequired,
  innerProps: PropTypes.object,
  children: PropTypes.node.isRequired,
};

SingleValue.defaultProps = {
  innerProps: {},
};

function ValueContainer(props) {
  const { children, isMulti, selectProps } = props;
  return (
    <div
      className={classNames(
        styles.valueContainer,
        selectProps.valueContainerClass,
        {
          [styles.valueContainerMultiple]: isMulti,
        }
      )}
    >
      {children}
    </div>
  );
}

ValueContainer.propTypes = {
  children: PropTypes.node.isRequired,
  isMulti: PropTypes.bool.isRequired,
  selectProps: PropTypes.object.isRequired,
};

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<Icon {...props.removeProps}>cancel</Icon>}
    />
  );
}

MultiValue.propTypes = {
  isFocused: PropTypes.bool,
  selectProps: PropTypes.object.isRequired,
  removeProps: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

MultiValue.defaultProps = {
  isFocused: false,
};

function Menu(props) {
  return (
    <Popper
      key={props.selectProps.inputValue}
      anchorEl={props.selectProps.anchorEl}
      open={props.selectProps.menuIsOpen}
      className={props.selectProps.classes.popper}
    >
      <Paper
        square
        style={{
          width: props.selectProps.anchorEl
            ? props.selectProps.anchorEl.clientWidth
            : null,
        }}
        {...props.innerProps}
      >
        {props.children}
      </Paper>
    </Popper>
  );
}

Menu.propTypes = {
  selectProps: PropTypes.object.isRequired,
  innerProps: PropTypes.object,
  children: PropTypes.node.isRequired,
};

Menu.defaultProps = {
  innerProps: {},
};

function DropdownIndicator(props) {
  return (
    <components.DropdownIndicator {...props}>
      <Icon>arrow_drop_down</Icon>
    </components.DropdownIndicator>
  );
}

export const selectComponents = {
  Control,
  DropdownIndicator,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
  IndicatorSeparator: () => null,
};
