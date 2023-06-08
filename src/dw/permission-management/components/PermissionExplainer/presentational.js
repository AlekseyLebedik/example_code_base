import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import * as API from 'dw/permission-management/services/explainerflags';
import { useSnackbar } from 'dw/core/hooks';
import Loading from 'dw/core/components/Loading';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import ExplainerTable from './components/ExplainerTable';
import styles from './presentational.module.css';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '98%',
    },
    minWidth: 400,
  },
  btn: {
    width: '20%',
    margin: '2% 8px',
  },
}));

const PermissionExplainerStateLess = ({ contentTypes, userID, isLoading }) => {
  const [typeSelected, setTypeSelected] = useState(undefined);
  const [subTypeIDSelected, setSubTypeIDSelected] = useState(undefined);
  const [permissionIDSelected, setPermissionIDSelected] = useState(undefined);
  const [isLoadingResult, setIsLoadingResult] = useState(false);
  const [explainerData, setExplainerData] = useState([]);
  const snackbar = useSnackbar();
  const classes = useStyles();

  const fetchResult = useCallback(async () => {
    try {
      setIsLoadingResult(true);
      const response = await API.getPermissionExplainer({
        userID,
        permissionID: permissionIDSelected,
        objectType: `${contentTypes[typeSelected].model}.${subTypeIDSelected}`,
      });
      const { data } = response;
      setExplainerData(data);
      setIsLoadingResult(false);
      if (data.length === 0)
        throw new Error('No Permission found for this selection');
    } catch (e) {
      if (e?.message) {
        snackbar.error(e.message);
      } else {
        snackbar.error(
          `${e?.response?.status} ${e?.response?.data?.error?.msg}`
        );
      }
      setIsLoadingResult(false);
    }
  }, [
    contentTypes,
    userID,
    permissionIDSelected,
    typeSelected,
    subTypeIDSelected,
    explainerData,
    isLoadingResult,
  ]);

  if (isLoadingResult || isLoading) return <Loading />;
  return (
    <div className={styles.container}>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            select
            label="Type"
            value={typeSelected}
            SelectProps={{
              MenuProps: {
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
                getContentAnchorEl: null,
              },
            }}
            onChange={e => setTypeSelected(parseInt(e?.target?.value, 10))}
          >
            {contentTypes.map((option, key) => (
              <MenuItem key={option.model} value={key}>
                {option.model}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Sub-Type"
            value={subTypeIDSelected}
            SelectProps={{
              MenuProps: {
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
                getContentAnchorEl: null,
              },
            }}
            onChange={e => setSubTypeIDSelected(parseInt(e?.target?.value, 10))}
          >
            {contentTypes[typeSelected]?.details?.map(option => (
              <MenuItem key={option.displayName} value={option.id}>
                {option.displayName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Permissions"
            value={permissionIDSelected}
            SelectProps={{
              MenuProps: {
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
                getContentAnchorEl: null,
              },
            }}
            onChange={e =>
              setPermissionIDSelected(parseInt(e?.target?.value, 10))
            }
          >
            {contentTypes[typeSelected]?.permissions?.map(option => (
              <MenuItem key={option.name} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </form>
      <Button
        variant="contained"
        color="primary"
        className={classes.btn}
        onClick={fetchResult}
      >
        Find
      </Button>
      {explainerData.length > 0 && (
        <ExplainerTable explainerData={explainerData} />
      )}
    </div>
  );
};

PermissionExplainerStateLess.propTypes = {
  contentTypes: PropTypes.array.isRequired,
  userID: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default PermissionExplainerStateLess;
