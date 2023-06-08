import PropTypes from 'prop-types';

const FeatureSwitchesCheckStateless = ({
  hasFeatureSwitchesAccess,
  children,
  noAccessComponent,
}) => (hasFeatureSwitchesAccess ? children : noAccessComponent());

FeatureSwitchesCheckStateless.propTypes = {
  hasFeatureSwitchesAccess: PropTypes.bool,
  children: PropTypes.node,
  noAccessComponent: PropTypes.elementType,
};

FeatureSwitchesCheckStateless.defaultProps = {
  hasFeatureSwitchesAccess: false,
  children: null,
  noAccessComponent: () => null,
};

export default FeatureSwitchesCheckStateless;
