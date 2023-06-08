import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Badge from '@material-ui/core/Badge';

import styles from './index.module.css';

/**
 * Return `MainComponent` with styled wrapper if:
 * - `mainComponentContainerProps` exists,
 * - AND `MainComponent` for a `selectedTab` in `tabOptions` exists and not marked hidden
 *
 * Otherwise, return `MainComponent`.
 *
 * Returns null if a `tabOption` for a `selectedTab` does not exist.
 * @param {{}} mainComponentContainerProps - Props passed to the `<MainComponent />` container
 * @param {string} selectedTab             - Value of the tab that is selected
 * @param {[]} tabOptions                  - @see TabulatedDetailComponent
 */
const SelectedTabDetail = ({
  mainComponentContainerProps,
  selectedTab,
  tabOptions,
}) => {
  const tabOption = tabOptions.find(
    tab => tab.value === selectedTab && !tab.hidden
  );
  if (isEmpty(tabOption) || tabOption.hidden) {
    return null;
  }
  const { MainComponent, componentProps } = tabOption;
  return !isEmpty(mainComponentContainerProps) ? (
    <div
      className={classNames(
        mainComponentContainerProps.className,
        styles.tabContainer
      )}
    >
      <MainComponent {...componentProps} />
    </div>
  ) : (
    <MainComponent {...componentProps} />
  );
};

SelectedTabDetail.propTypes = {
  mainComponentContainerProps: PropTypes.object,
  mainComponentProps: PropTypes.object,
  selectedTab: PropTypes.string,
  tabOptions: PropTypes.arrayOf(
    PropTypes.shape({
      badgeCount: PropTypes.number,
      badgeInvisible: PropTypes.bool,
      badgeVariant: PropTypes.string,
      hidden: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired,
      MainComponent: PropTypes.elementType.isRequired,
      TabComponent: PropTypes.elementType,
      tabLinkTo: PropTypes.string,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

SelectedTabDetail.defaultProps = {
  mainComponentContainerProps: {},
  mainComponentProps: {},
  selectedTab: '',
};

const TabulatedDetailComponent = props => {
  const {
    appBarProps,
    mainComponentContainerProps,
    onChange,
    selectedTab,
    tabOptions,
  } = props;
  return (
    <>
      <AppBar {...appBarProps}>
        <Tabs value={selectedTab} onChange={onChange}>
          {tabOptions.map(
            tab =>
              !tab.hidden && (
                <Tab
                  className={styles.disableLinkStyle}
                  component={tab.TabComponent}
                  data-cy={tab.dataCy}
                  key={tab.value}
                  label={
                    <Badge
                      badgeContent={tab.badgeCount}
                      classes={{ badge: styles.tabBadge }}
                      data-cy={`${tab.dataCy}Badge`}
                      invisible={tab.badgeInvisible}
                      variant={tab.badgeVariant}
                    >
                      {tab.label}
                    </Badge>
                  }
                  to={tab.tabLinkTo}
                  value={tab.value}
                />
              )
          )}
        </Tabs>
      </AppBar>
      <SelectedTabDetail
        mainComponentContainerProps={mainComponentContainerProps}
        selectedTab={selectedTab}
        tabOptions={tabOptions}
      />
    </>
  );
};

TabulatedDetailComponent.propTypes = {
  appBarProps: PropTypes.object,
  mainComponentContainerProps: PropTypes.object,
  onChange: PropTypes.func,
  selectedTab: PropTypes.string,
  tabOptions: PropTypes.arrayOf(
    PropTypes.shape({
      badgeCount: PropTypes.number,
      badgeInvisible: PropTypes.bool,
      badgeVariant: PropTypes.string,
      hidden: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired,
      MainComponent: PropTypes.elementType.isRequired,
      TabComponent: PropTypes.elementType,
      tabLinkTo: PropTypes.string,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

TabulatedDetailComponent.defaultProps = {
  appBarProps: {},
  mainComponentContainerProps: {},
  onChange: () => {},
  selectedTab: '',
};

export default TabulatedDetailComponent;
