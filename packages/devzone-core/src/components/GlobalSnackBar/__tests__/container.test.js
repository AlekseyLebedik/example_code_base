import React from 'react';
import { shallow } from 'enzyme';

import { createTestStore } from '../../../test-utils';

import GlobalSnackBar from '../container';
import GlobalSnackBarStateless from '../presentational';
import * as actions from '../actions';

describe('GlobalSnackBar', () => {
  let store = null;

  function render(shallowOnReturn = true, customProps = {}) {
    const props = {
      store,
      ...customProps,
    };

    const component = shallow(<GlobalSnackBar {...props} />);
    return shallowOnReturn ? component.shallow() : component;
  }

  beforeEach(() => {
    store = createTestStore();
  });

  it('renders nothing when no message is dispatched', () => {
    const root = render();
    expect(root.find(GlobalSnackBarStateless).prop('open')).toBeFalsy();
  });

  it('renders the dispatched message', () => {
    const showMessageAction = actions.show('Test message');
    store.dispatch(showMessageAction);

    const root = render();
    const statelessComponent = root.find(GlobalSnackBarStateless);

    expect(statelessComponent.props()).toMatchObject({
      messages: [showMessageAction.message],
    });
  });

  it('renders complex dispatched message', () => {
    const showMessageAction = actions.show(
      <div>
        <h1>Test Example</h1>
        <p>Message content</p>
      </div>
    );
    store.dispatch(showMessageAction);

    const root = render();
    const statelessComponent = root.find(GlobalSnackBarStateless);

    expect(statelessComponent.props()).toMatchObject({
      messages: [showMessageAction.message],
    });
  });

  it('hides the dispatched message', () => {
    const showMessageAction = actions.show('Test message');
    store.dispatch(showMessageAction);

    const root = render(false);
    expect(root.shallow().find(GlobalSnackBarStateless).props()).toMatchObject({
      messages: [showMessageAction.message],
    });

    // Hide the dispatched message
    store.dispatch(actions.hide(showMessageAction.message));
    root.update();

    expect(root.shallow().find(GlobalSnackBarStateless).props()).toMatchObject({
      messages: [],
    });
  });
});
