import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { hasFeaturesEnabledFuncSelector } from '@demonware/devzone-core/access/FeatureSwitchesCheck/selectors';
import { LOGINQUEUE_VIP_PROPAGATION_ENABLED } from '@demonware/devzone-core/access/FeatureSwitchesCheck/featureSwitches';
import { EDIT_LOGINQUEUE_VIP_USERNAMES } from '@demonware/devzone-core/access/PermissionCheck/permissions';

import AGGrid from 'dw/core/components/AGGrid';
import Search from 'dw/core/components/Search';
import { useCurrentEnvPermission } from 'dw/core/hooks';

import { getLoginQueuePropagateTitleEnvs } from 'dw/online-configuration/services/loginqueue';

import LoginQueueVIPListSkeleton from './components/Skeleton';

import PropagationModal from './components/PropagationModal';
import AddVIPsButton from './components/AddVIPsButton';
import BulkDeleteVIPsButton from './components/BulkDeleteVIPsButton';
import AddRemoveModal from './components/AddRemoveModal';

import styles from './index.module.css';
import {
  loginQueueTitleVIPListSelector,
  loginQueueTitleVIPListLoadingSelector,
  loginQueueTitleVIPListUpdatingSelector,
} from '../../../selectors';
import * as Actions from '../../../actions';

const useStyles = makeStyles({
  tooltip: {
    fontSize: '11px',
  },
});

const PropagateButton = props => (
  <Tooltip title="Propagate" classes={{ tooltip: props.toolTipClass }}>
    <IconButton
      color="inherit"
      onClick={() => props.setOpenDialog(true)}
      disabled={false}
    >
      <Icon className={props.iconClassName}>call_split</Icon>
    </IconButton>
  </Tooltip>
);

const LoginQueueVIPList = props => {
  const {
    vipList,
    loading,
    selectedQueue,
    editLoginQueueVIPList,
    fetchLoginQueueVIPList,
    updating,
  } = props;
  const [propagationModalOpen, setPropagationModalOpen] = useState(false);
  const [validPropagateTitles, setValidPropagateTitles] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [selectedGamertags, setSelectedGamertags] = useState([]);
  const classes = useStyles();

  const hasVIPSEditPermission = useCurrentEnvPermission(
    EDIT_LOGINQUEUE_VIP_USERNAMES
  );

  useEffect(() => {
    fetchLoginQueueVIPList({ queueId: selectedQueue });
  }, [fetchLoginQueueVIPList, selectedQueue]);

  const vipListObjects = useMemo(
    () => (vipList ? vipList.map(v => ({ firstPartyGamertag: v })) : []),
    [vipList]
  );

  const apiRef = useRef();

  const onGridReady = params => {
    apiRef.current = params.api;
  };

  const onGridSearch = value => {
    apiRef.current.setQuickFilter(value);
  };

  const dispatch = useDispatch();

  const currentTitleId = useSelector(
    state => state.Components?.TitleSelector?.currentTitle?.id
  );

  const propagateEnabled = useSelector(state =>
    hasFeaturesEnabledFuncSelector(state)(
      [LOGINQUEUE_VIP_PROPAGATION_ENABLED],
      false
    )
  );

  const showPropagate = propagateEnabled && validPropagateTitles.length > 0;

  useEffect(() => {
    getLoginQueuePropagateTitleEnvs()
      .then(resp => {
        if (resp?.data?.data) setValidPropagateTitles(resp.data.data);
      })
      .catch(err => dispatch(nonCriticalHTTPError(err)));
  }, [currentTitleId]);

  const handleSave = useCallback(
    gameTagList => {
      const vipListUpdater = {
        updates: [
          {
            op: 'add',
            path: '/members',
            value: gameTagList,
          },
        ],
      };
      editLoginQueueVIPList(selectedQueue, vipListUpdater);
      setOpenAddDialog(false);
    },
    [selectedQueue]
  );

  const onBulkDeleteVIPs = useCallback(
    gameTagList => {
      const vipListUpdater = {
        updates: [
          {
            op: 'delete',
            path: '/members',
            value: gameTagList,
          },
        ],
      };
      editLoginQueueVIPList(selectedQueue, vipListUpdater);
      setOpenRemoveDialog(false);
      setSelectedGamertags([]);
    },
    [selectedQueue]
  );

  const handleSelectRow = useCallback(
    ({ api }) => {
      const rows = api.getSelectedRows();
      setSelectedGamertags(rows);
    },
    [setSelectedGamertags]
  );

  return (
    <div className={styles.loginQueueVIPList}>
      <div className={styles.loginQueueVIPListActions}>
        <Search
          className={styles.loginQueueVIPListSearch}
          placeholder="Search Whitelisted VIP Gamertags"
          onSearch={payload => onGridSearch(payload.q)}
          searchOnChange
          iconClassName={styles.iconClassName}
        />
        <div className={styles.loginQueueVIPListButtons}>
          {hasVIPSEditPermission && (
            <AddVIPsButton
              onClick={() => setOpenAddDialog(true)}
              toolTipClass={classes.tooltip}
              iconClassName={styles.iconClassName}
            />
          )}
          {showPropagate && (
            <>
              <PropagateButton
                setOpenDialog={setPropagationModalOpen}
                toolTipClass={classes.tooltip}
                iconClassName={styles.iconClassName}
              />
              <PropagationModal
                open={propagationModalOpen}
                onClose={() => setPropagationModalOpen(false)}
                validPropagateTitles={validPropagateTitles}
                selectedQueue={selectedQueue}
              />
            </>
          )}
          {hasVIPSEditPermission && (
            <BulkDeleteVIPsButton
              onClick={() => setOpenRemoveDialog(true)}
              iconClassName={styles.iconClassName}
              selectedGamertags={selectedGamertags}
              toolTipClass={classes.tooltip}
            />
          )}
        </div>
      </div>
      {loading || updating ? (
        <LoginQueueVIPListSkeleton />
      ) : (
        <AGGrid
          autoSizeColumns={false}
          autoSizeMaxWidth={2500}
          suppressRowClickSelection
          className={styles.loginQueueVIPListGrid}
          onGridReady={params => onGridReady(params)}
          columnDefs={[
            {
              headerName: 'Gamertag',
              field: 'firstPartyGamertag',
              checkboxSelection: true,
              minWidth: 250,
              maxWidth: 1500,
            },
          ]}
          rowData={vipListObjects}
          onRowSelected={handleSelectRow}
          gridOptions={{
            defaultColDef: {
              flex: 1,
              sortable: true,
              filter: true,
            },
          }}
        />
      )}
      {openAddDialog && (
        <AddRemoveModal
          openDialog={openAddDialog}
          handleClose={() => setOpenAddDialog(false)}
          handleSave={handleSave}
          toolTipClass={classes.tooltip}
        />
      )}
      {openRemoveDialog && (
        <AddRemoveModal
          actionMode="remove"
          openDialog={openRemoveDialog}
          handleClose={() => setOpenRemoveDialog(false)}
          handleSave={onBulkDeleteVIPs}
          selectedGamertags={selectedGamertags}
          toolTipClass={classes.tooltip}
        />
      )}
    </div>
  );
};

LoginQueueVIPList.propTypes = {
  loading: PropTypes.bool.isRequired,
  selectedQueue: PropTypes.number.isRequired,
  editLoginQueueVIPList: PropTypes.func.isRequired,
  fetchLoginQueueVIPList: PropTypes.func.isRequired,
  updating: PropTypes.bool.isRequired,
  vipList: PropTypes.array.isRequired,
};

PropagateButton.propTypes = {
  setOpenDialog: PropTypes.func.isRequired,
  toolTipClass: PropTypes.string,
  iconClassName: PropTypes.string,
};

PropagateButton.defaultProps = {
  toolTipClass: '',
  iconClassName: '',
};

const mapStateToProps = () => state => ({
  vipList: loginQueueTitleVIPListSelector(state),
  loading: loginQueueTitleVIPListLoadingSelector(state),
  updating: loginQueueTitleVIPListUpdatingSelector(state),
});

const mapDispatchToProps = dispatch => ({
  fetchLoginQueueVIPList: bindActionCreators(
    Actions.fetchLoginQueueVIPList,
    dispatch
  ),
  editLoginQueueVIPList: bindActionCreators(
    Actions.editLoginQueueVIPList,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginQueueVIPList);
