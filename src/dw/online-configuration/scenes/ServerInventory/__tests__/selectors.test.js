import uniqBy from 'lodash/uniqBy';

import {
  getServersAllocation,
  getContexts,
  getBuildNames,
  getDataCenters,
  getSelectedBuildName,
  getSelectedContext,
  getSelectedDataCenter,
} from '../selectors';

describe('Server Inventory selectors', () => {
  const mockServersAllocation = [
    {
      dataCenter: 'gs-los-angeles',
      buildName: 'build1',
      context: 'context1',
      status: 'idle',
      count: 100,
    },
    {
      dataCenter: 'gs-los-angeles',
      buildName: 'build1',
      context: 'context1',
      status: 'allocated',
      count: 40,
    },
    {
      dataCenter: 'gs-los-angeles',
      buildName: 'build2',
      context: 'context1',
      status: 'allocated',
      count: 40,
    },
    {
      dataCenter: 'gs-los-angeles',
      buildName: 'build2',
      context: 'context2',
      status: 'allocated',
      count: 40,
    },
  ];
  const state = {
    Scenes: {
      ServerInventory: {
        serversAllocation: {
          isLoading: false,
          data: mockServersAllocation,
        },
      },
    },
  };

  const matchProps = (params = {}) => ({
    match: {
      params,
    },
  });

  describe('getServersAllocation', () => {
    it('returns servers allocations', () => {
      expect(getServersAllocation(state)).toEqual(mockServersAllocation);
    });
  });

  describe('getContexts', () => {
    it('returns contexts', () => {
      expect(getContexts(state)).toEqual(
        uniqBy(mockServersAllocation, 'context').map(x => x.context)
      );
    });
  });

  describe('getBuildNames', () => {
    it('returns empty array of buildNames for a empty context', () => {
      expect(getBuildNames(state, matchProps({ context: '' }))).toEqual([]);
    });

    it('returns an array of buildNames for a empty context', () => {
      const context = 'context1';
      const buildNames = getBuildNames(state, matchProps({ context }));
      expect(buildNames).toEqual([
        { name: 'build1', idleCount: 100, allocatedCount: 40 },
        { name: 'build2', allocatedCount: 40 },
      ]);
      expect(buildNames).toMatchSnapshot();
    });
  });

  describe('getDataCenters', () => {
    it('returns empty array of datacenters for a empty context', () => {
      expect(getDataCenters(state, matchProps({ context: '' }))).toEqual([]);
    });

    it('returns an array of datacenters for a empty buildName', () => {
      expect(
        getDataCenters(
          state,
          matchProps({
            context: mockServersAllocation[0].context,
            buildName: '',
          })
        )
      ).toEqual([]);
    });

    it('returns an array of buildNames for a empty context', () => {
      const context = 'context1';
      const buildName = 'build1';
      const dataCenters = getDataCenters(
        state,
        matchProps({ context, buildName })
      );
      expect(dataCenters).toEqual([
        { name: 'gs-los-angeles', idleCount: 100, allocatedCount: 40 },
      ]);
      expect(dataCenters).toMatchSnapshot();
    });
  });

  describe('getSelectedContext', () => {
    it('returns undefined if nothing in the router params', () => {
      expect(getSelectedContext(state, matchProps({}))).toBeUndefined();
    });

    it('returns context name selected if context name is in the router params', () => {
      expect(
        getSelectedContext(state, matchProps({ context: 'contextBla' }))
      ).toEqual('contextBla');
    });
  });

  describe('getSelectedBuildName', () => {
    it('returns undefined if nothing in the router params', () => {
      expect(getSelectedBuildName(state, matchProps({}))).toBeUndefined();
    });

    it('returns context name selected if context name is in the router params', () => {
      expect(
        getSelectedBuildName(state, matchProps({ buildName: 'buildNameBla' }))
      ).toEqual('buildNameBla');
    });
  });

  describe('getSelectedDataCenter', () => {
    it('returns undefined if nothing in the router params', () => {
      expect(getSelectedDataCenter(state, matchProps({}))).toBeUndefined();
    });

    it('returns context name selected if context name is in the router params', () => {
      expect(
        getSelectedDataCenter(state, matchProps({ dataCenter: 'dcSelected' }))
      ).toEqual('dcSelected');
    });
  });
});
