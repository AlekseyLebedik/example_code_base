import {
  scriptListSelector,
  selectedItemSelector,
  nextPageTokenSelector,
  isUploadingSelector,
} from '../selectors';

describe('LootGen selectors', () => {
  const scriptList = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ];
  const state = {
    Scenes: {
      LootGen: {
        Scripts: {
          data: scriptList,
          nextPageToken: 'CAE',
        },
      },
    },
  };

  describe('scriptListSelector', () => {
    it('returns the script list', () => {
      expect(scriptListSelector(state)).toEqual(scriptList);
    });
  });

  describe('selectedItemSelector', () => {
    it('returns the selectedItem', () => {
      const props = {
        match: {
          params: {
            id: 1,
          },
        },
      };
      expect(selectedItemSelector(state, props)).toEqual(scriptList[0]);
    });
  });

  describe('nextPageTokenSelector', () => {
    it('returns the nextPageToken', () => {
      expect(nextPageTokenSelector(state)).toEqual('CAE');
    });
  });

  describe('isUploadingSelector', () => {
    it('returns uploading is undefined', () => {
      expect(isUploadingSelector(state)).toBeUndefined();
    });

    it('returns true if is uploading', () => {
      const newState = {
        Scenes: {
          LootGen: {
            Scripts: {
              uploading: true,
            },
          },
        },
      };
      expect(isUploadingSelector(newState)).toBeTruthy();
    });
  });
});
