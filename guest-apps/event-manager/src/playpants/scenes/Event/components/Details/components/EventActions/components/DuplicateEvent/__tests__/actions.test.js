import * as actions from '../actions';
import * as AT from '../actionTypes';

describe('DuplicateEvent actions:', () => {
  it('handles AT.DUPLICATE_EVENT', () => {
    const baseUrl = `/event-manager/1/dev`;
    const sourceEvent = '1';
    const mods = {
      name: 'Mock Data',
    };
    const history = { push: jest.fn() };
    const formName = 'form';
    const expected = {
      type: AT.DUPLICATE_EVENT,
      baseUrl,
      sourceEvent,
      mods,
      history,
      formName,
    };

    const received = actions.duplicateEvent(
      baseUrl,
      sourceEvent,
      mods,
      history,
      formName
    );
    expect(received).toMatchObject(expected);
    expect(received).toMatchSnapshot();
  });
});
