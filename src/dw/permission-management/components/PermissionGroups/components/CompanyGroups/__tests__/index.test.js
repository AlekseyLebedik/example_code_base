import React from 'react';
import { shallow } from 'enzyme';

import createStore from 'dw/permission-management/store';
import { CompanyGroupsBase } from '../index';

describe('CompanyGroups component', () => {
  const companyId = 1;
  let store = {};
  let props = {};

  beforeEach(() => {
    store = createStore();
    props = {
      companies: [companyId],
      availableGroups: [],
      fetchAvailableGroups: jest.fn(),
      loading: false,
      changeGroups: jest.fn(),
      input: { value: [] },
    };
  });

  it('fetches missing company groups for 1 company', () => {
    const root = shallow(
      <CompanyGroupsBase {...props} store={store} />
    ).instance();

    const fetchAvailableGroupsSpy = jest.spyOn(props, 'fetchAvailableGroups');
    expect(fetchAvailableGroupsSpy).toHaveBeenCalledTimes(1);
    expect(fetchAvailableGroupsSpy).toHaveBeenCalledWith(
      { companyId: '1' },
      true
    );
    expect(root.state.fetchedCompanies).toEqual([1]);
  });

  it('fetches missing company groups for many company', () => {
    const root = shallow(
      <CompanyGroupsBase {...props} companies={[1, 2, 3]} />
    ).instance();
    const fetchAvailableGroupsSpy = jest.spyOn(props, 'fetchAvailableGroups');
    expect(fetchAvailableGroupsSpy).toHaveBeenCalledTimes(1);
    expect(fetchAvailableGroupsSpy).toHaveBeenCalledWith(
      {
        companyId: '1,2,3',
      },
      true
    );
    expect(root.state.fetchedCompanies).toEqual([1, 2, 3]);
  });

  it('does ont fetch when no companies selected', () => {
    const root = shallow(
      <CompanyGroupsBase {...props} companies={[]} />
    ).instance();
    const fetchAvailableGroupsSpy = jest.spyOn(props, 'fetchAvailableGroups');
    expect(fetchAvailableGroupsSpy).toHaveBeenCalledTimes(0);
    expect(root.state.fetchedCompanies).toEqual([]);
  });
});
