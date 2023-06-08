import React from 'react';
import PropTypes from 'prop-types';

import { Tabs, Tab } from 'dw/core/components/Tabs';
import FeatureSwitchesCheck, {
  featureSwitches as fs,
} from '@demonware/devzone-core/access/FeatureSwitchesCheck';
import Error404 from 'dw/core/components/Error404';

import PermissionsForm from 'dw/permission-management/components/PermissionForm';
import PermissionGroupsComponent from 'dw/permission-management/components/PermissionGroups';
import PermissionFeatureFlagsComponent from 'dw/permission-management/components/PermissionFeatureFlags';
import PermissionExplainerComponent from 'dw/permission-management/components/PermissionExplainer';

import {
  GROUP_TAB,
  ADVANCED_TAB,
  FEATURE_FLAGS_TAB,
  EXPLAINER_TAB,
} from '../../constants';

import styles from './presentational.module.css';

const Details = props => {
  const {
    selectedItem,
    selectedTab,
    onTabChange,
    initialValuesAdvancedUsers,
    initialValuesPermGroups,
    formAdvanced,
    formGroups,
    ...advancedProps
  } = props;

  const groupProps = {
    initialValues: initialValuesPermGroups,
    form: formGroups,
  };

  if (!selectedItem) return null;

  return (
    <div className={styles.details}>
      <Tabs value={selectedTab} indicatorColor="default" onChange={onTabChange}>
        <Tab value={GROUP_TAB} label="Companies / Groups" />
        <Tab value={ADVANCED_TAB} label={ADVANCED_TAB} />
        <Tab value={FEATURE_FLAGS_TAB} label={FEATURE_FLAGS_TAB} />
        <Tab value={EXPLAINER_TAB} label={EXPLAINER_TAB} />
      </Tabs>
      {selectedTab === GROUP_TAB && (
        <PermissionGroupsComponent userID={selectedItem.id} {...groupProps} />
      )}
      {selectedTab === ADVANCED_TAB && (
        <PermissionsForm
          {...advancedProps}
          selectedItem={selectedItem}
          initialValues={initialValuesAdvancedUsers}
          form={formAdvanced}
          title={selectedItem ? selectedItem.username : ''}
        />
      )}
      {selectedTab === FEATURE_FLAGS_TAB && (
        <FeatureSwitchesCheck
          featureSwitches={[fs.FEATURE_FLAG_VIEWER_PERM]}
          isStaffAllowed={false}
          noAccessComponent={() => <Error404 />}
        >
          <PermissionFeatureFlagsComponent
            {...advancedProps}
            selectedItem={selectedItem}
            initialValues={initialValuesAdvancedUsers}
            form={formAdvanced}
            title={selectedItem ? selectedItem.username : ''}
          />
        </FeatureSwitchesCheck>
      )}
      {selectedTab === EXPLAINER_TAB && (
        <FeatureSwitchesCheck
          featureSwitches={[fs.PERMISSION_HELPER_VIEWER_PERM]}
          isStaffAllowed={false}
          noAccessComponent={() => <Error404 />}
        >
          <PermissionExplainerComponent
            {...advancedProps}
            selectedItem={selectedItem}
            initialValues={initialValuesAdvancedUsers}
            form={formAdvanced}
            title={selectedItem ? selectedItem.username : ''}
          />
        </FeatureSwitchesCheck>
      )}
    </div>
  );
};

Details.propTypes = {
  selectedItem: PropTypes.object,
  selectedTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  formAdvanced: PropTypes.string.isRequired,
  formGroups: PropTypes.string.isRequired,
  initialValuesAdvancedUsers: PropTypes.object.isRequired,
  initialValuesPermGroups: PropTypes.object,
};

Details.defaultProps = {
  selectedItem: null,
  initialValuesPermGroups: {},
};

export default Details;
