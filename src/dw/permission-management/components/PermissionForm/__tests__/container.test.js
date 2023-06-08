import React from 'react';
import * as reduxForm from 'redux-form';
import { shallow } from 'enzyme';

import { createMockStore } from 'redux-test-utils';
import { shallowUntilTarget } from 'dw/test-utils';
import PermissionForm, { PermissionsFormComponent } from '../container';

describe('Permission Form:', () => {
  let store = null;
  const props = {
    form: 'test',
    fetchContentTypesDetails: jest.fn(),
    fetchObjectPermissions: jest.fn(),
    editObjectPermissions: jest.fn(),
    onSave: jest.fn(),
    reset: jest.fn(),
    selectedItemId: '1',
    isPristine: true,
    selectedItem: {
      id: 1,
    },
    transformToObjectPerm: jest.fn(),
    dragTypeObjectPerm: 'OBJECT_PERM',
  };

  let permissionFormWrapper = null;

  beforeEach(() => {
    const mockState = {
      Scenes: {
        companies: {},
        Users: { CompanyMemberships: { data: [] } },
      },
      permissions: { memberships: [] },
      user: { profile: {} },
    };
    store = createMockStore(mockState);

    reduxForm.initialize = jest.fn();
    reduxForm.change = jest.fn();
    jest.clearAllMocks();
    permissionFormWrapper = shallowUntilTarget(
      <PermissionForm store={store} {...props} />,
      'Hoc'
    ).dive();
  });

  describe('Renders:', () => {
    it('renders PermissionsFormStateLess', () => {
      expect(permissionFormWrapper).toMatchSnapshot();
    });
  });

  describe('Triggers:', () => {
    it('triggers editObjectPermissions on submit', () => {
      permissionFormWrapper.props().onSubmit({ contentTypes: [] });
      expect(props.editObjectPermissions).toBeCalledWith(
        props.selectedItem.id,
        props.transformToObjectPerm({ contentTypes: [] })
      );
    });

    it('triggers initialize on onSubmitSuccess', () => {
      permissionFormWrapper
        .props()
        .onSubmitSuccess(null, item => item, { values: {} });

      expect(reduxForm.initialize).toHaveBeenCalled();
    });

    it('triggers change on move permissions', () => {
      const fields = {
        name: 'test',
        values: [{ permissions: [5] }, { permissions: [1, 3, 4] }],
        get: index => fields.values[index],
      };
      const fromIndex = 0;
      const toIndex = 1;
      const toFieldName = 'toFieldName';
      permissionFormWrapper
        .props()
        .onMove(fromIndex, toIndex, fields, toFieldName, {
          id: 5,
          type: props.dragTypeObjectPerm,
        });

      expect(reduxForm.change).toHaveBeenCalledTimes(2);
      expect(reduxForm.change).toHaveBeenCalledWith(
        props.form,
        `${fields.name}[${fromIndex}]`,
        {
          permissions: [],
        }
      );
      expect(reduxForm.change).toHaveBeenCalledWith(props.form, toFieldName, {
        permissions: [1, 3, 4, 5],
      });
    });
  });

  describe('Lifecycle events:', () => {
    it('fetchObjectPermissions on changed props when have a selectedItem', () => {
      const component = shallow(
        <PermissionsFormComponent store={store} {...props} />,
        {
          shallowOptions: {
            lifecycleExperimental: true,
          },
        }
      );
      const newProps = {
        selectedItem: {
          id: 2,
        },
        reset: jest.fn(),
        fetchObjectPermissions: jest.fn(),
        contentTypes: [{}],
      };
      component.setProps(newProps);
      expect(newProps.reset).toHaveBeenCalled();
      expect(newProps.fetchObjectPermissions).toHaveBeenCalledWith(2);
    });
  });
});
