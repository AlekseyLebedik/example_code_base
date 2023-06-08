import React from 'react';
import PropTypes from 'prop-types';

import SearchableList from 'dw/core/components/SearchableList';

import { filterConflicts } from '../../helpers';

import ConflictListItem from './components/ConflictListItem';
import ConflictType from './components/ConflictType';

import styles from './index.module.css';

const ConflictsSidebarStateless = ({
  changeConflictType,
  classes,
  conflicts,
  conflictType,
  conflictTypeFilter,
  handleConflictSelection,
  searchConflicts,
  searchQuery,
  selectedItemId,
}) => (
  <div className={`${styles.sidebarContainer} flex flex-col h-full`}>
    <div className={styles.conflictsContainer}>
      <span className={styles.filter}>
        <ConflictType
          changeConflictType={changeConflictType}
          classes={classes}
          conflictTypeFilter={conflictTypeFilter}
        />
      </span>
    </div>

    <SearchableList
      items={filterConflicts(conflicts, searchQuery, conflictType)}
      onSearch={({ q }) => searchConflicts(q)}
      placeholder="Event ID | Event Title | Activity Type"
      showMore={false}
      toRenderFunc={conflict => (
        <ConflictListItem
          classes={classes}
          conflict={conflict}
          handleConflictSelection={handleConflictSelection}
          key={`${conflict.severity}/${conflict.conflicting_event.id}`}
          selectedItemId={selectedItemId}
        />
      )}
    />
  </div>
);

ConflictsSidebarStateless.propTypes = {
  changeConflictType: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  conflicts: PropTypes.arrayOf(PropTypes.object).isRequired,
  conflictType: PropTypes.string.isRequired,
  conflictTypeFilter: PropTypes.string.isRequired,
  handleConflictSelection: PropTypes.func.isRequired,
  searchConflicts: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  selectedItemId: PropTypes.string,
};
ConflictsSidebarStateless.defaultProps = {
  selectedItemId: undefined,
};

export default ConflictsSidebarStateless;
