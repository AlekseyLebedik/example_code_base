import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formValues } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import difference from 'lodash/difference';
import uniqBy from 'lodash/uniqBy';

import { optionsSelector } from 'dw/core/helpers/selectors';
import Select from 'dw/core/components/FormFields/Select';

import { fetchAvailableGroups as fetchAvailableGroupsAction } from 'dw/permission-management/scenes/Users/actions';
import {
  availableGroupsListSelector,
  availableGroupsLoadingSelector,
} from 'dw/permission-management/scenes/Users/selectors';

export class CompanyGroupsBase extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    availableGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
    companies: PropTypes.arrayOf(PropTypes.number),
    fetchAvailableGroups: PropTypes.func.isRequired,
    changeGroups: PropTypes.func.isRequired,
    loading: PropTypes.bool,
  };

  static defaultProps = {
    companies: [],
    loading: false,
  };

  state = {
    fetchedCompanies: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      companies,
      availableGroups,
      fetchAvailableGroups,
      input: { value: currentGroups = [] },
      changeGroups,
    } = nextProps;

    if (
      (companies.length > 0 || prevState.fetchedCompanies.length > 0) &&
      !companies.every(c => prevState.fetchedCompanies.includes(c))
    ) {
      // Get available Groups when user assigned to a new company
      const existing = uniqBy(availableGroups, 'company').map(g => g.company);
      const missing = companies.filter(c => !existing.includes(c));

      if (missing.length > 0) {
        fetchAvailableGroups({ companyId: missing.join(',') }, true);
      }

      // Remove company groups if related company is removed
      const removedCompanies = difference(
        prevState.fetchedCompanies,
        companies
      );
      if (currentGroups !== '') {
        const groups = currentGroups.filter(
          groupId =>
            !availableGroups.some(
              group =>
                group.id === groupId && removedCompanies.includes(group.company)
            )
        );
        changeGroups(groups);
      }
      return {
        fetchedCompanies: [
          ...prevState.fetchedCompanies.filter(
            fc => !removedCompanies.includes(fc)
          ),
          ...missing,
        ],
      };
    }
    return null;
  }

  render() {
    const {
      companies,
      availableGroups,
      fetchAvailableGroups,
      loading,
      changeGroups,
      ...props
    } = this.props;
    const groups = availableGroups.filter(g => companies.includes(g.company));
    const options = optionsSelector(groups, {
      groupBy: 'companyName',
      value: 'id',
      label: 'name',
    });
    return <Select {...props} options={options} disabled={loading} />;
  }
}

const stateToProps = state => ({
  availableGroups: availableGroupsListSelector(state),
  loading: availableGroupsLoadingSelector(state),
});

const dispatchToProps = { fetchAvailableGroups: fetchAvailableGroupsAction };

const CompanyGroups = compose(
  connect(stateToProps, dispatchToProps),
  formValues('companies')
)(CompanyGroupsBase);

export default CompanyGroups;
