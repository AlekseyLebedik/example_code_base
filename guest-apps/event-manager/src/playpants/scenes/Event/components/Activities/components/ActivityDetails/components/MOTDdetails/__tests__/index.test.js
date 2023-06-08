import React from 'react';
import { shallow } from 'enzyme';

import { motdProps as props } from 'playpants/testUtils/eventProps';

import GridList from '@material-ui/core/GridList';
import ActivityTitle from '../../ActivityTitle';

import MOTD from '../index';

describe('MOTD', () => {
  const root = shallow(<MOTD {...props} />);
  it('renders MOTD correctly', () => {
    expect(root).toMatchSnapshot();
  });

  it('should always render ActivityTitle', () => {
    expect(root.find(ActivityTitle)).toMatchSnapshot();
  });

  it('should render the correct amount of language cards', () => {
    expect(root.find(GridList).children().length).toBe(
      props.selectedActivity.activity.languages.length
    );
  });
});
