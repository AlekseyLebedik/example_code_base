import React from 'react';
import { shallow } from 'enzyme';

import { pubvarsProps as props } from 'playpants/testUtils/eventProps';

import { PublisherVariables } from '../container';
import { variableSetsUpdateReady } from '../helpers';

describe('PublisherVariables', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PublisherVariables {...props} />);
  });

  const getActivity = (context, groupId, namespace) =>
    wrapper
      .instance()
      .state.pubVarsActivity.activity.variable_sets.find(
        varSet =>
          varSet.context === context &&
          varSet.group_id === groupId &&
          varSet.namespace === namespace
      );

  it('renders pubvars correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('filterNamespaces', () => {
    it('changes the filterValues state given a context', () => {
      wrapper.instance().filterNamespaces('context', '1');
      expect(wrapper.props().updateSelectedValues).toHaveBeenCalledWith({
        context: '1',
        group_id: '1',
        namespace: 'Namespace1',
      });
    });

    it('changes the filterValues state given a group ID', () => {
      wrapper.setProps({
        selectedValues: {
          context: '1',
          group_id: '1',
          namespace: 'Namespace1',
        },
      });
      wrapper.instance().filterNamespaces('group_id', '2');
      expect(wrapper.props().updateSelectedValues).toHaveBeenCalledWith({
        context: '1',
        group_id: '2',
        namespace: 'Namespace2',
      });
    });

    it('changes the filterValues state given a namespace', () => {
      wrapper.setProps({
        selectedValues: {
          context: '1',
          group_id: '1',
          namespace: 'Namespace1',
        },
      });
      wrapper.instance().filterNamespaces('namespace', 'Namespace3');
      expect(wrapper.props().updateSelectedValues).toHaveBeenCalledWith({
        context: '1',
        group_id: '1',
        namespace: 'Namespace3',
      });
    });
  });

  describe('clearVariable', () => {
    it('clears a namespace variable', () => {
      jest.clearAllMocks();
      const initialActivity = getActivity('1', '2', 'Namespace4');
      expect(initialActivity).toMatchSnapshot();
      wrapper.instance().clearVariable({
        context: '1',
        groupId: '2',
        namespace: 'Namespace4',
        variable: 'test2',
      });
      const clearedActivity = getActivity('1', '2', 'Namespace4');
      expect(clearedActivity).toMatchSnapshot();
      expect(props.onUpdate).not.toHaveBeenCalled();
      wrapper.instance().onSaveActivity();
      expect(props.onUpdate).toHaveBeenCalledWith(
        variableSetsUpdateReady(wrapper.instance().state.pubVarsActivity)
      );
    });
  });

  describe('modifyVariable', () => {
    const params = {
      api: {
        refreshCells: jest.fn(),
        stopEditing: jest.fn(),
      },
      colDef: {
        field: 'newValue',
      },
      data: {
        context: '1',
        groupId: '1',
        namespace: 'Namespace3',
        oldValue: 'oldValue',
        newValue: '',
        variable: 'test',
      },
      oldValue: 'oldValue',
      newValue: 'newValue',
    };

    it('modifies a variable value', () => {
      jest.clearAllMocks();
      const initialActivity = getActivity('1', '1', 'Namespace3');
      expect(initialActivity).toMatchSnapshot();
      wrapper.instance().modifyVariable(params);
      const modifiedActivity = getActivity('1', '1', 'Namespace3');
      expect(modifiedActivity).toMatchSnapshot();
      expect(props.onUpdate).not.toHaveBeenCalled();
      wrapper.instance().onSaveActivity();
      expect(props.onUpdate).toHaveBeenCalledWith(
        variableSetsUpdateReady(wrapper.instance().state.pubVarsActivity)
      );
    });
  });
});
