import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import DeleteItemsModal from '../index';

describe('DeleteItemsModal', () => {
  const onCancel = jest.fn();
  const onSubmit = jest.fn();

  let shallow;

  const shallowModal = (customProps = {}) => {
    shallow = createShallow({ dive: true });
    const props = {
      visible: true,
      onCancel,
      onSubmit,
      maxQuantity: 2,
      showInput: true,
      ...customProps,
    };
    return shallow(<DeleteItemsModal {...props} />);
  };

  beforeEach(() => {
    onCancel.mockClear();
    onSubmit.mockClear();
  });

  describe('Connected Player Inventory', () => {
    it('renders default values', () => {
      const wrapper = shallowModal();
      expect(wrapper).toMatchSnapshot();
    });

    it('renders an input when showInput is true', () => {
      const wrapper = shallowModal();
      expect(wrapper.dive().find('input')).toHaveLength(1);
    });

    it('does not renders an input when showInput is false', () => {
      const wrapper = shallowModal({
        showInput: false,
      });
      expect(wrapper.dive().find('input')).toHaveLength(0);
    });

    it('submit with value changed the quantity', () => {
      const wrapper = shallowModal({
        showInput: true,
      });
      const instance = wrapper.instance();
      instance.handleQuantityChange(1);
      instance.handleSubmit();

      expect(onSubmit).toHaveBeenCalledWith(1);
    });
  });
});
