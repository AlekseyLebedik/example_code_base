import React from 'react';
import { shallow } from 'enzyme';
import BulkDeleteVIPsButton from '../index';

describe('BulkDeleteVIPsButton', () => {
  it('display bulk delete button', () => {
    const dialog = shallow(<BulkDeleteVIPsButton onClick={() => {}} />);
    expect(dialog).toMatchSnapshot();
  });
});
