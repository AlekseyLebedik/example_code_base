import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';

import AsyncComponent from 'dw/core/components/AsyncComponent';

const Monaco = AsyncComponent(() =>
  import(
    /* webpackChunkName: "MonacoEditor" */ 'dw/core/components/FormFields/Monaco'
  )
);

const styles = theme => {
  const light = theme.palette.type === 'light';
  const bottomLineColor = light
    ? 'rgba(0, 0, 0, 0.42)'
    : 'rgba(255, 255, 255, 0.7)';
  return {
    /* Styles applied to the root element if the component is focused. */
    focused: {},

    /* Styles applied to the root element if `disabled={true}`. */
    disabled: {},

    /* Styles applied to the root element if `error={true}`. */
    error: {},

    underline: {
      '&:after': {
        borderBottom: '2px solid '.concat(
          theme.palette.primary[light ? 'dark' : 'light']
        ),
        left: 0,
        bottom: -2,
        // Doing the other way around crash on IE 11 "''" https://github.com/cssinjs/jss/issues/242
        content: '""',
        position: 'absolute',
        right: 0,
        transform: 'scaleX(0)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.easeOut,
        }),
        pointerEvents: 'none', // Transparent to the hover style.
      },
      '&$focused:after': {
        transform: 'scaleX(1)',
      },
      '&$error:after': {
        borderBottomColor: theme.palette.error.main,
        transform: 'scaleX(1)', // error is always underlined in red
      },
      '&:before': {
        borderBottom: '1px solid '.concat(bottomLineColor),
        left: 0,
        bottom: -2,
        // Doing the other way around crash on IE 11 "''" https://github.com/cssinjs/jss/issues/242
        content: '"\\00a0"',
        position: 'absolute',
        right: 0,
        transition: theme.transitions.create('border-bottom-color', {
          duration: theme.transitions.duration.shorter,
        }),
        pointerEvents: 'none', // Transparent to the hover style.
      },
      '&:hover:not($disabled):not($focused):not($error):before': {
        borderBottom: '2px solid '.concat(theme.palette.text.primary),
      },
      '&$disabled:before': {
        borderBottom: '1px dotted '.concat(bottomLineColor),
      },
    },
    withLabel: {
      marginTop: 20,
    },
  };
};

class CodeEditor extends Component {
  state = {
    focused: false,
  };

  render() {
    const {
      label,
      input,
      meta: { touched, error },
      mode,
      className,
      lineWrapping,
      classes,
    } = this.props;
    return (
      <FormControl error={Boolean(touched && error)} fullWidth>
        <InputLabel
          className={classes.bodyLabel}
          focused={this.state.focused}
          shrink
        >
          {label}
        </InputLabel>
        <Monaco
          className={classNames(className, classes.underline, {
            [classes.withLabel]: Boolean(label),
            [classes.focused]: this.state.focused,
            [classes.error]: Boolean(touched && error),
          })}
          height={200}
          onChange={newValue => input.onChange(newValue)}
          onBlur={() => this.setState({ focused: false })}
          onFocus={() => this.setState({ focused: true })}
          options={{
            fontSize: 12,
            minimap: { enabled: false },
            readOnly: false,
            scrollBeyondLastLine: false,
            wordWrap: lineWrapping ? 'on' : 'off',
            wrappingIndent: 'indent',
          }}
          language={mode}
          value={input.value || ''}
        />
        {touched && error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    );
  }
}

CodeEditor.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.shape({ touched: PropTypes.bool, error: PropTypes.string }),
  mode: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  className: PropTypes.string,
  lineWrapping: PropTypes.bool,
  classes: PropTypes.object.isRequired,
};

CodeEditor.defaultProps = {
  label: undefined,
  meta: {},
  className: undefined,
  lineWrapping: false,
};

export default withStyles(styles)(CodeEditor);
