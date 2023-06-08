import React from 'react';
import { shallow } from 'enzyme';

import TextField from 'dw/__mocks__/@material-ui/TextField';

import JSONTree from '../index';

describe('JSONTree', () => {
  it('renders empty object', () => {
    const data = {};
    expect(shallow(<JSONTree data={data} />)).toMatchSnapshot();
  });

  it('renders simple object', () => {
    const data = {
      is_enabled: true,
      feature_name: 'test_key',
      last_updated: 123441412,
    };
    expect(shallow(<JSONTree data={data} />)).toMatchSnapshot();
  });

  it('renders nested objects', () => {
    const data = {
      permissions: {
        user1: true,
        user2: false,
        group_1: true,
      },
    };
    expect(shallow(<JSONTree data={data} />)).toMatchSnapshot();
  });

  it('renders arrays', () => {
    const data = {
      features_enabled: [
        'feature1',
        { name: 'feature2', scope: 'group1' },
        121,
        true,
      ],
    };
    expect(shallow(<JSONTree data={data} />)).toMatchSnapshot();
  });

  it('renders complex object', () => {
    const data = {
      is_enabled: true,
      feature_name: 'feature1',
      last_updated: 13123123,
      permissions: [
        'staff',
        'group1',
        { key: 'group2', scope: 'read-only' },
        {
          key: 'user1',
          scope: ['read', 'append'],
          rules: {
            name: 'rule1',
            config: { not: { group_member: { key: 'group1' } } },
          },
        },
      ],
    };
    expect(shallow(<JSONTree data={data} />)).toMatchSnapshot();
  });

  it('parses json values and renders them as sub-tree', () => {
    const data = {
      json_value:
        '{"numeric_key":1,"array_key":["item1","item2","item3"],"object_key":{"key1":1}}',
    };
    expect(shallow(<JSONTree data={data} />)).toMatchSnapshot();
  });

  it('still render broken json as a plain string', () => {
    const data = {
      broken_json_value: '{"numeric_key":1,"array_key":["item1","item2":1}}',
    };
    expect(shallow(<JSONTree data={data} />)).toMatchSnapshot();
  });

  it('renders search', () => {
    const data = {
      dc_list: ['dc1', 'dc2', 'dc3'],
    };
    expect(shallow(<JSONTree data={data} searchable />)).toMatchSnapshot();
  });

  it('search filters tree items', () => {
    const data = {
      dc_list: ['dc1', 'dc2', 'dc3'],
    };
    const wrapper = shallow(<JSONTree data={data} searchable />);
    const search = wrapper.find(TextField);
    search.props().onChange({ target: { value: 'dc2' } });
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });
});
