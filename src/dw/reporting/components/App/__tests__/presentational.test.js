import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import createRouterContext from 'react-router-test-context';
import { shallowUntilTarget } from 'dw/test-utils';

import AppStateless from '../presentational';

describe.skip('Reporting AppStateless', () => {
  const baseProps = {
    match: {
      path: '/reporting',
    },
  };
  it('renders Dashboard', () => {
    const wrapper = shallowUntilTarget(
      <MemoryRouter>
        <AppStateless {...baseProps} />
      </MemoryRouter>,
      'AppStateless'
    );
    const context = createRouterContext({
      location: { pathname: '/reporting/1' },
    });
    const selectedRoute = wrapper.find('Switch').shallow({
      context,
    });
    const component = selectedRoute.shallow({ context });

    expect(component.find('Connect(Dashboard)')).toHaveLength(1);
  });
  describe('render FranchiseStats', () => {
    it('no params', () => {
      const wrapper = shallowUntilTarget(
        <MemoryRouter>
          <AppStateless {...baseProps} />
        </MemoryRouter>,
        'AppStateless'
      );
      const context = createRouterContext({
        location: { pathname: '/reporting/1/stats' },
      });
      const selectedRoute = wrapper.find('Switch').shallow({
        context,
      });
      const component = selectedRoute
        .shallow({ context })
        .find('withRouter(Connect(FranchiseStats))');

      expect(component).toHaveLength(1);
      expect(component.props().match.params).toEqual({ franchiseId: '1' });
    });
    it('with statname', () => {
      const wrapper = shallowUntilTarget(
        <MemoryRouter>
          <AppStateless {...baseProps} />
        </MemoryRouter>,
        'AppStateless'
      );
      const context = createRouterContext({
        location: { pathname: '/reporting/1/stats/usersOnline' },
      });
      const selectedRoute = wrapper.find('Switch').shallow({
        context,
      });
      const component = selectedRoute
        .shallow({ context })
        .find('withRouter(Connect(FranchiseStats))');

      expect(component).toHaveLength(1);
      expect(component.props().match.params).toEqual({
        franchiseId: '1',
        statName: 'usersOnline',
      });
    });
    it('with statname, start, end', () => {
      const wrapper = shallowUntilTarget(
        <MemoryRouter>
          <AppStateless {...baseProps} />
        </MemoryRouter>,
        'AppStateless'
      );
      const context = createRouterContext({
        location: { pathname: '/reporting/1/stats/usersOnline/111/222' },
      });
      const selectedRoute = wrapper.find('Switch').shallow({
        context,
      });
      const component = selectedRoute
        .shallow({ context })
        .find('withRouter(Connect(FranchiseStats))');

      expect(component).toHaveLength(1);
      expect(component.props().match.params).toEqual({
        franchiseId: '1',
        statName: 'usersOnline',
        start: '111',
        end: '222',
      });
    });
    it('no statname, start, end', () => {
      const wrapper = shallowUntilTarget(
        <MemoryRouter>
          <AppStateless {...baseProps} />
        </MemoryRouter>,
        'AppStateless'
      );
      const context = createRouterContext({
        location: { pathname: '/reporting/1/stats/--/111/222' },
      });
      const selectedRoute = wrapper.find('Switch').shallow({
        context,
      });
      const component = selectedRoute
        .shallow({ context })
        .find('withRouter(Connect(FranchiseStats))');

      expect(component).toHaveLength(1);
      expect(component.props().match.params).toEqual({
        franchiseId: '1',
        statName: '--',
        start: '111',
        end: '222',
      });
    });
  });
  describe('render ProjectStats', () => {
    it('no platform', () => {
      const wrapper = shallowUntilTarget(
        <MemoryRouter>
          <AppStateless {...baseProps} />
        </MemoryRouter>,
        'AppStateless'
      );
      const context = createRouterContext({
        location: { pathname: '/reporting/1/projects/1' },
      });
      const selectedRoute = wrapper.find('Switch').shallow({
        context,
      });
      const component = selectedRoute
        .shallow({ context })
        .find('withRouter(Connect(ProjectStats))');

      expect(component).toHaveLength(1);
      expect(component.props().match.params).toEqual({
        franchiseId: '1',
        projectId: '1',
      });
    });
    it('with platform', () => {
      const wrapper = shallowUntilTarget(
        <MemoryRouter>
          <AppStateless {...baseProps} />
        </MemoryRouter>,
        'AppStateless'
      );
      const context = createRouterContext({
        location: { pathname: '/reporting/1/projects/1/PS4' },
      });
      const selectedRoute = wrapper.find('Switch').shallow({
        context,
      });
      const component = selectedRoute
        .shallow({ context })
        .find('withRouter(Connect(ProjectStats))');

      expect(component).toHaveLength(1);
      expect(component.props().match.params).toEqual({
        franchiseId: '1',
        projectId: '1',
        platform: 'PS4',
      });
    });
  });
});
