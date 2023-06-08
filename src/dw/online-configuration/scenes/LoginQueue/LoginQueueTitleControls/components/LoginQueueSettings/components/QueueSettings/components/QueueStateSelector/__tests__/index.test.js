import React from 'react';
import { shallow } from 'enzyme';
import QueueStateSelector from '../index';

describe('LoginQueueSettings - Queue', () => {
  it('display queue state selector open', () => {
    const queueStateSelector = shallow(
      <QueueStateSelector
        queueState
        setQueueState={() => null}
        canEditQueueState={false}
      />
    );
    expect(queueStateSelector).toMatchSnapshot();
  });
  it('display queue state selector closed', () => {
    const queueStateSelector = shallow(
      <QueueStateSelector
        queueState={false}
        setQueueState={() => null}
        canEditQueueState={false}
      />
    );
    expect(queueStateSelector).toMatchSnapshot();
  });
});
