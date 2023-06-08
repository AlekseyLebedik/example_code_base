import React from 'react';
import JSONTree from 'dw/core/components/JSONTree';
import PropTypes from 'prop-types';

import ActivityTitle from '../ActivityTitle';

const DefaultDetails = ({ selectedActivity }) => {
  const root = selectedActivity.activity;
  const keys = Object.keys(root);
  return (
    <>
      <ActivityTitle />
      <JSONTree data={root} defaultExpandedKeys={keys} />
    </>
  );
};

DefaultDetails.propTypes = {
  selectedActivity: PropTypes.object.isRequired,
};

export default DefaultDetails;
