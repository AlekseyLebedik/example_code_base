import React from 'react';

import { shallow } from 'enzyme';
import { AgGridReact } from 'ag-grid-react';
import AgGridComponent from '../index';

const mockDateFormat = () => 'MMM DD, YYYY HH:mm a z';

describe('AgGridComponent', () => {
  let wrapper;
  const rowData = [
    {
      uno_id: '14883586550706904977',
      umbrella_id: '16356240268861345312',
      action: 'create',
      ip_address: '111.111.11.11',
      provider: 'battle',
      account_id: '13554785610296063372',
      secondary_account_id: '0',
      dt: '2022-03-14',
      client: 'raven-cod-wz-bnet',
      title_id: 5893,
      email_unhashed: null,
      parent_email_unhashed: null,
      phone_unhashed: null,
      mobile_unhashed: null,
      email_verified: null,
      parent_email_verified: null,
      tfa_status: null,
      age_in_years: null,
      is_child: null,
      state: null,
      country: null,
      changed_field: null,
      user_name: null,
    },
  ];
  const render = () => {
    const props = {
      allRowsExpanded: true,
      setAllRowsExpanded: () => {},
      handleOnGridReady: () => {},
      context: {
        formatDateTime: mockDateFormat,
        url: '/foo',
      },
      rowData,
    };

    wrapper = shallow(<AgGridComponent {...props} />);

    return wrapper;
  };
  beforeEach(() => {
    wrapper = render();
  });
  it('renders AgGridComponent', () => {
    expect(wrapper).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders AgGrid with row data', () => {
    const agGridReact = wrapper.find(AgGridReact);
    expect(agGridReact).toMatchSnapshot();
  });
});
