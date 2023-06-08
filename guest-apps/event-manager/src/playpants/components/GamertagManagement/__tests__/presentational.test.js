import React from 'react';
import { shallow } from 'enzyme';
import MasterDetail from 'dw/core/components/MasterDetail';
import { statelessGroupsProps as props } from 'playpants/testUtils/projectSettingsProps';
import StatelessGroups from '../presentational';

describe('Groups', () => {
  const root = shallow(<StatelessGroups {...props} handleSearch={jest.fn()} />);

  it('renders default properly', () => {
    expect(root).toMatchSnapshot();
  });

  describe('Groups master detail', () => {
    const renderedMasterDetail = root.find(MasterDetail);
    it('should always render', () => {
      expect(renderedMasterDetail).toMatchSnapshot();
    });
  });
});
