import React from 'react';
import { shallow } from 'enzyme';

import { StoreItemsDisconnected } from '../index';

describe('Store Inventory', () => {
  const onSelectRarityFilter = jest.fn();
  const onInventoryFilterChange = jest.fn();
  const onSelectItems = jest.fn();
  const grantItems = jest.fn();
  const getStoreItems = jest.fn();

  const renderContainer = (customProps = {}) => {
    const propsConnected = {
      onSelectRarityFilter,
      onInventoryFilterChange,
      onSelectItems,
      grantItems,
      getStoreItems,
      selectedItems: [],
      missingItems: [],
      items: [],
      ...customProps,
    };

    return shallow(<StoreItemsDisconnected {...propsConnected} />);
  };

  describe('Connected Store Inventory', () => {
    it('renders default values', () => {
      const wrapper = renderContainer();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
