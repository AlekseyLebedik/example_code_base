import React from 'react';
import { shallow } from 'enzyme';
import QueueClosedCode from '../index';

describe('LoginQueueSettings - Queue', () => {
  it('display queue closed code', () => {
    const queueClosedCode = shallow(
      <QueueClosedCode
        queueClosedCode={8911}
        setQueueClosedCode={() => null}
        canEditErrorCode={false}
      />
    );
    expect(queueClosedCode).toMatchSnapshot();
  });
});
