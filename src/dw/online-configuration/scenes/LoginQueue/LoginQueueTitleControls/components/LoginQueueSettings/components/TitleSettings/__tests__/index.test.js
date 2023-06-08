import React from 'react';
import { shallow } from 'enzyme';
import TitleSettings from '../index';

const mockSelector = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: () => mockSelector,
}));

describe('LoginQueueTitleSettings', () => {
  it('display title setting', () => {
    const titlequeue = shallow(
      <TitleSettings
        targetOnlineUsers={300000}
        canEditMaxCCU={false}
        editLoginQueueTitleSettings={() => null}
        submitting={false}
        setSubmitting={() => null}
        currentTitleId={5817}
      />
    );
    expect(titlequeue).toMatchSnapshot();
  });
  it('display title setting on submitting', () => {
    const titlequeue = shallow(
      <TitleSettings
        targetOnlineUsers={300000}
        canEditMaxCCU={false}
        editLoginQueueTitleSettings={() => null}
        submitting
        setSubmitting={() => null}
        currentTitleId={5817}
      />
    );
    expect(titlequeue).toMatchSnapshot();
  });
});
