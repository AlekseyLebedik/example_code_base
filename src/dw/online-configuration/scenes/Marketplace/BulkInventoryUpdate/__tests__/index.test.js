import React from 'react';

import { shallow } from 'enzyme';
import { act, create } from 'react-test-renderer';

import Loading from 'dw/core/components/Loading';

import BulkInventoryUpdate from '../index';
import TabsContainer from '../components/TabsContainer';
import PlayersSelector from '../components/PlayersSelector';
import StatusTable from '../components/StatusTable';
import { Items, Products, Currencies } from '../components/Store';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  connect: () => Component => Component,
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  withRouter: Component => Component,
}));

const mockUpdateApi = jest.fn();

jest.mock('dw/online-configuration/services/marketplace', () => ({
  bulkInventoryUpdate: (...args) =>
    new Promise(resolve => {
      mockUpdateApi(...args);
      resolve();
    }),
}));

const historyPush = jest.fn();

const mockRouter = props => ({
  match: {
    path: 'bulk-inventory-update/:tab?/:inventory_item?',
    params: {
      tab: 'players-selection',
      inventory_item: 'items',
      ...(props?.params || {}),
    },
  },
  history: {
    push: historyPush,
    ...(props?.history || {}),
  },
  location: { search: '', ...(props?.location || {}) },
});

describe('BulkInventoryUpdate', () => {
  beforeEach(() => {
    historyPush.mockClear();
    mockDispatch.mockClear();
    mockUpdateApi.mockClear();
  });
  describe('Renders Loading', () => {
    it('if no main tab and store tab selected', () => {
      const props = mockRouter({ params: { tab: null, inventory_item: null } });
      const wrapper = shallow(<BulkInventoryUpdate {...props} />);
      expect(wrapper.find(Loading)).toHaveLength(1);
    });
    it('if no store tab selected', () => {
      const props = mockRouter({ params: { inventory_item: null } });
      const wrapper = shallow(<BulkInventoryUpdate {...props} />);
      expect(wrapper.find(Loading)).toHaveLength(1);
    });
    it('if no main tab selected', () => {
      const props = mockRouter({ params: { tab: null } });
      const wrapper = shallow(<BulkInventoryUpdate {...props} />);
      expect(wrapper.find(Loading)).toHaveLength(1);
    });
    it('do not render if both main tab and store tab specified', () => {
      const props = mockRouter();
      const wrapper = shallow(<BulkInventoryUpdate {...props} />);
      expect(wrapper.find(Loading)).toHaveLength(0);
    });
  });
  describe('Redirects', () => {
    it('to main tab: player-selection and store tab: items if not specified', () => {
      const props = mockRouter({ params: { tab: null, inventory_item: null } });
      act(() => {
        create(<BulkInventoryUpdate {...props} />);
      });
      expect(historyPush).toBeCalledWith(
        'bulk-inventory-update/players-selection/items'
      );
    });
    it('if no store tab selected', () => {
      const props = mockRouter({ params: { inventory_item: null } });
      act(() => {
        create(<BulkInventoryUpdate {...props} />);
      });
      expect(historyPush).toBeCalledWith(
        'bulk-inventory-update/players-selection/items'
      );
    });
    it('if no main tab selected', () => {
      const props = mockRouter({ params: { tab: null } });
      act(() => {
        create(<BulkInventoryUpdate {...props} />);
      });
      expect(historyPush).toBeCalledWith(
        'bulk-inventory-update/players-selection/items'
      );
    });
    it('preserves main tab', () => {
      const props = mockRouter({
        params: { tab: 'status', inventory_item: null },
      });
      act(() => {
        create(<BulkInventoryUpdate {...props} />);
      });
      expect(historyPush).toBeCalledWith('bulk-inventory-update/status/items');
    });
    it('preserves store tab', () => {
      const props = mockRouter({
        params: { tab: null, inventory_item: 'currencies' },
      });
      act(() => {
        create(<BulkInventoryUpdate {...props} />);
      });
      expect(historyPush).toBeCalledWith(
        'bulk-inventory-update/players-selection/currencies'
      );
    });
  });
  describe('Components', () => {
    describe('Main Panel', () => {
      it('Player Selection', () => {
        const props = mockRouter({ params: { tab: 'players-selection' } });
        const wrapper = shallow(<BulkInventoryUpdate {...props} />);
        const tabsContainer = wrapper.find(TabsContainer).first();
        const mainComponent = wrapper.find(PlayersSelector);
        expect(tabsContainer.props().value).toEqual('players-selection');
        expect(mainComponent).toHaveLength(1);
      });
      it('Status', () => {
        const props = mockRouter({ params: { tab: 'status' } });
        const wrapper = shallow(<BulkInventoryUpdate {...props} />);
        const tabsContainer = wrapper.find(TabsContainer).first();
        const mainComponent = wrapper.find(StatusTable);
        expect(tabsContainer.props().value).toEqual('status');
        expect(mainComponent).toHaveLength(1);
      });
      it('main tab changes to players selection', () => {
        const props = mockRouter({ params: { tab: 'status' } });
        const wrapper = shallow(<BulkInventoryUpdate {...props} />);
        const tabsContainer = wrapper.find(TabsContainer).first();
        tabsContainer.props().onChange(null, 'players-selection');
        expect(historyPush).toBeCalledWith(
          'bulk-inventory-update/players-selection/items'
        );
      });
      it('main tab changes to status', () => {
        const props = mockRouter({ params: { tab: 'players-selection' } });
        const wrapper = shallow(<BulkInventoryUpdate {...props} />);
        const tabsContainer = wrapper.find(TabsContainer).first();
        tabsContainer.props().onChange(null, 'status');
        expect(historyPush).toBeCalledWith(
          'bulk-inventory-update/status/items'
        );
      });
    });
    describe('Store Panel', () => {
      it('Search Inventory', () => {
        const props = mockRouter();
        const wrapper = shallow(<BulkInventoryUpdate {...props} />);
        const input = wrapper.find('input');
        expect(input).toHaveLength(1);
        expect(input.props().placeholder).toEqual('Search Inventory');
      });
      it('Items', () => {
        const props = mockRouter({ params: { inventory_item: 'items' } });
        const wrapper = shallow(<BulkInventoryUpdate {...props} />);
        const tabsContainer = wrapper.find(TabsContainer).last();
        const storeComponent = wrapper.find(Items);
        expect(tabsContainer.props().value).toEqual('items');
        expect(storeComponent).toHaveLength(1);
      });
      it('Products', () => {
        const props = mockRouter({ params: { inventory_item: 'products' } });
        const wrapper = shallow(<BulkInventoryUpdate {...props} />);
        const tabsContainer = wrapper.find(TabsContainer).last();
        const storeComponent = wrapper.find(Products);
        expect(tabsContainer.props().value).toEqual('products');
        expect(storeComponent).toHaveLength(1);
      });
      it('Currencies', () => {
        const props = mockRouter({ params: { inventory_item: 'currencies' } });
        const wrapper = shallow(<BulkInventoryUpdate {...props} />);
        const tabsContainer = wrapper.find(TabsContainer).last();
        const storeComponent = wrapper.find(Currencies);
        expect(tabsContainer.props().value).toEqual('currencies');
        expect(storeComponent).toHaveLength(1);
      });
      it('store tab changes to items', () => {
        const props = mockRouter({ params: { inventory_item: 'products' } });
        const wrapper = shallow(<BulkInventoryUpdate {...props} />);
        const tabsContainer = wrapper.find(TabsContainer).last();
        tabsContainer.props().onChange(null, 'items');
        expect(historyPush).toBeCalledWith(
          'bulk-inventory-update/players-selection/items'
        );
      });
      it('store tab changes to products', () => {
        const props = mockRouter({ params: { inventory_item: 'items' } });
        const wrapper = shallow(<BulkInventoryUpdate {...props} />);
        const tabsContainer = wrapper.find(TabsContainer).last();
        tabsContainer.props().onChange(null, 'products');
        expect(historyPush).toBeCalledWith(
          'bulk-inventory-update/players-selection/products'
        );
      });
      it('store tab changes to currencies', () => {
        const props = mockRouter({ params: { inventory_item: 'items' } });
        const wrapper = shallow(<BulkInventoryUpdate {...props} />);
        const tabsContainer = wrapper.find(TabsContainer).last();
        tabsContainer.props().onChange(null, 'currencies');
        expect(historyPush).toBeCalledWith(
          'bulk-inventory-update/players-selection/currencies'
        );
      });
    });
  });
  describe('onSubmit', () => {
    it('calls Items API update', () => {
      const expectedPlayerId = '1234567890';
      const expectedItemID = 123;
      const expectedQuantity = 1000;
      const expectedContext = '5800_ps4';

      const props = mockRouter({ params: { inventory_item: 'items' } });
      const wrapper = shallow(<BulkInventoryUpdate {...props} />);
      const storeComponent = wrapper.find(Items);
      storeComponent.props().onSelectItems([{ itemID: expectedItemID }]);
      const mainComponent = wrapper.find(PlayersSelector);
      mainComponent.props().setContext(expectedContext);
      mainComponent.props().setPlayers([expectedPlayerId]);
      wrapper.update();
      const actions = wrapper.find('Actions');
      actions.props().onSubmit(expectedQuantity);
      expect(mockUpdateApi).toBeCalledWith(
        {
          items: [{ itemID: expectedItemID, quantity: expectedQuantity }],
          players: [expectedPlayerId],
        },
        { context: expectedContext }
      );
    });
    it('calls Products API update', () => {
      const expectedPlayerId = '1234567890';
      const expectedProductID = 123;
      const expectedQuantity = 1000;
      const expectedContext = '5800_ps4';

      const props = mockRouter({ params: { inventory_item: 'products' } });
      const wrapper = shallow(<BulkInventoryUpdate {...props} />);
      const storeComponent = wrapper.find(Products);
      storeComponent.props().onSelectItems([{ productID: expectedProductID }]);
      const mainComponent = wrapper.find(PlayersSelector);
      mainComponent.props().setContext(expectedContext);
      mainComponent.props().setPlayers([expectedPlayerId]);
      wrapper.update();
      const actions = wrapper.find('Actions');
      actions.props().onSubmit(expectedQuantity);
      expect(mockUpdateApi).toBeCalledWith(
        {
          products: [
            { productID: expectedProductID, quantity: expectedQuantity },
          ],
          players: [expectedPlayerId],
        },
        { context: expectedContext }
      );
    });
    it('calls Currencies API update', () => {
      const expectedPlayerId = '1234567890';
      const expectedCurrencyID = 123;
      const expectedAmount = 1000;
      const expectedContext = '5800_ps4';

      const props = mockRouter({ params: { inventory_item: 'currencies' } });
      const wrapper = shallow(<BulkInventoryUpdate {...props} />);
      const storeComponent = wrapper.find(Currencies);
      storeComponent
        .props()
        .onSelectItems([{ currencyID: expectedCurrencyID }]);
      const mainComponent = wrapper.find(PlayersSelector);
      mainComponent.props().setContext(expectedContext);
      mainComponent.props().setPlayers([expectedPlayerId]);
      wrapper.update();
      const actions = wrapper.find('Actions');
      actions.props().onSubmit(expectedAmount);
      expect(mockUpdateApi).toBeCalledWith(
        {
          currencies: [
            { currencyID: expectedCurrencyID, amount: expectedAmount },
          ],
          players: [expectedPlayerId],
        },
        { context: expectedContext }
      );
    });
  });
});
