import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from './actions';
import { featureFlagItemsSelector } from './selectors';

import PermissionFeatureFlagsStateLess from './presentational';

export const PermissionFeatureFlagsComponent = props => {
  const {
    onLoad,
    items: { data, loading },
    match,
  } = props;

  useEffect(() => {
    const userID = match?.params?.id;
    onLoad({ userID, sortType: '-active' });
  }, []);

  return <PermissionFeatureFlagsStateLess rowData={data} isLoading={loading} />;
};

PermissionFeatureFlagsComponent.propTypes = {
  onLoad: PropTypes.func,
  items: PropTypes.object,
  match: PropTypes.object.isRequired,
};

PermissionFeatureFlagsComponent.defaultProps = {
  onLoad: () => null,
  items: { data: [], loading: true },
};

const mapStateToProps = state => ({
  items: featureFlagItemsSelector(state),
});

const mapDispatchToProps = dispatch => ({
  onLoad: q => dispatch(actions.fetchfeaturePermissions(!q ? {} : q)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PermissionFeatureFlagsComponent);
