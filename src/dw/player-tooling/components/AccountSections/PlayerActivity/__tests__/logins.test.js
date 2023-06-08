import React from 'react';
import { shallow } from 'enzyme';
import { useSelector } from 'react-redux';

import { Logins } from '../index';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('Logins', () => {
  it('renders loading state', () => {
    const rendered = shallow(<Logins hasPIIPermission={false} loading />);
    expect(rendered).toMatchSnapshot();
  });

  it('renders errors', () => {
    const error = [
      { message: 'test' },
      { message: 'test' },
      { message: 'test' },
    ];
    const rendered = shallow(
      <Logins hasPIIPermission={false} loading={false} error={error} />
    );
    expect(rendered).toMatchSnapshot();
  });

  it('renders when empty', () => {
    const rendered = shallow(
      <Logins hasPIIPermission={false} loading={false} data={[]} />
    );
    expect(rendered).toMatchSnapshot();
  });

  it('renders no PII data and no Title details', () => {
    useSelector
      .mockReturnValueOnce(date => date) // HACK: useSelector for formatDateTimeSelector
      .mockReturnValueOnce(false); // HACK: useSelector for showTitleDetails
    const data = [
      {
        tid: 1,
        timestamp: '1621262265299',
        firstParty: {
          platform: 'TEST',
        },
      },
    ];
    const rendered = shallow(
      <Logins hasPIIPermission={false} loading={false} data={data} />
    );
    expect(rendered).toMatchSnapshot();
  });

  it('renders PII and no Title details', () => {
    useSelector
      .mockReturnValueOnce(date => date) // HACK: useSelector for formatDateTimeSelector
      .mockReturnValueOnce(false); // HACK: useSelector for showTitleDetails
    const data = [
      {
        tid: 1,
        timestamp: '1621262265299',
        client: {
          ips: '12',
          geo: { countryIsoCode: 'IE' },
        },
        firstParty: {
          platform: 'TEST',
        },
      },
    ];
    const rendered = shallow(
      <Logins hasPIIPermission loading={false} data={data} />
    );
    expect(rendered).toMatchSnapshot();
  });

  it('renders PII and Title details', () => {
    useSelector
      .mockReturnValueOnce(date => date) // HACK: useSelector for formatDateTimeSelector
      .mockReturnValueOnce(true); // HACK: useSelector for showTitleDetails
    const data = [
      {
        tid: 1,
        timestamp: '1621262265299',
        client: {
          ips: '12',
          geo: { countryIsoCode: 'IE' },
        },
        firstParty: {
          platform: 'TEST',
        },
      },
    ];
    const rendered = shallow(
      <Logins hasPIIPermission loading={false} data={data} />
    );
    expect(rendered).toMatchSnapshot();
  });
});
