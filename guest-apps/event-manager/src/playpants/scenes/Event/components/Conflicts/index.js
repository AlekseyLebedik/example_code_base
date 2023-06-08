import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'dw/core/helpers/component';
import MasterDetail from 'dw/core/components/MasterDetail';
import { useInterval } from 'playpants/hooks';
import MainDetailsEmpty from 'playpants/components/MainDetailsEmpty';

import ConflictDetails from './components/ConflictDetails';
import ConflictsSidebar from './components/ConflictsSidebar';

import * as conflictActions from './actions';
import { isEventOver } from './helpers';
import { conflictTypeSelector } from './selectors';

export const ConflictsBase = props => {
  const { classes, eventData, eventId, getConflicts, tabUrl } = props;
  // fetching conflicts on type change
  useEffect(() => {
    getConflicts(eventId);
  }, []);

  useInterval(() => {
    if (!isEventOver(eventData)) getConflicts(eventId);
  }, 20000);

  return (
    <MasterDetail
      master={({ actions, selectedItemId }) => (
        <ConflictsSidebar
          {...props}
          onSelectItem={actions.onSelectItem}
          selectedItemId={selectedItemId}
        />
      )}
      detail={({ selectedItemId }) => (
        <ConflictDetails {...props} selectedItemId={selectedItemId} />
      )}
      empty={() => (
        <MainDetailsEmpty msg="Select a conflict to see more details" />
      )}
      baseUrl={tabUrl}
      classes={{
        drawer: classes.masterDetailDrawer,
        drawerPaper: classes.masterDetailDrawerPaper,
        contentShift: classes.masterDetailContentShift,
        expander: classes.masterDetailExpander,
      }}
    />
  );
};

ConflictsBase.propTypes = {
  changeConflictType: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  conflictTypeFilter: PropTypes.string.isRequired,
  eventData: PropTypes.object.isRequired,
  eventId: PropTypes.number.isRequired,
  getConflicts: PropTypes.func.isRequired,
  tabUrl: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  conflictTypeFilter: conflictTypeSelector(state),
});

const mapDispatchToProps = dispatch => ({
  changeConflictType: bindActionCreators(
    conflictActions.setConflictType,
    dispatch
  ),
  getConflicts: bindActionCreators(conflictActions.fetchConflicts, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps, ConflictsBase);
