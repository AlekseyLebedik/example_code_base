import React, { useCallback } from 'react';
import { useHistory, generatePath, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { gvsUrlPattern, SCENES } from '@gvs/constants';

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: -theme.spacing(2),
  },
}));

const AddGroupButton = () => {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();
  const onAddGroup = useCallback(() => {
    const path = generatePath(gvsUrlPattern, {
      ...params,
      scene: SCENES.GROUPS,
    });
    history.push(path, { createGroup: true });
  }, [history, params]);
  return (
    <Tooltip title="Add a new Group">
      <IconButton className={classes.button} onClick={onAddGroup}>
        <Icon color="primary">group_add</Icon>
      </IconButton>
    </Tooltip>
  );
};

export default AddGroupButton;
