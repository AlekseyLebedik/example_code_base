import React from 'react';
import { shallow } from 'enzyme';
import { statelessProjectSettingsProps as props } from 'playpants/testUtils/projectSettingsProps';

import Tabs from '@material-ui/core/Tabs';
import StatelessProjectSettings from '../presentational';

describe('StatelessProjectSettings', () => {
  const root = shallow(<StatelessProjectSettings {...props} />);

  it('renders correctly', () => {
    expect(root).toMatchSnapshot();
  });

  it('should always render a section title', () => {
    expect(root.find('SectionTitle')).toMatchSnapshot();
  });

  describe('Tabs', () => {
    const renderedTabs = root.find(Tabs);
    it('should always render', () => {
      expect(renderedTabs).toMatchSnapshot();
    });
  });

  describe('colors setting tab', () => {});
});
