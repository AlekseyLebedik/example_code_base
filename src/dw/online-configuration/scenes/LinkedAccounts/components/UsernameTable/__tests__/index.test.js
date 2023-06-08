import React from 'react';

import { shallow } from 'enzyme';

import UsernameTableButton from '../index';

describe('UsernameTable', () => {
  const loadOptions = { q: '*', onSearch: jest.fn() };
  const providers = [{ label: 'UNO', value: 'uno' }];

  it('render component', () => {
    const wrapper = shallow(
      <UsernameTableButton providers={providers} loadOptions={loadOptions} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('render Username Table modal', () => {
    React.useState = jest.fn().mockReturnValue([true, {}]);
    const wrapper = shallow(
      <UsernameTableButton providers={providers} loadOptions={loadOptions} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
