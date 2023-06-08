import React from 'react';
import { shallowUntilTarget } from 'dw/test-utils';
import createRouterContext from 'react-router-test-context';
import createStore from 'dw/audit/store';
import AgGridComponent from '../container';
import { AUDIT_LOGS_PREFIX } from '../../../constants';
import { fetchAuditLogs } from '../../../actions';

jest.mock('../../../actions');

fetchAuditLogs.mockImplementation(params => ({
  type: AUDIT_LOGS_PREFIX,
  params,
}));
describe.skip('Aggrid Container', () => {
  let store;
  let context;

  beforeEach(() => {
    // eslint-disable-next-line
    store = createStore().store;
    context = createRouterContext();
    fetchAuditLogs.mockClear();
  });
  const actions = {
    fetchAuditLogs,
  };
  it('check on show more is clicked', () => {
    const wrapper = shallowUntilTarget(
      <AgGridComponent store={store} actions={actions} />,
      'Connect',
      {
        shallowOptions: { context },
      }
    );
    wrapper.props().detailsNextPage();
    expect(fetchAuditLogs).toBeCalledWith({ ...{} }, true);
  });
});
