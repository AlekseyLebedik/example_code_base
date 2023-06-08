import React from 'react';
import PropTypes from 'prop-types';
import MasterDetail from 'dw/core/components/MasterDetail';
import MainDetailsEmpty from 'playpants/components/MainDetailsEmpty';
import ActivityDetails from './components/ActivityDetails';
import ActivitiesSidebar from './components/ActivitiesSidebar';

export const ActivityBase = props => (
  <MasterDetail
    master={({ actions, selectedItemId }) => (
      <ActivitiesSidebar
        {...props}
        onSelectItem={actions.onSelectItem}
        selectedItemId={selectedItemId}
      />
    )}
    detail={({ selectedItemId }) => (
      <ActivityDetails {...props} selectedItemId={selectedItemId} />
    )}
    empty={() => (
      <MainDetailsEmpty msg="Select an activity to see more details" />
    )}
    baseUrl={props.tabUrl}
    classes={{
      drawer: props.classes.masterDetailDrawer,
      drawerPaper: props.classes.masterDetailDrawerPaper,
      contentShift: props.classes.masterDetailContentShift,
      expander: props.classes.masterDetailExpander,
    }}
  />
);

ActivityBase.propTypes = {
  classes: PropTypes.object.isRequired,
  tabUrl: PropTypes.string.isRequired,
};

export default ActivityBase;
