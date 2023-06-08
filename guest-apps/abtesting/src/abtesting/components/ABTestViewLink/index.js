import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ABTestViewLink(props) {
  const { titleID, environment, id, name } = props.test.data || props.test;
  return (
    <Link to={`/abtesting/view/${titleID}/${environment}/${id}`}>{name}</Link>
  );
}

ABTestViewLink.propTypes = {
  test: PropTypes.object.isRequired,
};

export default ABTestViewLink;
