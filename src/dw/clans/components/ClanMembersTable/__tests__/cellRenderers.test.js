import React from 'react';
import { shallow } from 'enzyme';
import { ClansContext } from 'dw/clans/components/ClansProvider';
import components from '../cellRenderers';

const {
  actionsRenderer: ActionsRenderer,
  pinnedRowPlayerRenderer: PinnedRowPlayerRenderer,
  pinnedRowRoleRenderer: PinnedRowRoleRenderer,
  playerCellRenderer: PlayerCellRenderer,
} = components;

const PLAYER = {
  accountType: 'uno',
  userID: '5151811586893775373',
  username: 'test-owner',
};

describe('Clans - ClansMemberTable cellRenderers', () => {
  describe('ActionsRenderer', () => {
    const params = {
      colDef: {
        addMember: jest.fn(),
        deleteMember: jest.fn(),
        editMember: jest.fn(),
      },
      node: { rowPinned: false },
      value: 'OWNER',
    };
    it('renders action column with edit and delete actions', () => {
      const wrapper = shallow(<ActionsRenderer {...params} />);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders action column with add action for pinned rows', () => {
      const pinnedParams = {
        ...params,
        data: { player: PLAYER },
        node: { rowPinned: true },
      };
      const wrapper = shallow(<ActionsRenderer {...pinnedParams} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('PinnedRowPlayerRenderer', () => {
    const params = {
      colDef: { classes: {}, setPinnedRow: jest.fn() },
      value: PLAYER,
    };
    it('renders player uno selector', () => {
      const ComponentWithContext = () => (
        <ClansContext.Provider value={{ accountsServiceConfigId: 19 }}>
          <PinnedRowPlayerRenderer {...params} />
        </ClansContext.Provider>
      );
      const wrapper = shallow(<ComponentWithContext />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('PinnedRowRoleRenderer', () => {
    const params = {
      colDef: { ownerDisabled: false, setPinnedRow: jest.fn() },
      value: 'OWNER',
    };
    it('renders role select', () => {
      const wrapper = shallow(<PinnedRowRoleRenderer {...params} />);
      expect(wrapper).toMatchSnapshot();
    });

    it('disables owner selection when ownerDisabled provided', () => {
      const disabledParams = { ...params };
      disabledParams.colDef.ownerDisabled = true;
      const wrapper = shallow(<PinnedRowRoleRenderer {...disabledParams} />);
      const ownerOption = wrapper
        .find('WithStyles(ForwardRef(MenuItem))')
        .find('[value="OWNER"]');
      expect(ownerOption.props().disabled).toBe(true);
    });
  });

  describe('PlayerCellRenderer', () => {
    const params = {
      value: PLAYER,
      context: {
        accountsServiceConfigId: '12',
      },
    };
    it('renders player view link', () => {
      const wrapper = shallow(<PlayerCellRenderer {...params} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
