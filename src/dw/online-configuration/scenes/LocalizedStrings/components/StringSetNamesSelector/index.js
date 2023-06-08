import React, { useCallback, useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { useSnackbar } from 'dw/core/hooks';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import * as API from 'dw/online-configuration/services/localizedstrings';
import MuiListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import { StringSetNameSelectorSkeleton } from '../Skeleton';

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

const useStyles = makeStyles(() => ({
  listItemHeader: {
    color: 'rgba(255, 255, 255, 0.6)',
  },
  listItemText: {
    color: 'white',
  },
}));

const StringSetNameSelector = ({
  context,
  stringSetName,
  setStringSetName,
  isLoading,
  setLoading,
  setContextUploaded,
}) => {
  const [stringSetOptions, setStringSetOptions] = useState([]);
  const classes = useStyles();
  const snackbar = useSnackbar();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await API.getStringsSetNames(context);
      const { data } = response;
      const dataStringSetOptions = data?.string_set_names;
      if (dataStringSetOptions.length === 0) setContextUploaded(false);
      setStringSetOptions(dataStringSetOptions);
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
      setLoading(false);
    }
  }, [context]);

  useEffect(() => {
    if (context) {
      fetchData();
    }
  }, [context]);

  useEffect(() => {
    if (stringSetOptions) setStringSetName(stringSetOptions[0]);
  }, [stringSetOptions]);

  return isLoading ? (
    <StringSetNameSelectorSkeleton />
  ) : (
    <div>
      <List
        component="nav"
        subheader={
          <ListSubheader
            component="div"
            id="list-subheader"
            className={classes.listItemHeader}
          >
            STRING SETS
          </ListSubheader>
        }
      >
        {stringSetOptions?.map(item => {
          return (
            <ListItem
              button
              selected={stringSetName === item}
              onClick={() => {
                if (stringSetName !== item) setStringSetName(item);
              }}
            >
              <ListItemText primary={item} className={classes.listItemText} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

StringSetNameSelector.propTypes = {
  context: PropTypes.string.isRequired,
  stringSetName: PropTypes.string.isRequired,
  setStringSetName: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  setContextUploaded: PropTypes.func.isRequired,
};

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
  selectedItem: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default StringSetNameSelector;
