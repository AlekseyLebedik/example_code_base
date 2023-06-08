import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { companiesSelector } from 'dw/permission-management/scenes/selectors';

import PermissionCompaniesStateless from './presentational';
import { fetchCompanies as fetchCompaniesAction } from '../actionCreators';
import { fetchContentTypes as fetchContentTypesAction } from './actions';
import {
  selectedItemSelector,
  baseUrlSelector,
  featureSwitchSelector,
  nextPageSelector,
} from './selectors';

const stateToProps = (state, props) => ({
  baseUrl: baseUrlSelector(state, props),
  nextPage: nextPageSelector(state),
  selectedItem: selectedItemSelector(state, props),
  items: companiesSelector(state),
  featureSwitches: featureSwitchSelector(state),
});

const dispatchProps = dispatch => ({
  fetchCompanies: q => dispatch(fetchCompaniesAction(!q ? {} : { q })),
  onSearch: payload => {
    dispatch(fetchCompaniesAction({ q: payload.q }));
  },
  fetchContentTypes: () => dispatch(fetchContentTypesAction()),
});
export class Companies extends React.Component {
  state = {
    items: [],
  };

  componentDidMount() {
    const { fetchCompanies, fetchContentTypes } = this.props;
    fetchCompanies();
    fetchContentTypes();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { items, match, history } = nextProps;

    if (items && items !== prevState.items && items.length === 1) {
      const path = generatePath(match.path, {
        ...match.params,
        id: items[0].id,
      });
      history.push(path);
      return { items };
    }
    return null;
  }

  onSearch = payload => {
    const { match, history, location, onSearch } = this.props;
    if (match.params.id) {
      history.push(location.pathname.replace(match.params.id, ''));
    }
    onSearch(payload);
  };

  render() {
    const newProps = {
      ...this.props,
      onSearch: this.onSearch,
    };
    return <PermissionCompaniesStateless {...newProps} />;
  }
}

Companies.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  fetchCompanies: PropTypes.func.isRequired,
  fetchContentTypes: PropTypes.func.isRequired,
  featureSwitches: PropTypes.object,
  onSearch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

Companies.defaultProps = {
  items: [],
  featureSwitches: {},
};

export default connect(stateToProps, dispatchProps)(Companies);
