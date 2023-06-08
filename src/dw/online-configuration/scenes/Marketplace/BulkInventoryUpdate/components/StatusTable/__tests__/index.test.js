import React from 'react';
import { shallow } from 'enzyme';
import { AsyncAGGrid } from 'dw/core/components/AGGrid';
import { getTasksList } from 'dw/online-configuration/services/tasks';
import wait from 'dw/test-utils/wait';

import StatusTable from '../index';

jest.mock('dw/online-configuration/services/tasks');

const mockState = { user: { profile: { timezone: 'UTC' } } };
const mockApplyTransaction = jest.fn();

function MockGrid(idAttr = 'id') {
  const self = this;
  this.data = [];
  this.api = {
    forEachNode: callback => this.data.forEach(callback),
    applyTransaction: mockApplyTransaction.mockImplementation(
      ({ add = [], update = [] }) => {
        const addedNodes = add.map(d => ({ data: { ...d } }));
        self.data = [...self.data, ...addedNodes];
        const updatedNodes = [];
        self.data.forEach((node, idx) => {
          const newNode = update.find(d => d[idAttr] === node.data[idAttr]);
          if (newNode) {
            self.data[idx] = newNode;
            updatedNodes.push(newNode);
          }
        });
        return { add: addedNodes, update: updatedNodes };
      }
    ),
    getRowNode: id => this.data.find(n => n.data[idAttr] === id),
  };
}

jest.mock('react-redux', () => ({
  connect: () => Component => Component,
  useSelector: selector => selector(mockState),
}));

jest.mock('react-router-dom', () => ({
  withRouter: Component => props =>
    <Component {...props} location={{}} history={{ push: jest.fn() }} />,
}));

describe('StatusTable', () => {
  let gridOptions;
  beforeEach(() => {
    gridOptions = new MockGrid('task_id');
    mockApplyTransaction.mockClear();
    getTasksList
      .mockReturnValueOnce(
        new Promise(resolve =>
          resolve({
            data: {
              data: [
                { task_id: 1, state: 'PENDING' },
                { task_id: 2, state: 'SUCCESS', result: 'Inventory updated' },
                { task_id: 3, state: 'PENDING' },
              ],
            },
          })
        )
      )
      .mockReturnValueOnce(
        new Promise(resolve =>
          resolve({
            data: {
              data: [
                { task_id: 1, state: 'SUCCESS', result: 'Inventory updated' },
                { task_id: 3, state: 'ERROR', error: 'Something went wrong' },
              ],
            },
          })
        )
      );
  });
  it('renders AsyncAGGrid and polls for tasks updates', async () => {
    const wrapper = shallow(<StatusTable pollInterval={0} />);
    let grid = wrapper.find(AsyncAGGrid);
    grid.props().onGridReady(gridOptions);
    wrapper.update();
    grid = wrapper.find(AsyncAGGrid);
    await grid.props().onLoadData(null, {
      successCallback: data => gridOptions.api.applyTransaction({ add: data }),
    });
    await wait(0);
    expect(getTasksList.mock.calls).toEqual([
      [{ tags: 'marketplace' }], // Initial tasks list call
      [{ ids: '1,3' }], // Call for tasks updates
    ]);
    expect(mockApplyTransaction.mock.calls).toEqual([
      [
        {
          add: [
            {
              state: 'PENDING',
              task_id: 1,
            },
            {
              state: 'SUCCESS',
              task_id: 2,
              result: 'Inventory updated',
            },
            {
              state: 'PENDING',
              task_id: 3,
            },
          ],
        },
      ],
      [
        {
          update: [
            {
              state: 'SUCCESS',
              task_id: 1,
              result: 'Inventory updated',
            },
            {
              state: 'ERROR',
              task_id: 3,
              error: 'Something went wrong',
            },
          ],
        },
      ],
    ]);
  });
  describe('AsyncAGGrid', () => {
    it('isRowMaster check', () => {
      const wrapper = shallow(<StatusTable />);
      const {
        gridOptions: { isRowMaster },
      } = wrapper.props();
      expect(isRowMaster({})).toBeFalsy();
      expect(isRowMaster({ error: 'Something went wrong' })).toBeTruthy();
      expect(isRowMaster({ result: 'Inventory updated' })).toBeTruthy();
    });
    it('getRowId check', () => {
      const wrapper = shallow(<StatusTable />);
      const {
        gridOptions: { getRowId },
      } = wrapper.props();
      expect(getRowId({ data: { task_id: 123 } })).toEqual(123);
    });
    describe('DetailCellRenderer', () => {
      let DetailCellRenderer;
      beforeEach(() => {
        const wrapper = shallow(<StatusTable />);
        ({
          gridOptions: {
            components: { detailCellRenderer: DetailCellRenderer },
          },
        } = wrapper.props());
      });
      it('renders Monaco editor with string result', () => {
        const wrapper = shallow(
          <DetailCellRenderer data={{ result: 'Inventory updated' }} />
        );
        const monaco = wrapper.find('Monaco');
        expect(monaco.props().input.value).toEqual('Inventory updated');
      });
      it('renders Monaco editor with string error', () => {
        const wrapper = shallow(
          <DetailCellRenderer data={{ error: 'Something went wrong' }} />
        );
        const monaco = wrapper.find('Monaco');
        expect(monaco.props().input.value).toEqual('Something went wrong');
      });
      it('renders Monaco editor with json result', () => {
        const wrapper = shallow(
          <DetailCellRenderer data={{ result: { msg: 'Inventory updated' } }} />
        );
        const monaco = wrapper.find('Monaco');
        expect(monaco.props().input.value).toEqual(
          JSON.stringify(
            {
              msg: 'Inventory updated',
            },
            null,
            2
          )
        );
      });
      it('renders Monaco editor with json error', () => {
        const wrapper = shallow(
          <DetailCellRenderer
            data={{ error: { msg: 'Something went wrong' } }}
          />
        );
        const monaco = wrapper.find('Monaco');
        expect(monaco.props().input.value).toEqual(
          JSON.stringify(
            {
              msg: 'Something went wrong',
            },
            null,
            2
          )
        );
      });
    });
  });
});
