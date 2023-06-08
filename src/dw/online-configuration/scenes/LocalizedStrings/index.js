import React, { useCallback, useState } from 'react';

import { ADD_LOCALIZED_STRINGS } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import Divider from '@material-ui/core/Divider';
import { useCurrentEnvPermission } from 'dw/core/hooks';
import classNames from 'classnames';
import Empty from 'dw/core/components/Empty';
import { getMailto } from 'dw/core/helpers/email';
import { SUPPORT_EMAIL, SUPPORT_SLACK } from 'dw/config';
import ContextSelector from './components/ContextSelector';
import StringSetNameSelector from './components/StringSetNamesSelector';
import DetailsRenderer from './components/DetailsRenderer';
import UploadStringSet from './components/UploadStringSet';
import styles from './index.module.css';

const LocalizedStrings = () => {
  const [selectedContext, setSelectedContext] = useState('');
  const [stringSetName, setStringSetName] = useState('');
  const [uploaded, setUpload] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [contextUploaded, setContextUploaded] = useState(true);
  const hasUploadStringSetPermission = useCurrentEnvPermission(
    ADD_LOCALIZED_STRINGS
  );

  const setContextStringSetName = useCallback(context => {
    setSelectedContext(context);
    setStringSetName('');
  }, []);

  return contextUploaded ? (
    <div className={styles.flexContainer}>
      <div className={classNames(styles.panel, styles.leftRow)}>
        <div className={styles.contextUploadContainer}>
          {hasUploadStringSetPermission ? (
            <div className={styles.uploadButton}>
              <UploadStringSet
                context={selectedContext}
                stringSetName={stringSetName}
                setUpload={setUpload}
                visible={open}
                setOpen={setOpen}
              />
            </div>
          ) : undefined}
          <div className={styles.contextSelector}>
            <ContextSelector
              selectedContext={selectedContext}
              setSelectedContext={setContextStringSetName}
              isLoading={isLoading}
              setLoading={setLoading}
              setContextUploaded={setContextUploaded}
            />
          </div>
        </div>
        <Divider className={styles.headerDivider} variant="middle" />
        <StringSetNameSelector
          context={selectedContext}
          stringSetName={stringSetName}
          setStringSetName={setStringSetName}
          isLoading={isLoading}
          setLoading={setLoading}
          setContextUploaded={setContextUploaded}
        />
      </div>
      <div className={styles.rightRow}>
        <DetailsRenderer
          context={selectedContext}
          stringSetName={stringSetName}
          uploaded={uploaded}
          setUpload={setUpload}
          isLoading={isLoading}
        />
      </div>
    </div>
  ) : (
    <Empty>
      <div>
        This Title does not have default context uploaded.
        <br />
        <br />
        <p>
          Please contact{' '}
          <a
            href={getMailto(
              'No Context uploaded for the title in Localized Strings'
            )}
          >
            {SUPPORT_EMAIL}
          </a>
          {' or our Slack channel '}
          <a href={SUPPORT_SLACK.url} target="_blank" rel="noopener noreferrer">
            {SUPPORT_SLACK.channel}
          </a>{' '}
          for further details.
        </p>
      </div>
    </Empty>
  );
};

export default LocalizedStrings;
