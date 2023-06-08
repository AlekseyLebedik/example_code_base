import {
  parseQueryString,
  selectAccountsServiceConfigId,
  setClansURL,
  validateClanId,
  validateEnv,
} from '../utils';

const ACCOUNTS_SERVICE_CONFIGS = {
  serviceConfigs: [
    { id: '39', name: 'Umbrella PROD' },
    { id: '12', name: 'Umbrella DEV' },
    { id: '13', name: 'Umbrella cert' },
  ],
};

describe('Clans - ClansProvider utils', () => {
  describe('parseQueryString', () => {
    const result = parseQueryString('clanId=937017732286401048&env=DEV');
    it('returns correct clanId', () => {
      const { clanId } = result;
      expect(clanId).toEqual('937017732286401048');
    });
    it('returns correct env', () => {
      const { env } = result;
      expect(env).toEqual('DEV');
    });
    it('clanId omitted if non provided', () => {
      const options = parseQueryString('?env=DEV');
      expect(options).toEqual({ env: 'DEV' });
    });
  });

  describe('selectAccountsServiceConfigId', () => {
    it('returns correct serviceConfigId', () => {
      const result = selectAccountsServiceConfigId(
        ACCOUNTS_SERVICE_CONFIGS,
        'DEV'
      );
      expect(result).toEqual('12');
    });
    it('finds serviceConfigId with lowercase configs', () => {
      const result = selectAccountsServiceConfigId(
        ACCOUNTS_SERVICE_CONFIGS,
        'CERT'
      );
      expect(result).toEqual('13');
    });
    it('returns undefined if no match found', () => {
      const result = selectAccountsServiceConfigId(
        ACCOUNTS_SERVICE_CONFIGS,
        'PROD SHA'
      );
      expect(result).toEqual(undefined);
    });
  });

  describe('setClansURL', () => {
    const history = { push: jest.fn() };
    setClansURL({
      history,
      clanId: '937017732286401048',
      env: 'DEV',
    });
    it('corectly sets history search', () => {
      expect(history.push).toHaveBeenCalledWith({
        search: 'clanId=937017732286401048&env=DEV',
      });
    });
  });

  describe('validateEnv', () => {
    it('returns if valid env', () => {
      const result = validateEnv('DEV');
      expect(result).toEqual('DEV');
    });
    it('returns null if invlaid string', () => {
      const result = validateEnv('test');
      expect(result).toEqual(null);
    });
    it('returns null if invalid id', () => {
      const result = validateEnv(1);
      expect(result).toEqual(null);
    });
  });

  describe('validateClanId', () => {
    it('returns if valid service config id', () => {
      const result = validateClanId('937017732286401048');
      expect(result).toEqual('937017732286401048');
    });
    it('returns null not provided valid int', () => {
      const result = validateClanId('test');
      expect(result).toEqual(null);
    });
  });
});
