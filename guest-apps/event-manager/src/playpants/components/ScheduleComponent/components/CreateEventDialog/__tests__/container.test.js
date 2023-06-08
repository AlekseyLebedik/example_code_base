import React from 'react';
import { shallow } from 'enzyme';

import { createEventProps as props } from 'playpants/testUtils/scheduleProps';

import { CreateEventDialog } from '../container';

describe('CreateEvent', () => {
  let wrapper;
  let instance;

  beforeEach(() => {
    wrapper = shallow(<CreateEventDialog {...props} />);
    instance = wrapper.instance();
  });

  it('renders default values', () => {
    wrapper = shallow(<CreateEventDialog {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('clearTagEntry', () => {
    it('should clear tags and tagText', () => {
      wrapper.instance().clearTagEntry();
      expect(instance.state.tags).toEqual([]);
      expect(instance.state.tagText).toEqual('');
    });
  });

  describe('initializeTags', () => {
    it('should set tagText to given tag', () => {
      instance.initializeTags(['test', 'Call of Duty']);
      expect(instance.state.tags).toEqual(['test', 'Call of Duty']);
      expect(instance.state.tagText).toEqual('');
    });
  });

  describe('onChangeTag', () => {
    it('should set tagText to given tag', () => {
      instance.onChangeTag('test');
      expect(instance.state.tagText).toEqual('test');
    });
  });

  describe('addTag', () => {
    it("shouldn't add a tag to the eventTags array if given a blank string", () => {
      instance.addTag('');
      expect(instance.state.tags).toEqual([]);
      expect(instance.state.tags.length).toEqual(0);
    });

    it('should add a tag to the tags array', () => {
      instance.addTag('test');
      expect(instance.state.tags).toEqual(['test']);
      expect(instance.state.tags.length).toEqual(1);
    });
  });

  describe('deleteTag', () => {
    it('should delete a given tag from tags', () => {
      instance.setState({ tags: ['test'] });
      instance.deleteTag('test');
      expect(instance.state.tags).toEqual([]);
      expect(instance.state.tags.length).toEqual(0);
      expect(instance.state.tagText).toEqual('');
    });
  });

  describe('handleFormSubmit instance', () => {
    it('should call createEvent', () => {
      const values = {
        eventDates: { startDate: 1541191064 },
        eventNotes: '',
        eventName: 'Test',
      };

      instance.handleFormSubmit(values);
      expect(props.createEvent).toHaveBeenCalledTimes(1);
    });
  });
});
