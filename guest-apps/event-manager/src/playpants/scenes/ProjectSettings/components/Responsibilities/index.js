import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AdapterLink from '@demonware/devzone-core/components/RouteAdapterLink';
import {
  RESP_URL,
  RESP_REDIRECT_URL,
  RESPONSIBILITIES_SUB_TABS,
} from 'playpants/scenes/ProjectSettings/constants';
import RedirectHandler from 'playpants/components/RedirectHandler';

import { currentProjectIdSelector } from 'playpants/components/App/selectors';
import * as actions from './actions';
import { GROUP_TYPE } from './components/Groups/constants';

import Users from './components/Users';
import Groups from './components/Groups';

export const ResponsibilitiesBase = ({
  selectedTab,
  baseUrl,
  onFetchResponsibilityOptions,
  ...props
}) => {
  useEffect(() => {
    onFetchResponsibilityOptions();
    props.onFetchGroups();
  }, []);

  return (
    <RedirectHandler
      matchParam={selectedTab}
      list={Object.keys(RESPONSIBILITIES_SUB_TABS)}
      url={`${baseUrl}${RESP_REDIRECT_URL}`}
    >
      <>
        <Tabs value={selectedTab} indicatorColor="primary" textColor="primary">
          {Object.entries(RESPONSIBILITIES_SUB_TABS).map(([key, label]) => (
            <Tab
              key={key}
              value={key}
              label={label}
              component={AdapterLink}
              to={`${baseUrl}${RESP_URL}/${key}`}
            />
          ))}
        </Tabs>
        {selectedTab === 'users' ? <Users {...props} /> : <Groups {...props} />}
      </>
    </RedirectHandler>
  );
};

ResponsibilitiesBase.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  onFetchGroups: PropTypes.func.isRequired,
  onFetchResponsibilityOptions: PropTypes.func.isRequired,
  selectedTab: PropTypes.string,
};
ResponsibilitiesBase.defaultProps = {
  selectedTab: null,
};

const stateToProps = state => ({
  project: currentProjectIdSelector(state),
});

const dispatchToProps = dispatch => ({
  onFetchGroups: bindActionCreators(actions.fetchGroups, dispatch),
  onFetchResponsibilityOptions: bindActionCreators(
    actions.fetchResponsibilityOptions,
    dispatch
  ),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  onFetchGroups: params =>
    dispatchProps.onFetchGroups({
      project: stateProps.project,
      type: GROUP_TYPE,
      ...params,
    }),
  onFetchResponsibilityOptions: () =>
    dispatchProps.onFetchResponsibilityOptions({
      project__in: `${stateProps.project},null`,
    }),
});

export default connect(
  stateToProps,
  dispatchToProps,
  mergeProps
)(ResponsibilitiesBase);
