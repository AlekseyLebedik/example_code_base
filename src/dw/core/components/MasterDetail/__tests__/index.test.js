import React from 'react';
import { shallow } from 'enzyme';

import { MasterDetailBase } from '../index';

describe('MasterDetail', () => {
  const renderMaster = jest.fn();
  const renderDetail = jest.fn();
  const renderEmpty = jest.fn();
  const props = {
    master: renderMaster,
    detail: renderDetail,
    empty: renderEmpty,
    baseUrl: '/1/dev/test-url/',
    history: {},
    match: {
      path: '/:titleId/:env/test',
      url: '/1/dev/test',
      params: {
        titleId: '1',
        env: 'dev',
      },
    },
  };
  it('renders default values', () => {
    expect(shallow(<MasterDetailBase {...props} />)).toMatchSnapshot();
  });

  it('renders renderDetail loading container', () => {
    const newProps = {
      ...props,
      loading: { loadingDetails: true },
    };

    const wrapper = shallow(<MasterDetailBase {...newProps} />);
    expect(wrapper.instance().renderDetail(newProps)).toMatchSnapshot();
  });

  it('renders renderDetail expanded', () => {
    const wrapper = shallow(<MasterDetailBase {...props} />);
    wrapper.instance().handleOnExpandDetail();

    expect(wrapper.instance().render()).toMatchSnapshot();
  });

  it('validates Expander click', () => {
    const wrapper = shallow(<MasterDetailBase {...props} />);
    wrapper.find('Expander').first().simulate('click');
    expect(wrapper.state('detailExpanded')).toBe(true);

    wrapper.find('Expander').last().simulate('click');
    expect(wrapper.state('viewDetailsMode')).toBe(false);
  });

  it('validates isDetailsLoading', () => {
    const newProps = {
      ...props,
      loading: { loadingDetails: true },
    };
    const wrapper = shallow(<MasterDetailBase {...newProps} />);
    expect(wrapper.instance().isDetailsLoading()).toBe(true);
  });

  it('validates replaceUrlId', () => {
    const wrapper = shallow(<MasterDetailBase {...props} />);
    expect(
      wrapper
        .instance()
        .replaceUrlId(
          '/online-configuration/1/dev/achievements/rulesets/ruleset',
          'ruleset',
          ''
        )
    ).toBe('/online-configuration/1/dev/achievements/rulesets/');
  });

  it('validates renderMaster', () => {
    const wrapper = shallow(<MasterDetailBase {...props} />);
    wrapper.instance().renderMaster(props);
    expect(renderMaster).toBeCalled();

    const match = {
      path: '/1/dev/test/:id',
      url: '/1/dev/test/6',
      params: {
        id: '6',
      },
    };
    wrapper.instance().renderMaster({ match });
    expect(renderMaster).toBeCalled();
  });

  it('validates renderDetail', () => {
    const wrapper = shallow(<MasterDetailBase {...props} />);
    const match = {
      path: '/1/dev/test/:id',
      url: '/1/dev/test/6',
      params: {
        id: '6',
      },
    };
    wrapper.instance().renderDetail({ match });
    expect(renderDetail).toBeCalled();
  });

  it('validates renderDetail empty', () => {
    const wrapper = shallow(<MasterDetailBase {...props} />);
    wrapper.instance().renderDetail(props);
    expect(renderEmpty).toBeCalled();
  });

  it('validates handleOnSelectItem with undefined baseUrl', () => {
    const historyReplace = jest.fn();
    const newProps = {
      ...props,
      history: {
        replace: historyReplace,
        location: {
          search: '',
        },
      },
    };
    const wrapper = shallow(<MasterDetailBase {...newProps} />);
    wrapper.instance().handleOnSelectItem(42, undefined);

    expect(historyReplace).toBeCalledWith('/1/dev/test/42');
    expect(wrapper.state('viewDetailsMode')).toBe(true);
  });

  it('validates handleOnSelectItem', () => {
    const historyReplace = jest.fn();
    const newProps = {
      ...props,
      history: {
        replace: historyReplace,
        location: {
          search: '',
        },
      },
    };
    const wrapper = shallow(<MasterDetailBase {...newProps} />);
    wrapper.instance().handleOnSelectItem(42, '/blah');

    expect(historyReplace).toBeCalledWith('/blah/42');
    expect(wrapper.state('viewDetailsMode')).toBe(true);
  });
});
