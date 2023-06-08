import { isServiceEnabled, optionsSelector } from '../selectors';
import { SERVICE_NAMES } from '../constants';

const data = {
  player: {
    envs: [
      {
        id: '302',
        options:
          '{"legacy_storage_enabled": true, "is_multicontext": true, "async_matchmaking_enabled": true, "player_battle_pass_enabled": true, "player_centric_view": true}',
        title: {
          id: '5827',
          name: 'BO5 CrossPlay Blueberry Dev',
        },
        serviceConfigs: [
          {
            id: '23',
            type: 'GRAPHITE',
          },
          {
            id: '37',
            type: 'SOCIALSERVICE',
          },
          {
            id: '24',
            type: 'ACHIEVEMENTSENGINE',
          },
          {
            id: '12',
            type: 'ACCOUNTSMANAGEMENT',
          },
          {
            id: '19',
            type: 'MARKETPLACE',
          },
        ],
      },
    ],
  },
};

describe('OptionsChipSelector - selectors', () => {
  describe('isServiceEnabled', () => {
    it('throws if availableServiceConfigs is not passed', () => {
      expect(() => isServiceEnabled(SERVICE_NAMES.ACHIEVEMENTS)).toThrow();
    });
    it('returns false if nothing is enabled', () => {
      Object.values(SERVICE_NAMES).forEach(service => {
        expect(isServiceEnabled(service, new Set())).toEqual(false);
      });
    });
    it('returns true for ACHIEVEMENTSENGINE when present in serviceConfig', () => {
      expect(
        isServiceEnabled(
          SERVICE_NAMES.ACHIEVEMENTS,
          new Set(['ACHIEVEMENTSENGINE'])
        )
      ).toEqual(true);
    });
    it('returns true for MARKETPLACE when present in serviceConfig', () => {
      expect(
        isServiceEnabled(SERVICE_NAMES.INVENTORY, new Set(['MARKETPLACE']))
      ).toEqual(true);
    });
    it('returns true based on asyncMatchMakingEnabled', () => {
      [SERVICE_NAMES.MATCHMAKING, SERVICE_NAMES.LEADERBOARDS].forEach(
        service => {
          expect(isServiceEnabled(service, null, true)).toEqual(true);
        }
      );
    });
    it('returns true for BATTLEPASS based on asyncMatchMakingEnabled', () => {
      expect(
        isServiceEnabled(SERVICE_NAMES.BATTLEPASS, null, null, true)
      ).toEqual(true);
    });
    it('returns true for STORAGE based on legacyStorageEnabled', () => {
      expect(
        isServiceEnabled(SERVICE_NAMES.STORAGE, null, null, null, true)
      ).toEqual(true);
    });
  });

  describe('optionsSelector', () => {
    const mockFeaturesCheckFunc = () => true;
    const result = optionsSelector(data, mockFeaturesCheckFunc);
    it('returns the correct number of title options', () => {
      const titles = result?.find(o => o.groupLabel === 'titles');
      expect(titles?.options?.length).toEqual(1);
    });
    it('returns the correct number of service options', () => {
      const services = result?.find(o => o.groupLabel === 'services');
      expect(services?.options?.length).toEqual(8);
    });
  });
});
