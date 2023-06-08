import React from 'react';
import { shallow } from 'enzyme';
import QueueSettings from '../index';

const queues = [
  {
    current_wait_time: 0,
    error_code: 30001,
    open: true,
    queue_id: 0,
    login_rate: 12,
    queue_length: 0,
  },
  {
    current_wait_time: 0,
    error_code: 8911,
    open: true,
    queue_id: 1,
    login_rate: 0,
    queue_length: 0,
  },
];

const mockSelector = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: () => mockSelector,
}));

describe('LoginQueueSettings - Queue', () => {
  it('display login queue settings for Queue 0', () => {
    const queueSettings0 = shallow(
      <QueueSettings
        queues={queues}
        selectedQueue={0}
        canEditQueueState={false}
        canEditErrorCode={false}
        canEditLoginRate={false}
        editLoginQueueSettings={() => null}
        submitting={false}
        setSubmitting={() => null}
      />
    );
    expect(queueSettings0).toMatchSnapshot();
  });
  it('display login queue settings for Queue 1', () => {
    const queueSettings1 = shallow(
      <QueueSettings
        queues={queues}
        selectedQueue={1}
        canEditQueueState={false}
        canEditErrorCode={false}
        canEditLoginRate={false}
        editLoginQueueSettings={() => null}
        submitting={false}
        setSubmitting={() => null}
      />
    );
    expect(queueSettings1).toMatchSnapshot();
  });
  it('display login queue settings on submitting', () => {
    const queueSettings1 = shallow(
      <QueueSettings
        queues={queues}
        selectedQueue={1}
        canEditQueueState={false}
        canEditErrorCode={false}
        canEditLoginRate={false}
        editLoginQueueSettings={() => null}
        submitting
        setSubmitting={() => null}
      />
    );
    expect(queueSettings1).toMatchSnapshot();
  });
});
