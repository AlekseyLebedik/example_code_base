import React from 'react';
import { shallow } from 'enzyme';
import QueueSelector from '../index';

const queues = [
  {
    current_wait_time: 0,
    error_code: 30001,
    open: true,
    queue_id: 0,
    queue_length: 0,
    login_rate: 12,
  },
  {
    current_wait_time: 0,
    error_code: 8911,
    open: true,
    queue_id: 1,
    queue_length: 0,
    login_rate: 12,
  },
];

describe('LoginQueueSettings', () => {
  it('display queue selector', () => {
    const queueSelector = shallow(
      <QueueSelector
        queues={queues}
        selectedQueue={0}
        setSelectedQueue={() => null}
      />
    );
    expect(queueSelector).toMatchSnapshot();
  });
});
