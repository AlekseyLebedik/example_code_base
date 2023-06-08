import React from 'react';
import { shallow } from 'enzyme';
import Button from 'dw/__mocks__/@material-ui/Button';
import { PermissionGroups } from '../index';
import CompanyGroups from '../components/CompanyGroups';

describe('Users - PermissionGroups component', () => {
  const companyName = 'Test';
  const props = {
    userID: 5,
    fetchAssignedGroups: jest.fn(),
    fetchAvailableGroups: jest.fn(),
    saveUserCompaniesAndGroups: jest.fn(),
    companies: [
      { id: 10, name: 'company1', companyName },
      { id: 20, name: 'company2', companyName },
    ],
    handleSubmit: jest.fn(() => jest.fn()),
    onSubmit: jest.fn(),
    onReset: jest.fn(),
    change: jest.fn(),
    classes: {},
  };

  const root = shallow(<PermissionGroups {...props} />);

  it('renders link to groups page', () => {
    expect(root.find('Link').props().to).toBe('/permission-management/groups');
    expect(root.find('Link').children().text()).toBe('group');
  });

  it('renders groups', () => {
    expect(root.find('Field[name="groups"]').props()).toMatchObject({
      component: CompanyGroups,
      fullWidth: true,
      label:
        'Click to add user to a new group (company-wide view permissions enabled by default)',
      multiple: true,
      name: 'groups',
    });
  });

  it('simulate cancel button click', () => {
    root.find(Button).at(0).simulate('click');
    expect(props.onReset).toBeCalled();
  });

  it('simulate save button click', () => {
    root.find(Button).at(1).simulate('click');
    expect(props.onSubmit).toBeCalled();
  });

  it('handle add user to the groups', () => {
    const selectedGroups = [1, 2];
    const selectedCompanies = [1, 2, 3];
    const values = { groups: selectedGroups, companies: selectedCompanies };
    const instance = root.instance();
    instance.saveUserCompaniesAndGroups(values);
    expect(props.saveUserCompaniesAndGroups).toBeCalledWith(5, values);
  });
});
