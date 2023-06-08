expect.extend({
  toAsyncDispatch(received, ...expectations) {
    const dispatchMock = jest.fn();
    const dispatch = action =>
      typeof action === 'function'
        ? action(act => {
            dispatchMock(act);
            return act;
          }, received.getState)
        : dispatchMock(action);
    received(dispatch);
    return expectations
      .map(expected => {
        // Calls a matcher for earch expectation argument
        try {
          // eslint-disable-next-line jest/no-standalone-expect
          expect(dispatchMock).toHaveBeenCalledWith(
            expect.objectContaining(expected)
          );
          return {
            pass: true,
            message: () => `${received} dispatches ${JSON.stringify(expected)}`,
          };
        } catch (err) {
          const message = () =>
            err.matcherResult && err.matcherResult.message
              ? err.matcherResult.message()
              : err.toString();
          return { pass: false, message };
        }
      })
      .reduce(
        // reduces to a single result
        (acc, cur) => ({
          pass: this.isNot ? cur.pass || acc.pass : cur.pass && acc.pass,
          message: () => `${cur.message()}\n${acc.message()}`,
        }),
        { pass: !this.isNot, message: () => '' }
      );
  },
});
