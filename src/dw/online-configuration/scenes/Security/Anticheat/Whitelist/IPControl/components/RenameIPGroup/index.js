import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'dw/core/hooks';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import ConfirmDialog from 'dw/core/components/Confirm';
import {
  deleteIPGroup,
  updateIPGroup,
} from 'dw/online-configuration/services/security';
import {
  fetchIPControl,
  fetchIPGroups,
  fetchWhitelistedUsers,
} from '../../actions';
import { UNASSIGNED_GROUP } from '../../constants';

const RenameIPGroup = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const nameInputRef = useRef();
  const { node } = props;
  const grpId = node?.allLeafChildren[0].data?.groupID || 0;
  const initGrpName = node?.allLeafChildren[0].data?.group || '';
  const [grpName, setGrpName] = useState(initGrpName);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (!nameInputRef.current) return;
      nameInputRef.current.focus();
    });
  }, []);

  const handleUpdateGroup = useCallback(async () => {
    try {
      await updateIPGroup({
        id: grpId,
        data: {
          name: grpName,
        },
      });
      dispatch(fetchIPGroups());
      dispatch(fetchIPControl());
      dispatch(fetchWhitelistedUsers());
      snackbar.success('Group has been successfully updated');
    } catch (err) {
      const {
        response: { data },
      } = err;
      // eslint-disable-next-line
      console.log(data?.error);
      snackbar.error('Group failed to update, see logs for details.');
    }
  }, [snackbar, updateIPGroup]);

  const onKeyDown = e => {
    if (e.key === 'Enter') {
      if (grpName === UNASSIGNED_GROUP || grpName === '') {
        setShowConfirm(true);
      } else if (grpName === initGrpName) {
        props.stopEditing();
      } else {
        handleUpdateGroup();
        props.stopEditing();
      }
    }
  };

  const handleChange = e => {
    setGrpName(e.target.value);
  };

  const onConfirmDeleteGroup = useCallback(async () => {
    try {
      await deleteIPGroup({
        id: grpId,
        deleteContents: false,
      });
      dispatch(fetchIPGroups());
      dispatch(fetchIPControl());
      snackbar.success('Group has been successfully deleted');
    } catch (err) {
      const {
        response: { data },
      } = err;
      // eslint-disable-next-line
      console.log(data?.error);
      snackbar.error('Group failed to delete, see logs for details.');
    }
  }, [snackbar, deleteIPGroup]);

  const onHideConfirm = () => {
    setGrpName(initGrpName);
    setShowConfirm(false);
  };

  useImperativeHandle(ref, () => {
    return {
      getValue() {
        return grpName;
      },

      isCancelBeforeStart() {
        return false;
      },

      isCancelAfterEnd() {
        return grpName === initGrpName;
      },
    };
  });

  return (
    <>
      <ConfirmDialog
        title="Confirm Whitelist Group Deletion"
        content="The selected group will be deleted.
                 The whitelist items in this group will be moved to the
                 Unassigned Group. Do you want to continue?"
        destructive
        open={showConfirm}
        onHide={onHideConfirm}
        onConfirm={onConfirmDeleteGroup}
      />
      <TextField
        ref={nameInputRef}
        size="small"
        variant="outlined"
        fullWidth
        inputProps={{ maxLength: 255 }}
        placeholder="Unassigned Group or enter a new group name"
        value={grpName}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        disabled={initGrpName === UNASSIGNED_GROUP}
      />
    </>
  );
});
RenameIPGroup.propTypes = {
  node: PropTypes.object,
  stopEditing: PropTypes.func.isRequired,
};
RenameIPGroup.defaultProps = {
  node: undefined,
};

export default RenameIPGroup;
