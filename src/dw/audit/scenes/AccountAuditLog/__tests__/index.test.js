import React from 'react';

import { shallow } from 'enzyme';
import AccountAuditLogs from '../index';

describe('Accounts Auditlog Container', () => {
  it('shows data', () => {
    const wrapper = shallow(<AccountAuditLogs />);
    expect(wrapper).toMatchSnapshot();
  });
});
