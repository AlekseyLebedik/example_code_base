import React from 'react';
import { shallow } from 'enzyme';

import { pyscriptProps as props } from 'playpants/testUtils/eventProps';
import Select from 'dw/core/components/Select';

import PyScriptTitleComponent from '../index';

describe('PyScriptTitleComponent', () => {
  const root = shallow(<PyScriptTitleComponent {...props} />);

  it('renders the component correctly', () => {
    expect(root).toMatchSnapshot();
  });

  describe('schema dropdown selector', () => {
    it('should be disabled if a template_id is provided', () => {
      expect(root.find(Select)).toBeDisabled();
    });

    props.selectedActivity.activity.template_id = '';
    const newRoot = shallow(<PyScriptTitleComponent {...props} />);
    it('should be enabled if no template_id', () => {
      expect(newRoot.find(Select)).not.toBeDisabled();
    });

    it('should call onSchemaModelUpdate on select', () => {
      const dropdown = newRoot.find(Select);
      dropdown.simulate('change', { target: 'double_xp' });
      expect(props.onSchemaModelUpdate).toHaveBeenCalledTimes(1);
    });
  });
});
