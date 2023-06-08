import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

import Permission from '../Permission';

import styles from './index.module.css';

const PermissionsList = DragDropContext(HTML5Backend)(
  ({
    contentType,
    fields,
    onMove,
    dragTypeObjectPerm,
    dragTypeDetails,
    form,
  }) => (
    <Paper className={styles.container}>
      <label className={styles.titleContent}>{contentType.model}</label>
      <div>
        {fields.map((selection, index) => (
          <Permission
            key={`${selection}`}
            fields={fields}
            form={form}
            selection={selection}
            contentType={contentType}
            index={index}
            onDrop={item => {
              onMove(item.index, index, fields, selection, item);
            }}
            dragTypeDetails={dragTypeDetails}
            dragTypeObjectPerm={dragTypeObjectPerm}
          />
        ))}
        <Tooltip className={styles.addPermission} title="Add Permission">
          <Fab
            variant="extended"
            onClick={() => {
              fields.push({ permissions: [], selectedDetails: [] });
            }}
            color="primary"
            aria-label="Add"
          >
            <Icon>add</Icon>
            ADD PERMISSION
          </Fab>
        </Tooltip>
      </div>
    </Paper>
  )
);

PermissionsList.propTypes = {
  contentType: PropTypes.object,
  fields: PropTypes.object.isRequired,
  onMove: PropTypes.func.isRequired,
};

PermissionsList.defaultProps = {
  contentType: {},
};

export default PermissionsList;
