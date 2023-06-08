import React from 'react';
import { shallow } from 'enzyme';

import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';

import ViewConfig from '../index';

describe('ABTesting component ViewConfig', () => {
  const render = (newProps = {}) => {
    const props = {
      config: {
        updated: '1542027298',
        modifiers: '{"second_campaign_value": 2}',
        name: 'cfg1',
        created: '1542027282',
        serviceID: 't8',
        context: 'game2',
        configID: '15716207803415653925',
        immutable: true,
      },
      configName: 'cfg1',
      ...newProps,
    };
    const wrapper = shallow(<ViewConfig {...props} />);

    return { props, wrapper };
  };

  it('renders structure', () => {
    const { wrapper } = render();
    expect(wrapper.find('div').text()).toBe('cfg1');
    expect(wrapper.find(Dialog)).toHaveLength(0);
  });

  it('modal dialog is opened after clicking on config field', () => {
    const { wrapper } = render();
    wrapper.find('div').simulate('click');
    expect(wrapper.find(Dialog).props().open).toBe(true);
  });

  it('open handler', () => {
    const { wrapper } = render();
    const instance = wrapper.instance();

    instance.handleOpen();
    const { open } = wrapper.state();
    expect(open).toBe(true);
  });

  it('close handler', () => {
    const { wrapper } = render();
    const instance = wrapper.instance();

    instance.handleClose();
    const { open } = wrapper.state();
    expect(open).toBe(false);
  });

  it('no dialog if config is undefined', () => {
    const { wrapper } = render({ config: undefined });
    expect(wrapper.find(Dialog)).toHaveLength(0);
  });

  it('renders config Name and Target', () => {
    const { wrapper } = render();
    wrapper.find('div').simulate('click');
    expect(
      wrapper.find(Dialog).find(Typography).at(0).children().at(2).text()
    ).toBe('cfg1');
    expect(
      wrapper.find(Dialog).find(Typography).at(1).children().at(2).text()
    ).toBe('t8');
  });

  it('renders config modifiers as Monaco component', () => {
    const { wrapper } = render();
    wrapper.find('div').simulate('click');
    expect(wrapper.find(Dialog).find('Monaco').props().value).toBe(
      '{"second_campaign_value": 2}'
    );
  });
});
