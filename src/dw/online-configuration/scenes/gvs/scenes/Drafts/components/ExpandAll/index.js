import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(() => ({
  expandButton: {
    position: 'fixed',
    marginLeft: '-6px',
    marginTop: '10px',
    zIndex: '1',
  },
}));

const ExpandAll = ({ gridApi, expandGroup, defaultExpanded }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(defaultExpanded);

  const expand = useCallback(() => {
    gridApi.forEachNode(node => {
      if (expandGroup) {
        if (node.group) {
          // eslint-disable-next-line
          node.expanded = !open;
        }
      } else {
        // eslint-disable-next-line
        node.expanded = !open;
      }
    });
    gridApi.onGroupExpandedOrCollapsed();
    setOpen(!open);
  }, [gridApi, open]);

  if (gridApi) {
    return (
      <div className={classes.expandButton}>
        <Tooltip title={open ? 'Collapse All' : 'Expand All'}>
          <IconButton size="small" onClick={expand}>
            <Icon>{open ? 'expand_less' : 'expand_more'}</Icon>
          </IconButton>
        </Tooltip>
      </div>
    );
  }
  return null;
};
ExpandAll.propTypes = {
  gridApi: PropTypes.object,
  expandGroup: PropTypes.bool,
  defaultExpanded: PropTypes.bool,
};
ExpandAll.defaultProps = {
  gridApi: undefined,
  expandGroup: false,
  defaultExpanded: false,
};

export default ExpandAll;
