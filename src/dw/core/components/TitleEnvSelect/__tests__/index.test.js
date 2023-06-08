import React from 'react';
import { shallow } from 'enzyme';
import { shallowUntilTarget } from 'dw/test-utils';

import * as coreHooks from 'dw/core/hooks';

import Select from 'dw/core/components/FormFields/CustomSelect';

import TitleEnvSelect from '../index';

jest.mock('dw/core/components/TitleEnvSelect/hooks');
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  connect() {
    return Component => Component;
  },
}));

const { useEnvironments } = require('dw/core/components/TitleEnvSelect/hooks');

describe('TitleEnvSelect', () => {
  beforeAll(() => {
    useEnvironments.mockReturnValue({
      loading: false,
      environments: [
        {
          project: { id: 1, name: 'My Cool Project' },
          title: { id: 1, name: ' Cool Title', platform: 'ps4' },
          environment: { shortType: 'dev' },
        },
      ],
    });
  });

  it('renders default values', () => {
    expect(shallow(<TitleEnvSelect />)).toMatchSnapshot();
  });

  it('renders custom values', () => {
    coreHooks.useSnackbar = jest.fn();
    const props = {
      excludeCurrent: true,
      serviceName: 'Blah',
    };
    expect(
      shallowUntilTarget(<TitleEnvSelect {...props} />, Select)
    ).toMatchSnapshot();
  });

  it('renders select with loading option before premissions are checked', () => {
    useEnvironments.mockReturnValue({ loading: true, environments: [] });
    coreHooks.useSnackbar = jest.fn();
    const props = {
      filterByPermissionName: 'blah',
      serviceName: 'Blah',
    };
    expect(
      shallowUntilTarget(<TitleEnvSelect {...props} />, Select)
    ).toMatchSnapshot();
  });
});
