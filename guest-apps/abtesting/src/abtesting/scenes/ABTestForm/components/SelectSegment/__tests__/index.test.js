import React from 'react';
import { change as changeFieldValue } from 'redux-form';

import { shallowUntilTarget } from 'dw/test-utils';
import createStore from 'shared/store';

import { FORM_NAME as TEST_FORM_NAME } from '../../../constants';
import { fetchSegmentsSuccess } from '../../../actions';
import SelectSegmentComponent from '../index';

describe('ABTesting component SelectSegmentComponent', () => {
  let store = null;
  const props = {
    cohort: {
      segmentID: {
        input: { name: 'cohorts[0].segmentID' },
        meta: { touched: false, error: undefined },
      },
    },
  };
  beforeEach(() => {
    ({ store } = createStore());
  });

  it('renders empty component', () => {
    expect(
      shallowUntilTarget(
        <SelectSegmentComponent store={store} {...props} />,
        'SelectSegmentComponent'
      )
    ).toMatchSnapshot();
  });

  it('renders component with list of segments', () => {
    const context = '1:cert';
    const segments = [
      {
        segmentID: '5210984693501455903',
        context: '5682',
        name: 'testseg5682',
      },
      {
        segmentID: '3458984693501455936',
        context: '5683',
        name: 'testseg5683',
      },
    ];
    store.dispatch(changeFieldValue(TEST_FORM_NAME, 'context', context));
    store.dispatch(fetchSegmentsSuccess({ data: segments }, context));
    expect(
      shallowUntilTarget(
        <SelectSegmentComponent store={store} {...props} />,
        'SelectSegmentComponent'
      )
    ).toMatchSnapshot();
  });
});
