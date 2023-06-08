import React from 'react';
import { shallow } from 'enzyme';
import Button from 'dw/__mocks__/@material-ui/Button';
import TextField from 'dw/__mocks__/@material-ui/TextField';
import DateTimePicker from 'dw/core/components/DateTimePicker';
import SelectField from 'dw/core/components/Select';
import NumericInput from 'dw/core/components/NumericInput';
import AdvancedSearch from '../components/AdvancedSearch';

describe.skip('AdvancedSearch', () => {
  const fields = [
    {
      label: 'log ID',
      key: 'logId',
      type: 'number',
    },
    {
      label: 'timestamp',
      key: 'timestamp',
      type: 'date',
    },
    {
      label: 'User Name',
      key: 'userName',
      type: 'string',
    },
    {
      label: 'Enabled',
      key: 'enabled',
      type: 'bool',
    },
  ];

  const values = {
    logId: 111,
    timestamp: 1525161600, // 2018-05-01
    userName: 'John',
    enabled: 1,
  };

  const clickFilterButton = wrapper =>
    wrapper.find(Button).find('[className="filter-button"]').props().onClick();

  it('renders empty container when advanced search is closed and no values', () => {
    const props = {
      onSearch: jest.fn(),
      values: {},
      fields,
      isOpen: false,
      close: jest.fn(),
    };
    const wrapper = shallow(<AdvancedSearch {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders NumericInput for advanced search field with type number', () => {
    const props = {
      onSearch: jest.fn(),
      values: { logId: 12345 },
      fields: [{ key: 'logId', type: 'number' }],
      isOpen: true,
      close: jest.fn(),
    };
    const wrapper = shallow(<AdvancedSearch {...props} />);
    expect(wrapper.find('[className="fields"]')).toMatchSnapshot();
  });

  it('renders DateTimePicker for advanced search field with type date', () => {
    const props = {
      onSearch: jest.fn(),
      values: { date: 1525132800 },
      fields: [{ key: 'date', type: 'date' }],
      isOpen: true,
      close: jest.fn(),
      timezone: 'Europe/Dublin',
    };
    const wrapper = shallow(<AdvancedSearch {...props} />);
    expect(wrapper.find('[className="fields"]')).toMatchSnapshot();
  });

  it('renders SelectField for advanced search field with type bool', () => {
    const props = {
      onSearch: jest.fn(),
      values: { enabled: 1 },
      fields: [{ key: 'enabled', type: 'bool' }],
      isOpen: true,
      close: jest.fn(),
    };
    const wrapper = shallow(<AdvancedSearch {...props} />);
    expect(wrapper.find('[className="fields"]')).toMatchSnapshot();
  });

  it('renders TextField for advanced search field with type text', () => {
    const props = {
      onSearch: jest.fn(),
      values: { userName: 'Chack' },
      fields: [{ key: 'userName', type: 'text' }],
      isOpen: true,
      close: jest.fn(),
    };
    const wrapper = shallow(<AdvancedSearch {...props} />);
    expect(wrapper.find('[className="fields"]')).toMatchSnapshot();
  });

  it('renders current advanced search criteria as tags', () => {
    const props = {
      onSearch: jest.fn(),
      values,
      fields,
      isOpen: false,
      close: jest.fn(),
    };
    const wrapper = shallow(<AdvancedSearch {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('allows to remove advanced search criteria by removing tags', () => {
    const onSearch = jest.fn();
    const props = {
      onSearch,
      values: {
        logId: 111,
        userName: 'John',
      },
      fields,
      isOpen: false,
      close: jest.fn(),
    };
    const wrapper = shallow(<AdvancedSearch {...props} />);

    wrapper.find('Tag[id="logId"]').props().removeField('logId', true);
    expect(onSearch).toBeCalledWith({ userName: 'John' });
  });

  it('allows advanced search with empty values', () => {
    const onSearch = jest.fn();
    const props = {
      onSearch,
      values: {},
      fields,
      isOpen: true,
      close: jest.fn(),
    };
    const wrapper = shallow(<AdvancedSearch {...props} />);
    clickFilterButton(wrapper);

    expect(onSearch).toBeCalledWith({});
  });

  it('calls onChange callback with changed values', () => {
    const expectedValues = {
      logId: 222,
      timestamp: 1525651200,
      userName: 'Andy',
      enabled: 0,
    };
    const onSearch = jest.fn();
    const props = {
      onSearch,
      values: {},
      fields,
      isOpen: true,
      close: jest.fn(),
    };
    const wrapper = shallow(<AdvancedSearch {...props} />);

    wrapper
      .find(NumericInput)
      .props()
      .onChange({ target: { value: 222 } });

    wrapper.find(DateTimePicker).props().onChange(1525651200);

    wrapper
      .find(SelectField)
      .find('[select=true]')
      .props()
      .onChange({ target: { value: 0 } }, -1, 0);

    wrapper
      .find(TextField)
      .find('[label="User Name"]')
      .props()
      .onChange({ target: { value: 'Andy' } });

    clickFilterButton(wrapper);

    expect(onSearch).toBeCalledWith(expectedValues);
  });

  it('calls onSearch callback with empty values on clear', () => {
    const onSearch = jest.fn();
    const props = {
      onSearch,
      values: {
        logId: 12345,
        userName: 'Sally',
        enabled: 1,
      },
      fields,
      isOpen: true,
      close: jest.fn(),
    };
    const wrapper = shallow(<AdvancedSearch {...props} />);
    wrapper.find(Button).find('[id="clear"]').props().onClick();

    expect(onSearch).toBeCalledWith({});
  });

  // Test multi advanced field

  it('displays all the multi field search criteria as separate tags', () => {
    const props = {
      onSearch: jest.fn(),
      values: { myField: 'value1,value2,last value' },
      fields: [
        { multi: true, type: 'text', key: 'myField', label: 'My Field' },
      ],
      isOpen: false,
      close: jest.fn(),
    };
    const wrapper = shallow(<AdvancedSearch {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('allows to delete multi field search criteria by tag removal', () => {
    const onSearch = jest.fn();
    const props = {
      onSearch,
      values: { myField: 'value1,value2,last value' },
      fields: [
        { multi: true, type: 'text', key: 'myField', label: 'My Field' },
      ],
      isOpen: false,
      close: jest.fn(),
    };
    const wrapper = shallow(<AdvancedSearch {...props} />);
    wrapper.find('Tag[value="value2"]').props().removeField('myField-2', true);

    expect(onSearch).toBeCalledWith({ myField: 'value1,last value' });
  });

  it('allows to add a new multi field', () => {
    const props = {
      onSearch: jest.fn(),
      values: {},
      fields: [
        { multi: true, type: 'text', key: 'myField', label: 'My Field' },
      ],
      isOpen: true,
      close: jest.fn(),
    };
    const wrapper = shallow(<AdvancedSearch {...props} />);
    const btn = shallow(
      wrapper.find(TextField).props().InputProps.endAdornment
    );
    btn.find('[className="add-other-field"]').simulate('click');
    wrapper.update();
    expect(wrapper.find(TextField).find('[label="My Field"]')).toHaveLength(2);
  });

  it('allows to remove multi field', () => {
    const onSearch = jest.fn();
    const props = {
      onSearch,
      values: { myField: 'value1,value2,last value' },
      fields: [
        { multi: true, type: 'text', key: 'myField', label: 'My Field' },
      ],
      isOpen: true,
      close: jest.fn(),
    };
    const wrapper = shallow(<AdvancedSearch {...props} />);
    const btn = shallow(
      wrapper.find(TextField).last().props().InputProps.endAdornment
    );
    btn.find('[className="remove-other-field"]').simulate('click');
    wrapper.update();

    expect(wrapper.find(TextField).find('[label="My Field"]')).toHaveLength(2);

    clickFilterButton(wrapper);
    expect(onSearch).toBeCalledWith({ myField: 'value1,value2' });
  });
});
