import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow } from 'enzyme';

import createRouterContext from 'react-router-test-context';

import ProjectStats from 'dw/reporting/scenes/ProjectStats';

it('ProjectStats index', () => {
  const context = createRouterContext({
    location: { pathname: '/reporting' },
  });
  const wrapper = shallow(
    <Router>
      <ProjectStats />
    </Router>
  ).shallow({
    context,
  });
  expect(wrapper.find('withRouter(Connect(ProjectStats))')).toHaveLength(1);
});
