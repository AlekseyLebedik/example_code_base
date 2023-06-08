/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/valid-expect-in-promise */
import { makeCancelable } from '../promise';

describe('helpers/promise', () => {
  it('validates makeCancelable', () => {
    const p = new Promise(resolve => {
      resolve('blah');
    });
    const cancelablePromise = makeCancelable(p);
    cancelablePromise.promise.then(result => expect(result).toEqual('blah'));
  });

  it('validates makeCancelable reject', () => {
    const p = new Promise(() => {
      throw new Error('error');
    });
    const cancelablePromise = makeCancelable(p);
    cancelablePromise.promise.catch(error =>
      expect(error.message).toBe('error')
    );
  });

  it('validates makeCancelable cancel', () => {
    const p = new Promise(resolve => {
      resolve();
    });
    const cancelablePromise = makeCancelable(p);
    cancelablePromise.cancel();

    cancelablePromise.promise.catch(val =>
      expect(val).toEqual({ isCanceled: true })
    );
  });

  it('validates makeCancelable reject cancel', () => {
    const p = new Promise(() => {
      throw new Error('error');
    });
    const cancelablePromise = makeCancelable(p);
    cancelablePromise.cancel();

    cancelablePromise.promise.catch(val =>
      expect(val).toEqual({ isCanceled: true })
    );
  });
});
