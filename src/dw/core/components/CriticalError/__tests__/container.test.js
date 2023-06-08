import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { mount } from 'enzyme';
import { createTestStore } from 'dw/test-utils';

import CriticalError from '../container';
import CriticalErrorStateless from '../presentational';
import * as actions from '../actions';
import reducer from '../reducer';

describe('CriticalError', () => {
  let store = null;
  let showErrorAction = null;
  let hideErrorAction = null;

  function render(customProps = {}) {
    const props = {
      store,
      ...customProps,
    };

    return mount(
      <MemoryRouter>
        <CriticalError {...props} />
      </MemoryRouter>
    );
  }

  beforeEach(() => {
    ({ store } = createTestStore('Core.CriticalError', reducer));

    showErrorAction = actions.show({ message: 'Error message' }, jest.fn());
    hideErrorAction = actions.hide();
  });

  it('renders nothing when no error is dispatched', () => {
    const root = render();
    expect(root.find(CriticalErrorStateless).prop('isVisible')).toBeFalsy();
  });

  it('renders the dispatched error', () => {
    store.dispatch(showErrorAction);

    const root = render();
    const statelessComponent = root.find(CriticalErrorStateless);

    expect(statelessComponent.props()).toMatchObject({
      isVisible: true,
      error: showErrorAction.error,
    });
  });

  it('hides the error and calls the callback when retrying', () => {
    store.dispatch(showErrorAction);
    store.dispatch = jest.fn();

    const root = render();
    const retry = root.find(CriticalErrorStateless).prop('retry');
    retry();

    expect(store.dispatch).toHaveBeenCalledWith(hideErrorAction);
    expect(showErrorAction.retry).toHaveBeenCalled();
  });
});
