import React from 'react';
import { shallow } from 'enzyme';
import { AgGridReact } from 'ag-grid-react';

import { bannedData, clanTableCommonProps } from 'dw/clans/testUtils/props';
import ClanMembersTable from 'dw/clans/components/ClanMembersTable';
import { BANNED_COLUMNS } from '../index';

describe('Clans - Clan Bans', () => {
  let wrapper;
  let agGridReact;

  beforeEach(() => {
    wrapper = shallow(
      <ClanMembersTable
        {...clanTableCommonProps}
        columnDefs={BANNED_COLUMNS}
        rowData={bannedData}
      />
    );
    agGridReact = wrapper.dive().dive().find(AgGridReact);
  });

  it('renders AgGrid with default values', () => {
    expect(agGridReact).toMatchSnapshot();
    expect(agGridReact.props().columnDefs).toEqual(BANNED_COLUMNS);
    expect(agGridReact.props().rowData).toEqual(bannedData);
  });
});
