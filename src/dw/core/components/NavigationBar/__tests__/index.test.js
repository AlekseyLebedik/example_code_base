import React from 'react';
import { shallow } from 'enzyme';

import { NavigationBar } from '../index';

const ROUTES = {
  schedule: {
    name: 'schedule',
    title: 'Schedule',
    path: '/abtesting/schedule',
    component: () => {},
    mainRoute: true,
    default: true,
  },
  propagate: {
    name: 'propagate',
    title: 'Propagate',
    path: '/abtesting/propagate/:titleID?/:environment?/:id?',
    component: () => {},
    mainRoute: false,
  },
};

describe('NavigationBar', () => {
  it('renders properly when is a main route', () => {
    const props = {
      location: { pathname: ROUTES.schedule.path },
      routes: ROUTES,
    };
    expect(shallow(<NavigationBar {...props} />)).toMatchSnapshot();
  });

  it('renders properly when is NOT main route', () => {
    const props = {
      location: { pathname: ROUTES.propagate.path },
      routes: ROUTES,
    };
    expect(shallow(<NavigationBar {...props} />)).toMatchSnapshot();
  });
});
