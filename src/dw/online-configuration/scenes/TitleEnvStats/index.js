import React from 'react';
import { connect } from 'react-redux';

import { sourceSelector } from 'dw/core/components/OCFeatureFlags/selectors';

import StatsGraphs from './container';

const Graphs = props => <StatsGraphs {...props} />;

const makeMapStateToProps = () => state => sourceSelector(state);

export default connect(makeMapStateToProps)(Graphs);
