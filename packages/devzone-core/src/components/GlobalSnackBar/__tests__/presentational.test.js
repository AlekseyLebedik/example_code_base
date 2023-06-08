import React from 'react';
import { shallow } from 'enzyme';

import GlobalSnackBarStateless from '../presentational';

describe('GlobalSnackBarStateless', () => {
  it('renders without crashing', () => {
    const props = {
      open: false,
      messages: ['Test message'],
    };
    expect(shallow(<GlobalSnackBarStateless {...props} />)).toMatchSnapshot();
  });

  it('accepts rendered JSX as message', () => {
    const props = {
      open: true,
      messages: [
        <div>
          <h1>Message Title</h1>
          <p>Message content</p>
        </div>,
      ],
      autoHideDuration: 13,
    };
    expect(shallow(<GlobalSnackBarStateless {...props} />)).toMatchSnapshot();
  });
});
