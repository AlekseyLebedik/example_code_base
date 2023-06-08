import React from 'react';

import { shallow } from 'enzyme';
import { ApolloTestProvider } from 'dw/core/helpers/__tests__';
import AccountAuditLogsContainer from '../index';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'audit/account-audit-logs/273726376273672887?serviceConfigID=21',
  }),
}));

describe('Accounts Auditlog Container', () => {
  it('shows data', () => {
    const wrapper = shallow(
      <ApolloTestProvider>
        <AccountAuditLogsContainer />
      </ApolloTestProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
