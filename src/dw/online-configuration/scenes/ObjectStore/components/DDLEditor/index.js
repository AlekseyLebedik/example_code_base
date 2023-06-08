import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import omitBy from 'lodash/omitBy';
import escapeRegExp from 'lodash/escapeRegExp';
import download from 'downloadjs';

import MonacoDiffEditor from '@demonware/devzone-core/components/Monaco/diff-editor';
import Backdrop from '@material-ui/core/Backdrop';
import Portal from '@material-ui/core/Portal';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';

import { useDebouncedInput, useSnackbar } from 'dw/core/hooks';
import Select from 'dw/core/components/Select';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';

import { makeContextToUseSelector } from 'dw/online-configuration/components/ContextSelector/selectors';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import { ddlToJson as ddlToJsonApi } from 'dw/online-configuration/services/objectStore';

const { MonacoEditor } = window;

const EDITOR_HEIGHT = 480;

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  statusBar: {
    display: 'flex',
    position: 'absolute',
    left: theme.spacing(3),
    '& div': {
      color: 'rgba(0, 0, 0, 0.5)',
      marginRight: theme.spacing(3),
      fontWeight: 700,
    },
    '& strong': { color: 'rgba(0, 0, 0, 0.87)' },
  },
  dialogContent: {
    overflowY: 'hidden',
    paddingTop: 0,
  },
  dialogTitle: {
    paddingBottom: 0,
  },
  diffActions: {
    position: 'absolute',
    right: 0,
    top: '-48px',
  },
  backupSelect: {
    marginTop: '5px',
    marginBottom: '4px',
    marginRight: theme.spacing(2),
  },
  valueSearch: {
    flexGrow: 1,
    maxWidth: 230,
    marginLeft: theme.spacing(2),
  },
}));

const DDLEditor = ({ data }) => {
  const [contentRef, setContentRef] = useState(null);
  const [hideNulls, setHideNulls] = useState(false);
  const [rawDDL, setRawDDL] = useState(undefined);
  const [backup, setBackup] = useState(() => ({ version: 'NONE' }));
  const [loading, setLoading] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);
  const [[filteredCount, filteredData], setFilteredData] = useState([[], '']);
  const [error, setError] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [keySearch, setKeySearch, keyQuery] = useDebouncedInput(1000);
  const [valueSearch, setValueSearch, valueQuery] = useDebouncedInput(1000);
  const classes = useStyles();
  const snackbar = useSnackbar();
  const { id: userId } = useParams();
  const [total, initialRaw] = useMemo(() => {
    if (!rawDDL) return [0, ''];
    return [Object.entries(rawDDL).length, JSON.stringify(rawDDL, null, 2)];
  }, [rawDDL]);

  const formatDateTime = useSelector(formatDateTimeSelector);

  const filterData = useCallback(
    () =>
      new Promise(resolve => {
        if (!rawDDL) {
          resolve([0, '']);
          return;
        }
        if (!(hideNulls || keyQuery || valueQuery)) {
          resolve([total, initialRaw]);
          return;
        }
        let keyRegexp = keyQuery;
        try {
          keyRegexp = new RegExp(keyQuery, 'ig');
        } catch (e) {
          keyRegexp = new RegExp(escapeRegExp(keyQuery), 'ig');
        }
        let valueRegexp = keyQuery;
        try {
          valueRegexp = new RegExp(valueQuery, 'ig');
        } catch (e) {
          valueRegexp = new RegExp(escapeRegExp(valueQuery), 'ig');
        }
        const filtered = omitBy(
          rawDDL,
          (value, key) =>
            (keyQuery && key.search(keyRegexp) === -1) ||
            (valueQuery && String(value).search(valueRegexp) === -1) ||
            (hideNulls && (!value || value === '0' || value === '0.0'))
        );
        resolve([
          Object.entries(filtered).length,
          JSON.stringify(filtered, null, 2),
        ]);
      }),
    [rawDDL, hideNulls, keyQuery, valueQuery]
  );
  useEffect(() => setContentLoading(true), [keyQuery, valueQuery, hideNulls]);
  useEffect(() => {
    const calculate = async () => {
      const newFilteredData = await filterData();
      setContentLoading(false);
      setFilteredData(newFilteredData);
    };
    setTimeout(() => calculate(), 0);
  }, [rawDDL, hideNulls, keyQuery, valueQuery]);

  const validContext = useSelector(state =>
    makeContextToUseSelector(state, {
      serviceName: Services.DDLTranslation,
      endpoint: ServiceEndpoints.DDLTranslation.ddlToJson,
    })
  );

  const loadJson = useCallback(async () => {
    try {
      const { data: ddlData } = await ddlToJsonApi({
        userId,
        name: data.name,
        objectVersion:
          // master row has backups property
          data.backups === undefined ? data.objectVersion : undefined,
        context: validContext,
      });
      setRawDDL(ddlData);
      setLoading(false);
    } catch (err) {
      const newError =
        'Cannot convert object to JSON. It might be not in DDL format.';
      snackbar.error(
        <div>
          {newError}
          <br />
          View logs for details.
        </div>
      );
      setOpen(false);
      setLoading(false);
      setError(newError);
    }
  }, [data, userId, validContext, setRawDDL, setOpen, setError, setLoading]);

  const loadBackup = useCallback(
    async version => {
      setContentLoading(true);
      try {
        const { data: ddlData } = await ddlToJsonApi({
          userId,
          name: data.name,
          objectVersion: version,
          context: validContext,
        });
        const encoded = JSON.stringify(ddlData, null, 2);
        setBackup({
          ...backup,
          version,
          [version]: encoded,
        });
        setContentLoading(false);
      } catch (err) {
        const newError = `Cannot load backup for object ${data.name}`;
        snackbar.error(
          <div>
            {newError}
            <br />
            View logs for details.
          </div>
        );
        setContentLoading(false);
      }
    },
    [
      data,
      userId,
      validContext,
      backup,
      setBackup,
      setContentLoading,
      initialRaw,
    ]
  );

  const selectBackup = useCallback(
    version => {
      setBackup({ ...backup, version });
      if (!(version === 'NONE' || backup[version])) {
        setContentLoading(true);
        loadBackup(version);
      }
    },
    [backup, setBackup, setContentLoading, loadBackup]
  );

  useEffect(() => {
    if (open && rawDDL === undefined && error === undefined && !loading) {
      setLoading(true);
      loadJson();
    }
  }, [open, rawDDL, error, loading, loadJson]);
  return (
    <>
      <Tooltip title={error || 'View Object Contents'}>
        <span>
          <IconButton disabled={Boolean(error)} onClick={() => setOpen(true)}>
            <Icon>visibility</Icon>
          </IconButton>
        </span>
      </Tooltip>
      {loading && (
        <Portal>
          <Backdrop classes={{ root: classes.backdrop }} open={open}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Portal>
      )}
      {!loading && rawDDL && open && (
        <Dialog
          open
          onClose={() => setOpen(false)}
          aria-labelledby="form-dialog-title"
          maxWidth="lg"
          fullWidth
        >
          <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
            Object Contents
            <Tooltip title="Download as JSON">
              <IconButton
                onClick={() =>
                  download(JSON.stringify(rawDDL), `${data.name}.json`)
                }
              >
                <Icon>download</Icon>
              </IconButton>
            </Tooltip>
          </DialogTitle>
          <DialogContent ref={setContentRef} className={classes.dialogContent}>
            <Backdrop
              classes={{ root: classes.backdrop }}
              open={contentLoading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <div className="flex items-center">
              {data.backups && data.backups.length > 0 && (
                <Select
                  className={classes.backupSelect}
                  label="View diff with"
                  value={backup.version}
                  onChange={e => selectBackup(e.target.value)}
                  options={[
                    { value: 'NONE', label: 'View current object only' },
                  ].concat(
                    data.backups.map(bck => ({
                      label: formatDateTime(bck.modified),
                      value: bck.objectVersion,
                    }))
                  )}
                />
              )}
              {backup.version === 'NONE' && (
                <>
                  <div className="flex-grow">
                    <TextField
                      value={keySearch}
                      onChange={e => setKeySearch(e.target.value)}
                      InputProps={{
                        endAdornment: keySearch && (
                          <InputAdornment position="end">
                            <Tooltip title="Clear Search">
                              <IconButton onClick={() => setKeySearch('')}>
                                <Icon>cancel</Icon>
                              </IconButton>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      margin="dense"
                      id="key-search"
                      label="Key Search"
                      placeholder="accepts regular expressions"
                      autoFocus
                      fullWidth
                    />
                  </div>
                  <div className={classes.valueSearch}>
                    <TextField
                      value={valueSearch}
                      onChange={e => setValueSearch(e.target.value)}
                      InputProps={{
                        endAdornment: valueSearch && (
                          <InputAdornment position="end">
                            <Tooltip title="Clear Value Search">
                              <IconButton onClick={() => setValueSearch('')}>
                                <Icon>cancel</Icon>
                              </IconButton>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      margin="dense"
                      id="value-search"
                      label="Value Search"
                      placeholder="accepts regular expressions"
                      fullWidth
                    />
                  </div>
                  <div>
                    <Switch
                      checked={hideNulls}
                      onChange={() => setHideNulls(!hideNulls)}
                      color="primary"
                      name="viewSwitch"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    Hide empty values
                  </div>
                </>
              )}
            </div>
            {!(backup.version !== 'NONE' && backup[backup.version]) && (
              <MonacoEditor
                key={`${keyQuery}-${valueQuery}-${hideNulls}`}
                height={EDITOR_HEIGHT}
                language="json"
                value={filteredData}
                options={{ readOnly: true }}
              />
            )}
            {backup.version !== 'NONE' && backup[backup.version] && (
              <MonacoDiffEditor
                key={backup.version}
                language="json"
                originalText={backup[backup.version]}
                modifiedText={initialRaw}
                originalEditable={false}
                height={EDITOR_HEIGHT}
                width={contentRef && contentRef.clientWidth - 48}
                diffActionsProps={{ className: classes.diffActions }}
              />
            )}
          </DialogContent>
          <DialogActions>
            <div className={classes.statusBar}>
              <div>
                Total Rows: <strong>{total}</strong>
              </div>
              {total !== filteredCount && (
                <div>
                  Filtered: <strong>{filteredCount}</strong>
                </div>
              )}
            </div>
            <Button onClick={() => setOpen(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

DDLEditor.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    objectVersion: PropTypes.string.isRequired,
    backups: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default DDLEditor;
