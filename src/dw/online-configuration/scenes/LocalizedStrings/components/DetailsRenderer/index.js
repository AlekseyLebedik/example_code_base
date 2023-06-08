import React, { useCallback, useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';
import { useSnackbar } from 'dw/core/hooks';
import { withStyles } from '@material-ui/core/styles';
import * as API from 'dw/online-configuration/services/localizedstrings';
import MuiListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import { DetailsRendererSkeleton } from '../Skeleton';
import styles from './index.module.css';

const { MonacoEditor } = window;

const ListItem = withStyles({
  root: {
    '&$selected': {
      backgroundColor: '#4ac0f1',
      color: 'white',
      '& .MuiListItemIcon-root': {
        color: 'white',
      },
    },
    '&$selected:hover': {
      backgroundColor: '#4ac0f1',
      color: 'white',
      '& .MuiListItemIcon-root': {
        color: 'white',
      },
    },
    '&:hover': {
      backgroundColor: '#4ac0f1',
      color: 'white',
      '& .MuiListItemIcon-root': {
        color: 'white',
      },
    },
  },
  selected: {},
})(MuiListItem);

const DetailsRenderer = ({
  context,
  stringSetName,
  uploaded,
  setUpload,
  isLoading,
}) => {
  const [jsonData, setJsonData] = useState(null);
  const [{ width, height }, setWindowSize] = useState({ width: 0, height: 0 });
  const [versionRowData, setVersionRowData] = useState(null);
  const [stringSetVersion, setStringSetVersion] = useState(null);
  const [localLoading, setLocalLoading] = useState(null);
  const snackbar = useSnackbar();

  const fetchVersionRowData = data => {
    if (data?.availableVersions) {
      setVersionRowData(data?.availableVersions);
      setStringSetVersion(data?.version);
    }
  };
  const fetchDataWithVersion = useCallback(async () => {
    try {
      setLocalLoading(true);
      const response = await API.getStringSets(
        context,
        stringSetName,
        stringSetVersion
      );
      const { data } = response;
      setJsonData(data);
      setLocalLoading(false);
    } catch (e) {
      snackbar.error(`${e?.response?.status} ${e?.response?.data?.error?.msg}`);
      setLocalLoading(false);
    }
  }, [stringSetVersion]);

  useEffect(() => {
    if (context && stringSetName && stringSetVersion) fetchDataWithVersion();
  }, [stringSetVersion]);

  const fetchData = useCallback(async () => {
    try {
      setLocalLoading(true);
      const response = await API.getStringSets(context, stringSetName, null);
      const { data } = response;
      setJsonData(data);
      setVersionRowData(null);
      setStringSetVersion(data?.version);
      fetchVersionRowData(data);
      setLocalLoading(false);
      setUpload(false);
    } catch (e) {
      snackbar.error(`${e?.response?.status} ${e?.response?.data?.error?.msg}`);
      setLocalLoading(false);
    }
  }, [context, stringSetName, uploaded]);

  useEffect(() => {
    if (context && stringSetName) fetchData();
  }, [context, stringSetName, uploaded]);

  const emptyContainer = <DetailsRendererSkeleton />;
  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef?.current)
      setWindowSize(
        containerRef.current?.clientWidth,
        containerRef.current?.clientHeight
      );
  }, [containerRef?.current?.clientWidth, containerRef?.current?.clientHeight]);

  const versionSelector = (
    <List
      component="nav"
      subheader={
        <ListSubheader component="div" id="list-subheader">
          VERSIONS
        </ListSubheader>
      }
    >
      {versionRowData?.map(item => {
        return (
          <ListItem
            button
            selected={stringSetVersion === item}
            onClick={() => {
              if (stringSetVersion !== item) setStringSetVersion(item);
            }}
            data-cy={`string-set-version-${item}`}
          >
            <ListItemText primary={item} />
          </ListItem>
        );
      })}
    </List>
  );
  const DetailCellRenderer = (
    <div className={styles.container}>
      <div className={styles.versionSelector}>{versionSelector}</div>
      {isLoading || localLoading ? (
        emptyContainer
      ) : (
        <div ref={containerRef} className={styles.codeContainer}>
          <MonacoEditor
            width={width}
            height={height}
            language="json"
            className={styles.editor}
            value={JSON.stringify(jsonData, null, 2)}
            options={{ readOnly: true, fontSize: '14px' }}
          />
        </div>
      )}
    </div>
  );
  return DetailCellRenderer;
};

DetailsRenderer.propTypes = {
  context: PropTypes.string.isRequired,
  stringSetName: PropTypes.string.isRequired,
  uploaded: PropTypes.bool.isRequired,
  setUpload: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default DetailsRenderer;
