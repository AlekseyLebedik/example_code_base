import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'dw/core/helpers/component';

import { defaultProjectSelector } from '../ProjectSelector/selectors';

function RedirectToDefault({ match, defaultProject }) {
  return <Redirect to={`${match.path}/${defaultProject}`} />;
}

RedirectToDefault.propTypes = {
  match: PropTypes.object.isRequired,
  defaultProject: PropTypes.number.isRequired,
};

const stateToProps = state => ({
  defaultProject: defaultProjectSelector(state),
});

export default connect(stateToProps, null, RedirectToDefault);
