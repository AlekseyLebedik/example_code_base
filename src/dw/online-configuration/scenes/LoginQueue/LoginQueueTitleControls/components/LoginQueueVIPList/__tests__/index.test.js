import React from 'react';
import { shallow } from 'enzyme';
import LoginQueueVIPList from '../index';

const vipList = [
  { firstPartyGamertag: 'devzone-test-aaaa' },
  { firstPartyGamertag: 'devzone-test-bbbb' },
  { firstPartyGamertag: 'devzone-test-cccc' },
];

const mockDispatch = jest.fn();
const mockSelector = jest.fn();
jest.mock('react-redux', () => ({
  connect: () => Component => Component,
  useDispatch: () => mockDispatch,
  useSelector: () => mockSelector,
}));

describe('LoginQueueVIPList', () => {
  it('displays VIP loading', () => {
    const list = shallow(
      <LoginQueueVIPList
        vipList={[]}
        loading
        selectedQueue={0}
        editLoginQueueVIPList={() => {}}
        fetchLoginQueueVIPList={() => {}}
        updating={false}
      />
    );
    expect(list).toMatchSnapshot();
  });
  it('displays VIPs', () => {
    const list = shallow(
      <LoginQueueVIPList
        vipList={vipList}
        loading={false}
        selectedQueue={0}
        editLoginQueueVIPList={() => {}}
        fetchLoginQueueVIPList={() => {}}
        updating={false}
      />
    );
    expect(list).toMatchSnapshot();
  });
  it('displays skeleton on loading for VIPs', () => {
    const list = shallow(
      <LoginQueueVIPList
        vipList={vipList}
        loading
        selectedQueue={0}
        editLoginQueueVIPList={() => {}}
        fetchLoginQueueVIPList={() => {}}
        updating={false}
      />
    );
    expect(list).toMatchSnapshot();
  });
  it('displays skeleton on updating', () => {
    const list = shallow(
      <LoginQueueVIPList
        vipList={vipList}
        loading={false}
        selectedQueue={0}
        editLoginQueueVIPList={() => {}}
        fetchLoginQueueVIPList={() => {}}
        updating
      />
    );
    expect(list).toMatchSnapshot();
  });
});
