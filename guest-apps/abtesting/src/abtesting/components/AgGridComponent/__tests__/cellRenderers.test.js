import {
  testNameRenderer,
  statusTableFieldRenderer,
  actionsRenderer,
} from '../cellRenderers';

describe('cell renderer', () => {
  const params = {
    data: {
      titleID: 5816,
      environment: 'dev',
      name: 'foo',
      id: 45,
    },
    value: '123',
    node: { group: 'foo' },
    context: { events: 'foo' },
  };
  describe('testNameRenderer', () => {
    let result = null;
    beforeEach(() => {
      result = testNameRenderer(params);
    });
    it('testNameRenderer result should contain link', () => {
      expect(result.type.displayName).toEqual('Link');
      expect(result.props.to).toEqual(
        `/abtesting/view/${params.data.titleID}/${params.data.environment}/${params.data.id}`
      );
    });
    it('testNameRenderer result should match snapshot', () => {
      expect(result).toMatchSnapshot();
    });
  });
  describe('statusTableFieldRenderer', () => {
    let result = null;
    beforeEach(() => {
      result = statusTableFieldRenderer(params);
    });
    it('statusTableFieldRenderer result should contain status', () => {
      expect(result.props).toEqual({ status: params.value });
    });
    it('statusTableFieldRenderer result should match snapshot', () => {
      expect(result).toMatchSnapshot();
    });
  });
  describe('actionsRenderer', () => {
    describe('with group', () => {
      it('actionsRenderer result should match snapshot', () => {
        expect(actionsRenderer(params)).toMatchSnapshot();
      });
    });
    describe('without group', () => {
      it('actionsRenderer result should match snapshot', () => {
        params.node = {};
        expect(actionsRenderer(params)).toMatchSnapshot();
      });
      it('actionsRenderer result should contain actionPanel', () => {
        expect(actionsRenderer(params).type.displayName).toEqual(
          'withRouter(ActionsPanel)'
        );
      });
    });
  });
});
