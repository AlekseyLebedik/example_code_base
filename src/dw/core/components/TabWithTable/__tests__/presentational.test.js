import React from 'react';
import { shallow } from 'enzyme';

import TabWithTableStateles from '../presentational';

describe('TabWithTableStateles', () => {
  it('renders default values', () => {
    const props = {
      collection: [],
      columns: [],
      actionTypePrefix: 'BLAH',
    };
    expect(shallow(<TabWithTableStateles {...props} />)).toMatchSnapshot();
  });

  it('renders with custom placeholder', () => {
    const props = {
      collection: [
        {
          currencyID: 1,
          currencyCode: 'cod_points',
          paymentProviderCode: null,
          key: 0,
        },
      ],
      columns: [
        {
          title: 'Currency ID',
          dataIndex: 'currencyID',
          key: 'currencyID',
        },
        {
          title: 'Code',
          dataIndex: 'currencyCode',
          key: 'currencyCode',
        },
      ],
      actionTypePrefix: 'BLAH',
      nextPageToken: 'CAE',
      onShowMore: jest.fn(),
      withSearch: true,
    };
    expect(shallow(<TabWithTableStateles {...props} />)).toMatchSnapshot();
  });
});
