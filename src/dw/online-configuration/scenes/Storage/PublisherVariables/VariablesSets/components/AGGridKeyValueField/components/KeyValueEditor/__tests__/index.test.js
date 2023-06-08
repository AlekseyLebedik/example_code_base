import React from 'react';

import { shallow } from 'enzyme';

import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';

import KeyValueEditor from '..';

const gridApi = {};
const onDataChanged = jest.fn();

describe('KeyValueEditor', () => {
  it('render add new key / value', () => {
    const wrapper = shallow(
      <KeyValueEditor gridApi={gridApi} onDataChanged={onDataChanged} />
    );
    expect(wrapper).toMatchSnapshot();
    wrapper.find(Fab).simulate('click');
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });
  it('render edit key / value', () => {
    const wrapper = shallow(
      <KeyValueEditor
        gridApi={gridApi}
        onDataChanged={onDataChanged}
        node={{ data: { key: 1, value: 1 } }}
      />
    );
    expect(wrapper).toMatchSnapshot();
    wrapper.find(IconButton).simulate('click');
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });
});
