import React from 'react';
import Tooltip from 'dw/__mocks__/@material-ui/Tooltip';
import { shallowUntilTarget } from 'dw/test-utils';

import createStore from 'dw/reporting/store';
import * as actions from 'dw/reporting/actions';
import { franchises as franchisesMock } from 'dw/reporting/__mocks__/franchises';
import { PlatformsTableConnected as PlatformsTable } from '../index';

// eslint-disable-next-line
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

describe('PlatformsTable', () => {
  let store;
  let props;
  const withFranchise = (owerrideProps = {}) => {
    const franchiseId = 2;
    const franchise = franchisesMock.find(f => f.id === franchiseId);
    store.dispatch(actions.fetchFranchisesSucceed(franchisesMock));
    return {
      ...props,
      location: { pathname: `/reporting/${franchiseId}` },
      match: {
        path: '/reporting/:franchiseId',
        params: { franchiseId },
      },
      franchise,
      ...owerrideProps,
    };
  };

  beforeEach(() => {
    // eslint-disable-next-line
    store = createStore().store;
    props = {
      baseUrl: '/',
      width: 'lg',
      store,
      availableWidth: 1024,
    };
  });

  const expectedPlatforms = ['PS4', 'Xbox One', 'PC', 'Wii'];

  it('renders loading while no data', () => {
    const wrapper = shallowUntilTarget(
      <PlatformsTable {...props} />,
      'PlatformsTable'
    );
    expect(wrapper.find('PlatformsTableLoader')).toHaveLength(1);
  });

  it('renders single platforms table on wide screens', () => {
    const newProps = withFranchise();
    const wrapper = shallowUntilTarget(
      <PlatformsTable {...newProps} />,
      'PlatformsTable'
    );
    expect(wrapper.find('.platformsPart')).toHaveLength(1);
  });

  it('renders splitted platforms table for xs screens', () => {
    const newProps = withFranchise({ availableWidth: 300 });
    const wrapper = shallowUntilTarget(
      <PlatformsTable {...newProps} />,
      'PlatformsTable'
    );
    expect(wrapper.find('.platformsPart')).toHaveLength(2);
  });

  it('renders platforms header', () => {
    const newProps = withFranchise();
    const wrapper = shallowUntilTarget(
      <PlatformsTable {...newProps} />,
      'PlatformsTable'
    );
    expect(wrapper.find('PlatformsHeader')).toHaveLength(1);
    expect(wrapper.find('PlatformsHeader').props().platforms).toEqual(
      expectedPlatforms
    );
  });

  it('renders projects and related platforms', () => {
    const newProps = withFranchise();
    const wrapper = shallowUntilTarget(
      <PlatformsTable {...newProps} />,
      'PlatformsTable'
    );
    const expectedProjects = newProps.franchise.projects;
    const rows = wrapper.find('.row');
    expect(rows).toHaveLength(expectedProjects.length);
    rows.forEach((row, idx) => {
      const project = expectedProjects[idx];
      const projectLink = shallowUntilTarget(
        row.find('ProjectLink'),
        'Component',
        { rendered: true }
      );
      expect(projectLink.find(Tooltip)).toHaveLength(1);
      expect(projectLink.text()).toContain(project.name);
      expect(
        row.find('PlatformLink').map(p => p.props().platform)
      ).toMatchSnapshot();
    });
  });
});
