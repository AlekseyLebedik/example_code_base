import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from 'playpants/components/ExpansionPanel';
import AsyncComponent from 'dw/core/components/AsyncComponent';

import styles from './index.module.css';

const Monaco = AsyncComponent(() =>
  import(
    /* webpackChunkName: "MonacoEditor" */ 'dw/core/components/FormFields/Monaco'
  )
);

const MonacoExpansion = ({ code, title, defaultExpanded, options }) => {
  const editorRef = useRef();
  return (
    code && (
      <ExpansionPanel
        title={title}
        details={
          <Monaco
            value={code}
            options={{
              disabledOverlay: true,
              scrollBeyondLastLine: false,
              scrollBeyondLastColumn: 10,
              fontSize: 12,
              wordWrap: 'on',
              wrappingIndent: 'indent',
              snippetSuggestions: 'bottom',
              ...options,
            }}
            language="python"
            height={500}
            editorRef={editorRef}
            resizable
          />
        }
        classes={{ details: styles.details }}
        defaultExpanded={defaultExpanded}
      />
    )
  );
};

MonacoExpansion.propTypes = {
  title: PropTypes.string.isRequired,
  code: PropTypes.string,
  defaultExpanded: PropTypes.bool,
  options: PropTypes.object,
};
MonacoExpansion.defaultProps = {
  code: '',
  defaultExpanded: false,
  options: {},
};

export default MonacoExpansion;
