import React from 'react';
import { shallow } from 'enzyme';

import { statelessPubvarsProps as props } from 'playpants/testUtils/eventProps';

import CustomTitleComponent from '../index';

describe('CustomTitleComponent', () => {
  const root = shallow(<CustomTitleComponent {...props} />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders CustomTitleComponent correctly', () => {
    expect(root).toMatchSnapshot();
  });

  it('renders CustomTitleComponent correctly when hideChangedVarSets is false', () => {
    root.setProps({
      hideChangedVarSets: false,
    });
    expect(root).toMatchSnapshot();
  });

  it('renders CustomTitleComponent correctly when createNamespace is true and hideChangedVarSets is false', () => {
    root.setProps({
      createNamespace: true,
      hideChangedVarSets: false,
    });
    expect(root).toMatchSnapshot();
  });

  it('renders CustomTitleComponent correctly when createNamespace is true and hideChangedVarSets is true', () => {
    root.setProps({
      createNamespace: true,
      hideChangedVarSets: true,
    });
    expect(root).toMatchSnapshot();
  });
});
