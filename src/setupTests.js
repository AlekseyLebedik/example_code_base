/* eslint-disable */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import 'dw/test-utils/matchers';
import { editor } from 'dw/__mocks__/monaco-editor';
window.PropTypes = require('prop-types');

configure({ adapter: new Adapter() });

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

window.monacoEditor = { editor };
window.MonacoEditor = () => 'MonacoEditor';
