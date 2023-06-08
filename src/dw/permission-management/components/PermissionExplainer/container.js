import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { hasData } from 'dw/core/helpers/object';

import { companyIDsSelector } from 'dw/permission-management/scenes/selectors';

import PermissionExplainerStateLess from './presentational';

export const PermissionExplainerComponent = props => {
  const {
    match,
    selectedItem,
    fetchObjectPermissions,
    contentTypes,
    fetchContentTypesDetails,
    isLoading,
  } = props;
  const [userID, setUserID] = useState(null);
  const [prevCompaniesRequesterIsAdmin, setPrevCompaniesRequesterIsAdmin] =
    useState(null);
  const companiesRequesterIsAdmin = useSelector(state =>
    companyIDsSelector(state)
  );

  useEffect(() => {
    if (match?.params?.id) setUserID(match.params.id);
  }, [match]);

  useEffect(() => {
    if (selectedItem && hasData(contentTypes)) {
      const { id: selectedItemId } = selectedItem;
      // For group company membership is already featched.
      if (selectedItem.company || selectedItemId) {
        fetchContentTypesDetails(contentTypes, [
          selectedItem.company || selectedItemId,
        ]);
      }
      fetchObjectPermissions(selectedItemId);
      setPrevCompaniesRequesterIsAdmin(null);
    }
    if (
      hasData(companiesRequesterIsAdmin) &&
      hasData(contentTypes) &&
      companiesRequesterIsAdmin !== prevCompaniesRequesterIsAdmin
    ) {
      fetchContentTypesDetails(contentTypes, companiesRequesterIsAdmin);
      setPrevCompaniesRequesterIsAdmin(companiesRequesterIsAdmin);
    }
  }, [selectedItem, companiesRequesterIsAdmin]);

  return (
    <PermissionExplainerStateLess
      isLoading={isLoading}
      contentTypes={contentTypes}
      userID={userID}
    />
  );
};

PermissionExplainerComponent.propTypes = {
  match: PropTypes.object.isRequired,
  selectedItem: PropTypes.object.isRequired,
  fetchObjectPermissions: PropTypes.func.isRequired,
  fetchContentTypesDetails: PropTypes.func.isRequired,
  contentTypes: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default PermissionExplainerComponent;
