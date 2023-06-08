import mockState from 'playpants/testUtils/mockState';
import { formatDateTimeSelector } from 'playpants/helpers/dateTime';
import * as helpers from '../helpers';

describe('AchievementDetails helper functions:', () => {
  let received;
  let expected;
  let input;
  describe('startCaseKeys()', () => {
    it('properly start cases keys in an object', () => {
      input = {
        test: null,
        'test-dash': null,
        camelCase: null,
        '---testing---': null,
      };
      expected = {
        Test: null,
        'Test Dash': null,
        'Camel Case': null,
        Testing: null,
      };
      received = helpers.startCaseKeys(input);
      expect(received).toMatchObject(expected);
    });

    it('handles an empty/undefined object', () => {
      input = undefined;
      received = helpers.startCaseKeys(input);
      expected = undefined;
      expect(received).toBe(expected);
    });
  });

  describe('formatRuleset()', () => {
    it('properly formats ruleset for display in KeyValue component', () => {
      input = {
        activationTimestamp: null,
        code: '1',
        codeHash: '2',
        codeSignatureTimestamp: 1565841879,
        code_signature: '3',
        creationTimestamp: 1565841879,
        isActive: true,
        label: 'stronghold',
        lastUpdateTimestamp: 1565842668,
      };
      expected = {
        'Activation Timestamp': null,
        'Code Hash': '2',
        'Code Signature Timestamp': 'Aug 15, 2019 04:04 am',
        'Code Signature': '3',
        'Creation Timestamp': 'Aug 15, 2019 04:04 am',
        'Is Active': 'True',
        Label: 'stronghold',
        'Last Update Timestamp': 'Aug 15, 2019 04:17 am',
      };
      received = helpers.formatRuleset(
        input,
        formatDateTimeSelector(mockState)
      );
      expect(received).toMatchObject(expected);
    });
    it('handles an empty/undefined object', () => {
      input = undefined;
      received = helpers.formatRuleset(
        input,
        formatDateTimeSelector(mockState)
      );
      expected = undefined;
      expect(received).toBe(expected);
    });
  });
});
