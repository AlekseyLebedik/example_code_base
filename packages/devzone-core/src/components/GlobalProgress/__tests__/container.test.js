import React from 'react';

import {
  shallowUntilTarget,
  createTestStore as createStore,
} from '../../../test-utils';

import GlobalProgress, { GlobalProgressBase } from '../container';
import GlobalProgressStateless from '../presentational';
import * as actions from '../actions';
import * as C from '../constants';

jest.useFakeTimers();

let store = null;

describe('GlobalProgress', () => {
  function render(customProps = {}) {
    const props = {
      store,
      ...customProps,
    };

    return shallowUntilTarget(
      <GlobalProgress {...props} />,
      GlobalProgressBase
    );
  }

  beforeEach(() => {
    store = createStore();
    jest.clearAllTimers();
  });

  it('renders nothing when no progress is started', () => {
    const root = render();
    expect(root).toMatchSnapshot();
    expect(root.state('status')).toBe(C.STATUS_ENUM.HIDDEN);
  });

  it('renders the progress bar when GLOBAL_PROGRESS_START is dispatched', () => {
    store.dispatch(actions.start());
    const root = render();
    jest.advanceTimersByTime(C.UPDATE_TIME);
    root.update();

    expect(root).toMatchSnapshot();
    expect(root.state('status')).toBe(C.STATUS_ENUM.RUNNING);
  });

  it('renders nothing if the action is fast enough', () => {
    store.dispatch(actions.start());
    const root = render();
    // Check that the progress bar isn't rendered after UPDATE_TIME / 2
    jest.advanceTimersByTime(C.UPDATE_TIME / 2);
    root.update();
    expect(root.state('status')).toBe(C.STATUS_ENUM.RUNNING);
    expect(root.find(GlobalProgressStateless).prop('isShown')).toBeFalsy();

    // Stop the loading and check that the status change to stopping
    root.setProps({ loading: 0 });
    root.update();
    expect(root.state('status')).toBe(C.STATUS_ENUM.STOPPING);

    // Check that a timer was scheduled immediately to hide the progress bar
    jest.runAllTimers();
    root.update();
    expect(root.state('status')).toBe(C.STATUS_ENUM.HIDDEN);
  });

  it('completes the progress bar with a fast animation', async () => {
    store.dispatch(actions.start());
    const root = render();
    // Check that the progress bar is running
    jest.advanceTimersByTime(C.UPDATE_TIME * 2);
    root.update();
    expect(root.state('status')).toBe(C.STATUS_ENUM.RUNNING);
    expect(root.find(GlobalProgressStateless).prop('isShown')).toBeTruthy();

    // Stop the loading and check that the status change to stopping
    root.setProps({ loading: 0 });
    root.update();
    expect(root.state('status')).toBe(C.STATUS_ENUM.STOPPING);
    expect(root.find(GlobalProgressStateless).props()).toMatchObject({
      isShown: true,
      animationDuration: C.TERMINATING_ANIMATION_DURATION,
    });

    // Check that the progress bar is hidden after the animation duration
    jest.runAllTimers();
    root.update();
    expect(root.state('status')).toBe(C.STATUS_ENUM.HIDDEN);
  });

  it('slows the progress at every interval', () => {
    store.dispatch(actions.start());
    const root = render();
    // Approximate the maximum number of iterations
    const N = C.MAX_PROGRESS / C.PROGRESS_INCREASE;

    const deltas = [];
    let prevPercent = root.state('percent');
    for (let i = 0; i < N; i += 1) {
      jest.advanceTimersByTime(C.UPDATE_TIME);
      root.update();

      const curPercent = root.state('percent');
      deltas.push(curPercent - prevPercent);
      prevPercent = curPercent;
    }

    for (let i = 1; i < N; i += 1) {
      expect(deltas[i - 1]).toBeGreaterThan(deltas[i]);
    }
  });
});
