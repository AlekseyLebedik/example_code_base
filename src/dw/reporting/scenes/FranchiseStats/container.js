import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dw/core/helpers/component';
import { selectedFranchiseSelector } from 'dw/reporting/selectors';
import Error404 from 'dw/core/components/Error404';

import FranchiseStatsStateless from './presentational';

const stateToProps = (state, props) => ({
  franchise: selectedFranchiseSelector(state, props),
  stats:
    props.match.params.statName && props.match.params.statName !== '--'
      ? [props.match.params.statName]
      : undefined,
  start: props.match.params.start && parseInt(props.match.params.start, 10),
  end: props.match.params.end && parseInt(props.match.params.end, 10),
});

const FranchiseStats = props => {
  if (props.franchise !== undefined) {
    return <FranchiseStatsStateless {...props} />;
  }
  const redirectTo = props.match.path.split(':franchiseId')[0];
  return <Error404 redirectTo={redirectTo} />;
};

FranchiseStats.propTypes = {
  franchise: PropTypes.object,
  match: PropTypes.object.isRequired,
};

FranchiseStats.defaultProps = {
  franchise: undefined,
};

export default connect(stateToProps, null, FranchiseStats);
