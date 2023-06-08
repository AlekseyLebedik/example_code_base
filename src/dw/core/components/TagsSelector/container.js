import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';

import * as dispatchToProps from './actions';
import { tagsSelector, valueSelector } from './selectors';

import TagsStateless from './presentational';

class Tags extends Component {
  componentDidMount() {
    const { tags, fetchTags } = this.props;
    if (tags === undefined) fetchTags();
  }

  render() {
    return this.props.tags && this.props.value ? (
      <TagsStateless {...this.props} />
    ) : (
      <CircularProgress size={24} />
    );
  }
}

Tags.propTypes = {
  fetchTags: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.arrayOf(PropTypes.object),
};

Tags.defaultProps = {
  tags: undefined,
  value: undefined,
};

const stateToProps = (state, props) => ({
  tags: tagsSelector(state, props),
  value: valueSelector(state, props),
});

export default connect(stateToProps, dispatchToProps)(Tags);
