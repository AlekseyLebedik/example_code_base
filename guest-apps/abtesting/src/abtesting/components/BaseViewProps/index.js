import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dw/core/helpers/component';

import { fetchAllTests } from './actions';
import {
  makeGetTestsSelector,
  makeTitleTestsSelector,
  selectedTabSelector,
} from './selectors';

const makeMapStateToProps = () => {
  const getTestsSelector = makeGetTestsSelector();
  const titleTestsSelector = makeTitleTestsSelector();
  const mapStateToProps = (state, props) => ({
    ...props,
    q: state.Components.BaseViewProps.q || props.match.params.q,
    tests: getTestsSelector(state, props),
    selectedTab: selectedTabSelector(state, props),
    testTitles: titleTestsSelector(state, props),
  });
  return mapStateToProps;
};

const dispatchToProps = dispatch => ({
  onLoadAll: status => {
    dispatch(fetchAllTests({ instance: 'dev', status }));
    dispatch(fetchAllTests({ instance: 'prod', status }));
  },
});

class ViewProps extends Component {
  componentDidMount() {
    const { onLoadAll, status } = this.props;
    if (status) {
      onLoadAll(status);
    }
  }

  render() {
    const { children } = this.props;
    return children(this.props);
  }
}

ViewProps.propTypes = {
  children: PropTypes.func.isRequired,
  status: PropTypes.string,
  onLoadAll: PropTypes.func,
};

ViewProps.defaultProps = {
  status: undefined,
  onLoadAll: () => {},
};

export default connect(makeMapStateToProps, dispatchToProps, ViewProps);
