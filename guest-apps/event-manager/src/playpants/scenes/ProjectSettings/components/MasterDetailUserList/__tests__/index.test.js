import React from 'react';
import { shallow } from 'enzyme';
import MasterDetail from 'dw/core/components/MasterDetail';
import { usersContainerProps as props } from 'playpants/testUtils/projectSettingsProps';
import { MasterDetailUserListBase } from '../index';

describe('MasterDetailUserListBase', () => {
  const root = shallow(<MasterDetailUserListBase {...props} />);

  it('renders default properly', () => {
    expect(root).toMatchSnapshot();
  });

  describe('User master detail', () => {
    const renderedMasterDetail = root.find(MasterDetail);
    it('should always render', () => {
      expect(renderedMasterDetail).toMatchSnapshot();
    });
  });
});
