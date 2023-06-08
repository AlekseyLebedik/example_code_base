import React from 'react';
import { shallow } from 'enzyme';
import AddRemoveModal from '../index';

describe('AddRemoveModal', () => {
  it('display add modal', () => {
    const modal = shallow(
      <AddRemoveModal openDialog handleClose={() => {}} handleSave={() => {}} />
    );
    expect(modal).toMatchSnapshot();
  });

  it('display remove modal', () => {
    const modal = shallow(
      <AddRemoveModal
        actionMode="remove"
        openDialog
        handleClose={() => {}}
        handleSave={() => {}}
      />
    );
    expect(modal).toMatchSnapshot();
  });
});
