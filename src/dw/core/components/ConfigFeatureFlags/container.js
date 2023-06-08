import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ConfigFeatureFlagsStateless from './presentational';
import { makeHasFeaturesEnabledSelector } from './selectors';

const makeStateToProps = () => {
  const hasConfigFeatureFlagsAccessSelector = makeHasFeaturesEnabledSelector();
  return (state, props) => ({
    hasConfigFeatureFlagsAccess: hasConfigFeatureFlagsAccessSelector(
      state,
      props
    ),
  });
};

const ConfigFeatureFlags = connect(makeStateToProps)(
  ConfigFeatureFlagsStateless
);

ConfigFeatureFlags.propTypes = {
  configFeatureFlags: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

ConfigFeatureFlags.defaultProps = {
  configFeatureFlags: [],
};

export default ConfigFeatureFlags;
