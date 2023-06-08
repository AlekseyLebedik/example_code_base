/* eslint-disable */
import 'regenerator-runtime/runtime';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import 'jest-enzyme';
import 'dw/test-utils/matchers';

import UserReplica from 'dw/core/replicas/user';
import PermissionsReplica from 'dw/core/replicas/permissions';
import SwitchesReplica from 'dw/core/replicas/switches';
import ContentTypeReplica from 'dw/core/replicas/contentType';

window.Replicas = {
  UserReplica,
  PermissionsReplica,
  ContentTypeReplica,
  SwitchesReplica,
};

Enzyme.configure({ adapter: new Adapter() });

// Mock react-ga module in all tests
jest.mock('react-ga');

console.error = message => {
  // Fail test if there is an error in the console
  throw new Error(message);
};

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;
