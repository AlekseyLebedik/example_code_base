import { connect } from 'react-redux';

import ConfigFeatureFlags from 'dw/core/components/ConfigFeatureFlags';

import { sourceSelector } from './selectors';

const stateToProps = (state, props) => ({
  ...props,
  projectTitleSource: sourceSelector(state),
});

export default connect(stateToProps)(ConfigFeatureFlags);
