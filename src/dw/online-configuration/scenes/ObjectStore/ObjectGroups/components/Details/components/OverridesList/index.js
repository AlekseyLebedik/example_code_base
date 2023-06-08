import React, { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import ObjectsTable from 'dw/core/components/ObjectStore/ObjectsTable';
import UploadAction from 'dw/core/components/ObjectStore/UploadAction';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import { OBJECT_STORE_DELETE_OBJECTS } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { useCurrentEnvPermission } from 'dw/core/hooks';

import { uuid } from 'dw/core/helpers/uuid';
import {
  deleteGroupObjects,
  downloadGroupObject,
  promoteGroupObject,
  uploadGroupObject,
  fetchGroupObjects as fetchGroupObjectsAction,
} from 'dw/online-configuration/scenes/ObjectStore/ObjectGroups/actions';

import styles from '../../presentational.module.css';

const uploadButton = openModal => (
  <Tooltip
    title="Upload Publisher Object"
    placement="bottom"
    className={styles.addOverrideBtn}
  >
    <Fab
      variant="extended"
      color="primary"
      aria-label="Add"
      onClick={openModal}
    >
      <Icon>add</Icon>
      Add Override
    </Fab>
  </Tooltip>
);

const objectsTableStyles = {
  root: styles.objectTableContainer,
};

const ObjectStoreOverrides = ({
  formatDateTime,
  groups,
  categories,
  selectedItem,
  dataFormatter,
}) => {
  const [itemsShown, setItemsShown] = useState(0);
  const [selected, setSelected] = useState(false);
  const [refreshKey, setRefreshKey] = useState();
  const { id: selectedItemId } = useParams();
  const dispatch = useDispatch();
  const fetchGroupObjects = bindActionCreators(
    fetchGroupObjectsAction,
    dispatch
  );
  const onDownload = bindActionCreators(downloadGroupObject, dispatch);
  const promotePubGroupsAction = bindActionCreators(
    promoteGroupObject,
    dispatch
  );
  const onUploadFileAction = bindActionCreators(uploadGroupObject, dispatch);
  const onDeleteObjectsAction = bindActionCreators(
    deleteGroupObjects,
    dispatch
  );

  const [gridApi, setGridApi] = useState();
  const onGridReady = useCallback(({ api }) => setGridApi(api), [setGridApi]);

  const refreshObjectsTable = useCallback(
    () => setRefreshKey(uuid()),
    [setRefreshKey]
  );

  const onDeleteSelectedObjects = useCallback(() => {
    if (!gridApi) return;
    const selectedRowKeys = gridApi.getSelectedRows().map(obj => ({
      name: obj.name,
      objectID: obj.objectID,
      groupID: obj.groupID,
    }));
    onDeleteObjectsAction(selectedRowKeys, selectedItemId, {
      successCallback: refreshObjectsTable,
    });
    gridApi.deselectAll();
  }, [gridApi, onDeleteObjectsAction, selectedItemId, refreshObjectsTable]);

  const onSelectionChanged = useCallback(
    ({ api }) => setSelected(api.getSelectedRows().length),
    [setSelected]
  );

  const onUploadFile = useCallback(
    (values, allObjectsCheck, displayProgress) =>
      onUploadFileAction(values, allObjectsCheck, displayProgress, {
        successCallback: refreshObjectsTable,
      }),
    [onUploadFileAction, refreshObjectsTable]
  );

  const promotePubGroups = useCallback(
    (groupID, name, allObjectsCheck) => {
      promotePubGroupsAction(groupID, name, allObjectsCheck, {
        successCallback: refreshObjectsTable,
      });
    },
    [promotePubGroupsAction, refreshObjectsTable]
  );

  const onLoadData = useCallback(
    (nextPageToken, params) =>
      fetchGroupObjects({
        ...params,
        groupID: selectedItemId,
        nextPageToken,
      }),
    [fetchGroupObjects, selectedItemId]
  );

  const hasDeletePermission = useCurrentEnvPermission(
    OBJECT_STORE_DELETE_OBJECTS
  );
  const onRowDataUpdated = useCallback(
    ({ api }) => {
      const nodes = [];
      api.forEachLeafNode(n => nodes.push(n));
      setItemsShown(nodes.length);
    },
    [setItemsShown]
  );
  return (
    <Accordion className={styles.expanderContainer} defaultExpanded>
      <AccordionSummary
        expandIcon={<Icon>expand_more</Icon>}
        classes={{
          content: styles.titleContent,
          expandIcon: styles.expandIcon,
        }}
      >
        <div className={styles.primaryHeading}>Object List</div>
        <div className={styles.secondaryHeading}>
          {itemsShown > 0
            ? `${itemsShown} ${itemsShown === 1 ? 'Object' : 'Objects'}`
            : 'No Objects'}
        </div>
      </AccordionSummary>
      <AccordionDetails classes={{ root: styles.details }}>
        <div className={styles.actions}>
          {hasDeletePermission && Boolean(selected) && (
            <ConfirmActionComponent
              component="IconButton"
              color="inherit"
              tooltipProps={
                selected
                  ? {
                      title: 'Delete Selected',
                      placement: 'bottom',
                    }
                  : null
              }
              onClick={onDeleteSelectedObjects}
              confirm={{
                title: 'Confirm Delete',
                confirmMsg: `Are you sure you want to delete the selected objects?`,
                mainButtonLabel: 'Delete',
                destructive: true,
              }}
              disabled={!selected}
            >
              delete
            </ConfirmActionComponent>
          )}
          <UploadAction
            groups={groups}
            categories={categories}
            onUploadFile={values => {
              const allObjects = false;
              onUploadFile(values, allObjects);
            }}
            uploadButtonComponent={uploadButton}
            selectedGroup={selectedItem}
          />
        </div>
        <ObjectsTable
          promotePubGroups={promotePubGroups}
          onDownload={onDownload}
          onGridReady={onGridReady}
          onRowDataUpdated={onRowDataUpdated}
          hasDeletePermission={hasDeletePermission}
          formatDateTime={formatDateTime}
          onSelectionChanged={onSelectionChanged}
          isGroupSpecific
          gridProps={{ domLayout: 'autoHeight' }}
          classes={objectsTableStyles}
          onLoadData={onLoadData}
          dataFormatter={dataFormatter}
          key={refreshKey}
        />
      </AccordionDetails>
    </Accordion>
  );
};

ObjectStoreOverrides.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.string),
  formatDateTime: PropTypes.func.isRequired,
  selectedItem: PropTypes.object.isRequired,
  dataFormatter: PropTypes.func,
};

ObjectStoreOverrides.defaultProps = {
  groups: [],
  categories: [],
  dataFormatter: d => d,
};

export const GroupsOverridesComponent = createContext(ObjectStoreOverrides);

const OverridesList = props => {
  const OverridesComponent =
    useContext(GroupsOverridesComponent) || ObjectStoreOverrides;
  return <OverridesComponent {...props} />;
};

export default OverridesList;
