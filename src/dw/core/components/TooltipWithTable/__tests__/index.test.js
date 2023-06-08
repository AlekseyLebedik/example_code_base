import React from 'react';
import { shallow } from 'enzyme';

import TooltipWithTable from '../index';

describe('TooltipWithTable', () => {
  it('renders default values', () => {
    const props = {
      elements: [
        {
          userID: '33853876575912758',
        },
      ],
      columns: [
        {
          title: 'User ID',
          dataIndex: 'userID',
          key: 'userID',
        },
      ],
      label: 'blah',
    };
    expect(shallow(<TooltipWithTable {...props} />)).toMatchSnapshot();
  });
});
