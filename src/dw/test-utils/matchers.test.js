const singleAction = dispatch => {
  dispatch({
    type: 'ACTION_ONE',
  });
};

const multipleActions = dispatch => {
  dispatch({
    type: 'ACTION_ONE',
  });
  dispatch({
    type: 'ACTION_TWO',
  });
};

describe('.toAsyncDispatch', () => {
  it('should pass when the expected action is dispatched', () => {
    expect(singleAction).toAsyncDispatch({ type: 'ACTION_ONE' });
  });

  it('should pass when the expected action is dispatched - multiple arguments', () => {
    expect(multipleActions).toAsyncDispatch(
      { type: 'ACTION_ONE' },
      { type: 'ACTION_TWO' }
    );
  });

  it('should fail when there is no dispatch call for the given object', () => {
    expect(() => {
      expect(singleAction).toAsyncDispatch({ type: 'ACTION_FOUR' });
    }).toThrow();
  });

  it('should fail when there is no dispatch call for the given objects', () => {
    expect(() => {
      expect(singleAction).toAsyncDispatch(
        { type: 'ACTION_THREE' },
        { type: 'ACTION_FOUR' }
      );
    }).toThrow();
  });

  it('should fail when there is no dispatch call for one of the given objects', () => {
    expect(() => {
      expect(singleAction).toAsyncDispatch(
        { type: 'ACTION_ONE' },
        { type: 'ACTION_FOUR' }
      );
    }).toThrow();
  });

  it('should fail when there is no dispatch call for one of the given objects - inverse order', () => {
    expect(() => {
      expect(singleAction).toAsyncDispatch(
        { type: 'ACTION_FOUR' },
        { type: 'ACTION_ONE' }
      );
    }).toThrow();
  });
});

describe('.not.toAsyncDispatch', () => {
  it('should pass when the given value is not dispatched', () => {
    expect(singleAction).not.toAsyncDispatch({ type: 'ACTION_THREE' });
  });

  it('should pass when a all values are not dispatched', () => {
    expect(singleAction).not.toAsyncDispatch(
      { type: 'ACTION_THREE' },
      { type: 'ACTION_FOUR' }
    );
  });

  it('should pass when a all values are not dispatched - multiple actions', () => {
    expect(multipleActions).not.toAsyncDispatch(
      { type: 'ACTION_THREE' },
      { type: 'ACTION_FOUR' }
    );
  });

  it('should fail when a single values is dispatched', () => {
    expect(() => {
      expect(singleAction).not.toAsyncDispatch({ type: 'ACTION_ONE' });
    }).toThrow();
  });

  it('should fail when a single values is dispatched - multiple actions', () => {
    expect(() => {
      expect(multipleActions).not.toAsyncDispatch({ type: 'ACTION_ONE' });
    }).toThrow();
  });

  it('should fail when all values are dispatched', () => {
    expect(() => {
      expect(multipleActions).not.toAsyncDispatch(
        { type: 'ACTION_ONE' },
        { type: 'ACTION_TWO' }
      );
    }).toThrow();
  });

  it('should fail when any value is dispatched', () => {
    expect(() => {
      expect(multipleActions).not.toAsyncDispatch(
        { type: 'ACTION_THREE' },
        { type: 'ACTION_ONE' }
      );
    }).toThrow();
  });
});
