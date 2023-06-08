import React from 'react';
import { shallow } from 'enzyme';

import ResizablePanels from '../index';

describe('ResizablePanels', () => {
  const props = {
    sizes: [
      {
        size: 200,
        min: 100,
        max: 300,
      },
      {
        size: 200,
        min: 100,
        max: 300,
      },
      {
        size: 0,
        min: 0,
        max: 0,
      },
    ],
  };

  it('renders default values', () => {
    expect(
      shallow(
        <ResizablePanels>
          <div>Div 1</div>
          <div>Div 2</div>
        </ResizablePanels>
      )
    ).toMatchSnapshot();
  });
  it('renders custom values', () => {
    expect(
      shallow(
        <ResizablePanels {...props}>
          <div>Div 1</div>
          <div>Div 2</div>
          <div>Div 3</div>
        </ResizablePanels>
      )
    ).toMatchSnapshot();
  });

  it('renders titles on minimised panels', () => {
    const newProps = {
      ...props,
      titles: ['title1', 'title2'],
    };
    const wrapper = shallow(
      <ResizablePanels {...newProps}>
        <div>Div 1</div>
        <div>Div 2</div>
        <div>Div 3</div>
      </ResizablePanels>
    );
    wrapper.instance().onTogglePanel(0);
    wrapper.instance().onTogglePanel(1);
    wrapper.update();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders with defined sizes in props', () => {
    const wrapper = shallow(
      <ResizablePanels {...props}>
        <div>Div 1</div>
        <div>Div 2</div>
        <div>Div 3</div>
      </ResizablePanels>
    );
    expect(wrapper.find('.mainContainer')).toBeDefined();
    expect(wrapper.find('.panel').length).toEqual(3);
    expect(wrapper.find('.panel').get(0).props.style.width).toEqual(
      props.sizes[0].size
    );
    expect(wrapper.find('.panel').get(1).props.style.width).toEqual(
      props.sizes[1].size
    );
  });

  const testSlider = (index, root, deltaShift) => {
    expect(root.find('.resizer')).toBeDefined();
    const dragElement = root.find('.resizer').at(index);
    expect(dragElement).toBeDefined();

    dragElement.simulate('mouseDown', { screenX: 0 });
    expect(root.state().isDragging).toBeTruthy();

    root.instance().resizePanel({ screenX: deltaShift });
    root.instance().stopResize();

    expect(root.state().isDragging).toBeFalsy();
    expect(root.state().initialPos).toEqual(deltaShift);
    expect(root.state().panels[index].size).toEqual(
      props.sizes[index].size + deltaShift
    );
  };

  describe('drag functionality', () => {
    it('first handler drag resizes the panel width', () => {
      const wrapper = shallow(
        <ResizablePanels {...props}>
          <div>Div 1</div>
          <div>Div 2</div>
          <div>Div 3</div>
        </ResizablePanels>
      );

      testSlider(0, wrapper, -10);
    });

    it('second handler drag resizes the panel width', () => {
      const wrapper = shallow(
        <ResizablePanels {...props}>
          <div>Div 1</div>
          <div>Div 2</div>
          <div>Div 3</div>
        </ResizablePanels>
      );

      testSlider(1, wrapper, -10);
    });

    it('drag towards the right', () => {
      const wrapper = shallow(
        <ResizablePanels {...props}>
          <div>Div 1</div>
          <div>Div 2</div>
          <div>Div 3</div>
        </ResizablePanels>
      );

      testSlider(0, wrapper, 10);
    });

    it('drag towards the right and reaches maxSize', () => {
      const root = shallow(
        <ResizablePanels {...props}>
          <div>Div 1</div>
          <div>Div 2</div>
          <div>Div 3</div>
        </ResizablePanels>
      );

      expect(root.find('.resizer')).toBeDefined();
      const dragElement = root.find('.resizer').at(0);
      expect(dragElement).toBeDefined();

      dragElement.simulate('mouseDown', { screenX: 0 });
      expect(root.state().isDragging).toBeTruthy();

      root.instance().resizePanel({ screenX: 101 });
      root.instance().stopResize();

      expect(root.state().isDragging).toBeFalsy();
      expect(root.state().panels[0].size).toEqual(props.sizes[0].max);
    });
  });

  describe('double click functionality', () => {
    it('collapse the panel in double click when its open', () => {
      const localProps = {
        ...props,
      };
      const wrapper = shallow(
        <ResizablePanels {...localProps}>
          <div>Div 1</div>
          <div>Div 2</div>
          <div>Div 3</div>
        </ResizablePanels>
      );

      expect(wrapper.find('.resizer')).toBeDefined();
      const dragElement = wrapper.find('.resizer').at(0);
      expect(dragElement).toBeDefined();

      wrapper.instance().onTogglePanel(0);
      expect(wrapper.state().panels[0].size).toEqual(0);
    });

    it('expand the pane in double click to size values when its closed', () => {
      const localProps = {
        ...props,
      };
      const wrapper = shallow(
        <ResizablePanels {...localProps}>
          <div>Div 1</div>
          <div>Div 2</div>
          <div>Div 3</div>
        </ResizablePanels>
      );

      expect(wrapper.find('.resizer')).toBeDefined();
      const dragElement = wrapper.find('.resizer').at(0);
      expect(dragElement).toBeDefined();
      testSlider(0, wrapper, -localProps.sizes[0].size);
      dragElement.simulate('doubleClick');
      expect(wrapper.state().panels[0].size).toEqual(localProps.sizes[0].size);
    });
  });
});
