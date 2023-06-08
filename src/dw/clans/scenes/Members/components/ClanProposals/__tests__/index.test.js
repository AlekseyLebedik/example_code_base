import React from 'react';
import { shallow } from 'enzyme';
import { AgGridReact } from 'ag-grid-react';

import { clanData, clanTableCommonProps } from 'dw/clans/testUtils/props';
import ClanMembersTable from 'dw/clans/components/ClanMembersTable';
import { PROPOSALS_COLUMNS } from '../index';

describe('Clans - Clan Proposals', () => {
  let wrapper;
  let agGridReact;

  beforeEach(() => {
    wrapper = shallow(
      <ClanMembersTable
        {...clanTableCommonProps}
        columnDefs={PROPOSALS_COLUMNS}
        rowData={clanData.proposals}
      />
    );
    agGridReact = wrapper.dive().dive().find(AgGridReact);
  });

  it('renders AgGrid with default values', () => {
    expect(agGridReact).toMatchSnapshot();
    expect(agGridReact.props().columnDefs).toEqual(PROPOSALS_COLUMNS);
    expect(agGridReact.props().rowData).toEqual(clanData.proposals);
  });
});
