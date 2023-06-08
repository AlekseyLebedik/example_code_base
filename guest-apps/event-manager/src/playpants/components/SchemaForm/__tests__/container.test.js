import React from 'react';
import { shallow } from 'enzyme';
import { schemaFormProps as props } from 'playpants/testUtils/schemaFormProps';

import { SchemaFormBase } from '../container';

describe('SchemaForm', () => {
  const root = shallow(<SchemaFormBase {...props} />);

  it('renders the container component correctly', () => {
    expect(root).toMatchSnapshot();
  });

  describe('handleChange', () => {
    const e = { target: { name: 'attachments 1', value: 'new' } };
    beforeEach(() => {
      root.instance().handleChange(e);
    });

    it('should call onUpdate', () => {
      expect(props.onUpdate).toHaveBeenCalled();
    });

    it('should change target value', () => {
      expect(props.data.inputs[3].value).toEqual(['new', 'good']);
    });
  });

  describe('handleDelete', () => {
    const e = { target: { name: 'attachments 1' } };
    beforeEach(() => {
      root.instance().handleDelete(e);
    });

    it('should delete target value', () => {
      expect(props.data.inputs[3].value).toEqual(['good']);
    });

    it('should call onUpdate', () => {
      expect(props.onUpdate).toHaveBeenCalled();
    });
  });
});
