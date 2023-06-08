import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';

import createRouterContext from 'react-router-test-context';

import Reporting from 'dw/reporting/components/App';

it('Reporting index', () => {
  const context = createRouterContext({
    location: { pathname: '/reporting' },
  });
  const wrapper = shallow(
    <MemoryRouter>
      <Reporting />
    </MemoryRouter>
  ).shallow({
    context,
  });
  expect(wrapper.find('withRouter(Connect(App))')).toHaveLength(1);
});
