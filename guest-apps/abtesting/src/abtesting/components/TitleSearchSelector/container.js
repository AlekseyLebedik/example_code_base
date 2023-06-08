import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import get from 'lodash/get';
import { connect } from 'react-redux';
import BaseViewProps from 'abtesting/components/BaseViewProps';
import { titleSearch } from './actions';

import TitleSearchSelectorPresentational from './presentational';

class TitleSearchSelectorContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    title: PropTypes.string,
  };

  static defaultProps = {
    title: '',
  };

  componentDidMount() {
    const query = get(this, 'props.history.location.search');
    const { title } = queryString.parse(query);
    if (title && title !== this.props.title) {
      this.props.searchTitle(title);
    }
  }

  handleChange = e => {
    if (this.props.title === e.target.value) return;
    const { history } = this.props;
    const query = history.location.search;
    const { q } = queryString.parse(query);
    const params = queryString.stringify({
      title: e.target.value,
      q,
    });
    history.push(`${history.location.pathname}?${params}`);
    this.props.searchTitle(e.target.value);
  };

  handleClear = () => {
    const { history } = this.props;
    const query = history.location.search;
    this.props.searchTitle('');
    const { q } = queryString.parse(query);
    const params = queryString.stringify({
      q,
    });
    this.props.history.push(`${this.props.location.pathname}?${params}`);
  };

  render() {
    return (
      <TitleSearchSelectorPresentational
        {...this.props}
        value={this.props.title}
        handleChange={this.handleChange}
        handleClear={this.handleClear}
      />
    );
  }
}

TitleSearchSelectorContainer.propTypes = {
  searchTitle: PropTypes.func.isRequired,
};

const dispatchProps = dispatch => ({
  searchTitle: searchTerm => {
    dispatch(titleSearch(searchTerm));
  },
});

const stateProps = state => ({
  title: state.Components.BaseViewProps.titleQuery,
});

const ConnectedTitleSearchSelector = connect(
  stateProps,
  dispatchProps
)(TitleSearchSelectorContainer);

const ScheduleTitleSelectorWithBaseProps = props => (
  <BaseViewProps path={props.path}>
    {baseProps => <ConnectedTitleSearchSelector {...baseProps} {...props} />}
  </BaseViewProps>
);
ScheduleTitleSelectorWithBaseProps.propTypes = {
  path: PropTypes.string,
};
ScheduleTitleSelectorWithBaseProps.defaultProps = {
  path: undefined,
};

export default ScheduleTitleSelectorWithBaseProps;
