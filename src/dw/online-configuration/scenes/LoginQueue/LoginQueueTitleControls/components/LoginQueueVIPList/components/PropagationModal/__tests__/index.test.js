import React from 'react';
import { shallow } from 'enzyme';
import PropagationModal from '../index';

const validPropagateTitles = [{ title: 1, env: 'dev', name: '1 DEV' }];

const mockDispatch = jest.fn();
const mockSelector = jest.fn();
jest.mock('react-redux', () => ({
  connect: () => Component => Component,
  useDispatch: () => mockDispatch,
  useSelector: () => mockSelector,
}));

describe('PropagationModal', () => {
  it('displays propagation modal', () => {
    const modal = shallow(
      <PropagationModal
        open
        onClose={() => {}}
        validPropagateTitles={validPropagateTitles}
        selectedQueue={0}
      />
    );
    expect(modal).toMatchSnapshot();
  });
});
