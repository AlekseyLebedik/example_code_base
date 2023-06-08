export const contextFieldProps = {
  asyncValidating: false,
  disabled: false,
  onChange: jest.fn(),
  options: [],
};

export const categoryFieldProps = {
  asyncValidating: false,
  disabled: false,
  onChange: jest.fn(),
  options: [{ value: 'All', label: 'All' }],
};

export const descriptionFieldProps = {
  onBlur: jest.fn(),
};

export const nameFieldProps = {
  asyncValidating: false,
  onBlur: jest.fn(),
};

export const scheduleFieldProps = {
  defaultValue: 1,
  handleOnLoadComplete: jest.fn(),
  isClearable: false,
  isDisabled: false,
  onChange: jest.fn(),
  onSearch: jest.fn(),
  options: [],
  value: 1,
};

export const timeEnvFieldProps = {
  asyncValidating: false,
  disabled: false,
  onChange: jest.fn(),
  options: {},
};
