import React from 'react';
import { shallow } from 'enzyme';

import { checkPlayerPresence, Presence } from '../index';

it('Renders loading', () => {
  const rendered = shallow(<Presence loading />);
  expect(rendered).toMatchSnapshot();
});

it('Renders errors', () => {
  const error = [{ message: 'test' }, { message: 'test' }, { message: 'test' }];
  const rendered = shallow(<Presence loading={false} error={error} />);
  expect(rendered).toMatchSnapshot();
});

it('Renders when present', () => {
  const data = [
    {
      titles: [{ presence: { online: true } }],
    },
  ];
  const rendered = shallow(<Presence loading={false} data={data} />);
  expect(rendered).toMatchSnapshot();
});

it('Renders when not present', () => {
  const data = [
    {
      titles: [{ presence: { online: false } }],
    },
  ];
  const rendered = shallow(<Presence loading={false} data={data} />);
  expect(rendered).toMatchSnapshot();
});

it('checkPlayerPresence no data', () => {
  expect(checkPlayerPresence()).toBe(false);
});

it('checkPlayerPresence with data true', () => {
  const data = [
    {
      titles: [{ presence: { online: true } }],
    },
  ];
  expect(checkPlayerPresence(data)).toBe(true);
});

it('checkPlayerPresence with data false', () => {
  const data = [
    {
      titles: [{ presence: { online: false } }],
    },
  ];
  expect(checkPlayerPresence(data)).toBe(false);
});
