import React from 'react';

import { shallow } from 'enzyme';
import { QueryClient, QueryClientProvider } from 'react-query';
import Details from '../index';

const queryClient = new QueryClient();

describe('Details Component', () => {
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

  const accountID = '123456789';
  const provider = 'uno';
  const props = {
    handleOnGridReady: () => {},
    context: {
      url: '/foo',
    },
    setRowData: () => {},
    queryComplete: false,
    setQueryComplete: () => {},
  };

  it('shows AG grid table', () => {
    const wrapper = shallow(
      <QueryClientProvider client={queryClient}>
        <Details
          accountID={accountID}
          provider={provider}
          rowData={rowData}
          {...props}
        />
      </QueryClientProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('shows no data', () => {
    const wrapper = shallow(
      <QueryClientProvider client={queryClient}>
        <Details
          accountID={accountID}
          provider={provider}
          rowData={[]}
          {...props}
        />
      </QueryClientProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
