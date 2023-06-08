import React from 'react';
import PropTypes from 'prop-types';

import { Tabs, Tab } from 'dw/core/components';

import ResponsibilitiesForm from 'playpants/scenes/ProjectSettings/components/Responsibilities/components/ResponsibilitiesForm';
import ResponsibilityUserGroupsComponent from './components/ResponsibilityUserGroups';

import {
  RESPONSIBILITY_GROUPS_FORM_NAME,
  RESPONSIBILITY_ADVANCED_FORM_NAME,
  GROUP_TAB,
  ADVANCED_TAB,
} from './constants';

import styles from './presentational.module.css';

const Details = props => {
  const {
    addUserToGroup,
    assignedGroups,
    baseUrl,
    fetchAssignedGroups,
    groups,
    initialValuesAdvanced,
    initialValuesRespGroups,
    isLoading,
    onSave,
    onTabChange,
    optionTypes,
    project,
    selectedItem,
    selectedTab,
  } = props;
  const groupProps = {
    addUserToGroup,
    assignedGroups,
    baseUrl,
    fetchAssignedGroups,
    form: RESPONSIBILITY_GROUPS_FORM_NAME,
    groups,
    initialValues: initialValuesRespGroups,
    project,
  };

  return (
    selectedItem && (
      <div className={styles.details}>
        <Tabs
          indicatorColor="default"
          onChange={onTabChange}
          value={selectedTab}
        >
          <Tab value={GROUP_TAB} label={GROUP_TAB} />
          <Tab value={ADVANCED_TAB} label={ADVANCED_TAB} />
        </Tabs>
        {selectedTab === GROUP_TAB && (
          <ResponsibilityUserGroupsComponent
            userID={selectedItem.id}
            {...groupProps}
          />
        )}
        {selectedTab === ADVANCED_TAB && (
          <ResponsibilitiesForm
            envTypes={optionTypes}
            form={RESPONSIBILITY_ADVANCED_FORM_NAME}
            initialValues={initialValuesAdvanced}
            isLoading={isLoading}
            onSave={onSave}
            project
            selectedItem={selectedItem}
            title={selectedItem ? selectedItem.username : ''}
          />
        )}
      </div>
    )
  );
};

Details.propTypes = {
  addUserToGroup: PropTypes.func.isRequired,
  assignedGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
  baseUrl: PropTypes.string.isRequired,
  fetchAssignedGroups: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  initialValuesAdvanced: PropTypes.object.isRequired,
  initialValuesRespGroups: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onTabChange: PropTypes.func.isRequired,
  optionTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  project: PropTypes.number.isRequired,
  selectedItem: PropTypes.object,
  selectedTab: PropTypes.string.isRequired,
};

Details.defaultProps = {
  initialValuesRespGroups: {},
  selectedItem: null,
};

export default Details;
