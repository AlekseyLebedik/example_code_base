import React from 'react';
import { shallow } from 'enzyme';

import wait from 'dw/test-utils/wait';
import createStore from 'dw/online-configuration/store';
import DetailPanel from '../container';
import * as actions from '../actions';

const servers = [
  {
    data: {
      dataCenter: 'gs-chicago',
      secID: '',
      registrationTime: '1550160584.0365',
      serverInfo: {},
      priority: '1',
      secKey: 'asd==',
      context: 't8-ps4-wz-100',
      buildName: 'T8-ship-3274825-TU13-50-1-a7e51f7d@2324',
      allocated: '0',
      addr: 'addr',
    },
    userID: '16055663896388436049',
    ttl: '574',
  },
  {
    data: {
      dataCenter: 'gs-chicago',
      secID: '',
      registrationTime: '1550161187.0452',
      serverInfo: '',
      priority: '1',
      secKey: 'asd==',
      context: 't8-ps4-wz-100',
      buildName: 'T8-ship-3274825-TU13-50-1-a7e51f7d@2324',
      allocated: '0',
      addr: 'addr2',
    },
    userID: '16055663896370348053',
    ttl: '1177',
  },
];

describe('ServerInventory', () => {
  describe('DetailPanel', () => {
    describe('container', () => {
      let store;
      beforeEach(() => {
        store = createStore().store;
      });

      it('should render list component', async () => {
        store.dispatch(actions.fetchMMServerListSuccess(servers));
        await wait(1);
        const wrapper = shallow(
          <DetailPanel
            store={store}
            context="t8-ps4-wz-100"
            buildname="T8-ship-3274825-TU13-50-1-a7e51f7d@2324"
            datacenter="gs-chicago"
          />
        );
        const component = wrapper.find('DetailPanel');
        expect(component).toMatchSnapshot();
        expect(component.prop('loading')).toBeFalsy();
        expect(component.prop('empty')).toBeFalsy();
        expect(component.prop('servers')).toHaveLength(2);
      });
    });
  });
});
