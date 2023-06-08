import React from 'react';
import PropTypes from 'prop-types';
import NavigationBarBase from 'dw/core/components/TitleEnvNavigationBar';
import { RoutesContext } from 'dw/core/helpers/routes';
import { NAVBAR_ENTRIES } from 'dw/online-configuration/scenes/routes';
import TitleSelector from 'dw/online-configuration/components/TitleSelector';
import AdminSettings from 'dw/online-configuration/components/AdminSettings';

const NavigationBar = ({ setContextContainer, showAdminSettings }) => (
  <RoutesContext.Provider
    value={{
      routes: NAVBAR_ENTRIES,
      basePath: 'online-configuration',
    }}
  >
    <NavigationBarBase
      setContextContainer={setContextContainer}
      showAdminSettings={showAdminSettings}
      TitleSelectorComponent={TitleSelector}
      AdminSettingsComponent={AdminSettings}
    />
  </RoutesContext.Provider>
);

NavigationBar.propTypes = {
  setContextContainer: PropTypes.func,
  showAdminSettings: PropTypes.bool,
};

NavigationBar.defaultProps = {
  setContextContainer: () => {},
  showAdminSettings: false,
};

export default NavigationBar;
