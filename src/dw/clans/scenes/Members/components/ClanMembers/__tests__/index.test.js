import React from 'react';
import { shallow } from 'enzyme';
import { AgGridReact } from 'ag-grid-react';

import { clanData, clanTableCommonProps } from 'dw/clans/testUtils/props';
import ClanMembersTable from 'dw/clans/components/ClanMembersTable';
import { MEMBERS_COLUMNS } from '../index';

describe('Clans - Clan Members', () => {
  let wrapper;
  let agGridReact;

  beforeEach(() => {
    wrapper = shallow(
      <ClanMembersTable
        {...clanTableCommonProps}
        columnDefs={MEMBERS_COLUMNS}
        rowData={clanData.members}
      />
    );
    agGridReact = wrapper.dive().dive().find(AgGridReact);
  });

  it('renders AgGrid with default values', () => {
    expect(agGridReact).toMatchSnapshot();
    expect(agGridReact.props().columnDefs).toEqual(MEMBERS_COLUMNS);
    expect(agGridReact.props().rowData).toEqual(clanData.members);
  });
});
