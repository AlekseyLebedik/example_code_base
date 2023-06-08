import React from 'react';
import { shallow } from 'enzyme';
import { ReduxProvider } from 'dw/core/helpers/__tests__';

import { formatStorageData, DetailRenderer } from '../index';

const data = {
  userObjects: [
    {
      objectID: '3835159652453332528',
      name: 'mp_stats_online',
      modified: 1593620300,
      titleId: 5830,
    },
    {
      objectID: '7363446282216943926',
      name: 'mp_loadouts_online',
      modified: 1593620300,
      titleId: 5830,
    },
    {
      objectID: '3761692304136692788',
      name: 'statsarchive00',
      modified: 1593619819,
      titleId: 5830,
    },
  ],
  groupOverrides: [],
};

describe('GameData Inventory', () => {
  describe('formatStorageData', () => {
    const result = formatStorageData(data);
    it('returns no results for 5827', () => {
      expect(result.get(5827)).toEqual(undefined);
    });
    it('returns correct values for 5830', () => {
      expect(result.get(5830)).toEqual({
        userObjects: [
          {
            modified: 1593620300,
            name: 'mp_stats_online',
            objectID: '3835159652453332528',
          },
          {
            modified: 1593620300,
            name: 'mp_loadouts_online',
            objectID: '7363446282216943926',
          },
          {
            modified: 1593619819,
            name: 'statsarchive00',
            objectID: '3761692304136692788',
          },
        ],
      });
    });
  });

  describe('DetailRenderer', () => {
    it('renders User Objects', () => {
      const props = {
        expandAll: true,
        titleId: 5830,
        values: {
          userObjects: [
            {
              objectID: '3835159652453332528',
              name: 'mp_stats_online',
              modified: 1593620300,
            },
            {
              objectID: '7363446282216943926',
              name: 'mp_loadouts_online',
              modified: 1593620300,
            },
            {
              objectID: '3761692304136692788',
              name: 'statsarchive00',
              modified: 1593619819,
            },
          ],
        },
      };
      const wrapper = shallow(
        <ReduxProvider>
          <DetailRenderer {...props} />
        </ReduxProvider>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
