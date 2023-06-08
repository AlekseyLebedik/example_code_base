import { shallow } from 'enzyme';

import Notification from '../index';

describe('Notifications', () => {
  it('renders success notification', () => {
    expect(shallow(Notification('success', 'blah blah'))).toMatchSnapshot();
  });

  it('renders info notification', () => {
    expect(shallow(Notification('info', 'blah blah'))).toMatchSnapshot();
  });

  it('renders error notification', () => {
    expect(shallow(Notification('error', 'blah blah'))).toMatchSnapshot();
  });
});
