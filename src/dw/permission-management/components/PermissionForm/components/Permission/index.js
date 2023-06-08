import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Field, formValueSelector } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { DragSource, DropTarget } from 'react-dnd';

import capitalize from 'lodash/capitalize';
import classNames from 'classnames';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Chip from '@material-ui/core/Chip';

import AutocompleteGeneral from 'dw/core/components/FormFields/AutocompleteGeneral';
import PermissionField from '../PermissionField';

import styles from './index.module.css';

const SourceChipDetailsRaw = ({
  connectDragSource,
  index,
  data,
  contentType,
  dragTypeDetails,
  dragTypeObjectPerm,
  ...props
}) =>
  connectDragSource(
    <div key={`${data.value}.${index}`} onMouseDown={e => e.stopPropagation()}>
      <Chip
        tabIndex={-1}
        id={data && data.value}
        label={props.children}
        className={classNames(props.selectProps.classes.chip, {
          [props.selectProps.classes.chipFocused]: props.isFocused,
        })}
        onDelete={props.removeProps.onClick}
        deleteIcon={<Icon {...props.removeProps}>cancel</Icon>}
      />
    </div>
  );

const SourceDetailChip = DragSource(
  props => props.contentType.id.toString(),
  {
    beginDrag: ({ data, index, dragTypeDetails }) => ({
      id: data.value,
      index,
      type: dragTypeDetails,
    }),
  },
  conn => ({
    connectDragSource: conn.dragSource(),
  })
)(SourceChipDetailsRaw);

const SourceChipPermissionRaw = ({
  connectDragSource,
  index,
  data,
  contentType,
  dragTypeDetails,
  dragTypeObjectPerm,
  ...props
}) =>
  connectDragSource(
    <div
      key={`${
        (data && data.value) || (contentType && contentType.id)
      }.${index}`}
    >
      <Chip label={data && data.label} id={data && data.value} {...props} />
    </div>
  );

const SourcePermissionChip = DragSource(
  props => props.contentType.id.toString(),
  {
    beginDrag: ({ id, index, dragTypeObjectPerm }) => ({
      id,
      index,
      type: dragTypeObjectPerm,
    }),
  },
  conn => ({
    connectDragSource: conn.dragSource(),
  })
)(SourceChipPermissionRaw);

const Permission = ({
  contentType,
  dragTypeDetails,
  dragTypeObjectPerm,
  fields,
  index,
  selectedDetailsIds,
  selection,
}) => {
  const { details: options = [] } = contentType;
  const defaultValue = options
    .filter(opt => selectedDetailsIds.includes(opt.id))
    .map(opt => ({
      value: opt.id,
      label: opt.displayName,
    }));

  return (
    <div className={styles.permission}>
      <Field
        name={`${selection}.selectedDetails`}
        textFieldProps={{ 'data-cy': 'autocomplete' }}
        regularInputMode
        defaultValue={defaultValue}
        label={capitalize(contentType.model)}
        component={AutocompleteGeneral}
        fullWidth
        isMulti
        isClearable={false}
        options={options.map(opt => ({
          value: opt.id,
          label: opt.displayName,
        }))}
        key={options.length}
        components={{
          MultiValue: props => (
            <SourceDetailChip
              contentType={contentType}
              index={index}
              callback={value => ({ id: value })}
              dragTypeDetails={dragTypeDetails}
              dragTypeObjectPerm={dragTypeObjectPerm}
              {...props}
            />
          ),
        }}
        onDrop={e => {
          e.preventDefault();
        }}
      />
      <Field
        component={PermissionField}
        options={contentType.permissions || []}
        name={`${selection}.permissions`}
        placeholder="Please select Permissions"
        label="Permissions"
        ItemComponent={SourcePermissionChip}
        itemProps={{
          contentType,
          index,
          callback: value => ({ id: value }),
          dragTypeObjectPerm,
        }}
        multiple
        onDrop={e => {
          e.preventDefault();
        }}
      />
      <div className={styles.deletepermissions}>
        <Tooltip title={`Delete ${contentType.model}`}>
          <IconButton
            data-cy="delete-permission"
            onClick={() => {
              fields.remove(index);
            }}
          >
            <Icon>delete</Icon>
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

Permission.propTypes = {
  contentType: PropTypes.object.isRequired,
  dragTypeDetails: PropTypes.string.isRequired,
  dragTypeObjectPerm: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  selectedDetailsIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  selection: PropTypes.string.isRequired,
};

Permission.defaultProps = {};

const TargetPermissionRaw = ({
  isOver,
  connectDropTarget,
  selection,
  fields,
  contentType,
  index,
  dragTypeDetails,
  dragTypeObjectPerm,
  values,
}) => {
  const { id: contentId } = contentType;
  const selectedDetailsIds = useMemo(() => {
    const { selections = [] } =
      values.find(obj => obj.cTypeId === contentId) || {};
    const { selectedDetails } = selections[index];
    return selectedDetails || [];
  }, [contentId]);

  const opacity = isOver ? 1 : 0.7;
  return connectDropTarget(
    <div style={{ opacity }}>
      <Permission
        contentType={contentType}
        selectedDetailsIds={selectedDetailsIds}
        dragTypeDetails={dragTypeDetails}
        dragTypeObjectPerm={dragTypeObjectPerm}
        fields={fields}
        index={index}
        key={`${selection}`}
        selection={selection}
      />
    </div>
  );
};

const createEventFormSelector = formName => formValueSelector(formName);

const mapStateToProps = (state, ownProps) => ({
  values: createEventFormSelector(ownProps.form)(state, 'contentTypes'),
});

export default compose(
  DropTarget(
    props => props.contentType.id.toString(),
    {
      drop(props, monitor) {
        props.onDrop(monitor.getItem());
      },
    },
    (conn, monitor) => ({
      connectDropTarget: conn.dropTarget(),
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    })
  ),
  connect(mapStateToProps)
)(TargetPermissionRaw);
