import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow } from 'enzyme';

import createRouterContext from 'react-router-test-context';

import FranchiseStats from 'dw/reporting/scenes/FranchiseStats';

it('FranchiseStats index', () => {
  const context = createRouterContext({
    location: { pathname: '/reporting' },
  });
  const wrapper = shallow(
    <Router>
      <FranchiseStats />
    </Router>
  ).shallow({
    context,
  });
  expect(wrapper.find('withRouter(Connect(FranchiseStats))')).toHaveLength(1);
});
