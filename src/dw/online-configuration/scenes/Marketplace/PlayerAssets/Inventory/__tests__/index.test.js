import React from 'react';
import createRouterContext from 'react-router-test-context';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallowWithProvider } from 'dw/core/helpers/__tests__';

import SourceSelect from 'dw/core/components/SourceSelect';
import createStore from 'dw/online-configuration/store';

import { InventoryComponent } from '../index';
import InventoryComponents from '../components/InventoryComponents';
import { tabs, subtabs } from '../../constants';

describe('Inventory', () => {
  const { store } = createStore();
  const context = createRouterContext({
    match: {
      params: {
        tab: tabs.inventory,
        userId: '123',
        subtab: subtabs.items,
      },
      path: 'marketplace/player-inventory/:tab?/:userId?/:subtab?',
    },
  });

  const props = {};

  const wrapper = shallowWithProvider(
    <Router>
      <InventoryComponent {...props} store={store} />
    </Router>,
    context
  );
  const root = wrapper.dive().find('withRouter(Connect(Inventory))').dive();

  it('renders correctly', () => {
    expect(root).toMatchSnapshot();
  });

  describe('SourceSelect', () => {
    const renderedSourceSelect = root.find(SourceSelect);
    it('should always render', () => {
      expect(renderedSourceSelect).toMatchSnapshot();
    });
  });

  describe('Tabs', () => {
    it('shouldnt show any section if no user selected', () => {
      const renderedInventoryComponents = root.find(InventoryComponents);
      expect(renderedInventoryComponents).toHaveLength(0);
    });

    it.skip('should show sections if user and tab is selected', () => {
      const newProps = {
        ...props,
        userId: '1',
        selectedSubtab: subtabs.items,
      };
      const wrapper = shallowWithProvider(
        <Router>
          <InventoryComponent {...newProps} store={store} />
        </Router>,
        context
      );
      const component = wrapper
        .dive()
        .find('withRouter(Connect(Inventory))')
        .dive();

      const renderedInventoryComponents = component.find(InventoryComponents);
      expect(renderedInventoryComponents).toHaveLength(1);
      expect(renderedInventoryComponents).toMatchSnapshot();
    });
  });
});
