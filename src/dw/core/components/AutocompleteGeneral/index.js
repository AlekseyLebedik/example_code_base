import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import AsyncCreatableSelect from 'react-select/async-creatable';
import CreatableSelect from 'react-select/creatable';
import AsyncSelect from 'react-select/async';
import hexToRgba from 'hex-rgba';

import { withStyles } from '@material-ui/core/styles';
import last from 'lodash/last';
import omit from 'lodash/omit';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

import { selectComponents } from './components';
import styles from './index.module.css';

const muiStyles = theme => {
  const color = theme.palette.common.white;
  return {
    root: {},
    chip: {
      margin: `${theme.spacing(1 / 2)}px ${theme.spacing(1 / 4)}px`,
    },
    chipFocused: {
      backgroundColor: emphasize(
        theme.palette.type === 'light'
          ? theme.palette.grey[300]
          : theme.palette.grey[700],
        0.08
      ),
    },
    noOptionsMessage: {
      padding: `${theme.spacing()}px ${theme.spacing(2)}px`,
    },
    popper: {
      zIndex: theme.zIndex.modal + 1,
    },
    divider: {
      height: theme.spacing(2),
    },
    focused: {
      color: color.concat(' !important'),
    },
    disabled: {},
    error: {},
    underline: {
      '&:after': {
        borderBottom: '1px solid '.concat(color),
      },
      '&:before': {
        borderBottom: '1px solid '.concat(color),
      },
      '&:hover:not($disabled):not($focused):not($error):before': {
        borderBottom: `1px solid ${color} !important`,
      },
    },
    selectedLabel: {},
    placeholder: {},
  };
};

const OptionPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
]);

const optionSelector = option =>
  typeof option === 'string' ? { value: option, label: option } : option;

const validateValue = value =>
  value && !Array.isArray(value) ? optionSelector(value) : value;

class AutoCompleteBase extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    isMulti: PropTypes.bool,
    isClearable: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isSearchable: PropTypes.bool,
    isRerenderOnDefaultChange: PropTypes.bool,
    options: PropTypes.arrayOf(OptionPropType),
    defaultOptions: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.arrayOf(OptionPropType),
    ]),
    defaultValue: PropTypes.oneOfType([
      OptionPropType,
      PropTypes.arrayOf(OptionPropType),
    ]),
    onAdd: PropTypes.func,
    loadOptions: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    placeholder: PropTypes.string,
    valuesOnly: PropTypes.bool,
    variant: PropTypes.oneOf(['default', 'contrast', 'box']),
    size: PropTypes.oneOf(['big', 'normal', 'slim']),
    fontSize: PropTypes.oneOf(['big', 'normal', 'slim']),
    autoEllipsis: PropTypes.bool,
    regularInputMode: PropTypes.bool,
    components: PropTypes.object,
    inputValue: PropTypes.string,
    onInputChange: PropTypes.func,
    textFieldProps: PropTypes.object,
  };

  static defaultProps = {
    isMulti: false,
    isClearable: true,
    isSearchable: true,
    isDisabled: false,
    isRerenderOnDefaultChange: false,
    options: [],
    defaultOptions: undefined,
    defaultValue: undefined,
    onAdd: undefined,
    loadOptions: undefined,
    label: undefined,
    error: false,
    helperText: undefined,
    placeholder: undefined,
    valuesOnly: true,
    regularInputMode: undefined,
    variant: 'default',
    size: 'big',
    fontSize: 'slim',
    autoEllipsis: false,
    components: {},
    onInputChange: undefined,
    inputValue: undefined,
    textFieldProps: {},
  };

  state = {
    anchorEl: null,
    defaultValue: validateValue(this.props.defaultValue),
    searchValue: '',
    searchSelection: this.props.regularInputMode && this.props.defaultValue,
  };

  selectRef = React.createRef();

  static getDerivedStateFromProps(props, state) {
    const { isRerenderOnDefaultChange, defaultValue } = props;
    if (state.defaultValue !== defaultValue && isRerenderOnDefaultChange) {
      return {
        defaultValue: validateValue(defaultValue),
        searchSelection: validateValue(defaultValue),
      };
    }
    return null;
  }

  handleFocus = () => {
    if (!this.selectRef.current) return;
    const selectInstance =
      this.selectRef.current.select?.select?.select ||
      this.selectRef.current.select?.select ||
      this.selectRef.current.select;
    if (!selectInstance.hasValue()) return; // No value, nothing to select.

    const selectValElem = selectInstance.controlRef.querySelector(
      '[class*=singleValue]'
    ); // Element which has the selected text
    if (!selectValElem) return;

    if (window.getSelection && document.createRange) {
      // Every browser
      const sel = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(selectValElem);
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (document.selection && document.body.createTextRange) {
      // Microsoft
      const textRange = document.body.createTextRange();
      textRange.moveToElementText(selectValElem);
      textRange.select();
    }
  };

  getOptions = () => this.props.options.map(option => optionSelector(option));

  handleChange = (rawValue, action) => {
    if (action.action === 'create-option' && this.props.onAdd) {
      let newOption;
      if (this.props.isMulti) {
        newOption = last(rawValue).value;
      } else {
        newOption = rawValue.value;
      }
      this.props.onAdd(newOption);
    }

    let value;
    if (this.props.isMulti) {
      value = rawValue
        ? rawValue.map(v => (this.props.valuesOnly ? v.value : v))
        : [];
    } else {
      value = !(rawValue && this.props.valuesOnly) ? rawValue : rawValue.value;
    }

    if (this.props.regularInputMode) {
      this.setState({
        searchSelection: rawValue && rawValue.label,
        searchValue: rawValue && rawValue.label,
      });
    }

    this.props.onChange(value);
  };

  handleSearchInput = (e, { action }) => {
    if (
      action === 'menu-close' ||
      action === 'input-blur' ||
      action === 'set-value'
    ) {
      return;
    }
    this.setState({ searchValue: e });
  };

  render() {
    const {
      // Text Field props
      theme,
      label,
      error,
      helperText,
      onAdd,
      regularInputMode,
      components: customComponents,
      textFieldProps,
      inputValue,
      onInputChange,
      ...props
    } = this.props;
    const { defaultValue, searchValue, searchSelection } = this.state;

    const color =
      props.variant === 'contrast'
        ? theme.palette.common.white
        : theme.palette.text.primary;

    const selectStyles = {
      input: base => ({
        ...base,
        color,
        marginLeft: props.variant === 'box' ? 8 : 0,
        '& input': {
          font: 'inherit',
        },
      }),
      indicatorsContainer: base => ({
        ...base,
        cursor: 'pointer',
      }),
      dropdownIndicator: base => ({
        ...base,
        color: props.isDisabled ? 'rgb(204, 204, 204)' : hexToRgba(color, 87),
        ':hover': { color },
      }),
      container: base => ({
        ...base,
        width: '100%',
      }),
      ...props.styles,
    };
    let SelectComponent = Select;
    if (onAdd && props.loadOptions) SelectComponent = AsyncCreatableSelect;
    else if (props.loadOptions) SelectComponent = AsyncSelect;
    else if (onAdd) SelectComponent = CreatableSelect;
    const { root, ...otherClasses } = this.props.classes;
    return (
      <div className={classNames(styles.root, root)}>
        <SelectComponent
          {...props}
          ref={this.selectRef}
          classes={otherClasses}
          value={searchSelection}
          inputValue={regularInputMode ? searchValue || inputValue : inputValue}
          anchorEl={this.state.anchorEl}
          inputRef={anchorEl =>
            this.setState(state => (state.anchorEl ? null : { anchorEl }))
          }
          onFocus={this.handleFocus}
          onChange={this.handleChange}
          onInputChange={
            onInputChange ||
            (regularInputMode
              ? (e, action) => this.handleSearchInput(e, action)
              : null)
          }
          styles={selectStyles}
          options={this.getOptions()}
          inputId={regularInputMode && 'search'}
          components={{ ...selectComponents, ...customComponents }}
          textFieldProps={{
            label,
            InputLabelProps: {
              shrink: true,
              classes: {
                root: ['contrast', 'box'].includes(props.variant)
                  ? styles.white
                  : undefined,
              },
            },
            error,
            helperText,
            ...textFieldProps,
          }}
          isAsync={Boolean(props.loadOptions)}
          defaultValue={defaultValue}
        />
      </div>
    );
  }
}

const AutocompleteGeneral = withStyles(muiStyles, {
  withTheme: true,
})(({ value, onBlur, handleBlur, ...props }) => (
  <AutoCompleteBase {...props} {...(handleBlur && { onBlur })} />
));

AutocompleteGeneral.displayName = 'AutocompleteGeneral';
AutocompleteGeneral.propTypes = omit(AutoCompleteBase.propTypes, [
  'theme',
  'classes',
]);
AutocompleteGeneral.defaultProps = omit(AutoCompleteBase.defaultProps, [
  'theme',
  'classes',
]);

export default AutocompleteGeneral;
