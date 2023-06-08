import PropTypes from 'prop-types';

const ConfigFeatureFlagsAccess = ({
  hasConfigFeatureFlagsAccess,
  children,
  noAccessComponent,
  aggregated,
}) => {
  if (typeof children === 'function') {
    return aggregated
      ? children(hasConfigFeatureFlagsAccess)
      : children(...hasConfigFeatureFlagsAccess);
  }
  return hasConfigFeatureFlagsAccess ? children : noAccessComponent();
};

ConfigFeatureFlagsAccess.propTypes = {
  hasConfigFeatureFlagsAccess: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(PropTypes.bool),
  ]),
  children: PropTypes.PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  noAccessComponent: PropTypes.elementType,
};

ConfigFeatureFlagsAccess.defaultProps = {
  hasConfigFeatureFlagsAccess: false,
  children: null,
  noAccessComponent: () => null,
};

export default ConfigFeatureFlagsAccess;
