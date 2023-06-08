import { fork, race, take } from 'redux-saga/effects';
import delay from '@redux-saga/delay-p';

export default (ms, pattern, task, ...args) =>
  // eslint-disable-next-line func-names
  fork(function* () {
    while (true) {
      let action = yield take(pattern);

      while (true) {
        const { debounced, latestAction } = yield race({
          debounced: delay(ms),
          latestAction: take(pattern),
        });

        if (debounced) {
          yield fork(task, ...args, action);
          break;
        }

        action = latestAction;
      }
    }
  });
