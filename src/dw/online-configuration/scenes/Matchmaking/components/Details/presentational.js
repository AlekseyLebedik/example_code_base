import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import AsyncComponent from 'dw/core/components/AsyncComponent';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import Loading from 'dw/core/components/Loading';

import styles from './presentational.module.css';

const Monaco = AsyncComponent(() =>
  import(
    /* webpackChunkName: "MonacoEditor" */ 'dw/core/components/FormFields/Monaco'
  )
);

const Stateless = ({ rulesetDetails, onActivate, onDownload, canActivate }) => {
  const [editorHeight, setEditorHeight] = useState(500);
  const codeEditorWrapperRef = useRef(null);

  useEffect(() => {
    if (codeEditorWrapperRef?.current) {
      setEditorHeight(codeEditorWrapperRef.current.clientHeight);
    }
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        {canActivate && rulesetDetails.status !== 'active' && (
          <ConfirmActionComponent
            component="IconButton"
            tooltip="Activate Ruleset"
            onClick={() => onActivate(rulesetDetails.id)}
            confirm={{
              title: 'Confirm Activation',
              confirmMsg:
                'Are you sure you want to activate selected ruleset? The current active ruleset would be deactivated.',
              mainButtonLabel: 'Activate',
            }}
          >
            settings_power
          </ConfirmActionComponent>
        )}
        <Tooltip title="Download Ruleset">
          <div>
            <IconButton
              onClick={onDownload}
              disabled={rulesetDetails.source === undefined}
            >
              <Icon>file_download</Icon>
            </IconButton>
          </div>
        </Tooltip>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.summary}>
          <p>Version: {rulesetDetails.name}</p>
          <p>Upload Date: {rulesetDetails.createdAt}</p>
          <p>Code hash: {rulesetDetails.sourceHash}</p>
          <p>Apply Date: {rulesetDetails.appliedAt}</p>
          <p>Is active: {rulesetDetails.status === 'active' ? 'Yes' : 'No'}</p>
          <p>Github URL: ...</p>
        </div>
        <div className={classNames(styles.content)} ref={codeEditorWrapperRef}>
          {rulesetDetails.source === undefined ? (
            <Loading />
          ) : (
            <Monaco
              height={editorHeight}
              options={{
                fontSize: 12,
                minimap: { enabled: false },
                readOnly: true,
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                wrappingIndent: 'indent',
              }}
              language="python"
              value={rulesetDetails.source}
            />
          )}
        </div>
      </div>
    </div>
  );
};

Stateless.propTypes = {
  canActivate: PropTypes.bool.isRequired,
  rulesetDetails: PropTypes.object,
  onActivate: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
};

Stateless.defaultProps = {
  rulesetDetails: {},
};

export default Stateless;
