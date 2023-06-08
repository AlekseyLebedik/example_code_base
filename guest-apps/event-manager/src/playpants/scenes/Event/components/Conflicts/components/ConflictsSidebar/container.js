import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  conflictsQuerySelector,
  conflictsSelector,
  conflictTypeSelector,
} from '../../selectors';
import * as actions from '../../actions';

import ConflictsSidebarStateless from './presentational';

export const ConflictsSidebarBase = ({ eventUrl, onSelectItem, ...props }) => (
  <ConflictsSidebarStateless
    {...props}
    handleConflictSelection={(eventId, activityId, overlappingActivityId) => {
      onSelectItem(
        `conflicts/${eventId}${
          activityId && overlappingActivityId
            ? `,${activityId},${overlappingActivityId}`
            : ''
        }`,
        eventUrl
      );
    }}
  />
);

const mapStateToProps = state => ({
  conflicts: conflictsSelector(state),
  conflictType: conflictTypeSelector(state),
  searchQuery: conflictsQuerySelector(state),
});

const mapDispatchToProps = dispatch => ({
  searchConflicts: bindActionCreators(actions.searchConflicts, dispatch),
});

ConflictsSidebarBase.propTypes = {
  conflicts: PropTypes.arrayOf(PropTypes.object).isRequired,
  conflictType: PropTypes.string.isRequired,
  eventUrl: PropTypes.string.isRequired,
  onSelectItem: PropTypes.func.isRequired,
  searchConflicts: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConflictsSidebarBase);
