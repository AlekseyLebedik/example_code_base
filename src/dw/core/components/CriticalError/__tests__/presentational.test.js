import React from 'react';
import { shallow } from 'enzyme';

import Button from 'dw/__mocks__/@material-ui/Button';

import CriticalErrorStateless from '../presentational';

// Mock `getMailto` for predictive test results
jest.mock('dw/core/helpers/email');

describe.skip('CriticalErrorStateless', () => {
  it('renders nothing when isVisible is false', () => {
    expect(
      shallow(<CriticalErrorStateless isVisible={false} />)
    ).toMatchSnapshot();
  });

  it('renders the error when isVisible is true', () => {
    expect(
      shallow(<CriticalErrorStateless isVisible />).dive()
    ).toMatchSnapshot();
  });

  it('renders actions buttons', () => {
    const props = {
      isVisible: true,
      handleGoBack: jest.fn(),
      retry: jest.fn(),
    };

    expect(
      shallow(<CriticalErrorStateless {...props} />).dive()
    ).toMatchSnapshot();
  });

  it('renders feature not supported page', () => {
    const props = {
      isVisible: true,
      handleGoBack: jest.fn(),
      error: { request: { status: 415 }, message: 'blah' },
    };

    expect(
      shallow(<CriticalErrorStateless {...props} />).dive()
    ).toMatchSnapshot();
  });

  it('calls callbacks on click', () => {
    const props = {
      isVisible: true,
      handleGoBack: jest.fn(),
      retry: jest.fn(),
    };
    const root = shallow(<CriticalErrorStateless {...props} />);

    root
      .dive()
      .find(Button)
      .findWhere(x => x && x.type() && x.html().includes('Back'))
      .simulate('click');
    expect(props.handleGoBack).toHaveBeenCalled();

    root
      .dive()
      .find(Button)
      .findWhere(x => x && x.type() && x.html().includes('Retry'))
      .simulate('click');
    expect(props.retry).toHaveBeenCalled();
  });
});
