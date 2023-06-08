import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { fetch } from './actions';
import SourceSelectStateless from './presentational';

const stateToProps = (state, props) => ({
  ...props,
  data: state.Core.SourceSelect.data,
});

const dispatchToProps = dispatch => {
  const _fetch = (apiCall, input) => dispatch(fetch(apiCall, input));
  return {
    onLoad: _fetch,
    onType: _fetch,
  };
};

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  onType: input => dispatchProps.onType(stateProps.apiCall, input),
});

class SourceSelect extends React.Component {
  state = {
    value: this.props.initialValue,
  };

  static getDerivedStateFromProps(nextProps) {
    const { data, renderOption } = nextProps;
    if (data.length === 1) {
      return { value: renderOption(data[0]) };
    }
    return null;
  }

  componentDidMount() {
    if (this.props.initialValue || this.props.defaultValue) {
      this.props.onLoad(
        this.props.apiCall,
        this.props.initialValue || this.props.defaultValue
      );
    }
  }

  onChange = value => {
    this.setState({ value });
  };

  onFocus = e => {
    const { target } = e;
    target.select();
  };

  render() {
    const { value } = this.state;
    const newProps = {
      onChange: this.onChange,
      onFocus: this.onFocus,
      ...this.props,
    };
    return <SourceSelectStateless value={value} {...newProps} />;
  }
}

SourceSelect.propTypes = {
  initialValue: PropTypes.string,
  data: PropTypes.array,
  renderOption: PropTypes.func,
  defaultValue: PropTypes.string,
  apiCall: PropTypes.func,
  onLoad: PropTypes.func,
};

SourceSelect.defaultProps = {
  initialValue: '',
  data: undefined,
  renderOption: undefined,
  defaultValue: '',
  apiCall: undefined,
  onLoad: undefined,
};

export default compose(connect(stateToProps, dispatchToProps, mergeProps))(
  SourceSelect
);
