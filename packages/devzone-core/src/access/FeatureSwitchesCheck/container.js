import PropTypes from 'prop-types';
import { connect } from '../../AppStore';

import FeatureSwitchesCheckStateless from './presentational';
import { makeHasFeaturesEnabledSelector } from './selectors';

const makeStateToProps = () => {
  const hasFeatureSwitchesAccessSelector = makeHasFeaturesEnabledSelector();
  return (state, props) => ({
    hasFeatureSwitchesAccess: hasFeatureSwitchesAccessSelector(state, props),
  });
};

const FeatureSwitchesCheck = connect(makeStateToProps)(
  FeatureSwitchesCheckStateless
);

FeatureSwitchesCheck.propTypes = {
  featureSwitches: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  isStaffAllowed: PropTypes.bool,
};

FeatureSwitchesCheck.defaultProps = {
  featureSwitches: [],
  isStaffAllowed: true,
};

export default FeatureSwitchesCheck;
