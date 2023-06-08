import React from 'react';
import { shallow } from 'enzyme';
// eslint-disable-next-line
import IconButton from 'dw/__mocks__/@material-ui/IconButton';

import MasterDetail from 'dw/core/components/MasterDetail';
import SectionTitle from 'dw/core/components/SectionTitle';
import SearchableList from 'dw/core/components/SearchableList';
import ModalForm from 'dw/core/components/ModalForm';
import Details from '../components/Details';
import GroupObjectsStateless, {
  getRenderMasterFunc,
  OpenModalButton,
} from '../presentational';
import { FORM_NAME } from '../constants';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams() {
    return {};
  },
  withRouter(Component) {
    return props => (
      <Component {...props} match={{ params: { id: 1 } }} history={{}} />
    );
  },
  useLocation() {
    return {};
  },
}));

describe('GroupObjectsStateless', () => {
  const props = {
    baseUrl: 'baseUrl',
    selectedItem: {
      id: 1,
    },
    onSearch: jest.fn(),
  };

  it('renders correctly', () => {
    const wrapper = shallow(<GroupObjectsStateless {...props} />).dive();
    expect(wrapper).toMatchSnapshot();
  });

  describe('MasterDetail', () => {
    it('should display MasterDetail with the data provided', () => {
      const wrapper = shallow(<GroupObjectsStateless {...props} />);
      const renderedMasterDetail = wrapper.find(MasterDetail);
      const detailPropFn = renderedMasterDetail.first().props().detail;
      expect(detailPropFn({})).toBeDefined();
      expect(detailPropFn({})).toEqual(
        <Details selectedItem={props.selectedItem} />
      );
    });
  });

  describe('getRenderMasterFunc', () => {
    it('should display SectionTitle and SearchableList', () => {
      const renderMasterProps = {
        items: [],
        onSearch: jest.fn(),
        selectedItem: {},
        createGroupFormName: FORM_NAME,
        openCreateGroupModal: jest.fn(),
      };
      const actions = {
        onSelectItem: jest.fn(),
      };
      const wrapper = shallow(
        getRenderMasterFunc(renderMasterProps)({ actions })
      );
      expect(wrapper.find(SectionTitle)).toBeDefined();
      expect(wrapper.find(SearchableList)).toBeDefined();
      expect(wrapper.find(ModalForm)).toBeDefined();
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
      };
      const actions = {
        onSelectItem: jest.fn(),
      };
      const wrapper = shallow(
        getRenderMasterFunc(renderMasterProps)({ actions })
      );
      const modal = wrapper.find(ModalForm);

      expect(modal).toBeDefined();
      expect(modal.props().visible).toBe(true);
    });

    it('should trigger open function on clicking the create group button', () => {
      const openModalButtonProps = {
        onClick: jest.fn(),
      };
      const wrapper = shallow(<OpenModalButton {...openModalButtonProps} />);

      const createGroupButton = wrapper.find(IconButton);

      createGroupButton.simulate('click');
      expect(openModalButtonProps.onClick).toBeCalled();
    });
  });
});
