import React from 'react';

import { shallowUntilTarget } from 'dw/test-utils';
import createStore from 'shared/store';

import { fetchCohortUsersSuccess } from '../../../actions';
import CohortUsersFileComponent from '../index';

describe('ABTesting component CohortUsersFileComponent', () => {
  let store = null;
  const props = {
    disabled: false,
    cohort: { fileData: { input: { name: 'cohorts[0].fileData' }, meta: {} } },
    cohortID: '7212643006045657787',
  };

  beforeEach(() => {
    ({ store } = createStore());
  });

  it('renders UploadButton', () => {
    expect(
      shallowUntilTarget(
        <CohortUsersFileComponent store={store} {...props} />,
        'UploadButton'
      )
    ).toMatchSnapshot();
  });

  it('renders UsersFile', () => {
    const users = [
      { dwid: '12334567', context: 'game2', accountType: 'psn' },
      { dwid: '2317174234108935', context: 'game2', accountType: 'steam' },
    ];
    store.dispatch(fetchCohortUsersSuccess({ data: users }, props.cohortID));
    expect(
      shallowUntilTarget(
        <CohortUsersFileComponent store={store} {...props} />,
        'UsersFile'
      )
    ).toMatchSnapshot();
  });

  it('renders disabled UsersFile', () => {
    const newProps = {
      ...props,
      disabled: true,
    };

    const users = [
      { dwid: '12334567', context: 'game2', accountType: 'psn' },
      { dwid: '2317174234108935', context: 'game2', accountType: 'steam' },
    ];
    store.dispatch(fetchCohortUsersSuccess({ data: users }, props.cohortID));
    expect(
      shallowUntilTarget(
        <CohortUsersFileComponent store={store} {...newProps} />,
        'UsersFile'
      )
    ).toMatchSnapshot();
  });
});
