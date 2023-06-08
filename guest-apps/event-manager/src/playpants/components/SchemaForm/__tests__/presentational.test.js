import React from 'react';
import { shallow } from 'enzyme';

import { AgGridReact } from 'ag-grid-react';

import SchemaFormStateless from '../presentational';

describe('SchemaFormStateless', () => {
  const props = {
    gridOptions: {},
    onVersionUpdate: jest.fn(),
    needsUpdate: false,
  };

  const root = shallow(<SchemaFormStateless {...props} />);

  it('renders the component correctly', () => {
    expect(root).toMatchSnapshot();
  });

  it('always renders AG-Grid', () => {
    expect(root.find(AgGridReact)).toMatchSnapshot();
  });

  it('renders the component correctly if needs update', () => {
    props.needsUpdate = true;
    const disabledRoot = shallow(<SchemaFormStateless {...props} />);
    expect(disabledRoot).toMatchSnapshot();
  });
});
