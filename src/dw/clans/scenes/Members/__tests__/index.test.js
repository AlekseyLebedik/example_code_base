import React from 'react';
import { shallowWithProvider } from 'dw/core/helpers/__tests__';
import { clanData, clansPermissions } from 'dw/clans/testUtils/props';
import { ClanView } from '../index';

describe('Clans - ClanView', () => {
  it('renders default values', () => {
    const wrapper = shallowWithProvider(
      <ClanView
        clanData={clanData}
        clansPermissions={clansPermissions}
        refetch={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
