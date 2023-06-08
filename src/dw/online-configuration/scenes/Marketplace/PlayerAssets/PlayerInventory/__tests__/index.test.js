import React from 'react';
import { shallow } from 'enzyme';

import { PlayerItemsStateless } from '../index';

describe('Player Inventory', () => {
  const getPlayerItems = jest.fn();
  const onSelectRarityFilter = jest.fn();
  const onInventoryFilterChange = jest.fn();
  const onSelectItems = jest.fn();

  const renderContainer = (customProps = {}) => {
    const propsConnected = {
      getPlayerItems,
      onSelectRarityFilter,
      onInventoryFilterChange,
      onSelectItems,
      maxQuantity: 5,
      isClan: false,
      ...customProps,
    };

    return shallow(<PlayerItemsStateless {...propsConnected} />);
  };

  beforeEach(() => {
    getPlayerItems.mockClear();
  });

  describe('Connected Player Inventory', () => {
    it('renders default values', () => {
      const wrapper = renderContainer();
      expect(wrapper).toMatchSnapshot();
    });

    it('should not call getPlayerItems without userId or validContext', () => {
      renderContainer({ userId: undefined, validContext: undefined });
      expect(getPlayerItems).not.toHaveBeenCalled();
    });

    it('should call getPlayerItems when userId and valid context are present', () => {
      const userId = 'test1';
      const validContext = 'text_context';
      renderContainer({ userId, validContext });
      expect(getPlayerItems).toHaveBeenCalled();
    });

    it('should call getPlayerItems again when context changes', () => {
      const userId = 'test1';
      const validContext = 'text_context';
      const wrapper = renderContainer({ userId, validContext });
      expect(getPlayerItems).toHaveBeenCalledTimes(1);
      const changedContext = 'text_context2';
      wrapper.setProps({ validContext: changedContext });
      expect(getPlayerItems).toHaveBeenCalledTimes(2);
    });
  });
});
