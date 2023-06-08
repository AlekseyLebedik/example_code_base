import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { ContextProvider, ContextConsumer } from './AppStore';
import GlobalProgress from './components/GlobalProgress';
import GlobalSnackBar from './components/GlobalSnackBar';

import { actions as userActions } from './modules/user';
import { actions as permissionsActions } from './modules/permissions';
import { actions as switchesActions } from './modules/switches';

import { fetchContentTypes } from './modules/contentType/actions';
import { NavbarChildrenContext } from './NavigationBar/context';

const FetchData = () => {
  const { dispatch } = useContext(ContextConsumer);
  useEffect(() => {
    dispatch(switchesActions.fetchFeatureSwitches());
    dispatch(userActions.fetchUserProfile());
    dispatch(userActions.fetchUserProfileSettings());
    dispatch(userActions.fetchUserProjects());
    dispatch(permissionsActions.fetchUserMemberships());
    dispatch(fetchContentTypes());
  }, []);
  return null;
};

const AppWrapper = ({ children, ...props }) => {
  const [navbarChildrenContainer, setNavbarChildrenContainer] = useState();
  return (
    <ContextProvider {...props}>
      <NavbarChildrenContext.Provider
        value={{ navbarChildrenContainer, setNavbarChildrenContainer }}
      >
        <FetchData />
        <GlobalProgress />
        {children}
        <GlobalSnackBar />
      </NavbarChildrenContext.Provider>
    </ContextProvider>
  );
};
AppWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
};
AppWrapper.defaultProps = {
  children: null,
};

export default AppWrapper;
