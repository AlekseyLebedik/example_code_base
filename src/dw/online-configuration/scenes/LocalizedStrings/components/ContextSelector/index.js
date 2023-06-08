import React, { useCallback, useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { useSnackbar } from 'dw/core/hooks';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import * as API from 'dw/online-configuration/services/localizedstrings';
import Typography from '@material-ui/core/Typography';
import { ContextSelectorSkeleton } from '../Skeleton';
import styles from './index.module.css';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
  },
  titleColor: {
    color: 'rgba(255, 255, 255, 0.6)',
  },
  dropDowmtext: {
    color: 'white',
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2),
    minWidth: 160,
  },
}));

const ContextSelector = ({
  selectedContext,
  setSelectedContext,
  isLoading,
  setLoading,
  setContextUploaded,
}) => {
  const [contextOptions, setContextOptions] = useState([]);
  const snackbar = useSnackbar();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await API.getLocalizedStringsContexts();
      const { data } = response;
      const dataContext = data.pairs.map(list => list.context);
      if (dataContext.length === 0) {
        setContextUploaded(false);
      }
      setContextOptions(dataContext);
      setSelectedContext(dataContext[0]);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      if (e?.message) {
        snackbar.error(e.message);
      } else {
        snackbar.error(
          `${e?.response?.status} ${e?.response?.data?.error?.msg}`
        );
      }
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const classes = useStyles();

  return isLoading ? (
    <ContextSelectorSkeleton />
  ) : (
    <div>
      <FormControl className={classes.formControl}>
        <div className={styles.contextTitle}>
          <Typography
            variant="subtitle1"
            align="left"
            className={classes.titleColor}
          >
            CONTEXTS
          </Typography>
        </div>
        <Select
          labelId="contextSelectLabel"
          id="contextSelect"
          value={selectedContext}
          onChange={e => setSelectedContext(e?.target?.value)}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            getContentAnchorEl: null,
          }}
          className={classes.dropDowmtext}
          data-cy="context-select-dropdown"
        >
          {contextOptions.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

ContextSelector.propTypes = {
  selectedContext: PropTypes.string.isRequired,
  setSelectedContext: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  setContextUploaded: PropTypes.func.isRequired,
};

export default ContextSelector;
