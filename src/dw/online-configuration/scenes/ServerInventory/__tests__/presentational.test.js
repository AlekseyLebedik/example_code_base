import React from 'react';
import { shallow } from 'enzyme';

import ServerInventoryStateless from '../presentational';
import { SelectionPanelList } from '../components/SelectionPanelList';

describe('ServerInventoryStateless', () => {
  const props = {
    serversAllocationLoading: false,
    contexts: [],
    dataCenters: [],
    buildNames: [],
    selectedContext: null,
    selectedDataCenter: null,
    selectedBuildName: null,
    baseUrl: 'serverInventoryTestPath',
  };

  it('renders correctly', () => {
    const wrapper = shallow(<ServerInventoryStateless {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('SelectionPanelList', () => {
    it('should display SelectionPanelList with the data provided', () => {
      const newProps = {
        ...props,
        contexts: ['context1', 'context2'],
      };
      const wrapper = shallow(<ServerInventoryStateless {...newProps} />);
      const renderedSelectionPanelList = wrapper.find(SelectionPanelList);
      expect(renderedSelectionPanelList.first().props().data).toEqual([
        { name: 'context1' },
        { name: 'context2' },
      ]);
    });
  });
});
