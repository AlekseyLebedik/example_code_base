import React from 'react';
import { shallow } from 'enzyme';
import LoginQueueSettings from '../index';

const titleStatus = {
  online_users: 47,
  online_users_sample_timestamp: 1621864861.626116,
  queues: [
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
  ],
  target_online_users: 300000,
  target_rate_limit: 0,
  title_id: 5830,
};

describe('LoginQueueSettings', () => {
  it('selects second queue', () => {
    const queue1 = shallow(
      <LoginQueueSettings
        titleStatus={titleStatus}
        selectedQueue={1}
        setSelectedQueue={() => null}
        loading={false}
        currentTitleId={5830}
        editLoginQueueSettings={() => null}
        editLoginQueueTitleSettings={() => null}
      />
    );
    expect(queue1).toMatchSnapshot();
  });
  it('selects first queue', () => {
    const queue0 = shallow(
      <LoginQueueSettings
        titleStatus={titleStatus}
        selectedQueue={0}
        setSelectedQueue={() => null}
        loading={false}
        currentTitleId={5830}
        editLoginQueueSettings={() => null}
        editLoginQueueTitleSettings={() => null}
      />
    );
    expect(queue0).toMatchSnapshot();
  });
});
