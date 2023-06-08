import { removeFalseyCountValues, setTooltipText } from '../helpers';

describe('BadgeCellRenderer helpers:', () => {
  describe('removeFalseyCountValues', () => {
    it('properly remove all falsey values', () => {
      const payload = {
        live: 1,
        deploy: 1,
        undeploy: false,
        modify: 0,
      };
      expect(removeFalseyCountValues(payload)).toEqual({
        live: 1,
        deploy: 1,
      });
    });
  });

  describe('setTooltipText', () => {
    it('properly sets tooltip for live', () => {
      const payload = 'live';
      expect(setTooltipText(payload)).toEqual('Live Builds');
    });
    it('properly sets tooltip for deploy', () => {
      const payload = 'deploy';
      expect(setTooltipText(payload)).toEqual('Build Deployments');
    });
    it('properly sets tooltip for undeploy', () => {
      const payload = 'undeploy';
      expect(setTooltipText(payload)).toEqual('Build Undeployments');
    });
    it('properly sets tooltip for config', () => {
      const payload = 'modify';
      expect(setTooltipText(payload)).toEqual('Modifications');
    });
    it('properly sets tooltip for default', () => {
      const payload = 'default';
      expect(setTooltipText(payload)).toEqual('');
    });
  });
});
