import React from 'react';
import PropTypes from 'prop-types';
import Event from 'playpants/scenes/Event';

const StatelessTemplateDetail = ({ match }) => (
  <Event match={match} isTemplateView />
);
StatelessTemplateDetail.propTypes = {
  match: PropTypes.object.isRequired,
};

export default StatelessTemplateDetail;
