import React from 'react';

import { shallowUntilTarget } from 'dw/test-utils';

import { createStore } from 'redux';
import { reduxForm } from 'redux-form';

import Input from 'dw/core/components/FormFields/Input';
// import { LocalizedFormFieldDateTimePicker as DateTimePicker } from 'dw/core/components/DateTimePicker';

import SearchForm from '../presentational';

import { FORM_NAME } from '../constants';

const shallow = (
  wrapper,
  target,
  { context, initialSelector, maxTries = 10 } = {}
) => {
  let result;
  let root = wrapper;
  if (initialSelector) root = root.find(initialSelector);
  for (let tries = 1; tries <= maxTries; tries += 1) {
    result = root.find(target);
    if (result.length > 0) return result;
    root = root.shallow({ context });
  }
  return result;
};

const getStore = (values = {}) =>
  createStore(state => state, {
    form: { [FORM_NAME]: { values } },
    user: { profile: {} },
  });

const getReduxFormContext = store => {
  const FakeForm = reduxForm({
    form: FORM_NAME,
  })(() => {});

  const fakeForm = shallowUntilTarget(
    <FakeForm store={store} />,
    'ReduxForm'
  ).instance();
  fakeForm.getFormState = state =>
    fakeForm.props.getFormState(state)[fakeForm.props.form];
  return { _reduxForm: fakeForm, store };
};

describe('SearchForm Presentational', () => {
  const wrapper = shallowUntilTarget(
    <SearchForm onSearch={jest.fn()} store={getStore()} />,
    'SearchAuditLogsStateless'
  );
  it('Structure', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe.skip('Fields', () => {
  const wrapper = shallowUntilTarget(
    <SearchForm onSearch={jest.fn()} store={getStore()} />,
    'SearchAuditLogsStateless'
  );
  const values = {
    username: 'jheslin',
    userType: 'b2b',
    unixtime: 1558452266,
    unixtimeMillis: 1558452266892,
    category: 'Devzone.Admin.TestAction.SubAction',
    titleID: 1,
    auditTitleID: 4444,
    env: 'dev',
    auditEnv: 'dev',
    context: 'big_context',
    auditContext: 'important_context',
    entityName: 'user_c',
    entityID: 1008,
    sourceName: 'auditlog',
    extra: {
      example_specific_property: 25555,
    },
  };

  const store = getStore(values);
  const context = getReduxFormContext(store);

  it('userType > Input', () => {
    const field = shallow(wrapper, Input, {
      context,
      initialSelector: 'Field[name="userType"]',
    });
    expect(field).toHaveLength(1);
    expect(field.props().input.value).toBe(values.userType);
  });

  it('category > Input', () => {
    const field = shallow(wrapper, Input, {
      context,
      initialSelector: 'Field[name="category"]',
    });
    expect(field).toHaveLength(1);
    expect(field.props().input.value).toBe(values.category);
  });

  it('sourceName > Input', () => {
    const field = shallow(wrapper, Input, {
      context,
      initialSelector: 'Field[name="sourceName"]',
    });
    expect(field).toHaveLength(1);
    expect(field.props().input.value).toBe(values.sourceName);
  });

  it('extra > Input', () => {
    const field = shallow(wrapper, Input, {
      context,
      initialSelector: 'Field[name="extra"]',
    });
    expect(field).toHaveLength(1);
    expect(field.props().input.value).toBe(values.extra);
  });

  it('entityID > Input', () => {
    const field = shallow(wrapper, Input, {
      context,
      initialSelector: 'Field[name="entityID"]',
    });
    expect(field).toHaveLength(1);
    expect(field.props().input.value).toBe(values.entityID);
  });

  // describe('TimeRange', () => {
  //   const timeRangeFields = shallow(wrapper, 'TimeRangeFormValues', {
  //     context,
  //     initialSelector: 'FormValues',
  //   }).shallow();

  //   it('startDate > DateTimePicker', () => {
  //     const field = shallow(timeRangeFields, DateTimePicker, {
  //       context,
  //       initialSelector: 'Field[name="startDate"]',
  //     });
  //     expect(field).toHaveLength(1);
  //   });

  //   it('endDate > DateTimePicker', () => {
  //     const field = shallow(timeRangeFields, DateTimePicker, {
  //       context,
  //       initialSelector: 'Field[name="endDate"]',
  //     });
  //     expect(field).toHaveLength(1);
  //   });
  // });
});
