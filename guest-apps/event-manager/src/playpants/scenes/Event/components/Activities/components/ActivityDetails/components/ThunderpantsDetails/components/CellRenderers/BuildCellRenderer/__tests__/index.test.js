import React from 'react';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import { AgGridReact } from 'ag-grid-react';

import { thunderpantsBuildCellRendererProps as props } from 'playpants/testUtils/eventProps';
import { BuildCellRendererComponent } from '../index';

describe('BuildCellRenderer', () => {
  const root = shallow(<BuildCellRendererComponent {...props} />);
  it('renders default', () => {
    expect(root).toMatchSnapshot();
  });
  it('renders Add Deployment button', () => {
    expect(root.find(Button).length).toBe(1);
    expect(root.find(Button).props().children).toBe('Add Deployment');
  });
  it('renders AG-Grid table', () => {
    expect(root.find(AgGridReact).length).toBe(1);
  });
});
