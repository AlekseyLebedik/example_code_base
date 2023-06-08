import React from 'react';

import {
  shallowUntilTarget,
  createTestStore as createStore,
} from '../../../test-utils';

import { actions as userActions } from '../../../modules/user';
import { fetchSuccess } from '../../../helpers/actions';
import { FEATURE_SWITCHES_LIST_PREFIX } from '../../../constants';

import FeatureSwitchesCheck from '../container';
import FeatureSwitchesCheckStateless from '../presentational';

let store;

describe('FeatureSwitchesCheck', () => {
  const activeFeature = 'ACTIVE_FEATURE';
  const disabledFeature = 'DISABLED_FEATURE';
  const notFoundFeature = 'NOT_FOUND_FEATURE';

  function render(customProps = {}) {
    const props = {
      store,
      ...customProps,
    };

    return shallowUntilTarget(
      <FeatureSwitchesCheck {...props}>
        <h1>Congrat! You have feature access.</h1>
      </FeatureSwitchesCheck>,
      FeatureSwitchesCheckStateless
    );
  }

  beforeEach(() => {
    store = createStore();
    store.dispatch(
      fetchSuccess(FEATURE_SWITCHES_LIST_PREFIX, {
        data: [
          { name: activeFeature, active: true },
          { name: disabledFeature, active: false },
        ],
      })
    );
  });

  it('has sane default props', () => {
    const root = render();
    expect(root).toMatchSnapshot();
  });

  it('allows staff to bypass feature check', () => {
    store.dispatch(userActions.setUserProfile({ profile: { isStaff: true } }));

    const root = render({ featureSwitches: notFoundFeature });
    expect(root).toMatchSnapshot();
  });

  it('allows to disable special staff access', () => {
    store.dispatch(userActions.setUserProfile({ profile: { isStaff: true } }));

    const root = render({
      featureSwitches: disabledFeature,
      isStaffAllowed: false,
    });
    expect(root).toMatchSnapshot();
  });

  it('renders nothing if the user has not the feature access', () => {
    const root = render({ featureSwitches: disabledFeature });
    expect(root).toMatchSnapshot();
  });

  it('renders the children component if the user has the feature access', () => {
    const root = render({ featureSwitches: activeFeature });
    expect(root).toMatchSnapshot();
  });

  it('handles multiple featureSwitches', () => {
    const otherActiveFeature = 'OTHER_ACTIVE_FEATURE';
    let root = render({ featureSwitches: [activeFeature, otherActiveFeature] });
    expect(root).toMatchSnapshot(); // Have access to one feature

    store.dispatch(
      fetchSuccess(FEATURE_SWITCHES_LIST_PREFIX, {
        data: [
          { name: activeFeature, active: true },
          { name: otherActiveFeature, active: true },
        ],
      })
    );
    root = render({ featureSwitches: [activeFeature, otherActiveFeature] });
    expect(root).toMatchSnapshot(); // Have features access
  });
});
