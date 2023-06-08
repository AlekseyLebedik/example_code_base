/* eslint-disable import/first */
import React from 'react';
import createRouterContext from 'react-router-test-context';
import createStore, { userActions } from 'dw/core/helpers/__tests__';
import { shallowUntilTarget } from 'dw/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';

import TitleSelector from '../index';
import { setTitle } from '../actions';

describe('TitleSelector', () => {
  let store = null;
  let context = null;
  let props = null;
  const resetProjectData = jest.fn();
  const setTitleFn = jest.fn();

  beforeEach(() => {
    context = createRouterContext({
      location: { pathname: '/online-configuration' },
      match: {
        path: '/online-configuration/:titleId/:env',
        params: { env: 'dev', titleId: '1' },
      },
    });

    ({ store } = createStore());

    store.dispatch(
      setTitle(
        { id: '1', name: 'GTR Project' },
        { id: '1', name: 'GTR-PS3', platform: 'PS3' },
        { id: '1', type: 'Development', shortType: 'dev' }
      )
    );
    store.dispatch(
      userActions.setUserProfile({
        profile: {
          defaultTitleEnv: { id: '1', titleId: '1', shortType: 'dev' },
        },
      })
    );
    props = {
      store,
      resetProjectData,
      setTitle: setTitleFn,
    };
  });

  afterEach(() => {
    resetProjectData.mockClear();
    setTitleFn.mockClear();
  });

  it('renders default values', () => {
    expect(
      shallowUntilTarget(
        <Router>
          <TitleSelector {...props} />
        </Router>,
        'TitleSelector',
        {
          shallowOptions: { context },
        }
      )
    ).toMatchSnapshot();
  });

  it('renders with Reload Title dialog', () => {
    const root = shallowUntilTarget(
      <Router>
        <TitleSelector {...props} />
      </Router>,
      'TitleSelector',
      { shallowOptions: { context } }
    );
    root.instance().setState({ defaultTitleEnvID: '3' });
    root.setProps({
      currentEnv: { id: '2', type: 'Development', shortType: 'dev' },
    });
    root.update();
    expect(root).toMatchSnapshot();
  });

  it('doesnt clear the content data if the the title is the current one', () => {
    const root = shallowUntilTarget(
      <Router>
        <TitleSelector {...props} />
      </Router>,
      'TitleSelector',
      {
        shallowOptions: { context },
      }
    );

    root.setProps({ setTitle: setTitleFn });
    root.update();

    const instance = root.instance();

    instance.onSelectTitle(
      { id: '1', name: 'GTR Project' },
      { id: '1', name: 'GTR-PS3', platform: 'PS3' },
      { id: '1', type: 'Development', shortType: 'dev' }
    );

    expect(setTitleFn).not.toHaveBeenCalled();
  });

  it('clear the content data if changed to a different title', () => {
    const root = shallowUntilTarget(
      <Router>
        <TitleSelector {...props} />
      </Router>,
      'TitleSelector',
      {
        shallowOptions: { context },
      }
    );

    root.setProps({ setTitle: setTitleFn });
    root.update();

    const instance = root.instance();

    instance.onSelectTitle(
      { id: '3', name: 'GTR Project3' },
      { id: '3', name: 'GTR-PS33', platform: 'PS33' },
      { id: '3', type: 'Development3', shortType: 'dev3' }
    );

    expect(setTitleFn).toHaveBeenCalled();
  });
});
