import React from 'react';
import { shallow } from 'enzyme';

import { statelessActivityTitleProps as props } from 'playpants/testUtils/eventProps';

import Select from 'dw/core/components/Select';
import TitleSelector from '../index';

describe('TitleSelector', () => {
  const wrapper = shallow(<TitleSelector {...props} />);
  it('renders Select correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onTitlesChange on change', () => {
    wrapper.find(Select).simulate('change', { target: 'test' });
    expect(props.onTitlesChange).toHaveBeenCalledTimes(1);
  });

  describe('isTitleSelectorDisabled', () => {
    it('returns false when multiple titles are allowed', () => {
      wrapper.setProps({
        allowMultiTitles: true,
      });
      const { disabled } = wrapper.find('SelectField').props();
      expect(disabled).toEqual(false);
    });

    it('returns false when no titles are selected', () => {
      wrapper.setProps({
        allowMultiTitles: false,
        selectedActivity: {
          activity: {
            variable_sets: [],
          },
          title_envs: [],
          type: 'pubvars',
        },
      });
      const { disabled } = wrapper.find('SelectField').props();
      expect(disabled).toEqual(false);
    });

    it("returns true when multiple titles aren't and pubvars activity has content", () => {
      wrapper.setProps({
        allowMultiTitles: false,
        selectedActivity: {
          activity: {
            variable_sets: [
              {
                context: '2',
                group_id: '1',
                is_major_update: false,
                major_version: 0,
                minor_version: 1,
                namespace: 'test',
                variables: { test: 'test' },
              },
            ],
          },
          title_envs: [1],
          type: 'pubvars',
        },
      });
      const { disabled } = wrapper.find('SelectField').props();
      expect(disabled).toEqual(true);
    });

    it("returns true when multiple titles aren't and other activity has content", () => {
      wrapper.setProps({
        allowMultiTitles: false,
        selectedActivity: {
          activity: {
            files: [1],
          },
          title_envs: [1],
          type: 'pubstorage',
        },
      });
      const { disabled } = wrapper.find('SelectField').props();
      expect(disabled).toEqual(true);
    });

    it("returns false when multiple titles aren't and pubvars activity has no content", () => {
      wrapper.setProps({
        allowMultiTitles: false,
        selectedActivity: {
          activity: {
            variable_sets: [],
          },
          title_envs: [1],
          type: 'pubvars',
        },
      });
      const { disabled } = wrapper.find('SelectField').props();
      expect(disabled).toEqual(false);
    });

    it("returns false when multiple titles aren't and other activity has no content", () => {
      wrapper.setProps({
        allowMultiTitles: false,
        selectedActivity: {
          activity: {
            files: [],
          },
          title_envs: [1],
          type: 'pubstorage',
        },
      });
      const { disabled } = wrapper.find('SelectField').props();
      expect(disabled).toEqual(false);
    });
  });
});
