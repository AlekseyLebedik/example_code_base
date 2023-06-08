import React from 'react';
import { shallow } from 'enzyme';
import IconButton from '@material-ui/core/IconButton';
import { shallowUntilTarget } from 'dw/test-utils';
import * as reactRedux from 'react-redux';

import MasterDetail from 'dw/core/components/MasterDetail';
import SectionTitle from 'dw/core/components/SectionTitle';
import SearchableList from 'dw/core/components/SearchableList';
import ModalForm from 'dw/core/components/ModalForm';
import ABTestingGroupsStateless, {
  getRenderMasterFunc,
  OpenModalButton,
} from '../presentational';
import { FORM_NAME } from '../constants';
import Details from '../components/Details';

describe('ABTestingGroupsStateless', () => {
  const props = {
    baseUrl: 'baseUrl',
    selectedItem: {
      id: 1,
    },
    context: '1:dev',
    onSearch: jest.fn(),
  };

  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');

  beforeEach(() => {
    useSelectorMock.mockClear();
  });

  it('should match snapshot', () => {
    useSelectorMock.mockReturnValue([
      {
        project: {
          companies: [],
          contentTypeId: 57,
          id: 1,
          name: 'Foo',
        },
        environment: {
          contentTypeId: 52,
          id: 1,
          options: {},
          shortType: 'dev',
          type: 'Development',
        },
        title: {
          external: undefined,
          id: 5816,
          name: 'Foo',
          platform: 'Bar',
        },
      },
    ]);
    const wrapper = shallowUntilTarget(
      <ABTestingGroupsStateless {...props} />,
      'GroupComponent'
    );
    expect(wrapper).toMatchSnapshot();
    const renderedMasterDetail = wrapper.find(MasterDetail);
    const detailPropFn = renderedMasterDetail.first().props().detail;
    expect(detailPropFn({})).toBeDefined();
    expect(detailPropFn({})).toEqual(
      <Details selectedItem={props.selectedItem} context={props.context} />
    );
  });

  describe('getRenderMasterFunc', () => {
    it('should display SectionTitle, ContextComponent and SearchableList', () => {
      const renderMasterProps = {
        items: [],
        onSearch: jest.fn(),
        selectedItem: {},
        createGroupFormName: FORM_NAME,
        openCreateGroupModal: jest.fn(),
        contextList: [],
        changeContext: jest.fn(),
      };
      const actions = {
        onSelectItem: jest.fn(),
      };
      const wrapper = shallow(
        getRenderMasterFunc(renderMasterProps)({ actions })
      );
      expect(wrapper.find(SectionTitle)).toHaveLength(1);
      expect(wrapper.find('ContextComponent')).toHaveLength(1);
      expect(wrapper.find(SearchableList)).toHaveLength(1);
      expect(wrapper.find(ModalForm)).toHaveLength(1);
      expect(wrapper.find(ModalForm).props().visible).toBe(undefined);
    });

    it('should display pass visible to createGroupModal if createGroupModalVisible', () => {
      const renderMasterProps = {
        items: [],
        onSearch: jest.fn(),
        selectedItem: {},
        visible: true,
        createGroupFormName: FORM_NAME,
        openCreateGroupModal: jest.fn(),
        contextList: [],
        changeContext: jest.fn(),
      };
      const actions = {
        onSelectItem: jest.fn(),
      };
      const wrapper = shallow(
        getRenderMasterFunc(renderMasterProps)({ actions })
      );
      const modal = wrapper.find(ModalForm);

      expect(modal).toHaveLength(1);
      expect(modal.props().visible).toBe(true);
    });

    it('should trigger open function on clicking the create group button', () => {
      const openModalButtonProps = {
        onClick: jest.fn(),
      };
      const wrapper = shallow(OpenModalButton(openModalButtonProps));

      const createGroupButton = wrapper.find(IconButton);

      createGroupButton.simulate('click');
      expect(openModalButtonProps.onClick).toBeCalled();
    });
  });
});
