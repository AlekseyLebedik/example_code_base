import React from 'react';
import PropTypes from 'prop-types';
import { ResizableBox } from 'react-resizable';
import debounce from 'lodash/debounce';

import ErrorString from 'dw/core/components/ErrorString';

import 'react-resizable/css/styles.css';
import styles from './Monaco.module.css';

const DEBOUNCE_WAIT = 166;

// We need to use Monaco editor globally to be able to build guest apps.
const { MonacoEditor, monacoEditor } = window;

export default class Monaco extends React.Component {
  editorRef = this.props.editorRef;

  componentDidMount() {
    window.addEventListener('resize', this.onContainerResize);
    if (this.props?.containerResizeOnReady) this.onContainerResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onContainerResize);
  }

  onContainerResize = debounce(() => {
    if (this.editorRef.current) this.editorRef.current.editor.layout();
  }, DEBOUNCE_WAIT);

  render() {
    const {
      className,
      options: { disabledOverlay, ...options },
      height,
      width,
      disabled,
      input,
      meta: { touched, error },
      resizable,
      ...custom
    } = this.props;

    const mergedOptions = {
      fontFamily: 'Roboto Mono',
      fontLigatures: true,
      fontSize: '16px',
      ...options,
    };

    return (
      <>
        <ResizableBox
          className={className}
          height={height}
          width={width}
          minConstraints={[Infinity, 100]}
          axis={resizable ? 'y' : 'none'}
          disabled={disabled}
          onResize={this.onContainerResize}
        >
          <div style={{ height: '100%', width: '100%' }}>
            <MonacoEditor
              ref={this.editorRef}
              options={mergedOptions}
              {...input}
              {...custom}
            />
            <div
              className={styles.disabledOverlay}
              style={{
                height: options.readOnly && disabledOverlay ? height : 0,
              }}
            />
          </div>
        </ResizableBox>
        {touched && error && (
          <ErrorString data-cy={`${input.name}Error`}>{error}</ErrorString>
        )}{' '}
      </>
    );
  }
}

Monaco.propTypes = {
  className: PropTypes.string,
  options: PropTypes.object,
  height: PropTypes.number,
  width: PropTypes.number,
  disabled: PropTypes.bool,
  input: PropTypes.object,
  meta: PropTypes.object,
  resizable: PropTypes.bool,
  editorRef: PropTypes.object,
  containerResizeOnReady: PropTypes.bool,
};

Monaco.defaultProps = {
  className: '',
  options: {},
  meta: {},
  input: {},
  disabled: false,
  resizable: false,
  width: Infinity,
  height: Infinity,
  editorRef: React.createRef(),
  containerResizeOnReady: false,
};

monacoEditor.editor.defineTheme('dw', {
  base: 'vs',
  inherit: true,
  rules: [],
  encodedTokensColors: [],
  colors: {
    // Base colors
    focusBorder: '#b2b2b200',
    foreground: '#24292e',
    'editor.background': '#f0f0f0',
    'editor.foreground': '#24292e',
    'scrollbar.shadow': '#f0f0f0',

    // Editor
    'editor.lineHighlightBackground': '#e1e1e1',
    'editor.lineHighlightBorder': '#e1e1e1',
    'editorLineNumber.foreground': '#7f7f7f',
    'editorLineNumber.activeForeground': '#000000',
    'editorWidget.background': '#f0f0f0',
    'editorWidget.border': '#24292e',
    'editorSuggestWidget.highlightForeground': '#d73a49',
    'editorSuggestWidget.selectedBackground': '#e1e1e1',
  },
});
monacoEditor.editor.setTheme('dw');
