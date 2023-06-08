import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { connect } from 'dw/core/helpers/component';

function RedirectToDefault({ match, defaultTitleEnv }) {
  const titlePath = `${defaultTitleEnv.titleId}/${defaultTitleEnv.shortType}`;
  return <Redirect to={`${match.path}/${titlePath}`} />;
}

RedirectToDefault.propTypes = {
  match: PropTypes.object.isRequired,
  defaultTitleEnv: PropTypes.object.isRequired,
};

const stateToProps = state => ({
  defaultTitleEnv: state.user.profile.defaultTitleEnv,
});

export default connect(stateToProps, null, RedirectToDefault);
