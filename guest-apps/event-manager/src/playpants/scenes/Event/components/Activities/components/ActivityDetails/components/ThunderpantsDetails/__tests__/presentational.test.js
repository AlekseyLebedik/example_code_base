import React from 'react';
import { shallow } from 'enzyme';
import { thunderpantsProps as props } from 'playpants/testUtils/eventProps';

import BuildTable from '../components/Tables/BuildTable';
import ActivityTitle from '../../ActivityTitle';
import ThunderpantsStateless from '../presentational';

describe('ThunderpantsDetailsStateless', () => {
  const root = shallow(<ThunderpantsStateless {...props} />);
  it('renders the container component correctly', () => {
    expect(root).toMatchSnapshot();
  });

  it('renders BuildTable as default view', () => {
    expect(root.find(BuildTable).length).toBe(1);
  });

  it('renders the ActivityTitle', () => {
    expect(root.find(ActivityTitle).length).toBe(1);
  });
});
