import {
  generateFilterPath,
  parseQueryString,
  serviceConfigsSorted,
  validateServiceConfigID,
} from '../utils';

const SERVICE_CONFIGS = [
  { id: '39', name: 'Umbrella PROD SHA' },
  { id: '12', name: 'Umbrella DEV' },
  { id: '13', name: 'Umbrella PROD' },
];

const OPTIONS = {
  globals: ['activity'],
  titles: ['5827', '5830'],
  services: [
    'achievements',
    'battlepass',
    'inventory',
    'leaderboards',
    'matchmaking',
    'storage',
  ],
};

describe('GameData - utils', () => {
  describe('serviceConfigsSorted', () => {
    it('returns service configs properly ordered', () => {
      const result = serviceConfigsSorted({ serviceConfigs: SERVICE_CONFIGS });
      expect(result).toEqual([
        { id: '13', name: 'Umbrella PROD' },
        { id: '39', name: 'Umbrella PROD SHA' },
        { id: '12', name: 'Umbrella DEV' },
      ]);
    });
    it('returns option even if no PROD provided', () => {
      const result = serviceConfigsSorted({
        serviceConfigs: [{ id: '12', name: 'Umbrella DEV' }],
      });
      expect(result).toEqual([{ id: '12', name: 'Umbrella DEV' }]);
    });
  });
  describe('parseQueryString', () => {
    const result = parseQueryString(
      'serviceConfigID=12&globals=activity&services=achievements%2Cbattlepass%2Cinventory%2Cleaderboards%2Cmatchmaking%2Cstorage&titles=5827%2C5830'
    );
    it('returns correct serviceConfigID', () => {
      const { serviceConfigID } = result;
      expect(serviceConfigID).toEqual('12');
    });
    it('returns correct globals', () => {
      const { globals } = result;
      expect(globals).toEqual(['activity']);
    });
    it('returns correct services', () => {
      const { services } = result;
      expect(services).toEqual([
        'achievements',
        'battlepass',
        'inventory',
        'leaderboards',
        'matchmaking',
        'storage',
      ]);
    });
    it('returns correct titles', () => {
      const { titles } = result;
      expect(titles).toEqual(['5827', '5830']);
    });
    it('no options returned if non provided', () => {
      const { ServiceConfigID, ...options } = parseQueryString(
        '?serviceConfigID=12'
      );
      expect(options).toEqual({ serviceConfigID: '12' });
    });
  });
  describe('generateFilterPath', () => {
    const result = generateFilterPath({
      serviceConfigID: 12,
      options: OPTIONS,
    });
    it('returns correct query string', () => {
      expect(result).toEqual(
        'serviceConfigID=12&globals=activity&titles=5827%2C5830&services=achievements%2Cbattlepass%2Cinventory%2Cleaderboards%2Cmatchmaking%2Cstorage'
      );
    });
  });
  describe('validateServiceConfigID', () => {
    it('returns if valid service config id', () => {
      const result = validateServiceConfigID('12', SERVICE_CONFIGS);
      expect(result).toEqual('12');
    });
    it('returns null not provided valid int', () => {
      const result = validateServiceConfigID('test', SERVICE_CONFIGS);
      expect(result).toEqual(null);
    });
    it('returns null if provided incorrect id', () => {
      const result = validateServiceConfigID('123', SERVICE_CONFIGS);
      expect(result).toEqual(null);
    });
  });
});
