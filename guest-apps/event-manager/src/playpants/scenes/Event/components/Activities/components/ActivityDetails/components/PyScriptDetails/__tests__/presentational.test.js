import React from 'react';
import { shallow } from 'enzyme';

import { pyscriptProps as props } from 'playpants/testUtils/eventProps';
import SchemaForm from 'playpants/components/SchemaForm';
import MainDetailsEmpty from 'playpants/components/MainDetailsEmpty';
import ActivityTitle from '../../ActivityTitle';
import StatelessPyScriptDetails from '../presentational';

describe('StatelessPyScriptDetails', () => {
  const root = shallow(<StatelessPyScriptDetails {...props} store={null} />);
  it('renders the container component correctly', () => {
    expect(root).toMatchSnapshot();
  });
  it('renders no title overlay only if needed', () => {
    expect(root.find(MainDetailsEmpty)).toHaveLength(0);
    root.setProps({ noTitleSelected: true });
    expect(root.find(MainDetailsEmpty)).toHaveLength(1);
    root.setProps({ noTitleSelected: false });
  });
  it('should always render ActivityTitle', () => {
    expect(root.find(ActivityTitle)).toMatchSnapshot();
  });
  it('should always render SchemaForm', () => {
    expect(root.find(SchemaForm)).toMatchSnapshot();
  });
});
