import React from 'react';
import { shallow } from 'enzyme';

import Checkbox from 'dw/__mocks__/@material-ui/Checkbox';

import SearchableList from '../index';
import ConfirmActionComponent from '../../ConfirmActionComponent';

describe('SearchableList', () => {
  let initialProps = null;

  const clickOnSelectAllCheckbox = wrapper =>
    wrapper.find(Checkbox).first().simulate('click');

  beforeEach(() => {
    initialProps = {
      onSearch: jest.fn(),
      items: [],
      toRenderFunc: item => (
        <div key={item.name}>
          The elven king {item.name} owned the sword called {item.swordName}.
        </div>
      ),
      showMore: false,
      onShowMore: jest.fn(),
    };
  });

  it('renders `SkeletonProgress` when no items are available', () => {
    const wrapper = shallow(<SearchableList {...initialProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a list of items when items are sent as a new prop', () => {
    const props = {
      ...initialProps,
    };
    const wrapper = shallow(<SearchableList {...props} />);
    wrapper.setProps({
      items: [
        { name: 'Fingolfin', swordName: 'Ringil' },
        { name: 'Turgon', swordName: 'Glamdring' },
      ],
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('renders when items are provided', () => {
    const props = {
      ...initialProps,
      items: [
        { name: 'Fingolfin', swordName: 'Ringil' },
        { name: 'Turgon', swordName: 'Glamdring' },
      ],
    };

    const wrapper = shallow(<SearchableList {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with the showMore button', () => {
    const props = {
      ...initialProps,
      items: [
        { name: 'Fingolfin', swordName: 'Ringil' },
        { name: 'Turgon', swordName: 'Glamdring' },
      ],
      showMore: true,
    };

    const wrapper = shallow(<SearchableList {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('when click on show more button onShowMore function is triggered', () => {
    const props = {
      ...initialProps,
      items: [{ name: 'Fingolfin', swordName: 'Ringil' }],
      showMore: true,
    };

    const wrapper = shallow(<SearchableList {...props} />);
    wrapper.find('NextPageButton').props().onClick();
    expect(props.onShowMore).toHaveBeenCalled();
  });

  it('when click on show more button it gets loading state until new data retrieved', () => {
    const props = {
      ...initialProps,
      items: [{ name: 'Fingolfin', swordName: 'Ringil' }],
      showMore: true,
    };

    const wrapper = shallow(<SearchableList {...props} />);
    wrapper.find('NextPageButton').props().onClick();
    wrapper.update();
    expect(wrapper.find('NextPageButton').props().isLoading).toBe(true);
    wrapper.setProps({
      items: [
        { name: 'Fingolfin', swordName: 'Ringil' },
        { name: 'Turgon', swordName: 'Glamdring' },
      ],
    });
    expect(wrapper.find('NextPageButton').props().isLoading).toBe(false);
  });

  it('when Search is done the list shows loading state until new data retrieved', () => {
    const props = {
      ...initialProps,
      items: [{ name: 'Fingolfin', swordName: 'Ringil' }],
    };

    const wrapper = shallow(<SearchableList {...props} />);
    wrapper.find('SearchComponent').props().onSearch('Book');
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({
      items: [],
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders checkboxes and action button related to an action', () => {
    const props = {
      ...initialProps,
      items: [
        { name: 'Fingolfin', swordName: 'Ringil' },
        { name: 'Turgon', swordName: 'Glamdring' },
      ],
      toRenderFunc: (item, checkbox) => (
        <div key={item.name}>
          {checkbox(item)}
          The elven king {item.name} owned the sword called {item.swordName}.
        </div>
      ),
      getItemKey: item => item.name,
      showMore: false,
      actions: [
        {
          label: 'Read',
          handler: jest.fn(),
          confirm: {
            title: 'Silmarillion is the best book ever.',
            confirmMsg: 'You are gonna read the best book ever.',
            mainButtonLabel: 'Read',
            destructive: false,
          },
        },
      ],
    };

    const wrapper = shallow(<SearchableList {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('marks all checkboxes as selected and enables actions when select all checkbox is selected', () => {
    const props = {
      ...initialProps,
      items: [
        { name: 'Fingolfin', swordName: 'Ringil' },
        { name: 'Turgon', swordName: 'Glamdring' },
      ],
      toRenderFunc: (item, checkbox) => (
        <div key={item.name}>
          {checkbox(item)}
          The elven king {item.name} owned the sword called {item.swordName}.
        </div>
      ),
      getItemKey: item => item.name,
      showMore: false,
      actions: [
        {
          label: 'Read',
          handler: jest.fn(),
        },
      ],
    };

    const wrapper = shallow(<SearchableList {...props} />);
    clickOnSelectAllCheckbox(wrapper);

    expect(wrapper).toMatchSnapshot();
  });

  it('enables actions when some checkbox are selected', () => {
    const props = {
      ...initialProps,
      items: [
        { name: 'Fingolfin', swordName: 'Ringil' },
        { name: 'Turgon', swordName: 'Glamdring' },
      ],
      toRenderFunc: (item, checkbox) => (
        <div key={item.name}>
          {checkbox(item)}
          The elven king {item.name} owned the sword called {item.swordName}.
        </div>
      ),
      getItemKey: item => item.name,
      showMore: false,
      actions: [
        {
          label: 'Read',
          handler: jest.fn(),
          confirm: {
            title: 'Silmarillion is the best book ever.',
            confirmMsg: 'You are gonna read the best book ever.',
            mainButtonLabel: 'Read',
            destructive: true,
          },
        },
      ],
    };

    const wrapper = shallow(<SearchableList {...props} />);
    wrapper.find(Checkbox).last().simulate('check');
    expect(wrapper).toMatchSnapshot();
  });

  it('renders filtered items when selection function is provided', () => {
    const props = {
      ...initialProps,
      items: [
        { name: 'Fingolfin', swordName: 'Ringil' },
        { name: 'Turgon', swordName: 'Glamdring' },
      ],
      toRenderFunc: (item, checkbox) => (
        <div key={item.name}>
          {checkbox && checkbox(item)}
          The elven king {item.name} owned the sword called {item.swordName}.
        </div>
      ),
      getItemKey: item => item.name,
      showMore: false,
      actions: [
        {
          label: 'Read',
          handler: jest.fn(),
          confirm: {
            title: 'Silmarillion is the best book ever.',
            confirmMsg: 'You are gonna read the best book ever.',
            mainButtonLabel: 'Read',
            destructive: true,
          },
        },
      ],
      applySelectConditionFunc: item => item.name !== 'Turgon',
    };

    const wrapper = shallow(<SearchableList {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('unchecks all checkboxes when an action is performed and the flag cleanAfterExecute=true', () => {
    const props = {
      ...initialProps,
      items: [
        { name: 'Fingolfin', swordName: 'Ringil' },
        { name: 'Turgon', swordName: 'Glamdring' },
      ],
      toRenderFunc: (item, checkbox) => (
        <div key={item.name}>
          {checkbox && checkbox(item)}
          The elven king {item.name} owned the sword called {item.swordName}.
        </div>
      ),
      getItemKey: item => item.name,
      showMore: false,
      actions: [
        {
          label: 'Read',
          handler: jest.fn(),
          cleanAfterExecute: true,
          confirm: {
            title: 'Silmarillion is the best book ever.',
            confirmMsg: 'You are gonna read the best book ever.',
            mainButtonLabel: 'Read',
            destructive: true,
          },
        },
      ],
    };

    const wrapper = shallow(<SearchableList {...props} />);
    clickOnSelectAllCheckbox(wrapper);

    const onClick = wrapper.find(ConfirmActionComponent).prop('onClick');
    onClick();
    wrapper.update();

    wrapper.find(Checkbox).forEach(node => {
      expect(node.prop('checked')).toBeFalsy();
    });
  });

  it('keeps checkbox checked when an action is performed and the flag cleanAfterExecute=false', () => {
    const props = {
      ...initialProps,
      items: [
        { name: 'Fingolfin', swordName: 'Ringil' },
        { name: 'Turgon', swordName: 'Glamdring' },
      ],
      toRenderFunc: (item, checkbox) => (
        <div key={item.name}>
          {checkbox && checkbox(item)}
          The elven king {item.name} owned the sword called {item.swordName}.
        </div>
      ),
      getItemKey: item => item.name,
      showMore: false,
      actions: [
        {
          label: 'Read',
          handler: jest.fn(),
          cleanAfterExecute: false,
          confirm: {
            title: 'Silmarillion is the best book ever.',
            confirmMsg: 'You are gonna read the best book ever.',
            mainButtonLabel: 'Read',
            destructive: true,
          },
        },
      ],
    };

    const wrapper = shallow(<SearchableList {...props} />);
    clickOnSelectAllCheckbox(wrapper);

    const onClick = wrapper.find(ConfirmActionComponent).prop('onClick');
    onClick();
    wrapper.update();

    wrapper.find(Checkbox).forEach(node => {
      expect(node.prop('checked')).toBeTruthy();
    });
  });

  it('does not render SearchComponent if searchEnabled set to false', () => {
    const props = {
      ...initialProps,
      searchEnabled: false,
    };

    const wrapper = shallow(<SearchableList {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
