import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './index.module.css';

import { columnDefs } from './constants';
import FileStorage from '../FileStorage';
import { contextsDataSelector } from '../FileStorage/selectors';

export const PublisherStorage = props => {
  const createColumnDefs = functionRefs =>
    columnDefs(props.contextsData, props.disabled, functionRefs);

  const getNoRowsTemplate = type => {
    const message =
      type === 'locked'
        ? 'Please select a title to a upload a file'
        : 'Drag File or Click Above to Upload';
    return `<span class=${styles.noRowsTemplate}>${message}</span>`;
  };

  const agGridProps = {
    columnDefs: createColumnDefs,
    noRowsUnlocked: !props.disabled && getNoRowsTemplate('unlocked'),
    noRowsLocked: !props.disabled && getNoRowsTemplate('locked'),
  };

  return (
    <FileStorage
      {...props}
      agGridProps={agGridProps}
      key={props.selectedActivity.id}
    />
  );
};

PublisherStorage.propTypes = {
  disabled: PropTypes.bool.isRequired,
  contextsData: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedActivity: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  contextsData: contextsDataSelector(state),
});

export default connect(mapStateToProps)(PublisherStorage);
