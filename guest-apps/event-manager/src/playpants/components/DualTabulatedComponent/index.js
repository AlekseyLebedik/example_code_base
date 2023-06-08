import React from 'react';
import PropTypes from 'prop-types';
import CustomResizablePanels from 'playpants/components/CustomResizablePanels';
import PrimaryDetail from './components/PrimaryDetail';
import SecondaryDetail from './components/SecondaryDetail';
import styles from './index.module.css';

/**
 * Returns a component that contains 2 tabulated panel:
 * - The left panel (`PrimaryDetail`)
 * - The right panel (`SecondaryDetail`)
 *
 * @param {Function} onSetPrimaryTab    - Function called on PrimaryDetail tab change
 * @param {Function} onSetSecondaryTab  - Function called on SecondaryDetail tab change
 * @param {string} primarySelectedTab   - The value of the selected tab on the `PrimaryDetail`
 * @param {[]} primaryTabOptions        - @see TabulatedDetailComponent
 * @param {{}} resizeablePanelProps     - Parameters passed into `<ResizablePanels />`
 * @param {string} secondarySelectedTab - The value of the selected tab on the `SecondaryDetail`
 * @param {[]} secondaryTabOptions      - @see TabulatedDetailComponent
 */
const DualTabulatedComponent = props => {
  const {
    onSetPrimaryTab,
    onSetSecondaryTab,
    primarySelectedTab,
    primaryTabOptions,
    resizablePanelProps,
    secondarySelectedTab,
    secondaryTabOptions,
  } = props;

  return (
    <CustomResizablePanels {...resizablePanelProps}>
      <PrimaryDetail
        onChange={onSetPrimaryTab}
        selectedTab={primarySelectedTab}
        tabOptions={primaryTabOptions}
      />
      <SecondaryDetail
        onChange={onSetSecondaryTab}
        selectedTab={secondarySelectedTab}
        tabOptions={secondaryTabOptions}
        mainComponentContainerProps={{
          className: styles.mainComponentContainer,
        }}
      />
    </CustomResizablePanels>
  );
};

DualTabulatedComponent.propTypes = {
  primarySelectedTab: PropTypes.string.isRequired,
  primaryTabOptions: PropTypes.arrayOf(
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
  resizablePanelProps: PropTypes.object.isRequired,
  secondaryTabOptions: PropTypes.arrayOf(
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
  secondarySelectedTab: PropTypes.string,
  onSetPrimaryTab: PropTypes.func,
  onSetSecondaryTab: PropTypes.func,
};

DualTabulatedComponent.defaultProps = {
  onSetPrimaryTab: () => {},
  onSetSecondaryTab: () => {},
  secondarySelectedTab: null,
};

export default DualTabulatedComponent;
