import React from 'react';
import { shallow } from 'enzyme';

import { AgGridReact } from 'ag-grid-react';
import { thunderpantsBuildTableProps as props } from 'playpants/testUtils/eventProps';
import { BuildTableBase } from '../index';

describe('BuildTable', () => {
  const root = shallow(<BuildTableBase {...props} />);
  it('renders default', () => {
    expect(root).toMatchSnapshot();
  });
  it('renders Ag-Grid table', () => {
    expect(root.find(AgGridReact).length).toBe(1);
  });
});
