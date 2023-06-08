import React from 'react';
import { shallow } from 'enzyme';

import { AgGridReact } from 'ag-grid-react';
import { thunderpantsBuildSummaryProps as props } from 'playpants/testUtils/eventProps';
import { BuildSummaryComponent } from '../index';

describe('BuildSummary', () => {
  const root = shallow(<BuildSummaryComponent {...props} />);
  it('renders default', () => {
    expect(root).toMatchSnapshot();
  });
  it('renders Ag-Grid table', () => {
    expect(root.find(AgGridReact).length).toBe(1);
  });
});
